

#TOKEN = ""
#APIURL = "http://api.hjee.xyz/uipa/tt.php?dateStart=2021-09-15&dateEnd=2021-09-20"

import telebot
import requests
import json
from datetime import datetime, timedelta

bot = telebot.TeleBot("1995495736:AAGtyVLMTnfIE2QgVokzktIixkMGvkjaKiM", parse_mode='html')

def getTT(date):
    #print(date)
    r = requests.get('http://api.hjee.xyz/uipa/tt.php?dateStart={}&dateEnd={}'.format(date, date))
    js = json.loads(r.text)

    str = ""
    i = 1

    for x in js:
        for y in x['lessons']:
            for z in y['periods']:
                str += "[{}, {}] {} в {}\n".format(i, z['timeStart'], z['disciplineShortName'], z['classroom'])
                i += 1

    return str

@bot.message_handler()
def echo_all(message):
    if(message.text == '/today' or message.text == '/today@uipatimetable_bot'):
        ss = getTT(datetime.today().strftime('%Y-%m-%d'))

        bot.reply_to(message, "<b>Рассписание:</b>\n\n{}".format(ss))

    if(message.text == '/tomorrow' or message.text == '/tomorrow@uipatimetable_bot'):
        ss = getTT((datetime.today() + timedelta(1)).strftime('%Y-%m-%d'))

        bot.reply_to(message, "<b>Рассписание:</b>\n\n{}".format(ss))

bot.polling()
