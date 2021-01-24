export default function jiraTicket(data) {
  return {
    "fields": {
      "project": { "key": "ISD", "id": "10029" },
      "summary": `${data["Title"]}`,
      "issuetype": {
        "id": `${data["IssueType"]}`
      },
      "customfield_10107": `${data["description"]}`,
      "priority": {
        id: `${data["priority"]}`
      }
    }
  }
}