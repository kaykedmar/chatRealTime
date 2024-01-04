// login Elements
const login = document.querySelector(".login");

// Buscar um elemento dentro de uma classe especifica, nesse caso "login"
const loginForm = login.querySelector(".login_form");
const loginInput = login.querySelector(".login_input");

// Chat Elements
const chat = document.querySelector(".chat");
const chatForm = login.querySelector(".chat_form");
const chatInput = login.querySelector(".chat_input");

// Array de cores
const colors = [
  "aquamarine",
  "aqua",
  "blue",
  "bisque",
  "brown",
  "darkgreen",
  "darkred",
  "gold",
];

// Salvando informações do usuario.
const user = { id: "", name: "", color: "" };

let websocket;

// função para sortear as cores aleatorias.
const getRandomColor = () => {
  // o tamanho do array com .length e arredondando pra baixo com Math.floor
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};

// Responsavel por gerar o balão e colocar na tela
const processMessage = ({ data }) => {
  const { userId, userName, userColor, content} = JSON.parse(data)  
};

const handleLogin = (event) => {
  event.preventDefault();

  // Gerando ID unico do usuário.
  user.id = crypto.randomUUID();

  user.name = loginInput.value;

  // Gerando uma cor aleatoria do array pro usuário
  user.color = getRandomColor();

  // Ocultando o Login
  login.style.display = "none";
  chat.style.display = "flex";

  // Criando uma conexão
  websocket = new WebSocket("ws://localhost:8080");

  // Sempre que o nosso servidor enviar uma mensagem pra gente, vai executar a função processMessage
  websocket.onmessage = processMessage;
};

// Enviando uma messagem pro servidor
const sendMessage = (event) => {
  event.preventDefault();

  // Objeto
  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,

    // Conteudo da messagem
    content: chatInput.value,
  };

  websocket.send(JSON.stringify(message));

  // Limpando input da messagem enviada pelo usuário.
  chatInput.value = "";
};

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);
