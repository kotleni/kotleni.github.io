import telebot
import time
import datetime

token = "1444161129:AAG5NLnXtkAOyyJWxMWFIglSfhv0O7mjI6Y"
sleep = 8 * 60 * 60
chats = [-1001379282699]

bot = telebot.TeleBot(token)

@bot.message_handler(commands=['dbg', 'debug'])
def dbg(message):
    print(message)

while sleep > 1:
	now = datetime.datetime.today()
	NY = datetime.datetime(2021,1,1)
	d = NY-now
	mm, ss = divmod(d.seconds, 60)
	hh, mm = divmod(mm, 60)
	msg = "<b>До нового года осталось</b>:\n"
	msg += " Дней: " + str(d.days)
	msg += "\n Часов: " + str(hh)
	msg += "\n Минут: " + str(ss)
	
	for item in chats:
		print(str(item) + " -> " + msg)
		bot.send_message(item, msg, parse_mode='html')
		time.sleep(1)
		
	time.sleep(sleep)

bot.polling()
    	
