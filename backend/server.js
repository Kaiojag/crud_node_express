const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Servir o frontend

// Banco de dados em memória
let usuarios = [];
let idAtual = 1;

// Criar usuário (POST)
app.post('/usuarios', (req, res) => {
    const { nome, idade } = req.body;
    const novoUsuario = { id: idAtual++, nome, idade };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

// Listar usuários (GET)
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Buscar usuário por ID (GET)
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    usuario ? res.json(usuario) : res.status(404).json({ erro: 'Usuário não encontrado' });
});

// Atualizar usuário (PUT)
app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    usuario.nome = req.body.nome || usuario.nome;
    usuario.idade = req.body.idade || usuario.idade;
    res.json(usuario);
});

// Excluir usuário (DELETE)
app.delete('/usuarios/:id', (req, res) => {
    usuarios = usuarios.filter(u => u.id !== parseInt(req.params.id));
    res.json({ mensagem: 'Usuário removido' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
