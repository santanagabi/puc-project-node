import express from "express";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const diarista = await prisma.diarista.create({
      data: { name, email },
    });
    res.status(201).json(diarista);
  } catch (error) {
    console.error("Erro ao criar diarista:", error);
    res.status(500).json({ error: "Erro ao criar diarista" });
  }
});

router.get("/", async (req, res) => {
  try {
    const diaristas = await prisma.diarista.findMany();
    res.status(200).json(diaristas);
  } catch (error) {
    console.error("Erro ao obter diaristas:", error);
    res.status(500).json({ error: "Erro ao obter diaristas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const diarista = await prisma.diarista.findUnique({
      where: { id },
    });
    if (diarista) {
      res.status(200).json(diarista);
    } else {
      res.status(404).json({ error: "Diarista não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao obter diarista:", error);
    res.status(500).json({ error: "Erro ao obter diarista" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const diarista = await prisma.diarista.update({
      where: { id },
      data: { name, email },
    });
    res.status(200).json(diarista);
  } catch (error) {
    console.error("Erro ao atualizar diarista:", error);
    res.status(500).json({ error: "Erro ao atualizar diarista" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.diarista.delete({
      where: { id },
    });
    res.status(200).json({ message: "Diarista deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir diarista:", error);
    res.status(500).json({ error: "Erro ao excluir diarista" });
  }
});

export default router;
