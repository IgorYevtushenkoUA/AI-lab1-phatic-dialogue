let messages = [{
    sender: "person",
    message: "Привіт як справи",
    date: new Date()
}]
let similarMessage = [
    {message: "ти", count: 0},
    {message: "я", count: 0},
    {message: "ми", count: 0}
]

/**
 * addNewMessage(String msg, String sender) || may change String sender -> bool sender  -> if true then person else bot
 * @param msg
 * @param sender
 */
function addNewMessage(msg, sender) {
    let message = {
        sender: sender,
        message: msg,
        date: new Date()
    }
    messages.push(message)
}

/**
 * addMessage(String msg, String sender)
 * @param msg
 * @param sender
 */
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
 * + modifyMessage(String msg)
 * модифікує стрічку, а саме:
 * - зайві пробіли із стрічки
 * - зайві символи із стрічки
 * - приводить до нижнього регістру
 * @param msg
 * @returns {string}
 */
function modifyMessage(msg) {
    msg = msg.trim()
    let msgCopy = ''
    let ASCII_UA_A = 1040, ASCII_UA_z = 1103
    for (let i = 0; i < msg.length; i++) {
        if ((msg.charCodeAt(i) >= ASCII_UA_A && msg.charCodeAt(i) <= ASCII_UA_z) //а-я
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

/**
 * isQuestion (String string)
 * @param msg
 * @returns {boolean}
 */
function isQuestion(msg) {
    return msg.charAt(msg.length - 1) === '?'
}

/**
 * +isQuestionWord (String word)
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
 * + findQuestionWord(String msg)
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
            //Object.values(dict)[i] - to get count
            if (Object.values(dict)[i] > max) {
                max = dict[i]
                item = i
            }
        }
        // Object.keys(dict)[item] - get key by index
        return Object.keys(dict)[item]
    }
    return ""
}

/**
 * порівнює два списки чи однакові вони
 * @param a
 * @param b
 * @returns {boolean}
 */
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function intToFloat(num, decPlaces = 4) {
    return num.toFixed(decPlaces);
}


function jaro_distance(str1_arr_same, str2_arr_same) {
    console.log('str1_arr_same = ' + str1_arr_same)
    console.log('str2_arr_same = ' + str2_arr_same)
    if (arrayEquals(str1_arr_same, str2_arr_same)) {
        return 1.0
    }
    let len1 = str1_arr_same.length
    let len2 = str2_arr_same.length
    if (len1 === 0 || len2 === 0)
        return 0.0

    let max_dist = Math.floor(Math.floor(Math.max(len1, len2) / 2) - 1)

    let match = 0
    let hash_s1 = []
    let hash_s2 = []
    for (let i = 0; i < len1; i++) {
        for (let j = Math.max(0, i - max_dist);
             j < Math.min(len2, i + max_dist + 1); j++) {
            if (str1_arr_same[i] === str2_arr_same[j]
                && hash_s2[j] === undefined) {
                hash_s1[i] = 1;
                hash_s2[j] = 1;
                match++;
                break;
            }
        }
    }
    if (match === 0)
        return 0.0

    let t = 0
    let point = 0
    for (let i = 0; i < len1; i++) {
        if (hash_s1[i] === 1) {
            while (hash_s2[point] === 0)
                point++

            if (str1_arr_same[i] != str2_arr_same[point++])
                t++
        }
    }
    t /= 2
    return ((intToFloat(match)) / (intToFloat(len1))
        + (intToFloat(match)) / (intToFloat(len2))
        + (intToFloat(match - t)) / (intToFloat(match))) / 3.0
}

function algorithmJaroWinkler(str1, str2) {
    /* знаходимо спільні слова і записуємо їх в масив str1_arr_same
у тому порядку у якому вони зустрічаються
далі записуємо слова у тому порядку
у якому вони повторюються до str2_arr_same
це для алгоритму Сходство Джаро — Винклера
* */
    let str1_arr = str1.toLowerCase().split(" ")
    let str2_arr = str2.toLowerCase().split(" ")
    let str1_arr_same = []
    let str2_arr_same = []

    for (let i = 0; i < str1_arr.length; i++) {
        for (let j = 0; j < str2_arr.length; j++) {
            if (str1_arr[i] === str2_arr[j]) {
                str1_arr_same.push(str1_arr[i])
                break
            }
        }
    }
    for (let i = 0; i < str2_arr.length; i++) {
        for (let j = 0; j < str1_arr_same.length; j++) {
            if (str2_arr[i] === str1_arr_same[j]) {
                str2_arr_same.push(str2_arr[i])
                break
            }
        }
    }

    let jaro_dist = jaro_distance(str1_arr_same, str2_arr_same)
    if (jaro_dist > 0.7) {
        let prefix = 0
        for (let i = 0; i < Math.min(str1_arr_same.length, str2_arr_same.length); i++) {
            if (str1_arr_same[i] == str2_arr_same[i])
                prefix++
            else break
        }
        //TODO чого 4  - зрозуміти // Maximum of 4 characters are allowed in prefix
        prefix = Math.min(4, prefix)
        jaro_dist += 0.1 * prefix * (1 - jaro_dist);
    }
    return jaro_dist
}


console.log(algorithmJaroWinkler("Привіт як ти себе почуваєш ?", "як ти себе ведеш в цій компанії ?"));

/**
 * +findTheMostSimilarMessage (String: msg)
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
            if (similarMessage[0].count < count) {
                while (similarMessage.length !== 0)
                    similarMessage.pop()
                let newMsg = {message: messages[i].message, count: count}
                similarMessage.push(newMsg)
            } else if (similarMessage[0].count == count) {
                let newMsg = {message: messages[i].message, count: count}
                similarMessage.push(newMsg)
            }
        }
    }
}

findTheMostSimilarMessage("Привіт друже радий тебе бачити як ти себе почуваєш ?")
console.log(similarMessage)

// todo дописати
function compare2String(str1, str2) {
// перевірка на кількість слів  + алгоритмджароля +винверля
//
}

// todo дописати
function isOnlyOneQuestion(str) {

}

/**
 * Перевіряє чи не повторюється слово із діалогу
 * @param msg
 */
function isQuestionRepeat(msg) {
    for (let i = 0; i < messages.length; i++) {
        // compare 2 string TODO code
        // todo дописати
    }
}

// todo дописати
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
