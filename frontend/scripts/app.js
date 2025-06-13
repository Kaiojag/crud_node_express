const API_URL = "http://localhost:3000/usuarios";

function criarUsuario() {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //informa que o corpo da requisição está em formato JSON
        body: JSON.stringify({ //converte o json para texto para enviar pelo body
            nome: document.getElementById("postNome").value,
            idade: document.getElementById("postIdade").value
        })
    })
    .then(response => response.json()).then(console.log)
    .catch(error => console.error("Erro ao criar usuário:", error));
}

function atualizarUsuario() {
    const id = document.getElementById("putId").value;
    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: document.getElementById("putNome").value,
            idade: document.getElementById("putIdade").value
        })
    })
    .then(response => response.json()).then(console.log)
    .catch(error => console.error("Erro ao atualizar usuário:", error));
}

function removerUsuario() {
    const id = document.getElementById("deleteId").value;
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => alert("Usuário removido com sucesso!"))
    .catch(error => console.error("Erro ao remover usuário:", error));
}

function mostrarUsuarios() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            let lista = "<h4>Usuários cadastrados:</h4><ul>";
            data.forEach(usuario => {
                lista += `<li>ID: ${usuario.id} - Nome: ${usuario.nome} - Idade: ${usuario.idade}</li>`;
            });
            lista += "</ul>";
            document.getElementById("usuariosLista").innerHTML = lista;
        })
        .catch(error => console.error("Erro ao buscar usuários:", error));
}
