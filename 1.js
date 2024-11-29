// Unified password (can be changed later)
const unifiedPassword = "[@_$$$squadvertex_member$$$_@]✓";

// List of authorized emails
const authorizedEmails = [
    "princegahlot2007@gmail.com",
    "squadvertex24official@gmail.com"
];

function validateCredentials() {
    const email = document.getElementById('gmailInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('error');

    if (authorizedEmails.includes(email) && password === unifiedPassword) {
        // Redirect to the restricted page
        window.location.href = 'restricted-page.html';
    } else {
        // Display error message
        errorMsg.textContent = "Access Denied! Invalid email or password.";
    }
}