
let formRegister = document.querySelector('.form-register')
let formLogin = document.querySelector('.form-login')
let signIn = document.querySelector('#sign-in')
let signUp = document.querySelector('#sign-up')

formRegister.style.display = 'none'

signIn.onclick = (e) => {
  formRegister.style.display = 'none'
  formLogin.style.display = 'block'
}

signUp.onclick = (e) => {
  formRegister.style.display = 'block'
  formLogin.style.display = 'none'
}
