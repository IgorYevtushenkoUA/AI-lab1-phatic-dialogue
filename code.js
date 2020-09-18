let messages = [
    {
        sender: "person",
        message: "Привіт як справи",
        date: new Date()
    }
]

/*{
sender: "person",
message: "Привіт як справи",
date: new Date()
}*/
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
        let botAnswer = generateBotAnswer(message)
        addMessage(botAnswer, "bot")

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
        || word === "яка" || word === "яке" || word === "які" || word === "котрий"
        || word === "кого" || word === "кому"
        || word === "чий"
        || word === "чому"
        || word === "чи"
        || word === "якби" || word === "якщо")
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

/**
 * +findTheMostSimilarMessage (String: msg)
 * знайти із всіх повідомлень що були відправлені користуачем
 * те де найбільше повторилося слів
 * @param msg
 */
function findTheMostSimilarMessage(msg) {
    let msg_arr = msg.toLowerCase().split(" ")
    let similarMessage = []
    //messages.length-1 аби без останнього повідомлення
    for (let i = 0; i < messages.length - 1; i++) {
        if (messages[i].sender === "person") {
            let count = 0;
            let userMessage = messages[i].message.toLowerCase().split(" ")
            for (let i = 0; i < msg_arr.length; i++) {
                for (let j = 0; j < userMessage.length; j++) {
                    if (msg_arr[i] === userMessage[j])
                        count++
                }
            }
            let newMsg = {message: messages[i].message, count: count}
            if (similarMessage.length > 0) {
                if (similarMessage[0].count < count) {
                    while (similarMessage.length !== 0)
                        similarMessage.pop()
                    similarMessage.push(newMsg)
                } else if (similarMessage[0].count == count) {
                    similarMessage.push(newMsg)
                }
            } else {
                similarMessage.push(newMsg)
            }
        }
    }
    return similarMessage
}

/**
 * ей метод перевіряє чи вхідна стрічка є схожою хоча би до 1 стрічки із всіх
 * запитань що вже задавав користувач
 * @param msg - вхідне питання
 * @returns {boolean}
 */
//todo тут напевно помилки
function isQuestionRepeat(msg) {
// перевірка на кількість слів  + алгоритмджароля +винверля
    let different = false
    console.log(findTheMostSimilarMessage(msg))
    let sameWords = findTheMostSimilarMessage(msg)
    console.log("sameWords = " + sameWords)

    /**
     * @param c — количество совпадающих символов.
     * @param a — количество символов в первой строке,
     * @param b — количество символов во второй строке
     * @returns {number}
     */
    function coeffJacquard(c, a, b) {
        return c / (a + b - c)
    }

    if (sameWords.length > 0) {
        let c = sameWords[0].count
        let a = sameWords[0].message.split(" ").length
        let b = msg.split(" ")
        let s = sameWords[0].message
        console.log("same words = " + c)
        if ((algorithmJaroWinkler(msg, s) > 0.9 || coeffJacquard(c, a, b) > 0.9) && c > 3) {
            different = true
        }
    }
    return different
}

function countQuestionsInMessage(msg) {
    let count = 0
    for (let i = 0; i < msg.length; i++)
        if (msg.charAt(i) === "?")
            count++
    return count
}

//todo improve
function getQuestion(msg) {
    if (countQuestionsInMessage(msg) === 1) return msg
    else {
        // todo дописати якщо в повідомленні більше ніж 1 питання
        return msg
    }
}

//todo дописати
function isShortAnswer(msg) {
    return true
}

function isPronoun(word) {
    switch (word) {
        case "я" :
            return true
        case "мій" :
            return true
        case "мене" :
            return true
        case "мені" :
            return true
        case "мною" :
            return true
        case "ти" :
            return true
        case "тебе" :
            return true
        case "тобі" :
            return true
        case "тобою" :
            return true
        case "ми" :
            return true
        case "ви" :
            return true
        case "вона" :
            return true
        case "він" :
            return true
        case "воно" :
            return true
        case "вони" :
            return true
        case "твій" :
            return true
        case "наш" :
            return true
        case "ваш" :
            return true
        case "його" :
            return true
        case "її" :
            return true
        case "їх" :
            return true
        case "їхній" :
            return true
        case "той" :
            return true
        case "кожен" :
            return true
        case "хто" :
            return true
        case "кожний" :
            return true
        case "жодний" :
            return true
        case "жоден" :
            return true
        case "іниший" :
            return true
        case "сам" :
            return true
        case "сама" :
            return true
        case "самий" :
            return true
        case "ніхто" :
            return true
        case "себе" :
            return true
        default:
            return false
    }
}

