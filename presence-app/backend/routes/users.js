import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const router = express.Router()

router.post("/register",async(req,res) => {

  const { nom,prenoms, email, telephone } = req.body

  try {
    const user = await prisma.user.create({
      data : {
        nom,
        prenoms,
        email,
        telephone}
    })
    res.json({ message : "Utilisateur enregistré", user})
  }
  catch(err){
    console/log(err)
    res.status(400).json({ error: "Echec de l'enregistrment"})
  }

})

export default router