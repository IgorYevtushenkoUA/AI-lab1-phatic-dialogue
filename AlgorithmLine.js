/*
   if питання
        беру алгоритм схожості із варіантами відповіді
            * алгоритм схожості
                * прохожуся по всіх варіантах
                * if питання довше ніж можливий варіант - видалити всі слова із питання і перевірити скільки однакових слів із варіантом
                    else видалити всі слова із варіанта що не зустрічаються в питанні

            * if алгоритм схожості не спрацював
                * шукаю слова із списку питальних слів

                    ПО КОЖНОМУ СЛОВУ СВІЙ АЛГОРИТМ

                    * залежно від слова формую відповідь
                    # чому ти сидиш дома ----- (перше слово) Бо, я так вважаю за потрібним (рандомно із бази знань - відповідно до ключового слова)

            * if питання повторилося ---- відповісти так само або запитати чому ти мене це знову питаєш
            * if декілька питань --- відповісти на 1 а

            * Перефразувати питання (Яка твоя кінечна ціль --- Чи правильно я зрозумів, тебе цікавить моя кінечна ціль ?)


  if не питання
        * якщо   відповідь на моє питанння
            * якщо коротка відповідь ---- запитати а чому так, а чому ні
            * якщо довга відповідь
                * якщо відповів і довго мовчить (більше 10 секунд) - запитати його чому він мовчить, чи він зайнятий
                        якщо не відповідає через 10 секунд --- закінчити алгоритм BREAK

                * Перевести тему ?
                * запитати чи це все ?
                * коротка фраза по типу ЯСНОПОНЯТНО

       * якщо звичайне твердження
            * чи було привітання
                якщо не то привітатися і запитати чому він не привітався
            * довга відповідь --- відповідь по типу ---ясно понятно




    ФІЧІ ----- 1) по таймеру питання
               2 )придумати якусь просту гру по типу вгадай яке чисо я загадав від 1 - 100
                    якщо вгадав то запропонувати йому придумати гру
                    і сказати що я таку гру не знаю
               3 ) Задати 36 питань аби закохатися
               4 ) задати ті самі питання що і він мені
               5 ) Зробити цікаву базу інформацію про оловіка що зі мною спілкується ---- як діалог зікінчиться (тобто буде оновлена сторінка) ----- записати
               записати весь діалог із користувачем на файл чувака який запускав робота на диск який буде у користувача


 */
