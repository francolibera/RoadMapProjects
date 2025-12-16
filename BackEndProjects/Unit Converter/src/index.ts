import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // <--- 1. Importa esto

// 2. Recreamos __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, '../public')));

const lengthRates: Record<string, number> = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.34,
};

app.post('/convert-length', (req, res) => {
  const value = parseFloat(req.body.value);
  const fromUnit = req.body.fromUnit;
  const toUnit = req.body.toUnit;

  const valueInMeters = value * (lengthRates[fromUnit] ?? 1);

  const result = valueInMeters / (lengthRates[toUnit] ?? 1);

  res.send(`
    <h1>Resultado</h1>
        <p>${value} ${fromUnit} son <strong>${result.toFixed(4)} ${toUnit}</strong></p>
        <a href="/index.html">Volver</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});