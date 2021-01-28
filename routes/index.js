import jwtToken from '../middleware/jwtToken.js'
import intercomFrame from '../components/intercomFrame.js'
import jiraTicket from '../components/jiraTicket.js'
import emailBody from '../components/emailBody.js'
import axios from 'axios'

const canvas = intercomFrame()
const intercomUrl = "https://api.intercom.io"

export default function routes(app) {
  app.get('/', (req, res) => {
    console.log(res.body)
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
    const reqBody = JSON.stringify(jiraTicket(body))
    const token = jwtToken('POST', '/rest/api/2/issue', process.env.SHARED_SECRET)
    axios.post('https://tandadocs.atlassian.net/rest/api/2/issue',
      reqBody,
      { headers: { 'X-Atlassian-Token': 'nocheck', 'content-type': 'application/json', 'Authorization': `JWT ${token}` }}
      ).then((res) => {
      console.log(res)
      res.send(canvas)
    }).catch(err => console.error(err))
  })

  app.post('/email_clients', (req, res) => {
    const body = req.body
    const issue = res.req.body.issue
    const issueId = issue.key
    const issueStatus = req.body.transition.to_status
    const issueSummary = issue.fields.summary
    res.status(200).end()
    const issueFields = body["issue"]["fields"]
    const contactBody = {
      "query": {
      "field": "email",
      "operator": "IN",
      "value": issueFields["customfield_10117"]
    }}

    const header = {
      'Authorization': `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    axios.post(`${intercomUrl}/contacts/search`, contactBody, { headers: header })
      .then(res => {
        const data = res.data.data
        console.log(data)
        data.map((user) => {
        axios.post(`${intercomUrl}/messages`, emailBody(user.name, user.id, issueId, issueStatus, issueSummary), { headers: header })
          .then((response) => console.log(JSON.stringify(response.data)))
          .catch(error => console.log(JSON.stringify(error)))
        })
      })
      .catch(err => console.log(err))
  })
}
