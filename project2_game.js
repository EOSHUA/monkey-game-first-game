// Declare global variables
let startGame; // Interval for game animation
let str; // Interval for timer
let getRecord = 0; // Store the highest score
let sum = 0; // Current score
let time = 100; // Initial game time
const liberalTop = 10; // Vertical tolerance for collision
const liberalLeft = 70; // Horizontal tolerance for collision
let peekedImgRnd = 0;
let total_sum = 0;
const step = 10;// Define the number of pixels to move on each key press


//date area
function date() {
    const currentDate = new Date();
    const dateTimeElement = document.getElementById("date-time");
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    const formattedDateTime = currentDate.toLocaleDateString('en-US', options);
    dateTimeElement.textContent = formattedDateTime;
}
setInterval(() => date(), 60)

// Create an Audio object for game sound
const sound = new Audio("sound/Start game.mp3");

// Function to start the game
function start() {
    // Set intervals for game animation and timer
    startGame = setInterval(() => animition(), time / 8 * 100);
    str = setInterval(() => timer(), 300);

    // Hide the "Start Game" button and show the "Stop Game" button
    document.getElementById("start_game").style.display = "none";
    document.getElementById("game_over").style.display = "block";
}

// Function to stop the game
function over() {
    end_of_the_game();
    clearInterval(startGame);
    clearInterval(str);

    document.getElementById("start_game").style.display = "block";
    document.getElementById("game_over").style.display = "none";
}

// Function to hide game instructions
function Instructionsoff() {
    document.getElementById('Instructions').style.display = "none";
}

// Function to show game instructions
function Instructionson() {
    document.getElementById('Instructions').style.display = "block";
}

// Retrieve user data from local storage and display the user's name
const Current_username = JSON.parse(sessionStorage.getItem("currentUser"));
document.getElementById("id_name_usesr").innerText = Current_username.Name;

// Function to create falling images
function animition() {
    sound.play();
    peekedImgRnd = Math.floor(Math.random() * 5) + 1;
    let imgWightPos = Math.floor(Math.random() * 1150);
    let newDiv = document.createElement('div');
    newDiv.className = "divimg";
    newDiv.style.width = "7.7%"
    newDiv.style.height = "10.3%"
    newDiv.style.backgroundSize = "100px 90px";
    newDiv.style.marginLeft = imgWightPos + "px"
    newDiv.style.marginTop = "10px";

    // Set the background image and score value based on random selection

    if (peekedImgRnd == 1) {
        newDiv.style.backgroundImage = "url('./imegs/banna!.png ') "
    }
    else if (peekedImgRnd == 2) {
        newDiv.style.backgroundImage = "url('./imegs/coconut.png') "
    }
    else if (peekedImgRnd == 3) {
        newDiv.style.backgroundImage = "url('./imegs/grape.png ') "
    }
    else if (peekedImgRnd == 4) {
        newDiv.style.backgroundImage = "url('./imegs/strawberry!.png ') "
    }
    else if (peekedImgRnd == 5) {
        newDiv.id = "boom";
        newDiv.style.backgroundImage = "url('./imegs/bomb.png ') "

    }
    document.getElementById("couteiner").appendChild(newDiv);


    // Start the image falling animation
    let v = setInterval(() => downfall(newDiv), time / 7);
}

// Function to compare element locations for collision detection
function compareLocation(element, monkey, liberal) {
    return ((element >= monkey - liberal) && (element <= monkey + liberal));
}

// Function to handle image element falling animation
function downfall(element) {
    let b = element.style.marginTop;
    b = b.replace("px", "");
    b = parseInt(b);
    b++;

    if (b == 800) {
        element.remove()
    }
    else {
        let monkeyLeft = parseInt(getComputedStyle(document.getElementById('monkey')).left, 10);
        let monkeyTop = parseInt(getComputedStyle(document.getElementById('monkey')).top, 10);
        let elementLeft = parseInt(getComputedStyle(element).marginLeft, 10);
        let elementTop = parseInt(getComputedStyle(element).marginTop, 10);
        if (compareLocation(elementTop, monkeyTop, liberalTop) && compareLocation(elementLeft, monkeyLeft, liberalLeft)) {
            if (element.id == "boom") {
                sum = sum - 25;
                element.remove();
                document.getElementById('Score').innerHTML = sum;

            }
            else {
                sum += 10;
                element.remove();
                document.getElementById('Score').innerHTML = sum;
            }
        }
        if (sum < 0) {
            end_of_the_game();
        }
        return element.style.marginTop = b + "px";
    }
}

// Function to stop the game
function end_of_the_game() {
    total_sum = sum;
    document.getElementById('Score').innerHTML = total_sum;
    document.getElementById('')
    sound.pause();
    alert("the game is over " + "your scores is  :" + total_sum);
    clearInterval(startGame);
    clearInterval(str);
    time = 100;
    document.getElementById("start_game").style.display = "block";
    document.getElementById("game_over").style.display = "none";

    //document.getElementById("divimg").style.display = "none";
    let arrPlayers = JSON.parse(localStorage.getItem("users"));
    let currentUser = sessionStorage.getItem("currentUser");
    let objCurrentUser = 0;

    // Update temp player object
    if (currentUser) {
        objCurrentUser = JSON.parse(currentUser);
        if (total_sum > objCurrentUser.record) {
            objCurrentUser.record = total_sum;
        }
    }
    // replace stored player with temp player ino players array
    for (let i = 0; i < arrPlayers.length; i++) {
        if (arrPlayers[i].Name === objCurrentUser.Name) {
            arrPlayers[i] = objCurrentUser;
            break;
        }

    }
    localStorage.clear();
    localStorage.setItem("users", JSON.stringify(arrPlayers));
    sum = 0;
}

// Function to handle the game timer
function timer() {
    if (time >= 0) {
        document.getElementById('timer').innerHTML = "the time that " + "<br>" + "left is: " + time;
        time -= 1;
    } else {
        end_of_the_game();
    }
}

// Function to display the highest score
function record() {
    let current_user = JSON.parse(sessionStorage.getItem("currentUser"))
    document.getElementById("recordButton").innerText = current_user.record;
}

// Select the div element to be moved
const movableDiv = document.getElementById('monkey');

// Add an event listener to listen for keydown events on the entire document
document.addEventListener('keydown', (event) => {
    // Get the current left position of the div and convert it to an integer
    let left = parseInt(getComputedStyle(movableDiv).left, 10);

    // Check which key was pressed
    switch (event.key) {
        case 'ArrowLeft':
            // If the left arrow key was pressed, move the div to the left by 'step' pixels
            left -= step;
            break;
        case 'ArrowRight':
            // If the right arrow key was pressed, move the div to the right by 'step' pixels
            left += step;
            break;
    }

    // Set the new left position for the div
    movableDiv.style.left = left + 'px';
});

//Function to exit from the game to the homepage
function Exit() {
    end_of_the_game();
    location.href = "index.html";
}
