#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define OLED_W 128
#define OLED_H 32

Adafruit_SSD1306 display(OLED_W, OLED_H, &Wire, -1);

int birdY;

int blockX[6] = { 20, 40, 60, 80, 100, 120 };
int blockY[6] = { 17, 14, 20, 25, 10, 22 };
int blockMode[6] = { 0, 0, 1, 1, 1, 0 };

void setup() {
  Serial.begin(9600);
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }

  birdY = OLED_H / 2;
  pinMode(10, INPUT_PULLUP);
}

int m;
void loop() {
  render();
  tick();

  if(millis() + 300 > m){
    birdY -= 1;
    if(random(2, 5) == 4)
      birdY += 3;
  }

  if(digitalRead(10))
    birdY += 3;
    
  m = millis();
  delay(50);
}

void tick() {
  for(int i = 0; i < 6; i++){
    blockX[i] -= 1;

   if(blockX[i] < 1){
      blockY[i] = random(1, 15);
      blockX[i] = OLED_W + random(1, 10);
      blockMode[i] = random(0, 2); 
   }
  }
}

void render() {
  display.clearDisplay();

  for(int i = 0; i < OLED_W; i++) display.drawPixel(i, OLED_H - 1, 1);
  for(int i = 0; i < OLED_W; i++) display.drawPixel(i, 0, 1);

  display.drawPixel(10, birdY, 1);

  for(int i = 0; i < 6; i++)
    for(int h = 0; h < OLED_H - blockY[i]; h++)
      display.drawPixel(blockX[i], (blockMode[i] == 0)? OLED_H - h : h, 1);
  display.display();  
}
