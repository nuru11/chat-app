import {io} from "socket.io-client"

const form = document.getElementById("form")
const headerInput = document.getElementById("header-input")
const messageBox = document.getElementById("message-box")
const sendInput = document.getElementById("send-input")
const labelBtn = document.getElementById("label-btn")
const roomInput = document.getElementById("room-input")

const socket = io("http://localhost:3000")

const nameFromClient = prompt("what is your name?")

socket.on("connect", () => {
      showMessage(`your id: ${socket.id}`)
})

socket.on("tt", (message, nameFromServer) => {
    showMessage(`${nameFromServer}: ` + `${message} `)
})




form.addEventListener("submit", function(e){
    e.preventDefault()
    
  
  const sendInputValue = sendInput.value
   const roomValue = roomInput.value

   socket.emit("chat-message", sendInputValue, roomValue, nameFromClient === null ? "unknown" : nameFromClient)
   if(sendInputValue === "") return
   myMessage("you: " + sendInputValue)

   sendInput.value = ""

})

labelBtn.addEventListener("click", function(){
    
    if(roomInput.value !== ""){
        const roomV = roomInput.value
        socket.emit("join-room", roomV)
         
        const div = document.createElement("div")
        div.textContent = "room: " + roomInput.value
        div.setAttribute("class", "header-child")
        headerInput.style.display = "block";
        headerInput.append(div)
        
    }

})

function showMessage(sendInputValue){
    const div = document.createElement("div")
    div.textContent = sendInputValue
    div.setAttribute("class", "message-box-div")
    messageBox.append(div)

   
}

function myMessage(sendInputValue){
    const div2 = document.createElement("div")
    div2.textContent = sendInputValue
    div2.setAttribute("class", "message-box-div2")
    messageBox.append(div2)

 }