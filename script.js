// script.js
document.getElementById('card-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
    const cardHolder = document.getElementById('card-holder').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const resultDiv = document.getElementById('validation-result');

    if (!validateCardNumber(cardNumber)) {
        resultDiv.textContent = 'Invalid card number.';
        resultDiv.style.color = 'red';
        return;
    }

    if (!validateExpiryDate(expiryDate)) {
        resultDiv.textContent = 'Invalid expiry date.';
        resultDiv.style.color = 'red';
        return;
    }

    if (!validateCVV(cvv)) {
        resultDiv.textContent = 'Invalid CVV.';
        resultDiv.style.color = 'red';
        return;
    }

    resultDiv.textContent = 'Card is valid.';
    resultDiv.style.color = 'green';
});

function validateCardNumber(number) {
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(number)) return false;
    return luhnCheck(number);
}

function luhnCheck(val) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = val.length - 1; i >= 0; i--) {
        let digit = parseInt(val.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
}

function validateExpiryDate(date) {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    const [month, year] = date.split('/').map(num => parseInt(num, 10));
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    return true;
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}
