import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

let products: any[] = [];
let events: any[] = [];

// Create Product (Producer)
app.post("/create_product", (req, res) => {
  const id = uuidv4();
  products.push({
    id,
    createdAt: new Date(),
    status: "Manufactured",
  });
  res.json({ productId: id });
});

// Scan QR (Middleman)
app.post("/scan_qr", (req, res) => {
  const { qrId, location, eventType } = req.body;
  events.push({
    qrId,
    location,
    eventType,
    time: new Date(),
  });
  res.json({ message: "Scan logged" });
});

// Get Product Journey (Consumer)
app.get("/get_product_journey/:id", (req, res) => {
  const id = req.params.id;
  const history = events.filter((e) => e.qrId === id);
  res.json(history);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
