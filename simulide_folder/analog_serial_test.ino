int id = random(0,100000); //temporal solution for client identification
void setup() {
  Serial.begin(9600);
  
}

void loop() {
  int sensorValue1 = analogRead(A0);
  int sensorValue2 = analogRead(A1);
  String ans = String(id)+','+String(sensorValue1)+','+String(sensorValue2);
  Serial.println(ans);
  delay(500);
}