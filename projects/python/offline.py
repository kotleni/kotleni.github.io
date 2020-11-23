#!/usr/bin/env python
# -*- coding: utf-8 -*-
import socket
import threading
import timeit
import base64
import atexit
import select

BINDADDR = ('', 8081)
SERVADDR = ('94.103.85.201', 8081)
MAXSIZE = 65535

s = socket.socket()
s.bind(BINDADDR)
s.listen(5)

def exithandler():
    s.close()
atexit.register(exithandler)

def recvall(sock):
    data = b""
    while True:
        try:
            chunk = sock.recv(MAXSIZE)
        except: break
        if chunk:
            data+= chunk
        else:
            break
    return data

def th_client(conn, addr):
    #f = recvall(conn)
    f = conn.recv(MAXSIZE)
    print("<-- ("+addr[0]+")", f.decode())

    d = socket.socket()
    d.connect(SERVADDR)
    d.send(base64.b64encode(f))

    #n = base64.b64decode(recvall(d))
    n = base64.b64decode(d.recv(MAXSIZE))
    conn.send(n)

    print('--> ('+SERVADDR[0]+')', n.decode('latin-1')) # MAGIC

    d.close()
    conn.close()

def putclient(conn, addr):
    threading.Thread(target=th_client, args=(conn, addr)).start()

def wait():
    while True:
        conn, addr = s.accept()
        putclient(conn, addr)
        


print('Started by', socket.gethostbyname(socket.gethostname()) + ':' + str(BINDADDR[1]))
threading.Thread(target=wait).start()