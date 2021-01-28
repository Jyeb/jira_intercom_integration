export default function emailBody(name, user_id, issue_key, issue_status, issue_summary) {
  if (issue_status === 'Complete') {
    const msg =  "Our team has marked the ticket as complete. For any further assistance, please reply to this email and we will be in touch."
  } else {
    const msg = `Your ticket is currently marked as ${issue_status}. You will continue to receive updates via email until the issue is marked as complete.`
  }
  return {
    "message_type": "email",
    "subject": "Tanda Ticket - Status Update",
    "body": `Hi ${name}, Your outstanding ticket: ${issue_key}: ${issue_summary} has been updated.` + msg,
    "template": "plain",
    "from": {
      "type": "admin",
      "id": "3790879"
    },
    "to": {
      "type": "user",
      "id": user_id
    }
  }
}
