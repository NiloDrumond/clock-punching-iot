#include <WiFiMulti.h>
#include <HTTPClient.h>
WiFiMulti wifiMulti;
// Your WiFi credentials.
// Set password to "" for open networks.
const char ssid[] = "CINGUESTS";
const char pass[] = "acessocin";
const String host = "http://172.22.76.8:3333";

#define REDPIN 33
#define GREENPIN 32
#define BUZZPIN 26
#define BUZZCHAN 0

void setup()
{
  // Debug console
  Serial.begin(9600);
  wifiMulti.addAP(ssid, pass);
  while (wifiMulti.run() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BUZZPIN, OUTPUT);
  ledcSetup(BUZZCHAN, 5000, 12);
  ledcAttachPin(BUZZPIN, BUZZCHAN);
}

void blinkLED(bool accepted) {
  digitalWrite(accepted ? GREENPIN : REDPIN, HIGH);
  ledcWriteTone(BUZZCHAN,800);
  delay(accepted ? 500 : 2000);
  ledcWrite(BUZZCHAN,0);
  if(accepted) {
     delay(500);
     ledcWriteTone(BUZZCHAN,800);
     delay(1000);
     ledcWrite(BUZZCHAN,0);
  }
  digitalWrite(accepted ? GREENPIN : REDPIN, LOW);
  delay(1000);
}

enum State {WAITING_PERSON, CHECK_PERSON, AUTH_PERSON, UNAUTH_PERSON};
State state = WAITING_PERSON;
String personID, url, personResponse;
void loop() {
  if(state == WAITING_PERSON) {
    if(Serial.available() > 0) {
      personID = Serial.readStringUntil('\n');
      Serial.print("recebido personID: ");
      Serial.println(personID);
      delay(500);
      state = CHECK_PERSON;
    }
  } else if (state == CHECK_PERSON) {
      url = host + "/employees/clockin/" + personID;
      Serial.print("url: ");
      Serial.println(url);
      HTTPClient http;
      http.begin(url);
      int httpCode = http.POST("");
      Serial.print("recebido httpCode: ");
      Serial.println(httpCode);
      delay(500);
      if(httpCode > 0) {
        state = httpCode == 201 ? AUTH_PERSON : UNAUTH_PERSON;
      } else {
        state = UNAUTH_PERSON;
      }
  } else {
    blinkLED(state == AUTH_PERSON);
    Serial.println(state == AUTH_PERSON ? "Sucesso" : "CPF não encontrado");
    state = WAITING_PERSON;
  } 
}
