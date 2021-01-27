export default function emailBody(name, id) {
  return {
    "message_type": "email",
    "subject": "Ticket - Status Update"
    "body": `Hi, ${name} This is a test`,
    "template": "plain",
    "from": {
      "type": "admin",
      "id": "3790879"
    },
    "to": {
      "type": "user",
      "id": id
    }
  }
}
