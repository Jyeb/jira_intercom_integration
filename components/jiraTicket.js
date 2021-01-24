export default function jiraTicket(data) {
  return {
    "fields": {
      "project": { "key": "ISD", "id": "10029" },
      "summary": `${data["Title"]}`,
      "issuetype": {
        "id": `${data["IssueType"]}`
      },
      "customfield_10107": `${data["description"]}`,
      "reporter": {
      "id": "5e375748213add0c9f8f64be"
    },
    "priority": {
      id: `${data["priority"]}`
    }
    }
  }
}