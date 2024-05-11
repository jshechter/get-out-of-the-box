input.onButtonPressed(Button.A, function () {
    kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo1, kitronik_simple_servo.ServoDirection.CW, 100)
    kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo2, kitronik_simple_servo.ServoDirection.CCW, 100)
})
input.onButtonPressed(Button.AB, function () {
    if (sonar_switch == 0) {
        sonar_switch = 1
        basic.showIcon(IconNames.Yes)
    } else {
        sonar_switch = 0
        basic.showIcon(IconNames.No)
    }
})
input.onButtonPressed(Button.B, function () {
    kitronik_simple_servo.servoStop(kitronik_simple_servo.ServoChoice.servo1)
    kitronik_simple_servo.servoStop(kitronik_simple_servo.ServoChoice.servo2)
})
let sonar2 = 0
let sonar_switch = 0
sonar_switch = 0
basic.showIcon(IconNames.Heart)
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
            if (sonar2 > 60) {
                break;
            }
            kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo1, kitronik_simple_servo.ServoDirection.CW, 50)
            kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo2, kitronik_simple_servo.ServoDirection.CW, 50)
            basic.pause(100)
        }
        // One clockwise, one counter to go straight in current HW setup
        kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo1, kitronik_simple_servo.ServoDirection.CW, 50)
        kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo2, kitronik_simple_servo.ServoDirection.CCW, 50)
    }
})
loops.everyInterval(100, function () {
    basic.showNumber(sonar2)
    datalogger.log(datalogger.createCV("Distance", sonar2))
})
