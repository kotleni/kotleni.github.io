import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

f = open("D:\docs\hosts.txt", "r")

sock.bind(('', 8081))
sock.listen(5)

while True:
	conn, addr = sock.accept()
	data = conn.recv(1024)
	print(data)
	
	# conn.send("HTTP/1.1 200 OK \n\nHello".encode())
	conn.send("""HTTP/1.1 401 Access Denied\n\nWWW-Authenticate: Basic realm="My Server"\n\nContent-Length: 0""".encode())
	conn.close()