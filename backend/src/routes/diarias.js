import express from "express";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { date, hours, clientId } = req.body;

    // Verifica se o ID do cliente é válido antes de criar a diária
    if (!validarIdCliente(clientId)) {
      return res.status(400).json({ error: "ID de cliente inválido" });
    }

    // Inicia a transação
    await prisma.$transaction([
      // Cria a diária
      prisma.diarias.create({
        data: { date: new Date(date), hours, clientId },
      }),
      // Outras operações que você queira incluir na transação
    ]);

    res.status(201).json({ message: "Diária criada com sucesso" });
  } catch (error) {
    console.error("Erro ao criar diária:", error);

    // Se ocorrer um erro, desfaz todas as operações na transação
    await prisma.$rollback();

    res.status(500).json({ error: "Erro ao criar diária" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const diaria = await prisma.diarias.findUnique({
      where: { id: req.params.id },
    });
    if (diaria) {
      res.status(200).json(diaria);
    } else {
      res.status(404).json({ error: "Diária não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao obter diária:", error);
    res.status(500).json({ error: "Erro ao obter diária" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { date, hours, clientId } = req.body;
    const diaria = await prisma.diarias.update({
      where: { id: req.params.id },
      data: { date: new Date(date), hours, clientId },
    });
    res.status(200).json(diaria);
  } catch (error) {
    console.error("Erro ao atualizar diária:", error);
    res.status(500).json({ error: "Erro ao atualizar diária" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.diarias.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Diária deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir diária:", error);
    res.status(500).json({ error: "Erro ao excluir diária" });
  }
});

export default router;
