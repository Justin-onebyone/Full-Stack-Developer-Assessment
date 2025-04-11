document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".registration-form");

    form.addEventListener("input", (event) => {
        const target = event.target;

        // Name validation
        if (target.id === "reg-name") {
            const nameError = document.querySelector("#name-error");
            if (target.value.trim() === "") {
                nameError.style.display = "inline";
            } else {
                nameError.style.display = "none";
            }
        }

        // Birthday validation
        if (["birth-dd", "birth-mm", "birth-yyyy"].includes(target.id)) {
            const day = document.querySelector("#birth-dd").value;
            const month = document.querySelector("#birth-mm").value;
            const year = document.querySelector("#birth-yyyy").value;
            const birthdayError = document.querySelector("#birthday-error");

            if (day && month && year && day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2025) {
                birthdayError.style.display = "none";
            } else {
                birthdayError.style.display = "inline";
            }
        }

        // Email validation
        if (target.id === "reg-email") {
            const emailError = document.querySelector("#email-error");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(target.value)) {
                emailError.style.display = "inline";
            } else {
                emailError.style.display = "none";
            }
        }

        // No email checkbox
        if (target.id === "no-email") {
            const emailField = document.querySelector("#reg-email");
            const emailError = document.querySelector("#email-error");
            if (target.checked) {
                emailField.disabled = true;
                emailField.value = "";
                emailError.style.display = "none";
            } else {
                emailField.disabled = false;
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".registration-form");
    const nameInput = document.getElementById('reg-name');
    const ddInput = document.getElementById('birth-dd');
    const mmInput = document.getElementById('birth-mm');
    const yyyyInput = document.getElementById('birth-yyyy');
    const emailInput = document.getElementById('reg-email');
    const noEmailCheckbox = document.getElementById('no-email');

    const nameError = document.getElementById('name-error');
    const birthdayError = document.getElementById('birthday-error');
    const emailError = document.getElementById('email-error');

    // --- Real-time input validation (as provided by user previously) ---
    form.addEventListener("input", (event) => {
        const target = event.target;

        // Function to show/hide errors based on validity
        const handleValidation = (inputElement, errorElement, isValid) => {
            if (errorElement) {
                errorElement.style.display = isValid ? "none" : "inline"; // Use 'inline' or 'block' based on CSS
            }
            // Optional: Add/remove error class to input for styling
            // inputElement.classList.toggle('input-error', !isValid);
        };

        // Name validation
        if (target.id === "reg-name") {
            handleValidation(target, nameError, target.value.trim() !== "");
        }

        // Birthday validation (basic check if all fields have *some* value)
        if (["birth-dd", "birth-mm", "birth-yyyy"].includes(target.id)) {
            const day = ddInput.value.trim();
            const month = mmInput.value.trim();
            const year = yyyyInput.value.trim();
            // Basic check: hide error if all fields have something entered
            // More complex date validation should happen on submit
            handleValidation(target, birthdayError, day !== "" && month !== "" && year !== "");
        }

        // Email validation
        if (target.id === "reg-email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Hide error if field is empty OR if it's a valid email format
            handleValidation(target, emailError, target.value.trim() === "" || emailRegex.test(target.value));
        }

        // No email checkbox logic
        if (target.id === "no-email") {
            if (target.checked) {
                emailInput.disabled = true;
                emailInput.value = ""; // Clear the email field
                emailInput.required = false; // Make it not required
                if (emailError) emailError.style.display = "none"; // Hide error
                 // Optional: remove error class from input
                 // emailInput.classList.remove('input-error');
            } else {
                emailInput.disabled = false;
                emailInput.required = true; // Make it required again
            }
        }
    }); // End of input listener

    // --- Form Submission Handling ---
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop default submission

        let isFormValid = true;

        // --- Final Validation Checks ---
        // Name
        const isNameValid = nameInput.value.trim() !== '';
        if (!isNameValid) {
            if (nameError) nameError.style.display = 'inline';
            isFormValid = false;
        } else {
             if (nameError) nameError.style.display = 'none';
        }

        // Birthday (Check all fields are filled and basic range)
        const dayVal = ddInput.value.trim();
        const monthVal = mmInput.value.trim();
        const yearVal = yyyyInput.value.trim();
        // Basic check: are all fields filled? Add more robust date check if needed.
        const isBirthdayValid = dayVal !== '' && monthVal !== '' && yearVal !== '' &&
                                Number(dayVal) >= 1 && Number(dayVal) <= 31 &&
                                Number(monthVal) >= 1 && Number(monthVal) <= 12 &&
                                Number(yearVal) >= 1900 && Number(yearVal) <= 2025; // Adjust year range if needed
        if (!isBirthdayValid) {
            if (birthdayError) birthdayError.style.display = 'inline';
            isFormValid = false;
        } else {
             if (birthdayError) birthdayError.style.display = 'none';
        }

        // Email (only if checkbox is NOT checked)
        const isEmailRequired = !noEmailCheckbox.checked;
        let isEmailFormatValid = true;
        if (isEmailRequired) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isEmailFormatValid = emailRegex.test(emailInput.value.trim());
            if (!isEmailFormatValid) {
                if (emailError) emailError.style.display = 'inline';
                isFormValid = false;
            } else {
                 if (emailError) emailError.style.display = 'none';
            }
        } else {
            // If checkbox checked, ensure error is hidden
            if (emailError) emailError.style.display = 'none';
        }

        // --- If Form is Valid, Store Data and Navigate ---
        if (isFormValid) {
            console.log('Form is valid. Storing data...');

            // Get values
            const name = nameInput.value.trim();
            const day = ddInput.value.trim();
            const month = mmInput.value.trim();
            const year = yyyyInput.value.trim();
            const email = isEmailRequired ? emailInput.value.trim() : 'N/A'; // Store 'N/A' or similar if checkbox ticked

            // Store in sessionStorage
            sessionStorage.setItem('userName', name);
            sessionStorage.setItem('birthDay', day);
            sessionStorage.setItem('birthMonth', month);
            sessionStorage.setItem('birthYear', year);
            sessionStorage.setItem('userEmail', email);

            // Navigate to Page 3
            window.location.href = 'details.html';

        } else {
            console.log('Form validation failed.');
            // Optionally scroll to the first error
        }
    }); // End of submit listener

}); // End of DOMContentLo