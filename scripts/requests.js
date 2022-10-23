import { getLocalStorage } from "./localStorage.js";
import { toast, incorrectValues } from "./toasts.js";

const registerButton = document.querySelector(".acessar");
const urlBase = "http://localhost:3333/";

// Faz as verificacoes para efetuar o login
async function login(body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(urlBase + "login", options);

    if (request.ok) {
      const response = await request.json();
      localStorage.setItem("user", JSON.stringify(response));
      window.location.replace("../pages/homePage.html");
    } else {
      incorrectValues();
    }
  } catch (err) {
    incorrectValues();
  }
}

// Manda os dados de registro para a API
async function register(body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(urlBase + "users/create", options);

    registerButton.innerHTML = "";
    registerButton.innerText = "Cadastrar";
    registerButton.classList.remove("loading");

    if (request.ok) {
      toast("successful", "Sua conta foi criada com sucesso!");

      setTimeout(() => {
        window.location.replace("../index.html");
      }, 4000);
    } else {
      toast("unsuccessful", "Algo deu errado :(");
    }
  } catch (err) {
    toast("unsuccessful", "Algo deu errado :(");
    registerButton.innerHTML = "";
    registerButton.innerText = "Cadastrar";
    registerButton.classList.remove("loading");
  }
}

// Puxa os dados existentes, referentes aquele usuario, da API
async function getPosts() {
  const localStorage = await getLocalStorage();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  try {
    const request = await fetch(urlBase + "posts", options);
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export { login, register, getPosts };
