import socket
import re
import base64

def exp(d):
      match = re.search("(?<=<).*?(?=>)", d)
      return match.group(0)

sock = socket.socket(
      socket.AF_INET,
      socket.SOCK_STREAM)

sock.bind(('', 25))
sock.listen(5)

hosts = []

while True:
      conn, addr = sock.accept()
      if (addr in hosts) == False:
            hosts.append(addr)
            conn.send(b'220 bvcrlk.tk ESMTP Sendmail 8.9.3/8.9.3; Thu, 26 Aug 1999 19:20:16 -050\r\n')
            print('conn', addr)
      XMODE = False
      FROM = ''
      TO = ''
      MSG = ''
      while True:

            d = conn.recv(1024).decode()
            dc = d.replace(' ', '').replace('\r\n', '')
            if dc == '': continue
            #if XMODE == False:
            print('<', d, '>')

            sp = d.split(' ')

            if XMODE == True:
                  if dc[len(dc)-1] == '.':
                        XMODE = False
                        conn.send(b'250 769947 message accepted for delivery\r\n')
                  else:
                        MSG += '\n'+d
                  continue
            elif sp[0] == 'DATA\r\n':
                  XMODE = True
                  conn.send(b'354 Enter mail, end with "." on a line by itself\r\n')
            elif sp[0] == 'HELO':
                  conn.send(b'250 domain name should be qualified\r\n')
            elif sp[0] == 'QUIT\r\n':
                  conn.send(b'221 bvcrlk.tk Bay')
                  conn.close()
                  break
            elif sp[0] == 'EHLO':
                  conn.send(b'250-8BITMIME\r\n')
                  conn.send(b'250-PIPELINING\r\n')
                  conn.send(b'250-SIZE 14680064\r\n')
                  conn.send(b'250 HELO\r\n')
            elif sp[0] == 'MAIL':
                  FROM = exp(d)
                  conn.send(('250 '+ FROM + ' sender accepted\r\n').encode())
            elif sp[0] == 'RCPT':
                  TO = exp(d)
                  conn.send(('250 ' +' ok\r\n').encode())
            else:
                  conn.send(b'502 Error: command not implemented\r\n')
                  print('UNKNOWN COMMAND', sp[0])
      print(addr, FROM, TO, MSG)
      o = MSG.split('\r\n')
      dec = base64.b64decode(o[len(o)-2]).decode()
      print('->', dec)