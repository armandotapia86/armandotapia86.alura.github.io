document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('cantidad');
    const convertBtn = document.getElementById('btnConvertir');
    const resultText = document.getElementById('resultado');
    const origenSelect = document.getElementById('monedaOrigen');
    const destinoSelect = document.getElementById('monedaDestino');

    convertBtn.addEventListener('click', function() {
        // Validación de entrada
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            resultText.textContent = "Por favor, ingrese una cantidad válida.";
            return;
        }

        const origen = origenSelect.value;
        const destino = destinoSelect.value;

        // Realizar la llamada a la API de conversión de moneda
        fetch(`https://v6.exchangerate-api.com/v6/386222749e0e3e8b283facd1/latest/${origen}`)
            .then(response => response.json())
            .then(data => {
                if (data.result === "error") {
                    throw new Error(data['error-type']);
                }

                const conversionRate = data.conversion_rates[destino];
                const convertedAmount = amount * conversionRate;

                // Presentar el resultado de manera más clara
                resultText.textContent = `Cantidad ingresada: ${amount} ${origen}. Su cambio aproximado es: ${convertedAmount.toFixed(2)} ${destino}. Tasa de cambio: 1 ${origen} = ${conversionRate.toFixed(4)} ${destino}`;
            })
            .catch(error => {
                console.error('Error al obtener los datos de conversión:', error);
                resultText.textContent = "Ocurrió un error al obtener los datos de conversión. Por favor, inténtelo de nuevo más tarde.";
            });
    });
});