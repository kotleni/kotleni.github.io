import telebot
import requests
import datetime

studentId = 41525
bot = telebot.TeleBot(
    "1385988410:AAHL03TxbWf_CtDhrDkYU49ZNtGyau9HNdg", parse_mode='HTML')


@bot.message_handler(commands=['meet'])
def send_welcome(message):
	bot.reply_to(message, """
    <b>Список meet встречь:</b>
<a href='https://meet.google.com/tic-rhoe-wud'>Высша Математика (ЛК, ПЗ)</a>
<a href='https://meet.google.com/jgy-hobc-gek'>Высша Математика (ЛБ)</a>
<a href='https://meet.google.com/ihc-xxux-xus'>Iсторичнi та соцiально-полiтичнi студiï</a>
<a href='https://meet.google.com/gwt-kyxh-bim'>Iноземна Мова (Англ.)</a>
<a href='https://meet.google.com/ezs-voty-uuo'>Технології особистісного зростання (ЛК)</a>
<a href='https://meet.google.com/hct-qwns-rhx'>Технології особистісного зростання (ПЗ)</a>
<a href='https://meet.google.com/dvx-tydw-fpd'>Фізичне вихованняя</a>
<a href='https://meet.google.com/zav-gxrd-hbc'>Сучасні матеріали і обладнання в галузі</a>
    """, disable_web_page_preview=True)


@bot.message_handler(commands=['timetable'])
def send_welcome(message):
    global studentId

    day = datetime.datetime.today().strftime('%Y-%m-%d')
    today = (datetime.datetime.today() +
             datetime.timedelta(days=7)).strftime('%Y-%m-%d')

    cmd = message.json['text'].split()
    if(len(cmd) > 1):
        day = cmd[1]

    json = requests.post('http://uo-api.uipa.edu.ua/time-table/student',
                         json={"studentId": studentId, "dateStart": day, "dateEnd": today}).json()

    print('Get timetable: ' + str(day))
    print(json)

    try:
        gen = ''
        for day_ in json:
            if day_['date'] == day:
                for lesson in day_['lessons']:
                    typestr = 'ЛК'
                    if lesson['periods'][0]['type'] == 2:
                        typestr = 'ПЗ'
                    gen += str(lesson['number']) + ' (' + lesson['periods'][0]['timeStart'] + ') : ' + lesson['periods'][0]['disciplineShortName'] + ' [' + lesson['periods'][0]['classroom'] + '], ' + typestr + '\n'
                bot.reply_to(message, gen)
                return

    except:
        print('Except: by message "' + message.json['text'] + '"')
        bot.reply_to(message, 'Ошибка')
        return
    bot.reply_to(message, 'Сегодня пар нету!')

bot.polling()
