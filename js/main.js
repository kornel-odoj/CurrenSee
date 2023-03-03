const nbpApi = 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';

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

    for (i = 0; i < result.length; i++) {
        if (result[i].code === 'EUR') {
            EUR = result[i];
        } else if (result[i].code === 'USD') {
            USD = result[i];
        } else if (result[i].code === 'CHF') {
            CHF = result[i];
        }
    }
};


// calculateCurrencies();