/* SELECT HTML ELEMENTS */
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");
const forgotPassword = document.getElementById("forgotPassword");

/* REUSABLE MESSAGE FUNCTION */
function clearMessage() {
    message.textContent = "";
}

/* HANDLE LOGIN FORM SUBMISSION */
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
        message.textContent = "Please enter your email and password.";
        message.style.color = "red";
    } else if (!emailPattern.test(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
    } else if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        message.style.color = "red";
    } else {
        message.textContent = "Demo only: authentication is not connected yet.";
        message.style.color = "green";
    }
});

/* SHOW / HIDE PASSWORD */
togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }
});

/* CLEAR MESSAGE WHEN USER TYPES */
emailInput.addEventListener("input", clearMessage);
passwordInput.addEventListener("input", clearMessage);

/* FORGOT PASSWORD */
forgotPassword.addEventListener("click", function (event) {
    event.preventDefault();
    message.textContent = "Password reset feature is coming soon!";
    message.style.color = "blue";
});