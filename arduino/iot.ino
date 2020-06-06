// библиотека для работы программного Serial
#include <SoftwareSerial.h>
     
// создаём объект для работы с программным Serial
// и передаём ему пины TX и RX
SoftwareSerial mySerial(8, 3);
     
// serial-порт к которому подключён Wi-Fi модуль
#define WIFI_SERIAL    mySerial
char ssid[] = "myNetwork";          //  your network SSID (name)
char password[] = "myPassword";   // your network password
     
void setup()
{
  // открываем последовательный порт для мониторинга действий в программе
  // и передаём скорость 9600 бод
  Serial.begin(9600);
  while (!Serial) {
  // ждём, пока не откроется монитор последовательного порта
  // для того, чтобы отследить все события в программе
  }
  Serial.print("Serial init OK\r\n");
  // открываем Serial-соединение с Wi-Fi модулем на скорости 115200 бод
 WiFi.begin(ssid, password);
  
  pinMode(2, INPUT);
  pinMode(7, INPUT);
}
     
void loop()
{
  // если приходят данные из Wi-Fi модуля - отправим их в порт компьютера
  if (WIFI_SERIAL.available()) {
    Serial.write(WIFI_SERIAL.read());
  }
  // если приходят данные из компьютера - отправим их в Wi-Fi модуль
  if (Serial.available()) {
    WIFI_SERIAL.write(Serial.read());
  }
      
  //датчик температуры
  float voltage = (analogRead(2)*5.0)/1024.0;
  float C = (voltage - 0.5)*100.0;
  Serial.print("C: ");
  Serial.println(C);
  float F = (C*9.0)/5.0 + 32;
  Serial.print("F: ");
  Serial.println(F);
      
  //датчик расстояния
  
  int dist = analogRead(7);
  Serial.print("distance: ");
  Serial.println(dist);  
  delay(250);
}
