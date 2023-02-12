const formularioRecados = document.getElementById('formulario-recados')
const formularioEditar = document.getElementById('formulario-editar-recados')
const tbody = document.getElementById('recados')
const modalEditar = new bootstrap.Modal('#modal-editar') 

let listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));
// buscar usuario logado no sistema
const usuario = localStorage.getItem('usuarioLogado');
const campoEmail = document.getElementById('email-header').innerHTML= usuario
// Informações do usuário logado
let infoUsuario = listaUsuarios.find((valor) => valor.login === usuario);


document.addEventListener('DOMContentLoaded', ()=> {
  
  if (!usuario) {
    window.location.href = 'index.html'
  } else {
    atualizarTabela()
  }
  
})

formularioRecados.addEventListener('submit', (e)=> {
  e.preventDefault()
  
  const descricao = document.getElementById('descricao').value

  const detalhe = document.getElementById('detalhe').value
  
  const novoRecado = {
     descricao: descricao,
     detalhe: detalhe,
  }
  salvarRecado(novoRecado)

  formularioRecados.reset()

  atualizarTabela()

})
     
formularioEditar.addEventListener('submit', (e)=>{
  e.preventDefault()
   const indice = document.getElementById('indice-recado').innerText 
   
   const recadoEditar = buscarRecado(indice)

   const novaDescricao = document.getElementById("edita-descricao")
   const novoDetalhe = document.getElementById("edita-detalhe")


     recadoEditar.descricao =  novaDescricao.value
      recadoEditar.detalhe = novoDetalhe.value

      infoUsuario.listaRecados[indice] = recadoEditar

      atualizarTabela()
      modalEditar.hide()

      let usuarios = listaUsuarios.map((usuario) => {
        if (usuario.login === infoUsuario.login) {
           infoUsuario.listaRecados
         return infoUsuario;  
       
        }
        return usuario
      })
      
     localStorage.setItem('usuarios', JSON.stringify(usuarios) ) 
})

function salvarRecado(objeto) {
   
  infoUsuario.listaRecados.push(objeto)
  
    const usuarios = listaUsuarios.map((usuario) => {
      if (usuario.login === infoUsuario.login) {
       
       return infoUsuario;  
    
      }
      return usuario
    })
    
    // pegando o retorno do map, mando o objeto da pessoa logada, já atualizado, para o LocalStorage.
    let mandarObjeto = JSON.stringify(usuarios) 
   
    localStorage.setItem('usuarios', mandarObjeto)
}
function atualizarTabela(){
  tbody.innerHTML = ''

  infoUsuario.listaRecados.forEach((recado,index) => {
    tbody.innerHTML += 
`
<tr class="align-baseline" id="${index}">
                    <th>${index+1}</th>
                    <td class="text-start">${recado.descricao}</td>
                    <td class="text-start">${recado.detalhe}</td>
                    <td>
                      <div class="d-flex align-items-start">
                        <div class="  p-1 "><button type="button" onclick="editarRecado(${index})" data-bs-toggle="modal" data-bs-target="#modal-editar"
                            class="btn btn-dark"><i class="bi bi-pencil-square"></i></button></div>
                        <div class="  p-1  "><button type="button" onclick="apagarRegistro(${index})" class="btn btn-dark"><i
                              class="bi bi-trash3"></i></button></div>
                      </div>
                    </td>
                  </tr>
`

  })
}
function apagarRegistro(indice) {
 
  let listaAtualizada = infoUsuario.listaRecados.filter((valor, index)=> index != indice)

  let usuarios = listaUsuarios.map((usuario) => {
    if (usuario.login === infoUsuario.login) {
      infoUsuario.listaRecados = listaAtualizada 
     return infoUsuario;  
   
    }
    return usuario
  })
  
 localStorage.setItem('usuarios', JSON.stringify(usuarios) ) 

  let trRemover = document.getElementById(indice)
  trRemover.remove()
  atualizarTabela()
  
}
function buscarRecado(index){
  let recado = infoUsuario.listaRecados.find((valor, ind)=> ind === Number(index))
  return recado
}

function modal(index){
  spanIndice = document.getElementById('indice-recado')
  spanIndice.innerHTML = `${index}` 

}

function editarRecado(indice){
  modal(indice)
  const mostrarRecado = buscarRecado(indice)


  const descricaoModal = document.getElementById("edita-descricao")
  const detalheModal = document.getElementById("edita-detalhe")

  descricaoModal.value = mostrarRecado.descricao
  detalheModal.value = mostrarRecado.detalhe

}

function sairDoSistema(){
  localStorage.removeItem('usuarioLogado')
  window.location.href = "index.html";
}
