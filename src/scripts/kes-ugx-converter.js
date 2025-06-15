console.log('KES-UGX Converter: Script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('KES-UGX Converter: DOM fully loaded');
  
  const amountInput = document.getElementById('amount-input');
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const resultDisplay = document.getElementById('result');
  const exchangeRateDisplay = document.getElementById('exchange-rate');
  const refreshButton = document.getElementById('refresh-rate');
  const lastUpdatedDisplay = document.getElementById('last-updated');
  const switchButton = document.getElementById('switch-currencies');

  // Debug log all found elements
  console.log('Found elements:', {
    amountInput: !!amountInput,
    fromCurrency: !!fromCurrency,
    toCurrency: !!toCurrency,
    resultDisplay: !!resultDisplay,
    exchangeRateDisplay: !!exchangeRateDisplay,
    refreshButton: !!refreshButton,
    lastUpdatedDisplay: !!lastUpdatedDisplay,
    switchButton: !!switchButton
  });

  if (!amountInput || !fromCurrency || !toCurrency || !resultDisplay || !exchangeRateDisplay || !refreshButton || !switchButton) {
    console.error('KES-UGX Converter: One or more required DOM elements are missing.');
    return;
  }

  let exchangeRate = null;
  const CURRENCIES = {
    'KES': 'Kenyan Shilling',
    'UGX': 'Ugandan Shilling'
  };

  async function fetchRateAndConvert() {
    try {
      // Show loading state
      refreshButton.disabled = true;
      document.getElementById('refresh-icon').classList.add('hidden');
      document.getElementById('loading-icon').classList.remove('hidden');
      
      // Using the same API but for UGX
      const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/kes.json');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data.kes && data.kes.ugx) {
        exchangeRate = data.kes.ugx;
        updateRateDisplay();
        lastUpdatedDisplay.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        updateConversion();
      } else {
        throw new Error('Invalid data from API');
      }
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      exchangeRateDisplay.textContent = 'Error fetching rate. Try refreshing.';
      resultDisplay.textContent = 'Error';
    } finally {
      // Reset loading state
      refreshButton.disabled = false;
      document.getElementById('refresh-icon').classList.remove('hidden');
      document.getElementById('loading-icon').classList.add('hidden');
    }
  }

  function updateRateDisplay() {
    if (exchangeRate === null) return;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (from === 'KES' && to === 'UGX') {
      exchangeRateDisplay.textContent = `1 ${from} = ${exchangeRate.toFixed(2)} ${to}`;
    } else if (from === 'UGX' && to === 'KES') {
      exchangeRateDisplay.textContent = `1 ${from} = ${(1 / exchangeRate).toFixed(6)} ${to}`;
    }
  }

  function updateConversion() {
    if (exchangeRate === null) return;

    const amount = parseFloat(amountInput.value) || 0;
    let result;
    
    if (fromCurrency.value === 'KES' && toCurrency.value === 'UGX') {
      result = amount * exchangeRate;
    } else if (fromCurrency.value === 'UGX' && toCurrency.value === 'KES') {
      result = amount / exchangeRate;
    } else {
      result = amount; // Same currency
    }

    resultDisplay.textContent = `${result.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })} ${toCurrency.value}`;
  }

  function switchCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    if (exchangeRate !== null) {
      updateRateDisplay();
      updateConversion();
    }
  }

  // Event Listeners
  amountInput.addEventListener('input', updateConversion);
  fromCurrency.addEventListener('change', () => {
    updateRateDisplay();
    updateConversion();
  });
  toCurrency.addEventListener('change', () => {
    updateRateDisplay();
    updateConversion();
  });
  refreshButton.addEventListener('click', fetchRateAndConvert);
  switchButton.addEventListener('click', switchCurrencies);

  // Initial fetch
  fetchRateAndConvert();

  // Auto-refresh every 5 minutes (300000 ms)
  setInterval(fetchRateAndConvert, 300000);
  
  // Test function to verify script is working
  window.testKesUgxConverter = function() {
    console.log('KES-UGX Converter: Test function called');
    return {
      version: '1.0.0',
      status: 'working',
      elementsFound: {
        amountInput: !!amountInput,
        fromCurrency: !!fromCurrency,
        toCurrency: !!toCurrency,
        resultDisplay: !!resultDisplay,
        exchangeRateDisplay: !!exchangeRateDisplay,
        refreshButton: !!refreshButton,
        lastUpdatedDisplay: !!lastUpdatedDisplay,
        switchButton: !!switchButton
      }
    };
  };
  
  console.log('KES-UGX Converter: Test function available as window.testKesUgxConverter()');
});
