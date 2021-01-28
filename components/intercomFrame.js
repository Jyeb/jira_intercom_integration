export default function intercomFrame() {
  const defaultVal = "WHAT IS THE ISSUE ALL ABOUT: \nNAME OF USER REPORTING THE ISSUE:\nSTEPS TO REPLICATE: \n1. \n2. \n3. \n4. \nACTUAL BEHAVIOUR: \nEXPECTED BEHAVIOUR: \nOTHER INFORMATION:"
  const canvas = {
    canvas: {
      content: {
        components: [
          {
            type: "dropdown",
            id: "IssueType",
            label: "Issue Type",
            options: [
              { type: "option", id: "10069", text: "Incident" },
              { type: "option", id: "10002", text: "Task" },
              { type: "option", id: "10039", text: "Service Request" }
            ]
          },
          { type: "input", id: "Title", label: "Title (Summary)" },
          { type: "input", id: "Email", label: "Your email"},
          {
            type: "single-select",
            id: "priority",
            label: "Priority",
            options: [
              { type: "option", id: "1", text: "Urgent" },
              { type: "option", id: "2", text: "High" },
              { type: "option", id: "3", text: "Medium" },
              { type: "option", id: "4", text: "Low" }
            ]
          },
          {
            type: "textarea",
            id: "description",
            label: "Description",
            placeholder: "Enter description here...",
            value: defaultVal
          },
          {
            type: "button",
            label: "Create Ticket",
            style: "primary",
            id: "url_button",
            action: { type: "submit" }
          }
        ]
      }
    }
  };
  return canvas;
}
