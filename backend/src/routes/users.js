import express from "express";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const user = await prisma.user.create({
      data: { email, name, age },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

router.get("/", async (req, res) => {
  try {
    let users;
    if (req.query) {
      users = await prisma.user.findMany({
        where: {
          name: req.query.name,
          email: req.query.email,
          age: req.query.age,
        },
      });
    } else {
      users = await prisma.user.findMany();
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    res.status(500).json({ error: "Erro ao obter usuários" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { email, name, age },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

export default router;
