import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 

const formatNumber = (num: number) => Number.isInteger(num) ? num.toString() : num.toFixed(4).replace(/\.?0+$/, '');

function generateResultHtml(val: number, from: string, res: number, to: string, backUrl: string) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultado</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="sketch-container" style="text-align: center;">
            <h1>Unit Converter</h1>

            <p class="result-label">Result of your calculation</p>

            <div class="result-value">
                ${formatNumber(val)} ${from} = <strong>${formatNumber(res)} ${to}</strong>
            </div>

            <a href="${backUrl}" class="button-link">Reset</a>
        </div>
    </body>
    </html>
  `;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, '../public')));

const lengthRates: Record<string, number> = {
  millimeters: 0.001,
  centimeters: 0.01,
  meters: 1,
  kilometers: 1000,
  inches: 0.0254,
  feet: 0.3048,
  yards: 0.9144,
  miles: 1609.34,
};

app.post('/convert-length', (req, res) => {
  const value = parseFloat(req.body.value);
  const fromUnit = req.body.fromUnit;
  const toUnit = req.body.toUnit;

  const valueInMeters = value * (lengthRates[fromUnit] ?? 1);

  const result = valueInMeters / (lengthRates[toUnit] ?? 1);

  
  res.send(generateResultHtml(value, fromUnit, result, toUnit, '/index.html'));
});

const temperarureRates: Record<string, number> = {
  celsius: 0,
  fahrenheit: 32,
  kelvin: 273.15,
};

app.post('/convert-temperature', (req, res) => {
  const value = parseFloat(req.body.value);
  const fromUnit = req.body.fromUnit;
  const toUnit = req.body.toUnit;
  
  const valueInCelsius = fromUnit === 'celsius' ? value :
                        fromUnit === 'fahrenheit' ? (value - 32) * 5/9 :
                        value - 273.15;

  const result = toUnit === 'celsius' ? valueInCelsius :
                 toUnit === 'fahrenheit' ? (valueInCelsius * 9/5) + 32 :
                 valueInCelsius + 273.15;

  res.send(generateResultHtml(value, fromUnit, result, toUnit, '/temperature.html'));
} );

const weightRates: Record<string, number> = {
  milligrams: 0.000001,
  grams: 0.001,
  kilograms: 1,
  ounces: 0.0283495,
  pounds: 0.453592,
};

app.post('/convert-weight', (req, res) => {
  const value = parseFloat(req.body.value);
  const fromUnit = req.body.fromUnit;
  const toUnit = req.body.toUnit;
  const valueInKilograms = value * (weightRates[fromUnit] ?? 1);

  const result = valueInKilograms / (weightRates[toUnit] ?? 1);
  res.send(generateResultHtml(value, fromUnit, result, toUnit, '/weight.html'));
} );

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});