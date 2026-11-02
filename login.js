
/* SELECT HTML ELEMENTS */
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");
const forgotPassword = document.getElementById("forgotPassword");

/* DISPLAY MESSAGE */
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

/* LOGIN FORM */
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
        showMessage("Please enter email and password.", "#ff6b6b");
        return;
    }

    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email.", "#ff6b6b");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must contain at least 6 characters.", "#ff6b6b");
        return;
    }

    showMessage("Login successful! Redirecting...", "#4ade80");

    // Connect to Dashboard
    setTimeout(function () {
        window.location.href = "index.html";
    }, 800);
});

/* SHOW / HIDE PASSWORD */
togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
});

/* CLEAR MESSAGE */
emailInput.addEventListener("input", function () {
    message.textContent = "";
});

passwordInput.addEventListener("input", function () {
    message.textContent = "";
});

/* FORGOT PASSWORD */
forgotPassword.addEventListener("click", function (event) {
    event.preventDefault();

    showMessage(
        "Password reset feature is coming soon!",
        "#C8B98F"
    );
});
