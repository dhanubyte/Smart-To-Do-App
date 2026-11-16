
// Get signup form elements
const signupForm = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

const signupMessage = document.getElementById("signupMessage");
const toggleSignupPassword = document.getElementById("toggleSignupPassword");


signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const name = fullName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;
    const confirm = confirmPassword.value;

    // Check password length
    if (password.length < 6) {
        signupMessage.textContent = "Password must contain at least 6 characters.";
        signupMessage.style.color = "#ED7A5A";
        return;
    }

    // Check password matching
    if (password !== confirm) {
        signupMessage.textContent = "Passwords do not match!";
        signupMessage.style.color = "#ED7A5A";
        return;
    }

    // Display success message
    signupMessage.textContent = "Registration details validated successfully!";
    signupMessage.style.color = "#6FCF97";
});
