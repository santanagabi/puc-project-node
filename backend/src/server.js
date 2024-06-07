import express from "express";
import usersRouter from './routes/users.js';
import clientsRouter from './routes/clients.js';
import expensesRouter from './routes/expenses.js';
import diaristasRouter from './routes/diaristas.js';
import diariasRouter from './routes/diarias.js';

const app = express();
app.use(express.json());

app.use("/usuarios", usersRouter);
app.use("/api/clientes", clientsRouter);
app.use("/api/despesas", expensesRouter);
app.use("/api/diaristas", diaristasRouter);
app.use("/api/diarias", diariasRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
