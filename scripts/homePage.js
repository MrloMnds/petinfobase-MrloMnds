import { getLocalStorage } from "./localStorage.js";
import { getPosts, setMiniAvatarAndId } from "./requests.js";
import { postToast } from "./toasts.js";

const urlBase = "http://localhost:3333/";

// verifica se o usuario possui o token de permissao no localStorage
function verifyPermission() {
  const user = getLocalStorage();

  if (user == "") {
    window.location.replace("../../index.html");
  }
}
verifyPermission();
setMiniAvatarAndId();

//renderiza todos os posts que foram feitos
async function renderPosts() {
  const postsList = await getPosts();
  const feed = document.querySelector(".lista-posts");
  await homePageAvatarImg();

  postsList.forEach((element) => {
    const li = document.createElement("li");
    const divUserDateButtons = document.createElement("div");
    const divUserDate = document.createElement("div");
    const miniAvatar = document.createElement("img");
    const username = document.createElement("h3");
    const date = document.createElement("p");
    const title = document.createElement("h2");
    const content = document.createElement("p");
    const link = document.createElement("a");

    li.setAttribute('id', element.id)
    li.style.display = "flex";
    li.style.flexDirection = "column";
    li.style.gap = "1vh";
    divUserDateButtons.style.display = "flex";
    divUserDateButtons.style.justifyContent = "space-between";
    divUserDate.style.display = "flex";
    divUserDate.style.alignItems = "center";
    divUserDate.style.gap = "0.4vw";
    miniAvatar.src = element.user.avatar;
    miniAvatar.style.height = "5vh";
    miniAvatar.style.borderRadius = "50%";
    feed.style.listStyle = "none";
    username.innerText = element.user.username;

    let month = element.createdAt[5] + element.createdAt[6];
    let year =
      element.createdAt[0] +
      element.createdAt[1] +
      element.createdAt[2] +
      element.createdAt[3];

    // Trata as datas dos posts
    if (month == 1) {
      date.innerText = ` | Janeiro de ${year}`;
    } else if (month == 2) {
      date.innerText = ` | Fevereiro de ${year}`;
    } else if (month == 3) {
      date.innerText = ` | Março de ${year}`;
    } else if (month == 4) {
      date.innerText = ` | Abril de ${year}`;
    } else if (month == 5) {
      date.innerText = ` | Maio de ${year}`;
    } else if (month == 6) {
      date.innerText = ` | Junho de ${year}`;
    } else if (month == 7) {
      date.innerText = ` | Julho de ${year}`;
    } else if (month == 8) {
      date.innerText = ` | Agosto de ${year}`;
    } else if (month == 9) {
      date.innerText = ` | Setembro de ${year}`;
    } else if (month == 10) {
      date.innerText = ` | Outubro de ${year}`;
    } else if (month == 11) {
      date.innerText = ` | Novembro de ${year}`;
    } else if (month == 12) {
      date.innerText = ` | Dezembro de ${year}`;
    }

    title.innerText = element.title;
    content.innerText = element.content;
    link.innerText = "Acessar publicação";
    link.classList = "link";

    divUserDateButtons.append(divUserDate);
    divUserDate.append(miniAvatar, username, date);
    li.append(divUserDateButtons, title, content, link);
    feed.append(li);

    //adiciona os botoes "editar" e "excluir" / add event listener
    if (JSON.parse(localStorage.getItem("id")) == element.user.id) {
      const divEditDelete = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      editButton.innerText = "Editar";
      editButton.classList = "edit-button";
      editButton.setAttribute('id', element.id)
      deleteButton.classList = "delete-button";
      deleteButton.innerText = "Excluir";
      deleteButton.setAttribute('id', element.id)
      divEditDelete.classList = "div-edit-delete";
    
      //event listener para fazer o patch do conteudo postado
      editButton.addEventListener('click', async () => {
        openEditModal(element.title, element.content, element.id)
      })

      deleteButton.addEventListener('click', () => {
        //
      })

      divEditDelete.append(editButton, deleteButton);
      divUserDateButtons.append(divEditDelete);
    }

    //Checa a quantidade de caracteres no content
    if (content.innerText.length > 145) {
      content.classList = "over-145";
    }

    //event listener Acessar publicacao
    link.addEventListener("click", () => {
      const body = document.querySelector("body");
      const modalWrapper = document.createElement("section");
      const modalContainer = document.createElement("div");
      const closeButton2 = document.createElement("button");
      const divUserDate2 = document.createElement("div");
      const miniAvatar2 = document.createElement("img");
      const username2 = document.createElement("h3");
      const date2 = document.createElement("p");
      const title2 = document.createElement("h2");
      const content2 = document.createElement("p");

      miniAvatar2.src = element.user.avatar;
      miniAvatar2.style.height = "5vh";
      username2.innerText = element.user.username;

      let month = element.createdAt[5] + element.createdAt[6];
      let year =
        element.createdAt[0] +
        element.createdAt[1] +
        element.createdAt[2] +
        element.createdAt[3];

      if (month == 1) {
        date2.innerText = ` | Janeiro de ${year}`;
      } else if (month == 2) {
        date2.innerText = ` | Fevereiro de ${year}`;
      } else if (month == 3) {
        date2.innerText = ` | Março de ${year}`;
      } else if (month == 4) {
        date2.innerText = ` | Abril de ${year}`;
      } else if (month == 5) {
        date2.innerText = ` | Maio de ${year}`;
      } else if (month == 6) {
        date2.innerText = ` | Junho de ${year}`;
      } else if (month == 7) {
        date2.innerText = ` | Julho de ${year}`;
      } else if (month == 8) {
        date2.innerText = ` | Agosto de ${year}`;
      } else if (month == 9) {
        date2.innerText = ` | Setembro de ${year}`;
      } else if (month == 10) {
        date2.innerText = ` | Outubro de ${year}`;
      } else if (month == 11) {
        date2.innerText = ` | Novembro de ${year}`;
      } else if (month == 12) {
        date2.innerText = ` | Dezembro de ${year}`;
      }

      title2.innerText = element.title;
      content2.innerText = element.content;
      content2.style.textOverflow = "ellipsis";
      content2.style.overflow = "hidden";
      closeButton2.innerText = "X";

      modalWrapper.classList = "create-modal-wrapper";
      modalContainer.classList = "create-modal-container";
      closeButton2.classList = "create-button close-button";
      divUserDate2.classList = 'div-acessar-post'

      closeButton2.addEventListener("click", () => {
        modalWrapper.remove();
      });

      divUserDate2.append(miniAvatar2, username2, date2);
      modalContainer.append(divUserDate2, title2, content2, closeButton2);
      modalWrapper.append(modalContainer);
      body.append(modalWrapper);
    });
  });
}
renderPosts();

