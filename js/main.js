const nbpApi = 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';
const btn = document.querySelector('.input-button');
const inputField = document.querySelector('.input-name');
const currencySelect = document.querySelector('.currency-select');
const fetchCurrencies = async () => {
    const result = await fetch(nbpApi);
    const currenciesObject = await result.json();
    const rates = currenciesObject[0].rates;
    return rates;
};

const calculateCurrencies = async () => {
    const inputValue = parseFloat(inputField.value);
    const selectValue = currencySelect.value;
    const paragraphResult = document.querySelector('.result');
    let calculated = 0;
    
    if(!isNaN(inputValue) && inputValue > 0) {
        const result = await fetchCurrencies();
        const rate = result.find(({ code }) => code === selectValue).mid;
        calculated = (inputValue * rate).toFixed(2);
        paragraphResult.innerText = `${inputValue} ${selectValue} to ${calculated} PLN`;
    }

    else{
        swal({
            title: "Kwota musi być liczbą dodatnią",
            text: "Wprowadź odpowiednią wartość.",
            icon: "error",
            button: "OK",
          });
    }
};

btn.addEventListener('click', calculateCurrencies);

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        calculateCurrencies();
    }
});