module.exports = function Greeting(local) {

    var namesList = [];
    namesList = local
    var message = "";
    var greetMe = "";

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
    function emptyList(){
        namesList = [];
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
    }
}

