const nbpApi = 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';
const btn = document.querySelector('.input-button');
const inputField = document.querySelector('.input-name')

const fetchCurrencies = async () => {
    const result1 = await fetch(nbpApi);
    const currenciesObject = await result1.json();
    const rates = currenciesObject[0].rates;
    return rates;
};

const calculateCurrencies = async () => {
    const result = await fetchCurrencies();
    let EUR, USD, CHF;
    const input = parseFloat(inputField.value);
    const select = document.querySelector('.currency-select').value;
    const paragraphResult  = document.querySelector('.result');
    let calculated = 0;

    for (i = 0; i < result.length; i++) {
        if (result[i].code === 'EUR') {
            EUR = result[i].mid;
        } else if (result[i].code === 'USD') {
            USD = result[i].mid;
        } else if (result[i].code === 'CHF') {
            CHF = result[i].mid;
        }
    }

    if (!isNaN(input) && input > 0){
        if(select == "EUR"){
            calculated = input * EUR;
        }else if(select == "USD"){
            calculated = input * USD;
        }else if(select == "CHF"){
            calculated = input * CHF;
        }
        calculated = calculated.toFixed(2);
        paragraphResult.innerText = `${input} ${select} to ${calculated} PLN`;
    }else{
        swal({
            title: "Kwota musi być liczbą dodatnią",
            text: "Wprowadź odpowiednią wartość.",
            icon: "error",
            button: "OK",
          });
    }
};

const currencySelect = document.querySelector('.currency-select');
currencySelect.addEventListener('change', () => {
    const selectedCurrency = currencySelect.value;
    const queryString = `?currencies=${selectedCurrency}#`;
    window.history.replaceState(null, null, queryString);
});

btn.addEventListener('click', calculateCurrencies);

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculateCurrencies();
    }
});

window.addEventListener('load', () => {
    window.history.replaceState(null, null, '?currencies=EUR#');
})