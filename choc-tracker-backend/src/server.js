require('dotenv').config();

const express = require('express');
const QRCode = require('qrcode');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.static('public'));


function generateProductId(name) {
  const prefix = name.replace(/\s/g, '').slice(0, 4).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  return `${prefix}-${ts}`;
}

app.post('/api/product', async (req, res) => {
  try {
    const { productName } = req.body;

    const id = generateProductId(productName);

    await prisma.item.create({
      data: {
        id: id,
        type: "PRODUCT"
      }
    });

    const qr = await QRCode.toDataURL(id);

    res.json({ id, qr });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating product");
  }
});


app.listen(3000, () => console.log('Server running on 3000'));
