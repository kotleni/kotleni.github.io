from random import randrange
from time import sleep

def rand(a, b): # FIX PYTHON RANDOM
    r = (randrange(0, 10))
    if r > 5: return 0
    else: return 1

c = 0
i = 0
t = ''
def math(func):
    global c
    global i
    global t
    
    if func == '+':
        i = i + 1
    if func == '-':
        i = i - 1
    if func == '*':
        i = i * 2
    if func == '/':
        i = i / 2
    if func == '@':
        i = i + rand(0, 1)
    if func == '*':
        i = rand(0, 1)
    if func == '&':
        i = int(t[c+1])
        c = c + 2
    if func == '<':
        c = c - 4
    if func == '>':
        c = c + 2
    if func == '^':
        sleep(1)
    if func == ':':
        if int(t[c+1]) == i:
            c = c + 1
        else: c = c + 2
    if func == '$':
        print(str(chr(i)))
    if func == '=':
        print(i)

def interp(l):
    global c
    global t

    line = l.replace('\n', '').replace(' ', '')
    t = line

    while (len(l) != c):
        math(line[c])
        print(line[c], i, '->', c)
        c += 1

f = open('lang.txt')
text = f.read()
f.close()

interp(text)
