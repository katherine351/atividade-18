
import express from "express";
import { lerMensagens, salvarMensagens } from "./store.js";

const app = express();

const PORTA = 3000;

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

// Rota para consultar mensagens
app.get("/mensagens", async (req, res) => {
    try {
        res.json(await lerMensagens());
    } catch (erro) {
        res.status(500).json({ erro: "Erro na leitura" });
    }
});

// Rota para salvar mensagem de exemplo
app.get("/exemplo-salvar", async (req, res) => {
    try {
        const lista = await lerMensagens();

        lista.push({
            id: Date.now(),
            usuario: "Aluno",
            texto: "Mensagem gravada no disco!"
        });

        await salvarMensagens(lista);

        res.json({ gravado: true, total: lista.length });

    } catch (erro) {
        res.status(500).json({ erro: "Falha ao gravar" });
    }
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
