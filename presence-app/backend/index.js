import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js"; 

const app = express();


app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api", usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});