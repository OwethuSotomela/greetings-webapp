module.exports = function Greeting(local) {

    var namesList = [];
    namesList = local
    var message = "";
    var greetMe = "";
    var pool = local;

    async function poolName(poolUser) {
        if (poolUser != '' && /^[a-zA-Z]+$/.test(poolUser)) {
            var name = poolUser[0].toUpperCase() + poolUser.slice(1).toLowerCase();
            const sql = await pool.query(`SELECT * FROM Users WHERE userName = $1`, [name]);
            if (sql.rows.length == 0) {
                await pool.query(`insert into Users (userName, greetedTimes) values ($1, $2)`, [name, 1]);
            }
        }
    }

    function setName(string) {
        if (string != '' && /^[a-zA-Z]+$/.test(string)) {
            var name = string[0].toUpperCase() + string.slice(1).toLowerCase();
            if (!namesList.includes(name)) {
                namesList.push(name)
            } else {
                message = "Name already greeted!";
            }
        }
    }
    function greetMessage(hello, string) {
        if (hello === "isiZulu") {
            greetMe = "Sawubona, " + string[0].toUpperCase() + string.slice(1).toLowerCase();
        } else if (hello === "English") {
            greetMe = "Hi, " + string[0].toUpperCase() + string.slice(1).toLowerCase();
        } else if (hello === "Portuguese") {
            greetMe = "Oi, " + string[0].toUpperCase() + string.slice(1).toLowerCase();
        }
    }
    function greetCounter() {
        return namesList.length;
    }
    function getNames() {
        return namesList;
    }
    function firstL(string, names) {
        if (string != '' && names != '' && /^[a-zA-Z]+$/.test(string)) {
            return names + string[0].toUpperCase() + string.slice(1).toLowerCase();
        }
    }
    function getMessage() {
        return message;
    }
    function getGreet() {
        return greetMe;
    }
    function emptyList() {
        namesList = [];
    }
    async function poolTable(){
        const sqlCount = await pool.query("SELECT COUNT(*) FROM users");
        return sqlCount.rows[0].count;
    }
    function emptyDB() {
        pool = [];
    }
    return {
        setName,
        greetCounter,
        getNames,
        firstL,
        getMessage,
        greetMessage,
        getGreet,
        emptyList,
        poolName,
        emptyDB,
        poolTable
    }
}

