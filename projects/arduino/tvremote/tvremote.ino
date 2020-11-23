#include <IRremote.h>
#include "keys.h"

#define DELAY 100    // Задержка

#define PIN_IR_RECV 2
#define PIN_IR_SEND 9

IRsend irsend;
IRrecv irrecv(PIN_IR_RECV);
decode_results results;

void setup() {
  Serial.begin(9600);
  
  irrecv.enableIRIn();
  pinMode(PIN_IR_SEND, OUTPUT);
}

void waitIR(){ // Ждать сигнала с пульта
  while(!irrecv.decode(&results)){}
  delay(DELAY);
  irrecv.resume();
}

bool btn;
void loop() {
  waitIR();

  switch(results.value) {
    case KEY_UP_A:
    for (int i = 0; i < 3; i++) {
    irsend.sendNEC(KEY_UP_B, 32);
    delay(40);
  }
      break;
    case KEY_DOWN_A:
    for (int i = 0; i < 3; i++) {
    irsend.sendNEC(KEY_DOWN_B, 32);
    delay(40);
  }
      break;
  }

  delay(400);
  irrecv.enableIRIn();
}
