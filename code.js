let data_agree_words = ["так", "да", "звичайно", "звісно", "авжеж", "однозначно", "безумовно", "безсумнівно", "дійсно", "позитивно", "рішучо"]
let data_disagree_words = ["ні", "нет", "не", "нє"]
let data_pronoun = [
    {pronoun: "я", changedPronoun: "ти"},
    {pronoun: "мій", changedPronoun: "твій"},
    {pronoun: "мене", changedPronoun: "тебе"},
    {pronoun: "мені", changedPronoun: "тобі"},
    {pronoun: "мною", changedPronoun: "тобою"},
    {pronoun: "ти", changedPronoun: "я"},
    {pronoun: "тебе", changedPronoun: "мене"},
    {pronoun: "тобі", changedPronoun: "мені"},
    {pronoun: "тобою", changedPronoun: "мною"},
    {pronoun: "твої", changedPronoun: "мої"},
    {pronoun: "мої", changedPronoun: "твої"},
    {pronoun: "ми", changedPronoun: "ви"},
    {pronoun: "ви", changedPronoun: "ми"},
    {pronoun: "вона", changedPronoun: "вона"},
    {pronoun: "він", changedPronoun: "він"},
    {pronoun: "воно", changedPronoun: "воно"},
    {pronoun: "вони", changedPronoun: "вони"},
    {pronoun: "твій", changedPronoun: "мій"},
    {pronoun: "наш", changedPronoun: "ваш"},
    {pronoun: "ваш", changedPronoun: "наш"},
    {pronoun: "його", changedPronoun: "його"},
    {pronoun: "її", changedPronoun: "її"},
    {pronoun: "їх", changedPronoun: "їх"},
    {pronoun: "їхній", changedPronoun: "їхній"},
    {pronoun: "той", changedPronoun: "цей"},
    {pronoun: "кожен", changedPronoun: "кожен"},
    {pronoun: "хто", changedPronoun: "хто"},
    {pronoun: "кожний", changedPronoun: "кожний"},
    {pronoun: "жодний", changedPronoun: "жодний"},
    {pronoun: "жоден", changedPronoun: "жоден"},
    {pronoun: "інший", changedPronoun: "інший"},
    {pronoun: "сам", changedPronoun: "сам"},
    {pronoun: "ніхто", changedPronoun: "ніхто"},
]
// коли повторилося питання користувача
let data_repeat_phases = [
    "А нащо ти знову мене це питаєш ?",
    "Ти хіба це вже не питав ?",
    "Здається я вже тобі на це відповідав",
    "Емммм... А ти хіба це не казав ?",
    "Мені здалося, чи ти повторив питання ?",
    "Щось ти почав повторюватися",
    "Запитай краще про щось інше",
    "Давай змінимо тему",
    "Десь я вже це питання зустрічав",
    "Навіщо перепитуєш ?",
    "Ти щось схоже вже питав"
]
let data_usual_answer = [
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
    {answer: "", count: 0},
]
let data_common_adverb = [
    time = ["торік", "вчора", "завтра", "доти", "завжди", "досі", "зранку", "тоді", "довіку", "", "",],
    place = ["там", "вгорі", "вперед", "спереду", "ззаду", "згори", "знизу", "вперед", "звідусіль", "там", "десь",],
    goal = ["", "", "", "", "", "", "", "", "", "", "",],
    reason = ["", "", "", "", "", "", "", "", "", "", "",]
]

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
            || msg.charCodeAt(i) == 1108  //є
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
        || word === "чий" || word === "чим"
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

function countQuestions(msg) {
    let count = 0
    for (let i = 0; i < msg.length; i++)
        if (msg.charAt(i) === "?")
            count++
    return count
}

//todo improve
function getQuestion(msg) {
    // if (countQuestions(msg) === 1) return msg
    // else {
    //     // todo дописати якщо в повідомленні більше ніж 1 питання
    //     return msg
    // }

    let msg_arr = msg.split("?")
    msg_arr.pop()
    if (msg_arr.length === 1) {
        return msg
    } else {
        // відповісти на останнє питання
        alert(msg_arr[msg_arr.length - 1] + "?")
        return msg_arr[msg_arr.length - 1] + "?"
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
        // alert("Verb = " + v.slice(0, v.length - 2) + "ю")
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
            debugger
        } else if (isVerb(w)) {
            let time = getVerbTime(w)
            msg_changed.push(changeVerb(w, time))
            debugger
        } else {
            msg_changed.push(w)
            debugger
        }
    }
    return msg_changed
}

