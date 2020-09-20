let data_agree_words = ["так", "да", "звичайно", "звісно", "авжеж", "однозначно", "безумовно", "безсумнівно", "дійсно", "позитивно", "рішучо", "та"]
let data_disagree_words = ["ні", "нет", "не", "нє"]
let data_short_answer = ["Окей", "Круто))", "Зрозумів", "ЯсноПонятно", "Хммм...Цікаво", "Прикольно", "Воу. Неочікувано", "Я думав ти інакше відповісиш", "Так і знав що ти так відповісиш", "Я передбачив твою відповідь. Ахахха", "Чомусь був певен, що саме це і скажеш", "Передбачувана відповідь", "Непередбачувана відповідь", "Неочікувано", "Так, я так і знав", "Трохи збитий з пантелику з  твоєї відповіді"]
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
    {pronoun: "твоїй", changedPronoun: "моїй"},
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
let data_question_words = [
    "як", "скільки",                                //how
    "ким", "хто", "яким", "хтось"                    // who
    , "що", "чим"                            // what
    , "коли", "котрій"                              // when
    , "де", "куди"                                  // where
    , "яка", "яке", "які", "котрий", "який", "якою", "яку"  // which
    , "кого", "кому", "чий"                          // whom
    , "чому", "чого"                                   // why
    , "чи"                                          // or
    , "якби", "якщо", "б", "би"                       // if
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
let data_hello = ["Привіт", "Привіт, я справи ?", "Хай", "Здрастуй", "Привіт, радий буду поспілкуватися"]
let data_goodbye = [
    'Приємно було з тобою поговорити', 'Приємно було з тобою поспілкуватися',
    'Приємно було поспілкуватися з тобою', 'Відмінно поговорили',
    'До зустрічі', 'Дякую за приємне спілкування, до зустрічі',
    'Дякую за чудове спілкування, бувай', 'Бувай', 'Пока', "Чао))"
]

let data_common_answers = [
    'Я не дуже тебе розумію',
    'це якладне для ене питання',
    'важко відповісти тобі',
    'важко відповісти на це питання',
    'не  впевнений що зможу відповісти на це питання',
    'впевнений щ зможу відповісти на це, але наступного разу',
    'давай наступного разу',
    'відповім але не зараз',
    'вибач але на це я не відповім',
    'чи ж варто вам задавати такі питання ?!',
    'прошу не ставити мене в незручне становище!',
    'Боюся, що щиру відповідь на це питання зіпсує мою репутацію.',
    'Здогадайтеся самі! ..',
    'Моє збентеження каже, що мені слід промовчати.',
    'Яке Вам до цього справа.',
    'Я не допускаю навіть і думки про це.',
    'Мені здається це можливо.'
]

let data_common_question = {
    how: [
        {
            question: "як часто ти купуєш одяг",
            answer: {
                answer: "Час від часу, змушений це робити",
                answer_question: "Не так часто як хотілось би. А ви ?"
            },
        },
        {
            question: "скільки мов ти знаєш",
            answer: {
                answer: "Три: українську, польську та французьку",
                answer_question: "Я не поліглот, тому бідно розмовляю англійською. А як у вас із мовами ?"
            },
        },
        {
            question: "скільки у тебе було близьких друзів",
            answer: {
                answer: "Двоє: Андрій та Максим, а знайомих із якими підтримую знайомства багато",
                answer_question: "Лише одного друга дитинства. А де ти познайомився із своїм найкращим другом?"
            },
        },
        {
            question: "скільки ти хочеш мати дітей",
            answer: {answer: "Не думав про це ще", answer_question: "Я ще молодий аби про таке думати. А ти ?"},
        },
        {
            question: "скільки пар взуття у тебе",
            answer: {
                answer: "Ніколи не рахував їх, тому не знаю",
                answer_question: "Ніколи не рахував. А навіщо питаєте ?"
            },
        },
        {
            question: "скільки у тебе друзів",
            answer: {answer: "Достатньо", answer_question: "Важко сказати. А у тебе ?"},
        },
    ],
    who: [
        {
            question: "хто твій герой",
            answer: {
                answer: "Бетмен, обожнюю його",
                answer_question: "Немає одного улюбленого, захоплююся всіма. А в тебе ?"
            },
        },
        {
            question: "ким ти хотів бути, коли був маленькими",
            answer: {
                answer: "Це прозвучить смішно, але після перегляду фільма Таксі, то хотів бути таксистом",
                answer_question: "Як і тато - економістом. А ти ?"
            },
        },
        {
            question: "ким хоче стати твоя дитина, коли вона виросте",
            answer: {answer: "Програмістом", answer_question: "У мене немає дітай. А ваша ?"},
        },
        {
            question: "хто твій улюблений автор",
            answer: {answer: "Немає улюбленого, обожнюю всіх", answer_question: "Жюль Верн. А ви ким захоплюєтеся ?"},
        },
        {question: "хто знає тебе краще за всіх", answer: {answer: "Сестра", answer_question: "Сестра. А тебе ?"},},
        {
            question: "хто найрозумніша людина, яку ти знаєш",
            answer: {answer: "Мій дід", answer_question: "Мій дід Віктор. а ти ким захоплюєшся ?"},
        },
        {
            question: "хто був із тобою вчора",
            answer: {answer: "Не пам'ятаю", answer_question: "Важко згадати. А чого питаєш ?"},
        },
        {
            question: "з ким ти був сьогодні",
            answer: {answer: "Не пам'ятаю", answer_question: "Важко згадати. А чого питаєш ?"},
        },
        {
            question: "хтось робив щось хороше для тебе",
            answer: {
                answer: "Так. Таких було багато",
                answer_question: "Так. Таких було багато. А що найнезабутніше тобі робили знайомі?"
            },
        },
    ],
    what: [
        {
            question: "чого ти найбільше боїшся",
            answer: {answer: "А це нехай буде моїм невеличким секретом", answer_question: "Нічого. А ти ?"},
        },
        {
            question: "що б ви хотіли змінити в собі якби ти міг",
            answer: {
                answer: "Свою поведінку із страрими знайомими",
                answer_question: "Напевно нічого, не знаю що б змінив би. А ти про це думав ?"
            },
        },
        {question: "що дійсно тебе злить", answer: {answer: "Нічого.", answer_question: "Мої невдачі. А тебе ?"},},
        {
            question: "що мотивує вас ретельно працювати",
            answer: {
                answer: "Перспективи майбутнього",
                answer_question: "Мій крудит за навчання... ахаха, а що стосовно тебе ?"
            },
        },
        {
            question: "що тобі найбільше подобається у твоїй роботі",
            answer: {answer: "Вирішувати невирішуване", answer_question: "Спілкування із людьми. А тобі ?"},
        },
        {
            question: "чим ти найбільше незадоволений у своїй роботі",
            answer: {
                answer: "Дедлайнами та проектами, що надвисли наді мною",
                answer_question: "Насправді всім задоволений. А тебе щось незадовольняє ?"
            },
        },
        {
            question: "що є найбільшим досягненням для твоєї дитини",
            answer: {answer: "У мене немає дітей", answer_question: "У мене немає дітей. А в тебе вже є ?"},
        },
        {
            question: "що змушує тебе сміятися найбільше",
            answer: {answer: "Стендап", answer_question: "Степдап. Ти колись його дивився ?"},
        },
        {
            question: "що ти думаєш думаєте про вибори в америці",
            answer: {
                answer: "Це дуже цікаво, але скажу наступного разу",
                answer_question: "Скажу наступного разу, Тільки не ображайся. Окей?"
            },
        },
        {
            question: "що б ти зробив якби виграли в лотерею",
            answer: {
                answer: "Мандрував би все життя",
                answer_question: "Ахах, як тільки так відразу. а ти вже думав про це ?"
            },
        },
        {
            question: "у що ти грав сьогодні зі своїми друзями",
            answer: {
                answer: "Як із завжди. ми не зраджуємо традиціям",
                answer_question: "Ні,  не встигли. А чому питаєш ?"
            },
        },
        {
            question: "що здивувало тебе сьогодні",
            answer: {answer: "Все як завжди", answer_question: "Нічого невого. а чому цікавишся?"},
        },
    ],
    when: [
        {
            question: "коли ти востаннє працював",
            answer: {
                answer: "не пам'ятаю точно, але це було нещодавно",
                answer_question: "Буквально декілька днів тому. А чому саме це тебе цікавить ?"
            },
        },
        {question: "коли ти відпочивав востаннє", answer: {answer: "Вчора", answer_question: "Позавчора. А ти ?"},},
        {
            question: "коли це сталося ти не пам'ятаєш",
            answer: {answer: "Не дуже цітко пам'ятаю", answer_question: "Забув. А ти не пам'ятаєш?"},
        },
    ],
    where: [
        {
            question: "де ти бачиш себе через п'ять років",
            answer: {answer: "У новій іт-компанії", answer_question: "У новій іт-компанії. А ти ?"},
        },
        {
            question: "де ти бачиш себе через 10 років",
            answer: {answer: "У новій іт-компанії", answer_question: "У новій іт-компанії. А ти ?"},
        },
        {
            question: "де ти відпочивав",
            answer: {answer: "Скрізь де тільки міг", answer_question: "З голови вилетіло. А ти де ?"},
        },
        {question: "куди ти їздив", answer: {answer: "Відпочивати", answer_question: "Відпочивати. А ти ?"},},
        {question: "куди ти літав", answer: {answer: "Відпочивати", answer_question: "Відпочивати. А ти ?"},},
    ],
    which: [
        {
            question: "який твій улюблений сімейний відпочинок",
            answer: {answer: "Коли вся сім'я поруч", answer_question: "Спорт. А твій"},
        },
        {
            question: "яка твоя улюблена книга",
            answer: {answer: "Замок Броуді. Рекомендую", answer_question: "Замок Броуді. Ти читав її ?"},
        },
        {
            question: "на який останній фільм ти ходив",
            answer: {answer: "Шалене весілля", answer_question: "Шалене весілля. А ти ?"},
        },
        {question: "яка твоя улюблена гра", answer: {answer: "Футбол", answer_question: "Волейбол. А твоя?"},},
        {question: "які твої захоплення", answer: {answer: "Малюання", answer_question: "Малювання. а твоє?"},},
        {question: "яка твоя улюблена домашня тварина", answer: {answer: "Пес", answer_question: "Пес. А твоя?"},},
        {
            question: "яку річ ви б ніколи не зробили знову",
            answer: {answer: "Минулих помилок", answer_question: "Минулих помилок. А ти ?"},
        },
        {
            question: "яке твоє улюблене сімейне свято, традиції",
            answer: {answer: "Новий Рік", answer_question: "Новий Рік. А твоє ?"},
        },
        {
            question: "якою була твоя перша робота",
            answer: {
                answer: "Репетитором математики підробляв",
                answer_question: "Репетитором математики підроблявю А ти ким був ?"
            },
        },
        {
            question: "яке заняття робить тебе щасливим",
            answer: {answer: "Спорт мене заряджає", answer_question: "Спорт мене заряджає. А тебе?"},
        },
        {
            question: "яке свято ти любиш найбільше",
            answer: {answer: "Новий Рік", answer_question: "Новий Рікю А ти ?"},
        },
        {
            question: "яке у тебе улюблене заняття",
            answer: {answer: "Однозначно програмування", answer_question: "Немає. А в тебе?"},
        },
        {question: "який ти любиш шоколад", answer: {answer: "Я не люблю його", answer_question: "Всякий. а ти ?"},},
        {question: "в якому місті хотілося б жити", answer: {answer: "У Лондоні", answer_question: "У Лондоні. А ти"},},
        {
            question: "в якій країні хотів би працювати",
            answer: {answer: "В Англії", answer_question: "В Англії. А ти ?"},
        },
        {question: "яка в тебе улюблена гра", answer: {answer: "Футбол", answer_question: "Футбол. А твоя ?"},},
        {
            question: "які книги любиш",
            answer: {answer: "Всі, що потрапляють під руку", answer_question: "Всі, що потрапляють під руку. А ти ?"},
        },
    ],
    whom: [
        {
            question: "кого б ви відправили на безлюдний острів",
            answer: {answer: "Своїх ворогів. Ахахха", answer_question: "Ніколи про це не думав. А ти б кого ?"},
        },
    ],
    why: [
        {
            question: "чому ти вічно все перевіряєш",
            answer: {answer: "Не знаю, не думав проце", answer_question: "Хммм...Навіть не знаю. А як ти думаєш ?"},
        },
        {
            question: "чому так часто пропадаєш",
            answer: {answer: "Ахахахха, ось і пасхалка від ЧБД", answer_question: "Ти знову передивився ЧБД ?"},
        },
    ],
    or: [
        {question: "чи допоміг ти комусь сьогодні", answer: {answer: "Так", answer_question: "Так. А ти ?"},},
        {question: "чи любиш ти займатися спортом", answer: {answer: "Звичайно", answer_question: "Ні.. А ти?"},},
        {question: "чи був ти на морі", answer: {answer: "Так", answer_question: "Ні. А ти ?"},},
        {question: "чи знаєш ти про  новий айфон", answer: {answer: "Так", answer_question: "Ні. А ти ?"},},
        {question: "чи працюєш ти зараз", answer: {answer: "Так", answer_question: "Зараз ні. А ти ?"},},
        {
            question: "чи бачив ти знаменитостей",
            answer: {answer: "На жаль ні", answer_question: "На жаль так. А ти ?"},
        },
        {question: "чи їздив ти в гімалаї", answer: {answer: "Так таке було", answer_question: "Ні. А ти ?"},},
        {question: "чи часто ти робиш гімнастику", answer: {answer: "Так", answer_question: "Ні. А ти ?"},},
        {
            question: "чи робив ти щось щесь небезпечне",
            answer: {answer: "Ні", answer_question: "Так. Так і ще раз Так. А ти ?"},
        },
    ],
    if: [
        {
            question: "якби ти міг жити в будь-якому місці, де б це було",
            answer: {answer: "Лондон. Однозначно Лондон", answer_question: "Київ. Однозначно Київ. А ти ?"},
        },
        {
            question: "якби ти міг вибрати робити що завгодно протягом дня то що б це було",
            answer: {answer: "Дивився би серіали. Ахааххаха", answer_question: "Поїхав би в гори. А ти ?"},
        },
        {
            question: "ти б віддав перевагу: їздити на велосипеді, кататися на коні водити машину",
            answer: {
                answer: "Автівка. Сто відсотків автівка",
                answer_question: "Я би покатався на коні, а ти колись на ньому їздив ?"
            },
        },
        {
            question: "якби ти міг найняти помічника то для чого",
            answer: {answer: "Для таймменеджменту", answer_question: "А він мені не треба. А ти би найняв би ?"},
        },
        {
            question: "якби ви могли повернутися в минуле, в який рік ви б відправилися",
            answer: {answer: "2000", answer_question: "2000 купив би біткоїн. А ти в що зробив би ?"},
        },
        {
            question: "як би ваші друзі охарактеризували вас",
            answer: {answer: "Всі по різному", answer_question: "Всі по різному. А тебе ?"},
        },
        {
            question: "якби ви могли повернутися в минуле, щоб змінити одну річ, що б це було",
            answer: {
                answer: "Купив би долар по 8, ахахаха",
                answer_question: "Не думав про таке. А ти б що зробив би ?"
            },
        },
        {
            question: "якби ти був супергероєм, яку силу ти б мав",
            answer: {answer: "Бачити майбутнє", answer_question: "Однозначно літати. А ти б що обрав би?"},
        },
        {
            question: "Якби ти міг поїхати куди завгодно, куди б ти поїхав",
            answer: {answer: "Берлін", answer_question: "З цим карантином нікуди. А ти ?"},
        },
        {
            question: "куди б ти поїхав",
            answer: {answer: "Амстердам", answer_question: "У Харків до друзів. А ти б куди поїхав би?"},
        },
        {
            question: "Якби у тебе було достатньо грошей, щоб не працювати, ти б працював чи ні",
            answer: {answer: "Так. бо без цього було би нудно", answer_question: "Однозначно. А ти ?"},
        }
    ]
}

let messages = [
    // {
    //     sender: "person",
    //     message: "Привіт як справи",
    //     date: new Date()
    // }
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

function sendMessage() {
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

    /**
     * @param c — количество совпадающих символов.
     * @param a — количество символов в первой строке,
     * @param b — количество символов во второй строке
     * @returns {number}
     */
    function coeffJacquard(c, a, b) {
        return c / (a + b - c)
    }

    if (coeffJacquard(str1_arr_same, str1_arr, str2_arr) < 0.75) return 0

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

    // /**
    //  * @param c — количество совпадающих символов.
    //  * @param a — количество символов в первой строке,
    //  * @param b — количество символов во второй строке
    //  * @returns {number}
    //  */
    // function coeffJacquard(c, a, b) {
    //     return c / (a + b - c)
    // }

    if (sameWords.length > 0) {
        let c = sameWords[0].count
        let a = sameWords[0].message.split(" ").length
        let b = msg.split(" ")
        let s = sameWords[0].message
        console.log("same words = " + c)
        if (
            // (
            algorithmJaroWinkler(msg, s) > 0.9
            // || coeffJacquard(c, a, b) > 0.74)
            && c > 3) {
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
        } else if (isVerb(w)) {
            let time = getVerbTime(w)
            msg_changed.push(changeVerb(w, time))
        } else {
            msg_changed.push(w)
        }
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

function generateAnswerToRepeatQuestion() {
    let randomAnswer = Math.floor(Math.random() * data_repeat_phases.length)
    return data_repeat_phases[randomAnswer]
}

//todo може бути і таке що користувач надіслав декілька коротких відповідей
function isAnswerOnMyQuestion() {
    //messages[messages.length-2 , там мінус бо відповідь користувача спочатку додається до списку а потім генерується відповідь бота
    return messages[messages.length - 1].sender === "bot"
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
    if (data_common_question[eng_qw] === undefined) return null
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
    // для того аби відкинути всі варіанти де спільних слів 50 %
    let coeff_50_percent = Math.floor(msg_arr.length / 2) + 1
    console.log("coeff_50_percent = " + coeff_50_percent)
    console.log('similar_question = ' + similar_question)
    //similar_question[0].questionID - якщо буде декілька речень із однаковою кількістю слів я поки не оброблюю
    return (similar_question.length > 0
        && similar_question[0].count >= coeff_50_percent
    )
        ? similar_question[0].questionID
        : null
}

function isQuestionSimilarToQuestionFromDatabase(question, questionWord, questionID) {
    alert()
    debugger
    let questionFromDB = data_common_question[questionWord][questionID].question
    let different = false
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

function answerQuestion(msg) {
    if (isQuestionRepeat(msg)) {
        // code that says that questions repeat
        return generateAnswerToRepeatQuestion()
    } else {
        //delete -- ?
        msg = msg.slice(0, msg.length)
        msg = getQuestion(msg)

        let questionWord = findQuestionWord(msg)
        let eng_qw = getEnglishQuestionWord(questionWord)
        let questionFromDB_ID = getIDSimilarQuestionExistInDB(msg, eng_qw)
        debugger
        if (questionWord !== ""
            && questionFromDB_ID !== null
            && isQuestionSimilarToQuestionFromDatabase(msg, eng_qw, questionFromDB_ID)) {
            // знайти відповідь в базі даних та повернути загальну відповідь
            // return "повторилося із бази даних "
            debugger
            return Math.floor(Math.random() * 2) === 0
                ? data_common_question[eng_qw][questionFromDB_ID].answer.answer
                : data_common_question[eng_qw][questionFromDB_ID].answer.answer_question
        } else {
            debugger
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
    return data_common_question[qw][randIndex].question
}

function createQuestion(msg) {
    if (countQuestions(msg) >= 1) {
        let lastQuestion = getQuestion(msg)
        return answerQuestion(lastQuestion)
    } else {
        if (isShortAnswer(msg)) {
            askQuestionByAnswer(msg)
        } else {
            // saidThatYouUnderstandAnswer()
            alert("Я тебе ніби зрзумів але не оч")

            return Math.floor(Math.random() * 2) === 0 ? sayShortAnswer() : sayShortAnswer() + ". " + askShortQuestion()
            // return "Я тебе ніби зрзумів але не оч"
        }
    }
}


// todo дописати
function generateBotAnswer(msg) {
    if (messages.length < 2) {
        debugger
        if (isHello(msg)) {
            debugger
            return sayHello()
        } else {
            debugger
            return "Забув привітатися ?." + sayHello()
        }
    } else if (isGoodBye(msg)) {
        return sayGoodbye()
    } else {
        debugger
        if (isQuestion(msg)) {
            debugger
            return answerQuestion(msg)
        } else {
            debugger
            return createQuestion(msg)
        }
    }
    return "бот хз"
}

function test() {
    let data = {
        how: [
            {question: "Як часто ви купуєте одяг?", answer: {answer: "1", answer_question: ""},},
            {question: "Скільки мов ви знаєте?", answer: {answer: "", answer_question: ""},},
            {question: "скільки у тебе було близьких друзів", answer: {answer: "", answer_question: ""},},
            {question: "скільки ти хочеш мати дітей", answer: {answer: "", answer_question: ""},},
            {question: "Скільки пар взуття у вас?", answer: {answer: "", answer_question: ""},},
            {question: "скільки у тебе", answer: {answer: "3", answer_question: ""},},
        ]
    }
    // for (let i = 0; i < data.how.length; i++) {
    //     console.log(data['how'][i].answer.answer)
    // }

}

test()
