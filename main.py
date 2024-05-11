def on_button_pressed_a():
    kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO1,
        kitronik_simple_servo.ServoDirection.CW,
        100)
    kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO2,
        kitronik_simple_servo.ServoDirection.CCW,
        100)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global sonar_switch
    if sonar_switch == 0:
        sonar_switch = 1
        basic.show_icon(IconNames.YES)
    else:
        sonar_switch = 0
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    kitronik_simple_servo.servo_stop(kitronik_simple_servo.ServoChoice.SERVO1)
    kitronik_simple_servo.servo_stop(kitronik_simple_servo.ServoChoice.SERVO2)
input.on_button_pressed(Button.B, on_button_pressed_b)

sonar2 = 0
sonar_switch = 0
sonar_switch = 0
basic.show_icon(IconNames.HEART)
datalogger.set_column_titles("Distance")

def on_forever():
    global sonar2
    if sonar_switch == 1:
        basic.pause(200)
        while True:
            sonar2 = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS)
            basic.pause(500)
            if sonar2 > 6:
                break
            kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO1,
                kitronik_simple_servo.ServoDirection.CW,
                100)
            kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO2,
                kitronik_simple_servo.ServoDirection.CW,
                100)
            basic.pause(200)
        # One clockwise, one counter to go straight in current HW setup
        kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO1,
            kitronik_simple_servo.ServoDirection.CW,
            50)
        kitronik_simple_servo.servo_run_percentage(kitronik_simple_servo.ServoChoice.SERVO2,
            kitronik_simple_servo.ServoDirection.CCW,
            50)
basic.forever(on_forever)

def on_every_interval():
    basic.show_number(sonar2)
    datalogger.log(datalogger.create_cv("Distance", sonar2))
loops.every_interval(100, on_every_interval)
