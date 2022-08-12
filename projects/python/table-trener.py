import random as r
import os
import time

# функции
def clear():
 os.system('cls' if os.name == 'nt' else 'clear')
 
def table():
 jj = 1
 while jj < 11:
  jjj = 1
  while jjj < 11:
   print("%4d" % (jj*jjj), end="")
   jjj += 1
  print()
  jj += 1

# логика
clear()

x = 1
y = 0
all = 0

print()
print(" Тренер по таблице умножения")
print(" Подготовила: " + "коська")
print("\n Таблица умножения: ")
table()
print()
input(" Нажмите ентер для начала: ")
clear()

while x!=0:
 a = r.randint(1, 10)
 b = r.randint(1, 10)
 m = a * b
 
 print()
 print(" Тренер по таблице умножения\n Правильных: " + str(y) + " / " + str(all) + "\n")
 
 print(" Сколько будет " + str(a) + " * " + str(b) + "?\n")
 
 try:
  o = int(input(" : "))
 except ValueError:
  clear()
  all += 1
  continue
 
 print("\n")
 if m == o:
  print(" Правильно!\n")
  time.sleep(1)
  y += 1
 else:
  print(" Не правильно! Будет " + str(m) + "\n")
  time.sleep(1)
  
 all += 1
 clear()