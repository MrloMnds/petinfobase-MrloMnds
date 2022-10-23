import { login } from "./requests.js";

const formLogin = document.querySelector('.login-form')
const button = document.querySelector('.acessar')
const button2 = document.querySelector('.cadastro')
const elements = [...formLogin.elements]

// evento no botao de submit, para checar se os dados passados no input estao corretos
formLogin.addEventListener('submit', async target => {
    target.preventDefault()

    const body = {}

    elements.forEach(element => {
        if (element.tagName === "INPUT" && element.value != '') {
            body[element.id] = element.value
        }
    })
    await login(body)
})

// evento nos inputs para checar se o botao pode ou nao ser liberado
formLogin.addEventListener('keyup', () => {
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')

    if (email.value != '' && password.value != '') {
        button.removeAttribute('disabled')
    }
    if (email.value == '' || password.value == '') {
        button.setAttribute('disabled', true)
    }
})

button2.addEventListener('click', () => {
    window.location.replace('../pages/register.html')
})