function changePronoun(pronoun) {
    switch (pronoun) {
        case "я" :
            return "ти"
        case "мій" :
            return "твій"
        case "мене" :
            return "тебе"
        case "мені" :
            return "тобі"
        case "мною" :
            return "тобою"
        case "ти" :
            return "я"
        case "тебе" :
            return "мене"
        case "тобі" :
            return "мені"
        case "тобою" :
            return "мною"
        case "ми" :
            return "ми"
        case "ви" :
            return "ми"
        case "вона" :
            return "вона"
        case "він" :
            return "він"
        case "воно" :
            return "воно"
        case "вони" :
            return "вони"
        case "твій" :
            return "мій"
        case "наш" :
            return "наш"
        case "ваш" :
            return "ваш"
        case "його" :
            return "його"
        case "її" :
            return "її"
        case "їх" :
            return "їх"
        case "їхній" :
            return "їхній"
        case "той" :
            return "цей"
        case "кожен" :
            return "кожен"
        case "хто" :
            return "хто"
        case "кожний" :
            return "кожний"
        case "жодний" :
            return "жодний"
        case "жоден" :
            return "жоден"
        case "іниший" :
            return "інший"
        case "сам" :
            return "сам"
        case "сама" :
            return "сама"
        case "самий" :
            return "самий"
        case "ніхто" :
            return "ніхто"

    }
}

// only for present tie
function isVerb(word) {
    if (word.length <= 2) return false
    if (word.slice(word.length - 2, word.length) === "еш" ||
        word.slice(word.length - 2, word.length) === "єш" ||
        word.slice(word.length - 2, word.length) === "иш" ||
        word.slice(word.length - 2, word.length) === "їш" ||
        word.slice(word.length - 2, word.length) === "ти")
        return true
}

function getVerbTime(v) {
    // past - present - future
    switch (word.slice(word.length - 2, word.length)) {
        case "еш" :
            return "present"
        case "єш" :
            return "present"
        case "иш" :
            return "present"
        case "їш" :
            return "present"
        case "ти" :
            return "inf"
        default:
            return ""
    }
}

// work only with present time
function changeVerb(v, time = "inf") {
    if (time === "present")
        return v.slice(0, v.length - 2) + "ю"
    return v
}

/**
 * із питання повертає масив змінених слів
 * займенники - я -> ти
 * дієслова - робиш [иш,їш,еш,єш] -> ю  працюэш -> працюю
 * все інше не змінюється
 * @param msg
 * @returns {[]}
 */
function changeQuestionToAnswer(msg) {
    let msg_arr = msg.toLowerCase().split(" ")
    let msg_changed = []
    for (let w of msg_arr) {
        if (isPronoun(w))
            msg_changed.push(changePronoun(w))
        else if (isVerb(w)) {
            let time = getVerbTime(w)
            msg_changed.push(changeVerb(w, time))
        } else
            msg_changed.push(w)
    }
    return msg_changed
}


/**
 * QW- question word , Pr-pronoun , \\- another sentence
 * QW + \\
 * QW + \\ + Pr
 * QW + \\ + Pr + \\
 * Qw + Pr
 * Qw + Pr + \\
 * Pr + \\
 * \\ + всі попередні варіанти
 * @param msg
 */
