import express from "express";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const despesa = await prisma.despesa.create({
      data: { description, amount, date: new Date(date) },
    });
    res.status(201).json(despesa);
  } catch (error) {
    console.error("Erro ao criar despesa:", error);
    res.status(500).json({ error: "Erro ao criar despesa" });
  }
});

router.get("/", async (req, res) => {
  try {
    const despesas = await prisma.despesa.findMany();
    res.status(200).json(despesas);
  } catch (error) {
    console.error("Erro ao obter despesas:", error);
    res.status(500).json({ error: "Erro ao obter despesas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const despesa = await prisma.despesa.findUnique({
      where: { id },
    });
    if (despesa) {
      res.status(200).json(despesa);
    } else {
      res.status(404).json({ error: "Despesa não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao obter despesa:", error);
    res.status(500).json({ error: "Erro ao obter despesa" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;
    const despesa = await prisma.despesa.update({
      where: { id },
      data: { description, amount, date: new Date(date) },
    });
    res.status(200).json(despesa);
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error);
    res.status(500).json({ error: "Erro ao atualizar despesa" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.despesa.delete({
      where: { id },
    });
    res.status(200).json({ message: "Despesa deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir despesa:", error);
    res.status(500).json({ error: "Erro ao excluir despesa" });
  }
});

export default router;
