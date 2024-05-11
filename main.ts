input.onButtonPressed(Button.A, function () {
    if (sonar_switch == 0) {
        sonar_switch = 1
        basic.showIcon(IconNames.Yes)
    } else {
        sonar_switch = 0
        basic.showIcon(IconNames.No)
    }
})
input.onButtonPressed(Button.AB, function () {
    Sonar_Test = 1
    basic.showIcon(IconNames.SmallDiamond)
})
input.onButtonPressed(Button.B, function () {
    kitronik_simple_servo.servoStop(kitronik_simple_servo.ServoChoice.servo1)
    kitronik_simple_servo.servoStop(kitronik_simple_servo.ServoChoice.servo2)
    Sonar_Test = 0
})
let sonar2 = 0
let Sonar_Test = 0
let sonar_switch = 0
sonar_switch = 0
Sonar_Test = 0
basic.showIcon(IconNames.Happy)
datalogger.setColumnTitles("Distance")
basic.forever(function () {
    if (sonar_switch == 1) {
        basic.pause(100)
        while (true) {
            sonar2 = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P2,
            PingUnit.Centimeters
            )
            basic.pause(100)
            if (sonar2 > 20) {
                break;
            }
            kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo1, kitronik_simple_servo.ServoDirection.CW, 25)
            kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo2, kitronik_simple_servo.ServoDirection.CW, 25)
            basic.pause(100)
        }
        // One clockwise, one counter to go straight in current HW setup
        kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo1, kitronik_simple_servo.ServoDirection.CW, 100)
        kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo2, kitronik_simple_servo.ServoDirection.CCW, 100)
    }
    if (Sonar_Test == 1) {
        sonar2 = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
        )
        basic.showNumber(sonar2)
    }
})
