import serial.serialwin32 as serial #pip install pyserial

com = serial.Serial('COM5')

while True:
    f = com.read()
    print(f)
