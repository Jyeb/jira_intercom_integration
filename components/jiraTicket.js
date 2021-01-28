export default function jiraTicket(data, reporter) {
  return {
    "fields": {
      "project": { "key": "ISD", "id": "10029" },
      "summary": `${data["Title"]}`,
      "issuetype": {
        "id": `${data["IssueType"]}`
      },
      "customfield_10107": `${data["description"]}`,
      "reporter": {
        "id": `${reporter}`
      },
      "priority": {
        id: `${data["priority"]}`
      }
    }
  }
}