function getSentenceStructure(msg, qw = "") {
    let sentenceStructure = []
    let msg_arr = msg.toLowerCase().split(" ")
    for (let w of msg_arr) {
        if (isQuestionWord(w)) {
            if (qw !== "" && w === qw)
                sentenceStructure.push("QW")
        } else if (isPronoun(w)) {
            sentenceStructure.push("Pr")
        } else {
            if ((sentenceStructure.length > 0
                && sentenceStructure[sentenceStructure.length - 1] !== "//")
                // ||sentenceStructure.length === 0
            )
                sentenceStructure.push("//")
        }
    }
    //     [ 'QW', '//', 'Pr', '//' ]
    //     [ 'QW', '//', 'Pr' ]
    //     [ 'QW', '//' ]
    //     [ 'QW', 'Pr', '//' ]
    //     [ 'QW', 'Pr' ]
    //     [ 'Pr', '//' ]
    let sentence = sentenceStructure.join(" ")
    let rex_qw_$_pr_$ = new RegExp(`^QW // Pr //`)
    let rex_qw_$_pr = new RegExp(`^QW // Pr`)
    let rex_qw_$ = new RegExp(`^QW //`)
    let rex_qw_pr_$ = new RegExp(`^QW Pr //`)
    let rex_qw_pr = new RegExp(`^QW Pr`)
    let rex_pr_$ = new RegExp(`^Pr //`)

    let structure = [['QW', '//', 'Pr', '//'], ['QW', '//', 'Pr'], ['QW', '//'], ['QW', 'Pr', '//'], ['QW', 'Pr'], ['Pr', '//']]
    let structures_reg = [rex_qw_$_pr_$, rex_qw_$_pr, rex_qw_$, rex_qw_pr_$, rex_qw_pr, rex_pr_$]
    for (let i = 0; i < structures_reg.length; i++) {
        if (sentence.match(structures_reg[i]) !== null)
            return structure[i]
    }
    return sentenceStructure
}

// todo дописати
function generateBotAnswer(msg) {
    // isQuestionRepeat(msg)
    if (isQuestion(msg)) {
        console.log("isQuestion(msg)")
        if (isQuestionRepeat(msg)) {
            // code tha say that questions repeat
            alert("ти вже це казав")
            console.log("ти вже це казав")
        } else {
            //delete -- ?
            msg = msg.slice(0, msg.length)
            msg = getQuestion(msg)

            let questionWord = findQuestionWord(msg)
            let question_arr = changeQuestionToAnswer(msg)

            let sentenceStructure = getSentenceStructure(msg, questionWord)
            //     [ 'QW', '//', 'Pr', '//' ]
            //     [ 'QW', '//', 'Pr' ]
            //     [ 'QW', '//' ]
            //     [ 'QW', 'Pr', '//' ]
            //     [ 'QW', 'Pr' ]
            //     [ 'Pr', '//' ]
            if (questionWord === "") {
                let text_before_pronoun = []
                let text_after_pronoun = []
                let text_after_question = []
                let pronoun = []
                let question = []
                let nothing = []
                if (arrayEquals(sentenceStructure, ['QW', '//', 'Pr', '//'])) {
                    for (let w of sentenceStructure) {
                        if (question.length > 0) {
                            if (w == questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (isPronoun(w) && pronoun.length == 0)
                                pronoun.push(w)
                            else {
                                if (pronoun.length === 0)
                                    text_before_pronoun.push(w)
                                else text_after_pronoun.push(w)
                            }
                        } else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    let answer = pronoun +"|" + text_before_pronoun +"|" + text_after_pronoun
                } else if (arrayEquals(sentenceStructure, ['QW', '//', 'Pr'])) {
                    for (let w of sentenceStructure) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (isPronoun(w) && pronoun.length == 0)
                                pronoun.push (w)
                            else if (pronoun.length == 0)
                                text_before_pronoun.push(w)
                        }else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }

                    let answer = pronoun + "|" +text_before_pronoun
                } else if (arrayEquals(sentenceStructure, ['QW', '//'])) {
                    for (let w of sentenceStructure) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (question.length > 0)
                                text_after_question.push(w)
                        }else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    let answer = text_after_question + "|"

                } else if (arrayEquals(sentenceStructure, ['QW', 'Pr', '//'])) {
                    for (let w of sentenceStructure) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (isPronoun(w) && pronoun.length == 0)
                                pronoun.push (w)
                            else if (pronoun.length > 0)
                                text_after_pronoun.push(w)
                        }else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    let answer = pronoun + "|" +text_after_pronoun
                } else if (arrayEquals(sentenceStructure, ['QW', 'Pr'])) {

                    for (let w of sentenceStructure) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (isPronoun(w) && pronoun.length == 0)
                                pronoun.push (w)
                        }else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    let answer = pronoun
                } else {
                    let answer = []
                }

            } else {
                if (arrayEquals(sentenceStructure, ['Pr', '//'])) {

                }
                // todo тре подумать
            }
        }
    } else {
        if (isShortAnswer(msg)) {

        } else {

        }
    }
    return "бот хз"
}

function test(arr) {

}

console.log("QW // v".match(new RegExp(`^QW //`)))


