const assert = require("assert");
const Greeting = require("../greetings");

describe('Greeting', function () {
    it('Should greet the name entered in isiZulu', function () {
        let myHello = Greeting([])
        var string = "Owethu"
        var langauge = "Sawubona, "

        myHello.setName(string)

        assert.equal('Sawubona, Owethu', myHello.firstL(string, langauge))
    })
    it('Should return message "Name already greeted"', function () {
        let myHello = Greeting([])
        var string = "Owethu"
        var langauge = "Sawubona, "

        myHello.setName(string)
        myHello.setName(string)

        assert.equal('Sawubona, Owethu', myHello.firstL(string, langauge))
        assert.equal('Name already greeted!', myHello.getMessage())
    })
    it('Should return the first character of the name entered in uppercase and the rest in lowercase', function () {
        let myHello = Greeting([])
        var string = "Ohworthy"
        var langauge = "Sawubona, "

        myHello.setName(string)

        assert.equal('Sawubona, Ohworthy', myHello.firstL(string, langauge))

    })
    it('Should return the greeting in English', function () {
        let myHello = Greeting([])
        var string = "Worthy"
        var langauge = "Hi, "

        myHello.setName(string)
        myHello.setName(string)

        assert.equal('Hi, Worthy', myHello.firstL(string, langauge))
    })
    it('Should return the string of names entered', function () {
        let myHello = Greeting([])
        var string = "Worthy"
        var string1 = "Sthera"
        var string2 = "Asonwabe"
        var string3 = "Kuli"
        var string4 = "Avile"
        var string5 = "Naphi"
        var string6 = "Mihlali"
        var string7 = "Anecebo"
        var string8 = "Amanda"

        myHello.setName(string)
        myHello.setName(string1)
        myHello.setName(string2)
        myHello.setName(string3)
        myHello.setName(string4)
        myHello.setName(string5)
        myHello.setName(string6)
        myHello.setName(string7)
        myHello.setName(string8)

        assert.deepEqual([string, string1, string2, string3, string4, string5, string6, string7, string8], myHello.getNames())
    })
    it('Should return the number of  times the names are entered', function () {
        let myHello = Greeting([])
        var string = "Worthy"
        var string1 = "Sthera"
        var string2 = "Asonwabe"
        var string3 = "Kuli"
        var string4 = "Avile"
        var string5 = "Naphi"
        var string6 = "Mihlali"
        var string7 = "Anecebo"
        var string8 = "Amanda"
        var string9 = "Sandy"
        var string10 = "Asanda"

        myHello.setName(string)
        myHello.setName(string1)
        myHello.setName(string2)
        myHello.setName(string3)
        myHello.setName(string4)
        myHello.setName(string5)
        myHello.setName(string6)
        myHello.setName(string7)
        myHello.setName(string8)
        myHello.setName(string9)
        myHello.setName(string10)

        assert.deepEqual(11, myHello.greetCounter())
    })
})
