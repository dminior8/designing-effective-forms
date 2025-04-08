let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');

        $('#country').select2({
            allowClear: true,  // Opcjonalne usunięcie wyboru
            width: '100%'
        });
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryAndCityByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            document.getElementById("country").value = country;
            document.getElementById("city").value = data.city;
            getCountryCode(country);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("")
        document.getElementById("countryCode").value = countryCode;
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

function showVat() {
    const checkbox = document.getElementById("vatUE");
    const vatDiv = document.getElementById("vat-info");

    checkbox.addEventListener("change", function () {
        vatDiv.style.display = this.checked ? "block" : "none";
    });
}

function toggleBlikInput() {
    const blikInput = document.getElementById('blikInput');
    const blikRadio = document.getElementById('blik');

    blikInput.style.display = blikRadio.checked ? 'block' : 'none';
}

function validateZipCode() {
    const zipCodeInput = document.getElementById('zipCode');
    if (zipCodeInput.validity.patternMismatch) {
        zipCodeInput.setCustomValidity('Proszę podać kod pocztowy w formacie XX-XXX');
    } else {
        zipCodeInput.setCustomValidity('');
    }
}

function validatePhoneNumber() {
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput.validity.patternMismatch) {
        phoneInput.setCustomValidity('Proszę podać 9-cyfrowy numer telefonu');
    } else {
        phoneInput.setCustomValidity('');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    form.classList.add('was-validated');
}

function initializeForm() {
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', toggleBlikInput);
    });

    document.getElementById('zipCode').addEventListener('input', validateZipCode);
    document.getElementById('phoneNumber').addEventListener('input', validatePhoneNumber);

    const form = document.getElementById('form');
    form.addEventListener('submit', handleFormSubmit);
}

(() => {
    document.addEventListener('click', handleClick);
    initializeForm();
    fetchAndFillCountries();
    getCountryAndCityByIP();
    showVat();
    toggleBlikInput();
})()