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
}