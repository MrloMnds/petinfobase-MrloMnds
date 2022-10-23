import { register } from "./requests.js";

const formRegister = document.querySelector('.register-form')
const button = document.querySelector('.acessar')
const elements2 = [...formRegister.elements]

// evento no botao de submit, para checar se os dados passados no input estao corretos
formRegister.addEventListener('submit', async target => {
    target.preventDefault()

    const body = {}

    elements2.forEach(element => {
        if (element.tagName === "INPUT" && element.value != '') {
            body[element.id] = element.value
        }
    })
    await register(body)
})

// evento nos inputs para checar se o botao pode ou nao ser liberado
formRegister.addEventListener('keyup', () => {
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')
    const username = document.querySelector('#username')
    const photo = document.querySelector('#avatar')

    if (email.value != '' && password.value != '' && photo.value != '' && username.value != '') {
        button.removeAttribute('disabled')
    }
    if (email.value == '' || password.value == '' && photo.value == '' && username.value == '') {
        button.setAttribute('disabled', true)
    }
})
