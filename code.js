let messages = []

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
    //todo небезпечно хз як буде
    let modifyMessage = getQuestion(msg)
    addNewMessage(modifyMessage, sender)
    /** розбиваєммо на 2 блоки
     <div class="person">sdfsdf</div>
     <div class="bot">botANSWER</div>

     де перший блок - це ЛЮДИНА, а другий це БОТ*/
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
            || msg.charCodeAt(i) == 1108  //є
            || (msg.charCodeAt(i) >= 1110 && msg.charCodeAt(i) <= 1111) //і-ї
        )
            msgCopy += msg.charAt(i)
    }
    return msgCopy
}

function sendMessage() {
    let message = document.getElementById("message").value
    if (message !== "") {
        message = modifyMessage(message)
        addMessage(message, "person")
        // clean message field
        document.getElementById("message").value = ""
        //generate bot answer
        let botAnswer = generateBotAnswer(message)
        addMessage(botAnswer, "bot")

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
    for (let qw of data_question_words)
        if (qw === word)
            return true
    return false
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

/**
 * повертає коефіцієнт дистанції між словами
 * @param str1_arr_same
 * @param str2_arr_same
 * @returns {number}
 */
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

/**
 * @param c — количество совпадающих символов.
 * @param a — количество символов в первой строке,
 * @param b — количество символов во второй строке
 * @returns {number}
 */
function coeffJacquard(c, a, b) {
    return c / (a + b - c)
}

function algorithmJaroWinkler(str1, str2) {
    /* знаходимо спільні слова і записуємо їх в масив str1_arr_same у тому порядку у якому вони зустрічаються
    далі записуємо слова у тому порядку у якому вони повторюються до str2_arr_same
    це для алгоритму схожості Джаро — Винклера */
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


    if (coeffJacquard(str1_arr_same, str1_arr, str2_arr) < 0.75) {
        console.log('str1_arr_same = ' + str1_arr_same)
        console.log('str1_arr = ' + str1_arr)
        console.log('str2_arr = ' + str2_arr)
        ////alert("coeffJacquard  === 0")
        return 0
    }
    let jaro_dist = jaro_distance(str1_arr_same, str2_arr_same)
    //alert("Увагаааааа ======  jaro_dist")
    ////debugger
    if (jaro_dist > 0.7) {
        let prefix = 0
        for (let i = 0; i < Math.min(str1_arr_same.length, str2_arr_same.length); i++) {
            if (str1_arr_same[i] == str2_arr_same[i])
                prefix++
            else break
        }
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
function isQuestionRepeat(msg) {
// перевірка на кількість слів  + алгоритмджароля +винверля
    let different = false
    console.log(findTheMostSimilarMessage(msg))
    let sameWords = findTheMostSimilarMessage(msg)
    console.log("sameWords = " + sameWords)
    if (sameWords.length > 0) {
        let c = sameWords[0].count
        let a = sameWords[0].message.trim().split(" ").length
        let b = msg.split(" ").length
        let s = sameWords[0].message
        console.log("same words = " + c)
        console.log(algorithmJaroWinkler(msg, s))
        console.log(coeffJacquard(c, a, b))
        if (
            (algorithmJaroWinkler(msg, s) > 0.80
                && coeffJacquard(c, a, b) > 0.80)
            && (c > 3 || c >= a)) {
            different = true
        }
    }
    return different
}

function countQuestions(msg) {
    let count = 0
    for (let i = 0; i < msg.length; i++)
        if (msg.charAt(i) === "?")
            count++
    return count
}

/**
 * якщо декілька питань - відповідає на останнє
 * @param msg
 * @returns {string|*}
 */
function getQuestion(msg) {
    let msg_arr = msg.split("?")
    msg_arr.pop()
    if (msg_arr.length <= 1) {
        return msg.charAt(msg.length - 1) === '?' ? msg.slice(0, msg.length - 1) : msg
    } else {
        // відповісти на останнє питання
        return msg_arr[msg_arr.length - 1]
    }
}

function isPronoun(word) {
    for (let i = 0; i < data_pronoun.length; i++)
        if (word === data_pronoun[i].pronoun)
            return true
    return false
}

function changePronoun(pronoun) {
    for (let i = 0; i < data_pronoun.length; i++)
        if (pronoun === data_pronoun[i].pronoun)
            return data_pronoun[i].changedPronoun
}

// only for present time
function isVerb(word) {
    if (word.length <= 2) return false
    if (word.slice(word.length - 2, word.length) === "еш" ||
        word.slice(word.length - 2, word.length) === "єш" ||
        word.slice(word.length - 2, word.length) === "иш" ||
        word.slice(word.length - 2, word.length) === "їш" ||
        word.slice(word.length - 2, word.length) === "ти")
        return true
}

function getVerbTime(word) {
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
    if (time === "present") {
        return v.slice(0, v.length - 2) + "ю"
    }
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
        if (isPronoun(w)) {
            msg_changed.push(changePronoun(w))
        } else if (isVerb(w)) {
            let time = getVerbTime(w)
            msg_changed.push(changeVerb(w, time))
        } else {
            msg_changed.push(w)
        }
    }
    return msg_changed
}

/** шукаає структуру речення
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

/**
 * Повертає заготовлену відповідь на питання що вже
 * повторювалося(або є дуже схожим на якесь із всіх запитань користувача) у діалозі
 * @returns {string}
 */
function generateAnswerToRepeatQuestion() {
    let randomAnswer = Math.floor(Math.random() * data_repeat_phases.length)
    return data_repeat_phases[randomAnswer]
}

//todo може бути і таке що користувач надіслав декілька коротких відповідей (для майбутнього)
function isAnswerOnMyQuestion() {
    //messages[messages.length-2 , там мінус бо відповідь користувача спочатку додається до списку а потім генерується відповідь бота
    if (messages.length > 2) return messages[messages.length - 2].sender === "bot"
    return false
}

function isAgreeWord(word) {
    for (let w of data_agree_words) {
        if (w === word)
            return true
    }
    return false
}

function isDisAgreeWord(word) {
    for (let w of data_disagree_words) {
        if (w === word)
            return true
    }
    return false
}

function findAgreeWords(msg) {
    let answer = msg.toLowerCase().split(" ")
    return answer.filter(word => isAgreeWord(word))
}

function findDisAgreeWords(msg) {
    let answer = msg.toLowerCase().split(" ")
    return answer.filter(word => isDisAgreeWord(word))
}

/**
 * переіряє чи це відповідь на ботом поставлене питання є короткою
 * @param msg
 * @returns {boolean}
 */
function isShortAnswer(msg) {
    //alert(findDisAgreeWords(msg))
    let coeff_short = 3
    if (isAnswerOnMyQuestion()
        && msg.split(" ").length <= coeff_short
        && (findAgreeWords(msg).length > 0 || findDisAgreeWords(msg).length > 0)
    ) return true
}

/**
 * генерує запиання залежно від того яке ключове слово у короткій відповіді
 * @param msg
 * @returns {string}
 */
// todo Додати можливість запитувати не лише "А чому" а ще інші варіанти
function askQuestionByAnswer(msg) {
    let disagree = findDisAgreeWords(msg)
    if (disagree.length > 0) {
        console.log(disagree[0]);
        return "А чому " + disagree[0] + " ?"
    }
    let agree = findAgreeWords(msg)
    if (agree.length > 0) {
        return "А чому " + agree[0] + " ?"
    }
    return "Зрозуміло"

}

/**
 * змінює питальне слово (українське) на відповідник в англійській мові
 * @param question_word_ua
 * @returns {string}
 */
function getEnglishQuestionWord(question_word_ua) {
    if (question_word_ua === "як" || question_word_ua === "скільки") return "how"
    if (question_word_ua === "ким" || question_word_ua === "хто" || question_word_ua === "яким" || question_word_ua === "хтось") return 'who'
    if (question_word_ua === "що" || question_word_ua === "чим") return 'what'
    if (question_word_ua === "коли" || question_word_ua === "котрій") return 'when'
    if (question_word_ua === "де" || question_word_ua === "куди") return 'where'
    if (question_word_ua === "яка" || question_word_ua === "яке" || question_word_ua === "які" || question_word_ua === "котрий" || question_word_ua === "який" || question_word_ua === "якою" || question_word_ua === "яку") return 'which'
    if (question_word_ua === "кого" || question_word_ua === "кому" || question_word_ua === "чий") return 'whom'
    if (question_word_ua === "чому" || question_word_ua === "чого") return 'why'
    if (question_word_ua === "чи") return 'or'
    if (question_word_ua === "якби" || question_word_ua === "якщо" || question_word_ua === "б" || question_word_ua === "би") return 'if'
}

//todo перевірити як працює + код повторюється із іншим методом
function getIDSimilarQuestionExistInDB(msg, eng_qw) {

    let similar_question = [] // {питання}
    let msg_arr = msg.toLowerCase().split(" ")
    // на той випадок яко питального слова не знайдено
    if (data_common_question[eng_qw] === undefined)
        return null
    for (let i = 0; i < data_common_question[eng_qw].length; i++) {
        let count = 0
        let question = data_common_question[eng_qw][i].question.split(" ")
        for (let i = 0; i < msg_arr.length; i++) {
            for (let j = 0; j < question.length; j++) {
                if (msg_arr[i] === question[j]) {
                    count++
                }
            }
        }
        let similarQuestionID = {questionID: i, count: count}
        if (similar_question.length > 0) {
            if (similar_question[0].count < count) {
                while (similar_question.length !== 0)
                    similar_question.pop()
                similar_question.push(similarQuestionID)
            } else if (similar_question[0].count === count) {
                similar_question.push(similarQuestionID)
            }
        } else {
            similar_question.push(similarQuestionID)
        }
    }
    // для того аби відкинути всі варіанти де спільних слів менше 50 %
    let coeff_50_percent = Math.floor(msg_arr.length / 2) + 1
    console.log("coeff_50_percent = " + coeff_50_percent)
    console.log('similar_question = ' + similar_question)
    return (similar_question.length > 0
        && similar_question[0].count > coeff_50_percent  // was >= -> >
    )
        ? similar_question[0].questionID
        : null
}

function isQuestionSimilarToQuestionFromDatabase(question, questionWord, questionID) {
    let questionFromDB = data_common_question[questionWord][questionID].question
    if (algorithmJaroWinkler(question, questionFromDB) > 0.85) return true
    return false
}

function isHello(msg) {
    msg = msg.toLowerCase()
    return (msg.includes("привіт") || msg.includes("привет") || msg.includes("привєт")
        || msg.includes("здраствуй") || msg.includes("добирй день") || msg.includes("добрий вечір")
        || msg.includes("хай") || msg.includes("хелоу") || msg.includes("здоров"))

}

function isGoodBye(msg) {
    return (msg.includes("бувай") || msg.includes("чао") || msg.includes("Приємно було з тобою")
        || msg.includes("пока") || msg.includes("треба йти") || msg.includes("до зустрічі")
        || msg.includes("до побачення") || msg.includes("приємно з тобою") || msg.includes("на добраніч"))

}

function sayHello() {
    return data_hello[Math.floor(Math.random() * data_hello.length)]
}

function sayGoodbye() {
    return data_goodbye[Math.floor(Math.random() * data_goodbye.length)]
}

function getCommonAnswer() {
    return data_common_answers[Math.floor(Math.random() * data_common_answers.length)]
}

/**
 * Підвоить до верхнього регістру першу букву пуршого слова масиву
 * @param arr
 * @returns {string}
 */
function changeTabulation(arr) {
    if (arrayEquals(arr, [""])) {
        return getCommonAnswer()
    }
    let firstWord = arr[0][0].toUpperCase() + arr[0].slice(1)
    return firstWord + " " + arr.slice(1).join(" ")
}

function answerQuestion(msg) {

    //delete -> ?
    msg = msg.toLowerCase().slice(0, msg.length - 1).trim()
    msg = getQuestion(msg)
    //alert(`message = '${msg}'`)
    if (isQuestionRepeat(msg)) {
        // code that says that questions repeat
        return generateAnswerToRepeatQuestion()
    } else {
        let questionWord = findQuestionWord(msg)
        let eng_qw = getEnglishQuestionWord(questionWord)
        let questionFromDB_ID = getIDSimilarQuestionExistInDB(msg, eng_qw)
        if (questionWord !== ""
            && questionFromDB_ID !== null
            && isQuestionSimilarToQuestionFromDatabase(msg, eng_qw, questionFromDB_ID)) {
            // знайти відповідь в базі даних та повернути загальну відповідь
            return Math.floor(Math.random() * 2) === 0
                ? data_common_question[eng_qw][questionFromDB_ID].answer.answer
                : data_common_question[eng_qw][questionFromDB_ID].answer.answer_question
        } else {
            let question_arr = changeQuestionToAnswer(msg)
            let sentenceStructure = getSentenceStructure(msg, questionWord)
            if (questionWord === "") {
                //     [ 'Pr', '//' ]
                let text_after_pronoun = []
                let pronoun = []
                let answer = []
                if (arrayEquals(sentenceStructure, ["Pr", "//"])) {
                    for (let w of question_arr) {
                        if (pronoun.length > 0) {
                            text_after_pronoun.push(w)
                        } else if (pronoun.length === 0 && isPronoun(w)) {
                            pronoun.push(w)
                        }
                    }
                }
                answer = pronoun.concat(text_after_pronoun)
                return arrayEquals(answer, []) ? getCommonAnswer() : answer.join(" ");
            } else {
                //     [ 'QW', '//', 'Pr', '//' ]
                //     [ 'QW', '//', 'Pr' ]
                //     [ 'QW', '//' ]
                //     [ 'QW', 'Pr', '//' ]
                //     [ 'QW', 'Pr' ]
                let text_before_pronoun = []
                let text_after_pronoun = []
                let text_after_question = []
                let pronoun = []
                let question = []
                let nothing = []
                let answer = []
                //debugger
                if (arrayEquals(sentenceStructure, ['QW', '//', 'Pr', '//'])) {
                    //debugger
                    for (let w of question_arr) {
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
                    answer = pronoun.concat(text_before_pronoun.concat(text_after_pronoun))

                } else if (arrayEquals(sentenceStructure, ['QW', '//', 'Pr'])) {
                    for (let w of question_arr) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (isPronoun(w) && pronoun.length == 0)
                                pronoun.push(w)
                            else if (pronoun.length == 0)
                                text_before_pronoun.push(w)
                        } else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    answer = pronoun.concat(text_before_pronoun)

                } else if (arrayEquals(sentenceStructure, ['QW', '//'])) {
                    for (let w of question_arr) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (question.length > 0)
                                text_after_question.push(w)
                        } else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    answer = text_after_question

                } else if (arrayEquals(sentenceStructure, ['QW', 'Pr', '//'])) {
                    for (let w of question_arr) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (isPronoun(w) && pronoun.length == 0)
                                pronoun.push(w)
                            else if (pronoun.length > 0)
                                text_after_pronoun.push(w)
                        } else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    answer = pronoun.concat(text_after_pronoun)
                } else if (arrayEquals(sentenceStructure, ['QW', 'Pr'])) {
                    for (let w of question_arr) {
                        if (question.length > 0) {
                            if (w === questionWord && isQuestionWord(w))
                                question.push(w)
                            else if (isPronoun(w) && pronoun.length == 0)
                                pronoun.push(w)
                        } else if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                    }
                    answer = pronoun
                } else {
                    answer = [""]
                }
                // todo тре подумать
                debugger
                return changeTabulation(answer)
            }
        }
    }
}

function sayShortAnswer() {
    return data_short_answer[Math.floor(Math.random() * data_short_answer.length)]
}

function getRandomQuestionWord() {
    let allQuestionWords = 10
    let num = Math.floor(Math.random() * allQuestionWords)
    switch (num) {
        case 0:
            return "how"
        case 1:
            return "who"
        case 2:
            return "what"
        case 3:
            return "when"
        case 4:
            return "where"
        case 5:
            return "which"
        case 6:
            return "whom"
        case 7:
            return "why"
        case 8:
            return "or"
        case 9:
            return "if"
    }
}

function askShortQuestion() {
    let qw = getRandomQuestionWord()
    let randIndex = Math.floor(Math.random() * data_common_question[qw].length)
    debugger
    let question = (data_common_question[qw][randIndex].question).split(" ")
    return changeTabulation(question) /// тут з маленької літери
}

function createQuestion(msg) {
    if (countQuestions(msg) >= 1) {
        let lastQuestion = getQuestion(msg)
        return answerQuestion(lastQuestion)
    } else {
        if (isShortAnswer(msg)) {
            return askQuestionByAnswer(msg)
        } else {
            return Math.floor(Math.random() * 2) === 0 ? sayShortAnswer() : sayShortAnswer() + ". " + askShortQuestion() + " ?"
        }
    }
}

// todo дописати
function generateBotAnswer(msg) {
    if (messages.length < 2) {
        if (isHello(msg)) {
            return sayHello()
        } else {
            return "Забув привітатися ?." + sayHello()
        }
    } else if (isGoodBye(msg)) {
        return sayGoodbye()
    } else {
        if (isQuestion(msg)) {
            return answerQuestion(msg)
        } else {
            return createQuestion(msg)
        }
    }
    return "Я не знаю"
}


