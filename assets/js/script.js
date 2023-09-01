//pegando espaços do html
const inputTarefa = document.querySelector('#input-nova-tarefa')
const btnTarefa = document.querySelector('#btn-add-tarefa')
const tarefas = document.querySelector('.tarefas')
const tarefasConcluidas = document.querySelector('.tarefas-concluidas')
const titulo = document.querySelector('.titulo')
const inputTitulo = document.querySelector('.input-titulo')
const container = document.querySelector('.container-titulo')



//criar elemento li
const criaLi =  () => document.createElement('li')

//limpar input de tarefa
const limpaInputTarefa = () => inputTarefa.value = ''

//botão de apagar tarefa
const btnApagarTarefa = (li) => {
    const btnApagar = document.createElement('button')
    btnApagar.innerText = '✖'
    btnApagar.setAttribute('class', 'btn-apagar')
    li.appendChild(btnApagar)
}

//botão de tarefa concluída
const btnConcluirTarefa = (li) => {
    const btnConcluir = document.createElement('button')
    btnConcluir.innerText = '✓'
    btnConcluir.setAttribute('class', 'btn-concluir')
    li.appendChild(btnConcluir)
}


//inserir conteúdo da tarefa
const inserTextoTarefa = (texto, li) => {
    const textoTarefa = document.createElement('p')
    textoTarefa.innerText = `${texto}`
    textoTarefa.setAttribute('class', 'texto-tarefa')
    li.appendChild(textoTarefa)
}

//criar uma tarefa
function criaTarefa(texto){
    const li = criaLi()
    btnConcluirTarefa(li)
    inserTextoTarefa(texto, li)
    btnApagarTarefa(li)
    tarefas.appendChild(li)
    salvarTarefa()
}
function criaTarefaSalva(texto){
    const li = criaLi()
    btnConcluirTarefa(li)
    inserTextoTarefa(texto, li)
    btnApagarTarefa(li)
    tarefas.appendChild(li)
    tarefasConcluidas.appendChild(li)
    salvarTarefa()
}
function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []
    for (let tarefa of liTarefas){
        let tarefaTexto =  tarefa.innerText
        //removendo excessos
        tarefaTexto = tarefaTexto.replace('✖', '')
        tarefaTexto = tarefaTexto.replace('✓', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        listaDeTarefas.push(tarefaTexto)
    }
}
function salvarTarefaConcluida(){
    const liTarefas = tarefasConcluidas.querySelectorAll('li')
    const listaDeTarefas = []
    for (let tarefa of liTarefas){
        let tarefaTexto =  tarefa.innerText
        //removendo excessos
        tarefaTexto = tarefaTexto.replace('✖', '')
        tarefaTexto = tarefaTexto.replace('✓', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        tarefaTexto = tarefaTexto.replace('\n', '')
        listaDeTarefas.push(tarefaTexto)
    }
}

/*
function tarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}

function tarefasConcluidasSalvas(){
    const tarefas = localStorage.getItem('tarefas-concluidas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas){
        criaTarefaSalva(tarefa)
    }
}

tarefasSalvas()
tarefasConcluidasSalvas()
*/
//acompanhar cliques e eventos
btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
    limpaInputTarefa()
})

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if(!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
        limpaInputTarefa()
    } 
})

document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('btn-apagar') || el.classList.contains('btn-apagar-concluido')){
        el.parentElement.remove()
        salvarTarefa()
        salvarTarefaConcluida()
    }
    if(el.classList.contains('btn-concluir') || el.classList.contains('btn-concluido')){
        let parentClass = el.parentElement.parentElement.getAttribute('class')
        if(parentClass == 'tarefas'){
            tarefasConcluidas.appendChild(el.parentElement)
            el.setAttribute('class', 'btn-concluido')
            el.nextSibling.nextSibling.setAttribute('class', 'btn-apagar-concluido')
            salvarTarefaConcluida()
            salvarTarefa()
        }
        if(parentClass == 'tarefas-concluidas'){
            tarefas.appendChild(el.parentElement)
            el.setAttribute('class', 'btn-concluir')
            el.nextSibling.nextSibling.setAttribute('class', 'btn-apagar')
            salvarTarefaConcluida()
            salvarTarefa()
        }  
    }
})