const inputTarefa =  document.querySelector('.input-tarefa');
const btnTarefa =  document.querySelector('.btn-tarefa');
const tarefa =  document.querySelector('.tarefa');

function criaLi(){
  const li = document.createElement('li');
  return li;
}

//                            keyup = tecla e pressionada e solta
//                            keydown = quando a tecla é pressionada e segurada
inputTarefa.addEventListener('keypress', function(e){
  // console.log(e) mostra todos os eventos de tecla pressionada
 if (e.keyCode === 13) {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
 }
}); 
//faz com que ao apertar o ENTER (de codigo de key 13, como visto no inspencionar) tal funçao seja executada.
//podemos fazer isso com qualquer tecla, é so procurar seu keyCode no inspecionar, ou pesquisando.

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBtnApagar(li) { //coloca o li existente dentro da função 'CriaTarefa'.
  li.innerText += '  ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){ //tarefa que recebe o texto do input
    const li = criaLi();
    li.innerText = textoInput;
    tarefa.appendChild(li);
    limpaInput();
    criaBtnApagar(li) 
    salvarTarefas();
}

btnTarefa.addEventListener('click', function(){
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value); //jogou o que esta dentro do input para a tarefa
});

document.addEventListener('click', function(e){
  const el = e.target; //cria uma variavel que recebe todo evento de click

  if (el.classList.contains('apagar')){ //se esse evento de click tiver a class 'apagar' - setada ao botao 'apagar' em 'criaBtnApagar()' isso vai ser executado. 
    el.parentElement.remove(); //seta o elemento pai do botao de Apagar e remove ele.
    salvarTarefas(); //ao apagar a tarefa, a string tambem vai ser removida do local storage.
  }
});

function salvarTarefas() {
  const liTarefas = tarefa.querySelectorAll('li'); //pega todos os 'li' dentro de 'tarefa'.
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText; //pega o texto de 'tarefa' e adiciona em 'tarefaTexto'
    tarefaTexto = tarefaTexto.replace('Apagar' , '').trim(); //ao fazer isso, o texto do botao 'Apagar' bem junto, entao substituimos o texto 'Apagar' por algo vazio. '.trim' remove os espaços sobrando nas pontas.
    listaDeTarefas.push(tarefaTexto) //adiciona o texto a Array 'listaDeTarefas'.
  }


  //json é um formato de texto usado para salvar dados entre sistemas.
  //localStorage é um local no novegador aonde salvamos coisas. uma 'mini base de dados'. só podemos salvar strings.
  //local storage é global do navegador.
  //para ver os itens salvos no inspecionar: Applications -> Local storage -> file://
  const tarefasJSON = JSON.stringify(listaDeTarefas) //faz com que o array vire uma string convertida para JSON.
  localStorage.setItem('tarefas', tarefasJSON); //primeiro parametro: o nome que eu vou usar para recuperar o segundo parametro. segundo parametro: o que eu vou salvar no primeiro parametro.
}

function adicionaTarefasSalvas() {  //adiciona as tarefas salvas no local storage de volta á web
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas); //convertendo uma string, criada com JSON novamente para um elemento Array.

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  } //cria tarefa novamente.
}
adicionaTarefasSalvas();