
  const form = document.getElementById('form-login')
  const usuario = localStorage.getItem('usuarioLogado');
  const toast = new bootstrap.Toast(document.getElementById('feedback'))

  document.addEventListener('DOMContentLoaded', ()=> {
  if (usuario) {
    window.location.href = 'home.html'
  }
})

  form.addEventListener('submit', (evento) =>{
    evento.preventDefault()

    const emailLogin = document.getElementById('email-login').value
    let passwordLogin = document.getElementById('password-login').value

    if(!emailLogin || !passwordLogin || !emailLogin.includes('@')) {
      form.classList.add('was-validated')
      return
    }
   
    const conta = buscarUsuario(emailLogin);
    if (!conta || conta.login !== emailLogin || conta.password !== passwordLogin) {
    
      toast.show()
      return;
    }
    usuarioLogado(conta);

  })
  function buscarUsuario(emailUsuario) {
    const lista = JSON.parse(localStorage.getItem('usuarios'));
  
    if(lista){
      const infoEncontrada = lista.find((valor) => valor.login === emailUsuario);
      return infoEncontrada;
    } 
    return 
  }

  function usuarioLogado(usuario) {
    localStorage.setItem('usuarioLogado', usuario.login);
    window.location.href = 'home.html';
  }