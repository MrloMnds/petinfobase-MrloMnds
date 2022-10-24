const registerButton = document.querySelector(".acessar");

function loading() {
  const loadingImg = document.createElement("img");

  registerButton.innerText = "";
  loadingImg.classList.add("loading");
  loadingImg.src = "../img/spinner.png";
  registerButton.append(loadingImg);
}

registerButton.addEventListener("click", () => loading());
