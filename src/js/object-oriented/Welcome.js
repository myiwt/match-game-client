const welcomeMsg = document.getElementById('welcome');

function getUserName() {
    var person = prompt("Please enter a name to start the game");
    if (person == null || person == "") {
        person = "Anon";
    }
    welcomeMsg.innerHTML = `${person}`;
}

getUserName();