document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('dblclick', function() {
        if (this.checked) {
            this.checked = false;
            this.dispatchEvent(new Event('change'));
        }
    });
    input.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('input[type="radio"]').forEach(otherInput => {
                if (otherInput !== this) {
                    otherInput.checked = false;
                }
            });
        }
    });
});

const form = document.getElementById('form');
const successMessage = document.getElementById('success-message');
const submitButton = document.getElementById('Submit');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('First').value.trim();
    const lastName = document.getElementById('Last').value.trim();
    const email = document.getElementById('Email').value.trim();
    const queryType = document.querySelector('input[name="query-type"]:checked');
    const message = document.getElementById('Message').value.trim();
    const consent = document.getElementById('Consent').checked;

    let isValid = true;

    if (firstName === '') {
        isValid = false;
        document.querySelector('#firsterror').style.display = 'block';
    } else {
        document.querySelector('#firsterror').style.display = 'none';
    }

    if (lastName === '') {
        isValid = false;
        document.querySelector('#lasterror').style.display = 'block';
    } else {
        document.querySelector('#lasterror').style.display = 'none';
    }

    if (!isValidEmail(email)) {
        isValid = false;
        document.querySelector('#emailerror').style.display = 'block';
    } else {
        document.querySelector('#emailerror').style.display = 'none';
    }

    if (!queryType) {
        isValid = false;
        document.querySelector('#queryerror').style.display = 'block';
    } else {
        document.querySelector('#queryerror').style.display = 'none';
    }

    if (message === '') {
        isValid = false;
        document.querySelector('#messageerror').style.display = 'block';
    } else {
        document.querySelector('#messageerror').style.display = 'none';
    }

    if (!consent) {
        isValid = false;
        document.querySelector('#consenterror').style.display = 'block';
    } else {
        document.querySelector('#consenterror').style.display = 'none';
    }

    if (isValid) {
        successMessage.classList.add('active');
        setTimeout(() => {
            successMessage.classList.remove('active');
        }, 5000);
        form.reset();
    } else {
        form.style.height = 'auto';
        const submitButton = document.getElementById('submit');
        submitButton.style.paddingBottom = '15px';
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}