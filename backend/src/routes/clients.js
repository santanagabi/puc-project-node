import express from "express";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

const validarIdCliente = async (clientId) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: clientId },
    });
    return cliente !== null;
  } catch (error) {
    console.error("Erro ao validar ID do cliente:", error);
    throw new Error("Erro ao validar ID do cliente");
  }
};

// Rota para criar uma nova diária associada a um cliente
router.post("/:clientId/diarias", async (req, res) => {
  try {
    const { date, hours } = req.body;
    const { clientId } = req.params;

    // Verifica se o ID do cliente é válido
    const clienteValido = await validarIdCliente(clientId);
    if (!clienteValido) {
      return res.status(400).json({ error: "ID de cliente inválido" });
    }

    // Cria a diária associada ao cliente
    const novaDiaria = await prisma.diarias.create({
      data: { date: new Date(date), hours, clientId },
    });

    res.status(201).json({ message: "Diária criada com sucesso", diaria: novaDiaria });
  } catch (error) {
    console.error("Erro ao criar diária:", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter todos os clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Erro ao obter clientes:", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um cliente pelo ID
router.get("/:id", async (req, res) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: req.params.id },
    });
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao obter cliente:", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um cliente pelo ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const clienteAtualizado = await prisma.cliente.update({
      where: { id: req.params.id },
      data: { name, email },
    });
    res.status(200).json(clienteAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para excluir um cliente pelo ID
router.delete("/:id", async (req, res) => {
  try {
    await prisma.cliente.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
