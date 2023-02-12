const form = document.getElementById('form-login');
const toastFeedback = new bootstrap.Toast(document.getElementById('feedback'));
const toastValidacao = new bootstrap.Toast(document.getElementById('validacao'));

const usuario = localStorage.getItem('usuarioLogado');

document.addEventListener('DOMContentLoaded', () => {
  if (usuario) {
    window.location.href = 'home.html';
  }
});

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const email = document.getElementById('email-input').value;
  const password = document.getElementById('senha-input').value;
  const password2 = document.getElementById('senha-input2').value;

  if (!email || !password || !email.includes('@')) {
    form.classList.add('was-validated');
  }

  const verificado = validarLogin(email, password, password2);

  if (verificado) {
    let usuario = {
      login: email,
      password: password,
      listaRecados: [],
    };
    salvarUsuario(usuario);
    showFeedback(true);
    form.reset();
  }
});

function showFeedback(success) {
  if (success) {
    feedback.classList.remove('text-bg-danger')
    feedback.classList.add('text-bg-success');
    feedback.children[0].children[0].innerHTML = `<p class="m-0">Conta Criada com Sucesso!</p>`;
  } else {
    feedback.classList.remove('text-bg-success');
    feedback.classList.add('text-bg-danger');
    feedback.children[0].children[0].innerHTML = `<p class="m-0">Algo deu errado! Crie uma senha com no mínimo 4 digitos e com um e-mail válido!  <p/>`;
  }

  toastFeedback.show();
}

function showValidacao(info){
  if (info) {
   
    validacao.children[0].children[0].innerHTML = `<p class="m-0">Senhas não batem. Verifique o valor digitado!</p>`;
  } else {
    
    
    validacao.children[0].children[0].innerHTML = `<p class="m-0">Usuário já cadastrado!<p/>`;
  }

  toastValidacao.show();
}

function validarLogin(email, senha1, senha2) {
  if (email.length < 5 || senha1.length < 4) {
    showFeedback(false);
    return;
  }

  if (senha1 !== senha2) {
    showValidacao(true)
    return;
  }
 

  const listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

  if (listaUsuarios !== null) {
    const existe = listaUsuarios.some((valor) => valor.login == email);

    if (existe) {
      showValidacao(false)
      return;
    }
  }
  return true;
}

function salvarUsuario(objeto) {
  let listaUsuarios = localStorage.getItem('usuarios');
  if (!listaUsuarios) {
    localStorage.setItem('usuarios', JSON.stringify([objeto]));
  } else {
    listaUsuarios = JSON.parse(listaUsuarios);
    listaUsuarios.push(objeto);
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
  }
}
