import time
from datetime import datetime
import logging
import requests

birth_file = "/Users/kotleni/.birth_store"

def update_message(chat_id, message_id, text):
	token = "5510538689:AAE-Cg-w7-X35gFz1MnKMKnRuHzKn8SH8lM"
	requests.get("https://api.telegram.org/bot{}/editMessageText?chat_id={}&message_id={}&text={}&parse_mode=html".format(token, chat_id, message_id, text))
now_date = datetime.today().strftime('%Y-%m-%d')

chat_id = -1001548528676
message_id = 3866

f = open(birth_file, 'r')
if f.read() == now_date:
	exit()

print("Updating birthday post in Telegram...")
f.close()
f = open(birth_file, 'w')
f.write(now_date)
f.close()

now = datetime.today()
NY = datetime(2022,9,2)
d = NY-now
mm, ss = divmod(d.seconds, 60)
hh, mm = divmod(mm, 60)
msg = "<b>Дней до моего дня рождения:</b> {}".format(d.days)

update_message(chat_id, message_id, msg)
