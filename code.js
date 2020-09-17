let messages = []
let similarMessage = [{message: "", count: 0}]

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
    let msgBlock = "<div class=" + "\"" + `${sender}` + "\"" + ">" + msg + "</div>"
    all_messages.innerHTML += msgBlock
}

// todo use regex
/**
 * модифікує стрічку, а саме:
 * - зайві пробіли із стрічки
 * - зайві символи із стрічки
 * - приводить до нижнього регістру
 *
 * @param msg
 * @returns {string}
 */
function modifyMessage(msg) {
    msg = msg.trim()
    let msgCopy = ''
    let ASCII_UA_a = 1072, ASCII_UA_z = 1103
    for (let i = 0; i < msg.length; i++) {
        console.log(msg.charCodeAt(i))
        if ((msg.charCodeAt(i) >= ASCII_UA_a && msg.charCodeAt(i) <= ASCII_UA_z) //а-я
            || msg.charCodeAt(i) == 45 // -
            || msg.charCodeAt(i) == 39  //'
            || msg.charCodeAt(i) == 63  //?
            || msg.charCodeAt(i) == 46  //.
            || msg.charCodeAt(i) == 32  //space
            || (msg.charCodeAt(i) >= 1110 && msg.charCodeAt(i) <= 1111) //і-ї
        )
            msgCopy += msg.charAt(i)
    }
    return msgCopy
}

const sendMessage = () => {
    let message = document.getElementById("message").value
    if (message !== "") {
        message = modifyMessage(message)
        addMessage(message, "person")
        //generate bot answer
        //generateBotAnswer(msg)
        addMessage("botANSWER", "bot")

        // showMessages()

        // clean message field
        document.getElementById("message").value = ""
    }
}

function isQuestion(msg) {
    return msg.charAt(msg.length - 1) === '?'
}

/**
 * Перевіряє чи вхідне слово відноситься до питальних
 * @param word
 * @returns {boolean}
 */
function isQuestionWord(word) {
    return (word === "як" || word === "ким" || word === "хто" || word === "яким"
        || word === "що" || word === "який"
        || word === "коли" || word === "котрій"
        || word === "де" || word === "куди"
        || word === "яка" || word === "яке" || word === "які" || word === "котрий" || word === ""
        || word === "кого" || word === "кому"
        || word === "чий"
        || word === "чому"
        || word === "чи")
}

/**
 * метод повертає ключове питальне слово по типу ЯК, ЯКИЙ , ХТО
 * якщо ключового слова немає то воно повертає пусте слово -
 * це значить що питання  базується на займенниках ТИ ТЕБЕ ТВОЇ
 * @param msg
 * @returns {null|*}
 */
function findQuestionWord(msg) {
    let words = msg.toLowerCase().split(" ")
    let questionsWords = []
    for (let i = 0; i < words.length; i++) {
        if (isQuestionWord(words[i]))
            questionsWords.push(words[i])
    }
    if (questionsWords.length === 1) return questionsWords[0]
    /* припустимо у нас декілька питальних слів у реченні
    (як і коли ти думаєш це зробити?) -- приклад
    */
    else if (questionsWords.length > 0) {
        /*create dictionary and put key-value */
        let dict = {}
        for (let i = 0; i < questionsWords.length; i++) {
            if (dict[questionsWords[i]] === undefined)
                dict[questionsWords[i]] = 1
            else
                dict[questionsWords[i]] = dict[questionsWords[i]] + 1
        }
        let max = 1
        let item = 0
        for (let i = 0; i < Object.keys(dict).length; i++) {
            if (dict[i] > max) {
                max = dict[i]
                item = i
            }
        }
        return dict[item]
    }
    return ""
}

function algorithmJaroWinkler() {
    /* знаходимо спільні слова і записуємо їх в масив str1_arr_same
у тому порядку у якому вони зустрічаються
далі записуємо слова у тому порядку
у якому вони повторюються до str2_arr_same
це для алгоритму Сходство Джаро — Винклера
*
* */

    let str1_arr = str1.toLowerCase().split(" ")
    let str2_arr = str2.toLowerCase().split(" ")
    let str1_arr_same = []
    let str2_arr_same = []

    for (let i = 0; i < str1_arr.length; i++) {
        for (let j = 0; j < str2_arr.length; i++) {
            if (str1_arr[i] === str1_arr[j]) {
                str1_arr_same.push(str2_arr[j])
                break
            }
        }
    }
    for (let i = 0; i < str2_arr.length; i++) {
        for (let j = 0; j < str1_arr_same.length; j++) {
            if (str2_arr[i] === str1_arr_same[j]) {
                str2_arr_same.push(str1_arr_same[j])
                break
            }
        }
    }
}

/**
 * findTheMostSimilarMessage (String: msg)
 * знайти із всіх повідомлень що були відправлені користуачем
 * те де найбільше повторилося слів
 * @param msg
 */
function findTheMostSimilarMessage(msg) {
    let msg_arr = msg.toLowerCase().split(" ")
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].sender === "person") {
            let count = 0;
            let userMessage = messages[i].message.toLowerCase().split(" ")
            for (let i = 0; i < msg_arr.length; i++) {
                for (let j = 0; j < userMessage.length; j++) {
                    if (msg_arr[i] === userMessage[j])
                        count++
                }
            }
            if (similarMessage[0].count < count){
                similarMessage.pop()
                let newMsg = {message: messages[i].message, count: count}
                similarMessage.push(newMsg)
            }
        }
    }
    return XZ
}

function compare2String(str1, str2) {

}

function isOnlyOneQuestion(str) {

}

/**
 * Перевіряє чи не повторюється слово із діалогу
 * @param msg
 */
function isQuestionRepeat(msg) {
    for (let i = 0; i < messages.length; i++) {
        // compare 2 string TODO code
    }
}


function generateBotAnswer(msg) {
    // isQuestionRepeat(msg)
    if (isQuestion(msg)) {
        if (isQuestionRepeat(msg)) {
            // code
        } else {
            //delete -- ?
            msg = msg.slice(0, msg.length)
            if (isOneQuestion) {
            } else {
                let questionWord = findQuestionWord(msg)
            }
        }
    } else {

    }

}

function test() {
    let abc = [{a: "aa", b: 9}]
    if (abc[0].b < 15) {
        console.log("less")
    }
}

test()
