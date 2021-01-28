import jwtToken from '../middleware/jwtToken.js'
import intercomFrame from '../components/intercomFrame.js'
import jiraTicket from '../components/jiraTicket.js'
import emailBody from '../components/emailBody.js'
import axios from 'axios'

const canvas = intercomFrame()
const intercomUrl = "https://api.intercom.io"
const jiraUrl = "https://tandadocs.atlassian.net"

export default function routes(app) {
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json')
  })

  app.post('/installed', (req,res) => {
    const settings = req.body
    if(settings) {
      res.status(204).send()
      console.log("Application installed successfully, tenant details have been added.")
      console.log(settings)
    } else {
      res.status(500).send()
      console.log("An error occured, the app was not installed")
    }
  })

  app.post('/initialize', (req, res) => {
    res.send(canvas)
  })

  app.post('/submit', (req,res) => {
    const body = req.body["input_values"]
    const userToken = jwtToken('GET', `/rest/api/3/user/search?query=${body['Email']}`, `${process.env.SHARED_SECRET}`)
    // V3 API has a bunch of breaking changes to the req body.
    const issueToken = jwtToken('POST', `/rest/api/2/issue`, `${process.env.SHARED_SECRET}`)

    const getUser = async () => {
      const header = {
        'X-Atlassian-Token': 'nocheck',
        'content-type': 'application/json',
        'Authorization': `JWT ${userToken}`
      }
      try {
        const user = await axios.get(`${jiraUrl}/rest/api/3/user/search?query=${body['Email']}`, { headers: header })
        console.log(user.data)
        return user.data[0].accountId
      } catch (error) {
        console.error(error)
      }
    }

    const createIssue = () => {
      const header = {
        'X-Atlassian-Token': 'nocheck',
        'content-type': 'application/json',
        'Authorization': `JWT ${issueToken}`
      }
      getUser().then( async (accountId) => {
        const issueBody = JSON.stringify(jiraTicket(body, accountId))
        const issue = await axios.post(`${jiraUrl}/rest/api/2/issue`, issueBody, { headers: header})
        console.log(issue)
        return res.send(canvas)
      }).catch(err => console.error(err))
    }
    createIssue()
  })

  app.post('/email_clients', (req, res) => {
    const body = req.body
    const issue = res.req.body.issue
    const issueSummary = issue.fields.summary
    const issueFields = {
      issueId: issue.key,
      issueStatus: req.body.transition.to_status,
      issueSummary: issue.fields.summary
    }
    res.status(200).end()
    const contactBody = {
      "query": {
      "field": "email",
      "operator": "IN",
      "value": body["issue"]["fields"]["customfield_10117"]
    }}
    const header = {
      'Authorization': `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const contactSearch = async () => {
      try {
        const contactSearch = await axios.post(`${intercomUrl}/contacts/search`, contactBody, { headers: header })
        const contacts = contactSearch.data.data
        contacts.map((contact) => {
          axios.post(`${intercomUrl}/messages`, emailBody(user, issueStatus), { headers: header })
            .then((response) => console.log(JSON.stringify(response.data)))
            .catch(error => console.log(JSON.stringify(error)))
        })
      } catch (err) {
        console.error(err)
      }
    }
    contactSearch()
  })
}
