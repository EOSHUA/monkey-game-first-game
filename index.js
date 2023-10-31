


// This function is used to switch to the Sign In form.
function Go_to_SignIn() {
    // Set the display style of "conteinerSignIn" to "block" to show the Sign In form.
    document.getElementById("conteinerSignIn").style.display = "block";
    // Set the display style of "conteinerLogIn" to "none" to hide the Log In form.
    document.getElementById("conteinerLogIn").style.display = "none";
}

// This function is used to switch to the Log In form.
function Go_to_LogIn() {
    // Set the display style of "conteinerSignIn" to "none" to hide the Sign In form.
    document.getElementById("conteinerSignIn").style.display = "none";
    // Set the display style of "conteinerLogIn" to "block" to show the Log In form.
    document.getElementById("conteinerLogIn").style.display = "block";
}

// This function is used for user registration.
function sign_in() {
    // Get the value of the user name and password input elements.
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    if (userName == "" || password == "" || email == "") {
        alert("Please, fill in all fields")
        return;
    }
    if (userName.length < 3 || password.length < 5) {
        alert("Note, the username must be at least four characters long, and the password must be at least six characters long")
        return;
    }

    // Retrieve existing user accounts from local storage or initialize an empty array.
    const arr = JSON.parse(localStorage.getItem("users")) || [];

    let match = false;

    // Check if the provided username or password matches any existing user account.
    for (let i = 0; i < arr.length; i++) {
        if (userName === arr[i].Name && password === arr[i].pass) {
            match = true;
            break;
        }
    }

    // If a match is found, display an alert indicating an existing user.
    if (match) {
        alert("Existing user. Enter a different user name");
    } else {
        // Create a new user account object.
        const userAccount = {
            Name: userName,
            pass: password,
            record: 0,
        };

        // Add the new user account to the array of users.
        arr.push(userAccount);

        // Display a registration success alert.
        alert("You have successfully registered");

        // Store the updated user accounts in local storage.
        localStorage.setItem("users", JSON.stringify(arr));

        // Redirect to the Log In page after a delay of 30 seconds.
        setTimeout(Go_to_LogIn, 500);
    }
}

// This function is used for user login.
function log_in() {
    // Get the value of the user name and password input elements.
    const userName = document.getElementById("LogUserName").value;
    const password = document.getElementById("LogPassword").value;

    // Retrieve user accounts from local storage.
    const arr = JSON.parse(localStorage.getItem("users"));

    let match = false;
    let currentRecord = 0;

    // Check if the provided username and password match any existing user account.
    for (let i = 0; i < arr.length; i++) {
        if (userName === arr[i].Name && password === arr[i].pass) {
            match = true;
            currentRecord = arr[i].record;

            break;
        }
    }


    // If no match is found, display an alert.
    if (!match) {
        alert("User not found, try again.");
    } else {
        // Display a successful login alert.
        alert("התחברת בהצלחה"); // This appears to be a Hebrew message.


        const temp = {
            Name: userName,
            pass: password,
            record: currentRecord,
        }

        sessionStorage.setItem("currentUser", JSON.stringify(temp));
        location.href = "gams.html";
    }
}