// Faz a comunicacao com a API para adicionar um post
async function createPost(body, modal) {
  const localStorage = await getLocalStorage();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(urlBase + "posts/create", options);

    if (request.ok) {
      modal.remove()

      postToast("successful", "Post criado com sucesso!");

      setTimeout(() => {
        window.location.replace("../pages/homePage.html");
      }, 3000);
    } else {
      postToast("unsuccessful", "Algo deu errado :(");
    }
  } catch (err) {
    postToast("unsuccessful", "Algo deu errado :(");
  }
}

const createPostButton = document.querySelector(".criar-publicacao");
const logoutButton = document.querySelector(".logout");

//Pega as infos dos inputs e transforma em um obj
function publish(event, modal) {
  event.addEventListener("submit", async target => {
    target.preventDefault();

    const body = {};

    const elements = [...event.elements];

    elements.forEach((element) => {
      if (element.tagName === "INPUT" && element.value != "") {
        body[element.id] = element.value;
      }
    });
    await createPost(body, modal);
  });
}

//event listener para criar um post novo
createPostButton.addEventListener("click", () => createPostModal());

//event listener que apaga o localStorage e faz o usuario voltar para a pagina de login
logoutButton.addEventListener("click", () => {
  localStorage.removeItem('user');
  localStorage.removeItem('avatar');
  localStorage.removeItem('id');
  window.location.replace("../index.html");
});

//Carrega o avatar do usuario
async function homePageAvatarImg() {
  const header = document.querySelector(".avatar-button-div");
  const avatarImg = document.createElement("img");

  const avatarSrc = (await JSON.parse(localStorage.getItem("avatar"))) || "";

  avatarImg.classList = "home-page-avatar";
  avatarImg.src = await avatarSrc;
  avatarImg.alt = "mini avatar";

  header.append(avatarImg);
}

//atualiza os posts editados
async function patch(id, event, modal) {
  event.addEventListener("submit", async target => {
    target.preventDefault()
    
    const body = {}

    const elements = [...event.elements];

    elements.forEach((element) => {
      if (element.tagName === "INPUT" && element.value != "") {
        body[element.id] = element.value;
      }
    });

    await editPost(id, body, modal)
  })
}

