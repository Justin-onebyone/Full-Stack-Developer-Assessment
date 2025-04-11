document.addEventListener('DOMContentLoaded', () => {
    // Retrieve data from sessionStorage
    const phone = sessionStorage.getItem('confirmedPhoneNumber');
    const name = sessionStorage.getItem('userName');
    const day = sessionStorage.getItem('birthDay');
    const month = sessionStorage.getItem('birthMonth');
    const year = sessionStorage.getItem('birthYear');
    const email = sessionStorage.getItem('userEmail');


    let birthdayDisplay = '-';
    if (day && month && year) {
         birthdayDisplay = `${day} / ${month} / ${year}`; 
    }

    // Display Data
    document.getElementById('display-phone').textContent = phone || '-'; 
    document.getElementById('display-name').textContent = name || '-';
    document.getElementById('display-birthday').textContent = birthdayDisplay;
    document.getElementById('display-email').textContent = email || '-';
});