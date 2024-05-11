def on_button_pressed_a():
    global sonar_switch
    if sonar_switch == 0:
        sonar_switch = 1
        basic.show_icon(IconNames.YES)
    else:
        sonar_switch = 0
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global Sonar_Test
    Sonar_Test = 1
    basic.show_icon(IconNames.SMALL_DIAMOND)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global Sonar_Test
    kitronik_simple_servo.servo_stop(kitronik_simple_servo.ServoChoice.SERVO1)
    kitronik_simple_servo.servo_stop(kitronik_simple_servo.ServoChoice.SERVO2)
    Sonar_Test = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

sonar2 = 0
Sonar_Test = 0
sonar_switch = 0
sonar_switch = 0
Sonar_Test = 0
basic.show_icon(IconNames.HAPPY)
datalogger.set_column_titles("Distance")

def on_forever():
    global sonar2
    if sonar_switch == 1:
        basic.pause(100)
        while True:
            sonar2 = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
            basic.pause(100)
            if sonar2 > 20:
                break
            kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO1,
                kitronik_simple_servo.ServoDirection.CW,
                25)
            kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO2,
                kitronik_simple_servo.ServoDirection.CW,
                25)
            basic.pause(100)
        # One clockwise, one counter to go straight in current HW setup
        kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO1,
            kitronik_simple_servo.ServoDirection.CW,
            100)
        kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO2,
            kitronik_simple_servo.ServoDirection.CCW,
            100)
    if Sonar_Test == 1:
        sonar2 = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
        basic.show_number(sonar2)
basic.forever(on_forever)
