const socket = io();
let userName;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".messageArea");

// Write Here User Name
do {
  userName = prompt("what do your friends call you?");
} while (
  // If User Name Not Found
  !userName
);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: userName,
    message: message.trim(),
  };
  // Append Outgoing
  appendMessage(msg, "outgoing");

  //After Send Message Textarea Will be Blamk
  textarea.value = "";
  scrollToBottom();

  //Send To Server
  socket.emit("message", msg);
}

// Append User Message is Outgoin or Incoming
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  // Create Elements for User Message Wrote
  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//Recieve Messages
socket.on("message", (msg) => {
  // Append Incoming
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
