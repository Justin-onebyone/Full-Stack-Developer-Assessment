// js/script.js
document.addEventListener('DOMContentLoaded', function() {

    const formInput = document.querySelector('.form-input');
    const countryCodeSelect = document.getElementById('country-code');
    const phoneNumberInput = document.getElementById('phone-number');
    const inputCheck = document.querySelector('.input-check'); 
    const inputGroup = document.querySelector('.input-group'); 


    const targetPhoneNumber = "+60173527250";


    if (formInput) {
        formInput.addEventListener('submit', function(event) {
            event.preventDefault(); 


            const countryCode = countryCodeSelect ? countryCodeSelect.value : '+60'; 
            const phoneNumber = phoneNumberInput ? phoneNumberInput.value.trim() : ''; 

            const fullNumber = countryCode + phoneNumber;

            if (fullNumber === targetPhoneNumber) {
                sessionStorage.setItem('confirmedPhoneNumber', fullNumber); // Store number before redirecting
                setTimeout(() => {
                    window.location.href = 'register.html'; 
                }, 300);
            } else {
                 if (inputGroup) inputGroup.style.borderBottom = '1px solid red';
                 alert('Phone number not found or invalid.');
            }
        });
    } else {
        console.error("Form with class 'form-input' not found.");
    }

    if (phoneNumberInput) {
        phoneNumberInput.addEventListener('input', function(event) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
        });
    }
}); 