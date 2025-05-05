function validateSignup() {
    let isValid = true;
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.textContent = '');


    //Basic Input Validation -  Expand as needed for more robust checks.
    const requiredFields = ['firstName', 'lastName', 'email', 'streetAddress', 'city', 'state', 'zip'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}Error`);
        if (input.value.trim() === '') {
            error.textContent = `Please enter your ${field}.`;
            isValid = false;
        }
    });

    //Email Validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email format.";
        isValid = false;
    }

    if (isValid) {
        //Handle form submission -  e.g., send data to server
        alert('Form submitted successfully!'); //Replace with actual submission logic
        return true;
    }

    return false;
}