//comunica com a API para fzer o patch
async function editPost(id, edit, modal) {
  const localStrg = await getLocalStorage()
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStrg.token}`
    },
    body: JSON.stringify(edit)
  }
  
  try {
    await fetch(urlBase + 'posts/' + id, options)

    modal.remove()
    
    postToast('successful', 'Post editado')
    
    setTimeout(() => {
      window.location.replace("../pages/homePage.html");
    }, 3000);
    
  } catch(err) {
    console.log(err)
  }

}

//abre o modal de edicao
async function openEditModal(editTitle, editContent, editId) {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modalContainer = document.createElement("form");
  const title = document.createElement("h2");
  const divPostTitle = document.createElement("div");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const divPostDescription = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  const descriptionInput = document.createElement("input");
  const closeButton = document.createElement("button");
  const divButtons = document.createElement("div");
  const cancelButton = document.createElement("button");
  const publishButton = document.createElement("button");

  title.innerText = "Edição";
  titleLabel.innerText = "Título do post";
  titleInput.value = editTitle;
  titleInput.setAttribute("id", "title");
  descriptionLabel.innerText = "Conteúdo do post";
  descriptionInput.value = editContent
  descriptionInput.setAttribute("id", "content");

  closeButton.innerText = "X";
  closeButton.setAttribute("type", "button");
  cancelButton.innerText = "Cancelar";
  cancelButton.setAttribute("type", "button");
  publishButton.innerText = "Publicar";
  publishButton.setAttribute("type", "submit");

  modalWrapper.classList = "create-modal-wrapper";
  modalContainer.classList = "create-modal-container";
  divPostTitle.classList = "create-div-title";
  divPostDescription.classList = "create-div-title";
  titleLabel.classList = "create-label";
  descriptionLabel.classList = "create-label";
  titleInput.classList = "create-input";
  descriptionInput.classList = "create-input";
  divButtons.classList = "create-div-buttons";
  closeButton.classList = "create-button close-button";
  cancelButton.classList = "create-button";
  publishButton.classList = "create-publish-button";

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });
  cancelButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  divButtons.append(cancelButton, publishButton);
  divPostTitle.append(titleLabel, titleInput);
  divPostDescription.append(descriptionLabel, descriptionInput);
  modalContainer.append(
    title,
    divPostTitle,
    divPostDescription,
    divButtons,
    closeButton
  );
  modalWrapper.append(modalContainer);
  body.append(modalWrapper);

  patch(editId, modalContainer, modalWrapper)
}

//abre o modal de criar um post
function createPostModal() {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modalContainer = document.createElement("form");
  const title = document.createElement("h2");
  const divPostTitle = document.createElement("div");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const divPostDescription = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  const descriptionInput = document.createElement("input");
  const closeButton = document.createElement("button");
  const divButtons = document.createElement("div");
  const cancelButton = document.createElement("button");
  const publishButton = document.createElement("button");

  title.innerText = "Criando novo post";
  titleLabel.innerText = "Título do post";
  titleInput.setAttribute("placeholder", "Digite o título aqui...");
  titleInput.setAttribute("id", "title");
  descriptionLabel.innerText = "Conteúdo do post";
  descriptionInput.setAttribute(
    "placeholder",
    "Desenvolva o conteúdo do post aqui..."
  );
  descriptionInput.setAttribute("id", "content");
  closeButton.innerText = "X";
  closeButton.setAttribute("type", "button");
  cancelButton.innerText = "Cancelar";
  cancelButton.setAttribute("type", "button");
  publishButton.innerText = "Publicar";
  publishButton.setAttribute("type", "submit");

  modalWrapper.classList = "create-modal-wrapper";
  modalContainer.classList = "create-modal-container";
  divPostTitle.classList = "create-div-title";
  divPostDescription.classList = "create-div-title";
  titleLabel.classList = "create-label";
  descriptionLabel.classList = "create-label";
  titleInput.classList = "create-input";
  descriptionInput.classList = "create-input";
  divButtons.classList = "create-div-buttons";
  closeButton.classList = "create-button close-button";
  cancelButton.classList = "create-button";
  publishButton.classList = "create-publish-button";

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });
  cancelButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  publish(modalContainer, modalWrapper);

  divButtons.append(cancelButton, publishButton);
  divPostTitle.append(titleLabel, titleInput);
  divPostDescription.append(descriptionLabel, descriptionInput);
  modalContainer.append(
    title,
    divPostTitle,
    divPostDescription,
    divButtons,
    closeButton
  );
  modalWrapper.append(modalContainer);
  body.append(modalWrapper);
}
