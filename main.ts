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
    sonar_switch = 0
    sonar_avg = 0
})
let sonar_summed = 0
let sonar_avg = 0
let Sonar_Test = 0
let sonar_switch = 0
sonar_switch = 0
Sonar_Test = 0
sonar_avg = 0
let sonar_current = 1
let sonar_sample_count = 1
basic.showIcon(IconNames.Happy)
datalogger.setColumnTitles("Distance")
basic.forever(function () {
    if (sonar_switch == 1) {
        basic.pause(100)
        while (true) {
            sonar_current = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P2,
            PingUnit.Centimeters
            )
            sonar_sample_count += 1
            sonar_summed = sonar_current + sonar_summed
            sonar_avg = Math.round(sonar_current / sonar_sample_count)
            basic.showNumber(sonar_avg)
            basic.pause(100)
            if (sonar_avg < 3) {
                kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo1, kitronik_simple_servo.ServoDirection.CCW, 100)
                kitronik_simple_servo.servoRunPercentage(kitronik_simple_servo.ServoChoice.servo2, kitronik_simple_servo.ServoDirection.CW, 100)
            }
            if (sonar_current > 20) {
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
        sonar_current = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
        )
        basic.showNumber(sonar_current)
    }
})
