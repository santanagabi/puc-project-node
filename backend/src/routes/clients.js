import express from "express";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const cliente = await prisma.cliente.create({
      data: { name, email },
    });
    res.status(201).json(cliente);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
});

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Erro ao obter clientes:", error);
    res.status(500).json({ error: "Erro ao obter clientes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.cliente.findUnique({
      where: { id },
    });
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao obter cliente:", error);
    res.status(500).json({ error: "Erro ao obter cliente" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const cliente = await prisma.cliente.update({
      where: { id },
      data: { name, email },
    });
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cliente.delete({
      where: { id },
    });
    res.status(200).json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).json({ error: "Erro ao excluir cliente" });
  }
});

export default router;
