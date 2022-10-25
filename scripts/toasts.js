//coloca a mensagem vermelha de login ou senha incorretos abaixo do input
//borda vermelha nos inputs
function incorrectValues() {
  const passwordInput = document.querySelector("#password");
  const emailInput = document.querySelector("#email");
  const errorMassage = document.createElement("p");
  const divPassword = document.querySelector(".div-senha");

  errorMassage.innerText = "Algum dos dados entao incorretos";
  passwordInput.style.border = "solid 2px var(--alert100)";
  emailInput.style.border = "solid 2px var(--alert100)";
  errorMassage.classList = "error-message";

  divPassword.append(errorMassage);
}

//faz o toast aparecer
function toast(status, message) {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  const titleContainer = document.createElement("div");
  const title = document.createElement("h3");
  const icon = document.createElement("img");
  const msg = document.createElement("p");
  const link = document.createElement("a");

  container.classList = "toast-container";
  title.innerText = message;

  if (status == "successful") {
    title.style.color = "var(--sucess100)";
    icon.src = "/img/success-svgrepo-com.svg";
    icon.alt = "Icone verde com um check branco dentro";
    msg.innerText =
      "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: ";
    link.innerText = "Acessar página de login";
    link.setAttribute("href", "../index.html");
    titleContainer.append(icon, title);
    container.append(titleContainer, msg, link);
    body.append(container);
  } else {
    title.style.color = "var(--alert100)";
    icon.src = "/img/error-svgrepo-com.svg";
    icon.alt = "Icone vermelho com um X branco dentro";
    msg.innerText = "O usuário que está tentando criar talvez já exista";
    titleContainer.append(icon, title);
    container.append(titleContainer, msg);
    body.append(container);
  }
}

//toast para o post
function postToast(status, message) {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  const titleContainer = document.createElement("div");
  const title = document.createElement("h3");
  const icon = document.createElement("img");
  const msg = document.createElement("p");

  container.classList = "toast-container";
  title.innerText = message;

  if (status == "successful") {
    title.style.color = "var(--sucess100)";
    icon.src = "/img/success-svgrepo-com.svg";
    icon.alt = "Icone verde com um check branco dentro";
    msg.innerText = "Post criado/editado, a partir de agora aparecerá no feed";
    titleContainer.append(icon, title);
    container.append(titleContainer, msg);
    body.append(container);
  } else {
    title.style.color = "var(--alert100)";
    icon.src = "/img/error-svgrepo-com.svg";
    icon.alt = "Icone vermelho com um X branco dentro";
    msg.innerText = "Algo deu errado na criação do post, tente novamente";
    titleContainer.append(icon, title);
    container.append(titleContainer, msg);
    body.append(container);
  }
}

function deletePostToast(status, message) {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  const titleContainer = document.createElement("div");
  const title = document.createElement("h3");
  const icon = document.createElement("img");
  const msg = document.createElement("p");

  container.classList = "toast-container";
  title.innerText = message;

  if (status == "successful") {
    title.style.color = "var(--sucess100)";
    icon.src = "/img/success-svgrepo-com.svg";
    icon.alt = "Icone verde com um check branco dentro";
    msg.innerText = "O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed";
    titleContainer.append(icon, title);
    container.append(titleContainer, msg);
    body.append(container);
  } else {
    title.style.color = "var(--alert100)";
    icon.src = "/img/error-svgrepo-com.svg";
    icon.alt = "Icone vermelho com um X branco dentro";
    msg.innerText = "Algo deu errado na criação do post, tente novamente";
    titleContainer.append(icon, title);
    container.append(titleContainer, msg);
    body.append(container);
  }
}

export { incorrectValues, toast, postToast, deletePostToast };