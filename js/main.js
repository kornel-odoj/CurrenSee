const nbpApi = 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';
const btn = document.querySelector('.input-button');

const fetchCurrencies = async () => {
    const result1 = await fetch(nbpApi);
    const currenciesObject = await result1.json();
    
    const inner = currenciesObject[0];
    const rates = inner.rates;

    return rates;
};


const calculateCurrencies = async () => {
    const result = await fetchCurrencies();
    let EUR, USD, CHF;
    const input = document.querySelector('.input-name');
    const select = document.querySelector('.currency-select');
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

    if (input.value >= 0){
        if(select.value == "EUR"){
            calculated = input.value * EUR;
        }else if(select.value == "USD"){
            calculated = input.value * USD;
        }else if(select.value == "CHF"){
            calculated = input.value * CHF;
        }
        calculated = calculated.toFixed(2);
        paragraphResult.innerText = `${input.value} ${select.value} to ${calculated} PLN`;
    }else{
        alert('Kwota nie może być ujemna! Wprowadź odpowiednią wartość.');
    }
};

btn.addEventListener('click', calculateCurrencies);