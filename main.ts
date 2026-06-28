input.onButtonPressed(Button.A, function () {
    // Seilbahn soll geschickt werden
    // forward
    radio.sendNumber(3)
})
function setDistance () {
    // P0 = Trigger
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(4)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    // P1 = Echo
    read_distance = 34 * (pins.pulseIn(DigitalPin.P1, PulseValue.High) / 2000)
    read_distance = Math.round(read_distance)
    return read_distance
}
input.onButtonPressed(Button.B, function () {
    arrived = 0
    // Seilbahn sendet das Signal zum Abholen
    // backward
    radio.sendNumber(2)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // Seilbahn soll gestoppt werden
    radio.sendNumber(1)
})
let distance = 0
let read_distance = 0
let arrived = 0
arrived = 0
radio.setGroup(11)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    basic.pause(500)
    distance = setDistance()
    serial.writeValue("distance", distance)
    if (distance <= 5 && arrived == 0) {
        arrived = 1
        // Seilbahn ist da und wartet auf ein Signal
        radio.sendNumber(1)
    }
    if (distance > 10) {
        arrived = 0
    }
    basic.showNumber(arrived)
})
