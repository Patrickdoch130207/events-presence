import express from "express";
import { PrismaClient } from "../prisma/generated/index.js";

const prisma = new PrismaClient();
const router = express.Router();

// ✅ GET tous les utilisateurs
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

// POST enregistrer un utilisateur
router.post("/register", async (req, res) => {
  const { nom, prenoms, email, numero } = req.body;

  if (!nom || !prenoms || !email || !numero) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà enregistré" });
    }

    const user = await prisma.user.create({
      data: {
        nom,
        prenoms,
        email,
        telephone: numero,
      },
    });

    res
      .status(201)
      .json({ message: "Utilisateur enregistré avec succès", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
});

export default router;
