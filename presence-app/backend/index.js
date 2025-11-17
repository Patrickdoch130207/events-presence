const express = require("express");
const app = express();

// Middleware JSON
app.use(express.json());

// Route simple
app.get("/", (req, res) => {
  res.send("API Node.js + Express.js avec Yarn 🚀");
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur http://localhost:" + PORT);
});
