import { getLocalStorage } from "./localStorage.js";
import { deletePostToast } from "./toasts.js";

const base_url = "http://localhost:3333/";

async function deletePostModal(id) {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modalContainer = document.createElement("form");
  const h3 = document.createElement("h3");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const closeButton = document.createElement("button");
  const divButtons = document.createElement("div");
  const cancelButton = document.createElement("button");
  const confirmButton = document.createElement("button");

  modalWrapper.classList = "create-modal-wrapper";
  modalContainer.classList = "create-modal-container";
  divButtons.classList = "create-div-buttons";
  closeButton.classList = "create-button close-button";
  cancelButton.classList = "create-button";
  confirmButton.classList = "confirm-button";

  h3.innerText = "Confirmação de exclusão";
  h2.innerText = "Tem certeza que deseja excluir este post?";
  p.innerText =
    "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir";
  cancelButton.innerText = "Cancelar";
  confirmButton.innerText = "Sim, excluit este post";
  closeButton.innerText = "X";

  closeButton.setAttribute("type", "button");
  cancelButton.setAttribute("type", "button");
  confirmButton.setAttribute("type", "submit");

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });
  cancelButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  divButtons.append(cancelButton, confirmButton);
  modalContainer.append(h3, h2, p, divButtons, closeButton);
  modalWrapper.append(modalContainer);
  body.append(modalWrapper);

  deletePost(modalContainer, id, modalWrapper);
}

async function deleteRequest(id, modal) {
  const localStrg = await getLocalStorage();

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStrg.token}`,
    },
  };

  try {
    await fetch(base_url + "posts/" + id, options);

    deletePostToast('successful', 'Post deletado com sucesso!')

    modal.remove()

    setTimeout(() => {
      window.location.replace("../pages/homePage.html");
    }, 3000);
  } catch (err) {
    deletePostToast('unsuccessful', 'Não foi possível deletar o post')
  }
}

function deletePost(event, id, modal) {
  event.addEventListener("submit", async (target) => {
    target.preventDefault();
    await deleteRequest(id, modal);
  });
}

export { deletePostModal };
