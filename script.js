class Contato {
  constructor(nome, email, telefone) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  get nome() {
    return this._nome;
  }
  set nome(valor) {
    if (!valor) throw new Error("Nome é obrigatório");
    this._nome = valor;
  }

  get email() {
    return this._email;
  }
  set email(valor) {
    if (!valor.includes("@")) throw new Error("E-mail inválido");
    this._email = valor;
  }

  get telefone() {
    return this._telefone;
  }
  set telefone(valor) {
    if (!valor.match(/^\d{8,15}$/)) throw new Error("Telefone inválido");
    this._telefone = valor;
  }
}

let contatos = [];

function carregarContatos() {
  const dados = localStorage.getItem("contatos");
  if (dados) {
    const json = JSON.parse(dados);
    contatos = json.map(c => new Contato(c._nome, c._email, c._telefone));
  }
}

function salvarContatos() {
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

function renderizarContatos() {
  const lista = document.getElementById("listaContatos");
  lista.innerHTML = "";
  contatos.forEach((contato, index) => {
    const div = document.createElement("div");
    div.className = "contato";
    div.innerHTML = `
      <strong>Nome:</strong> ${contato.nome}<br/>
      <strong>Email:</strong> ${contato.email}<br/>
      <strong>Telefone:</strong> ${contato.telefone}<br/>
      <button onclick="removerContato(${index})">Remover</button>
    `;
    lista.appendChild(div);
  });
}

function adicionarContato(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  try {
    const novo = new Contato(nome, email, telefone);
    contatos.push(novo);
    salvarContatos();
    renderizarContatos();
    document.getElementById("formContato").reset();
  } catch (erro) {
    alert("Erro ao cadastrar: " + erro.message);
  }
}

function removerContato(index) {
  if (confirm("Deseja remover este contato?")) {
    contatos.splice(index, 1);
    salvarContatos();
    renderizarContatos();
  }
}

document.getElementById("formContato").addEventListener("submit", adicionarContato);
carregarContatos();
renderizarContatos();
