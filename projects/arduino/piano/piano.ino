#include <PS2Keyboard.h>

#define PIN_PS2_DATA 2
#define PIN_PS2_IRQ 3
#define PIN_SPEAKER 9

int tempo = 300;

PS2Keyboard keyboard;

int tones[] = { 1915, 1700, 1519, 1432, 1275, 1136, 1014, 956 };
void playTone(int i) {
//  for (long i = 0; i < tempo * 1000L; i += tones[tone] * 2) {
//    digitalWrite(PIN_SPEAKER, HIGH);
//    delayMicroseconds(tones[tone]);
//    digitalWrite(PIN_SPEAKER, LOW);
//    delayMicroseconds(tones[tone]);
//  }

  tone(PIN_SPEAKER, tones[i]/2, tempo);
  Serial.println(tones[i]/2);
}

void setup() {
  delay(1000);
  keyboard.begin(PIN_PS2_DATA, PIN_PS2_IRQ);
  
  Serial.begin(9600);
  Serial.println("PIANO");

  pinMode(PIN_SPEAKER, OUTPUT);
}

void loop() {
  if (keyboard.available()) {
    
    // read the next key
    char c = keyboard.read();
    
    // check for some of the special keys
    if (c == PS2_ENTER) {
      Serial.println();
    } else if (c == '1') {
    playTone(0);
    }else if (c == '2') {
    playTone(1);
    }else if (c == '3') {
    playTone(2);
    }else if (c == '4') {
    playTone(3);
    }else if (c == '5') {
    playTone(4);
    }else if (c == '6') {
    playTone(5);
    }else if (c == '7') {
    playTone(6);
    }else if (c == '8') {
    playTone(7);
    }else if (c == PS2_PAGEUP) {
      tempo += 10;  Serial.print("Tempo: ");Serial.println(tempo);
    }else if (c == PS2_PAGEDOWN) {tempo -= 10;
      Serial.print("Tempo: ");Serial.println(tempo);}

      
  }
}
