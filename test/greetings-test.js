const assert = require("assert");
const Greeting = require("../greetings");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const greeting = Greeting(pool);

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

describe('Deleting Database', async function () {
    it('should delete from users database', async function () {
        await greeting.emptyDB();
        assert.equal(0, await greeting.poolTable())
    })
})

describe('Get UserName', async function () {
    it('Should return the greeted userName', async function () {
        await greeting.poolName('Worthy');
        var userName = await greeting.getUserName('Worthy')
        assert.equal('Worthy', userName[0].username)
        await greeting.emptyDB();
    })
})
describe('Count Greeted Users', async function () {
    it('Should count the names of all greeted users', async function () {
        await greeting.poolName('Worthy');
        await greeting.poolName('Owethu');
        await greeting.poolName('Ethu');
        await greeting.poolName('Oz');
        await greeting.poolName('Ohworthy');

        await greeting.getUserName('Worthy');
        await greeting.getUserName('Owethu');
        await greeting.getUserName('Ethu');
        await greeting.getUserName('Oz');
        await greeting.getUserName('Ohworthy');

        assert.equal(5, await greeting.poolTable());
        await greeting.emptyDB();
    })
})
describe('Greeted users list', async function() {
    it('Should display the list of all greeted users', async function() {
        await greeting.poolName('Worthy');
        await greeting.poolName('Owethu');
        await greeting.poolName('Ethu');
        await greeting.poolName('Oz');
        await greeting.poolName('Ohworthy');

       var userName1 = await greeting.getUserName('Worthy');
       var userName2 = await greeting.getUserName('Owethu');
       var userName3 = await greeting.getUserName('Ethu');
       var userName4 = await greeting.getUserName('Oz');
       var userName5 = await greeting.getUserName('Ohworthy');

        assert.equal('Worthy', userName1[0].username)
        assert.equal('Owethu', userName2[0].username)
        assert.equal('Ethu', userName3[0].username)
        assert.equal('Oz', userName4[0].username)
        assert.equal('Ohworthy', userName5[0].username)
    })
})