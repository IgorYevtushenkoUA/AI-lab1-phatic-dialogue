let messages = []

function addNewMessage(msg, sender) {
    let message = {
        sender: sender,
        message: msg,
        date: new Date()
    }
    messages.push(message)
}

function addMessage(msg, sender) {
    addNewMessage(msg, sender)
    /** розбиваєммо на 2 блоки
     <div class="person">sdfsdf</div>
     <div class="bot">botANSWER</div>

     де перший блок - це ЛЮДИНА, а другий це БОТ
     */
    let all_messages = document.getElementById("all_messages")
    let msgBlock = "<div class=" + "\""+ `${sender}` + "\""+ ">" + msg + "</div>"
    all_messages.innerHTML += msgBlock
}

const sendMessage = () => {
    let message = document.getElementById("message").value
    if (message !== "") {
        addMessage(message, "person")
        //generate bot answer
        addMessage("botANSWER", "bot")

        // showMessages()

        // clean message field
        document.getElementById("message").value = ""
    }
}

