export default function emailBody(user, issueFields) {
  const complete = " Our team has marked the ticket as complete. For any further assistance, please reply to this email and we will be in touch."
  const ongoing =  ` Your ticket is currently marked as ${issueFields.issueStatus}. You will continue to receive updates via email until the issue is marked as complete.`

  const msg = issueFields === "Complete" ? complete : ongoing
  return {
    "message_type": "inapp",
    "subject": "Tanda Ticket - Status Update",
    "body": `Hi ${user.name}, Your outstanding ticket: ${issueFields.issueId}: ${issueFields.issueSummary} has been updated.` + msg,
    "template": "plain",
    "from": {
      "type": "admin",
      "id": "3790879"
    },
    "to": {
      "type": "user",
      "id": user.id
    }
  }
}
