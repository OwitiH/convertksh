document.addEventListener('DOMContentLoaded', () => {
  const usdAmountInput = document.getElementById('usd-amount');
  const kesResultDisplay = document.getElementById('kes-result');
  const exchangeRateDisplay = document.getElementById('exchange-rate');
  const presetButtons = document.querySelectorAll('.preset-amount');
  const refreshButton = document.getElementById('refresh-rate');
  const lastUpdatedDisplay = document.getElementById('last-updated');

  if (!usdAmountInput || !kesResultDisplay || !exchangeRateDisplay || !presetButtons.length || !refreshButton) {
    console.error('Converter script: One or more required DOM elements are missing.');
    return;
  }

  let usdToKesRate = null;

  async function fetchRateAndConvert() {
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json?t=${timestamp}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data.usd && data.usd.kes) {
        usdToKesRate = data.usd.kes;
        exchangeRateDisplay.textContent = `1 USD = ${usdToKesRate.toFixed(2)} KES`;
        lastUpdatedDisplay.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        updateConversion();
      } else {
        throw new Error('Invalid data from API');
      }
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      exchangeRateDisplay.textContent = 'Error fetching rate. Try refreshing.';
      kesResultDisplay.textContent = 'Error';
    }
  }

  function updateConversion() {
    if (usdToKesRate === null) return;

    const usdAmount = parseFloat(usdAmountInput.value);
    if (!isNaN(usdAmount) && usdAmount > 0) {
      const kesAmount = usdAmount * usdToKesRate;
      kesResultDisplay.textContent = `${kesAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} KES`;
    } else {
      kesResultDisplay.textContent = '0.00 KES';
    }
  }

  usdAmountInput.addEventListener('input', updateConversion);

  presetButtons.forEach(button => {
    button.addEventListener('click', () => {
      const amount = parseFloat(button.textContent.replace('$', ''));
      usdAmountInput.value = amount.toString();
      updateConversion();
    });
  });

  // Initial fetch
  fetchRateAndConvert();

  // Add refresh button click handler
  refreshButton.addEventListener('click', fetchRateAndConvert);

  // Auto-refresh every 5 minutes (300000 ms)
  setInterval(fetchRateAndConvert, 300000);
});