console.log("є".charCodeAt(0))

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

console.log(getSentenceStructure("приацюєш ти"))

function generateAnswerToRepeatQuestion() {
    let randomAnswer = Math.floor(Math.random() * data_repeat_phases.length)
    return data_repeat_phases[randomAnswer]
}

function answerQuestion(msg) {
    console.log("isQuestion(msg)")
    if (isQuestionRepeat(msg)) {
        // code tha say that questions repeat
        alert("ти вже це казав")
        console.log("ти вже це казав")
        return generateAnswerToRepeatQuestion()
    } else {
        //delete -- ?
        msg = msg.slice(0, msg.length)
        msg = getQuestion(msg)

        let questionWord = findQuestionWord(msg)
        let question_arr = changeQuestionToAnswer(msg)
        console.log(question_arr)
        debugger
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
            answer = pronoun.concat(["|"].concat(text_after_pronoun))
            return answer.join(" ");
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
            debugger
            if (arrayEquals(sentenceStructure, ['QW', '//', 'Pr', '//'])) {
                debugger
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
                // answer = pronoun + "|" + text_before_pronoun + "|" + text_after_pronoun
                answer = pronoun.concat(["|"].concat(text_before_pronoun.concat(["|"].concat(text_after_pronoun))))

            } else if (arrayEquals(sentenceStructure, ['QW', '//', 'Pr'])) {
                debugger
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
                // answer = pronoun + "|" + text_before_pronoun
                answer = pronoun.concat(["|"].concat(text_before_pronoun))

            } else if (arrayEquals(sentenceStructure, ['QW', '//'])) {
                debugger
                for (let w of question_arr) {
                    if (question.length > 0) {
                        if (w === questionWord && isQuestionWord(w))
                            question.push(w)
                        else if (question.length > 0)
                            text_after_question.push(w)
                    } else if (w === questionWord && isQuestionWord(w))
                        question.push(w)
                }
                // answer = text_after_question + "|"
                answer = text_after_question.concat(["|"])

            } else if (arrayEquals(sentenceStructure, ['QW', 'Pr', '//'])) {
                debugger
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
                debugger
                answer = pronoun.concat(["|"].concat(text_after_pronoun))
            } else if (arrayEquals(sentenceStructure, ['QW', 'Pr'])) {
                debugger
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
                answer = []
            }
            // todo тре подумать
            alert(answer)
            return answer.join(" ")
        }
    }

}

//todo може бути і таке що користувач надіслав декілька коротких відповідей
function isAnswerOnMyQuestion() {
    //messages[messages.length-2 , там мінус бо відповідь користувача спочатку додається до списку а потім генерується відповідь бота
    return messages[messages.length - 2].sender === "bot"
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
    // якщо це відповідь на моє питання
    // якщо відповідь коротка --- тут неоднозначно
    // якщо вна місти слова згоди та незгоди
    // то це коротка відповідь
    let coeff_short = 5
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
        return "А чому " + disagree[0] + " ?"
    }
    let agree = findAgreeWords(msg)
    if (agree.length > 0) {
        return "А чому " + agree[0] + " ?"
    }
    return "Зрозуміло"

}

function createQuestion(msg) {
    if (countQuestions(msg) >= 1) {
        let lastQuestion = getQuestion(msg)
        return answerQuestion(lastQuestion)
    } else {
        if (isShortAnswer(msg)) {
            askQuestionByAnswer(msg)
            alert("А чого така коротка відповідь ?")
            return "А чого така коротка відповідь ?"
        } else {
            // saidThatYouUnderstandAnswer()
            alert("Я тебе ніби зрзумів але не оч")
            return "Я тебе ніби зрзумів але не оч"
        }
    }
}


// todo дописати
function generateBotAnswer(msg) {
    // isQuestionRepeat(msg)
    if (isQuestion(msg)) {
        return answerQuestion(msg)
    } else {
        return createQuestion(msg)
    }
    return "бот хз"
}

function test() {

}

test()
