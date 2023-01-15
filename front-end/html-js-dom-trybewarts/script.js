// Função que cria o form-data;
function newFormCreation() {
  const newForm = document.createElement('form');
  newForm.setAttribute('id', 'form-data');
  return newForm;
}
// Função que vai dar appendChild no newForm;
function formAppender() {
  const newForm = newFormCreation();
  const parent = document.querySelector('#form-section');
  parent.appendChild(newForm);
}
// Função que exclui o form antigo;
function formErasure() {
  const oldForm = document.querySelector('#evaluation-form');
  oldForm.style.visibility = 'hidden';
}
// Função que resgata o nome completo do indivíduo;
function fullNameGetter() {
  const name = document.querySelector('#input-name').value;
  const lastName = document.querySelector('#input-lastname').value;
  return `Nome: ${name} ${lastName}`;
}
// Função que resgata o e-mail;
function emailGetter() {
  const email = document.querySelector('#input-email').value;
  return `Email: ${email}`;
}
// Função que pega a casa;
function houseGetter() {
  const email = document.querySelector('#house').value;
  return `Casa: ${email}`;
}
// Função que pega o valor de um input radio;
function radioValueGetter(type) {
  if (type === 'family') {
    const family = document.querySelector('input[name="family"]:checked').value;
    return `Família: ${family}`;
  }
  if (type === 'rate') {
    const rate = document.querySelector('input[name="rate"]:checked').value;
    return `Avaliação: ${rate}`;
  }
}
// Função que pega os valores das checkboxes;
function checkValueGetter() {
  const subject = document.querySelectorAll('input[name="subject"]:checked');
  const subjectValues = [];
  subject.forEach((e) => {
    subjectValues.push(e.value);
  });
  return `Matérias: ${subjectValues.join(', ')}`;
}

// Função que pega o comentário;
function commentGetter() {
  const comment = document.querySelector('#textarea').value;
  return `Observações: ${comment}`;
}
// Função que faz parágrafos dentro do Forms novo;
function newData(array) {
  const data = array;
  data.forEach((e) => {
    const newP = document.createElement('p');
    newP.innerHTML = e;
    const parent = document.querySelector('#form-data');
    parent.appendChild(newP);
  });
}
// Função que copia os dados dos elementos do Form;
function formDataSaver() {
  const name = fullNameGetter();
  const email = emailGetter();
  const house = houseGetter();
  const family = radioValueGetter('family');
  const rate = radioValueGetter('rate');
  const subject = checkValueGetter();
  const comment = commentGetter();
  const dataArray = [name, email, house, family, rate, subject, comment];
  newData(dataArray);
  formErasure();
}
// Handler do botão submit;
function submitHandler() {
  // e.preventDefault();
  formAppender();
  formDataSaver();
}
// Listener do botão submit;
const submitListener = () => {
  const submitBtn = document.querySelector('#submit-btn');
  submitBtn.addEventListener('click', submitHandler);
};
// Handler do comment text area;
function commentHandler(e) {
  const { length } = e.value;
  const counter = document.querySelector('#counter');
  counter.innerHTML = `${500 - length}`;
}
// Listener do comment text area;
const commentListener = () => {
  const comment = document.querySelector('#textarea');
  comment.addEventListener('keyup', (e) => commentHandler(e.target));
};
// Handler do checkbox de agreement;
function agreementHandler() {
  const submitBtn = document.querySelector('#submit-btn');
  if (submitBtn.disabled) {
    submitBtn.disabled = false;
    return;
  }
  submitBtn.disabled = true;
}
// Listener do checkbox de agreement;
const agreementListener = () => {
  const agreement = document.querySelector('#agreement');
  agreement.addEventListener('click', agreementHandler);
};
// Handler do botão de confirmar o login;
function loginBtnHandler() {
  const loginUsr = document.querySelector('#login-email');
  const loginPwd = document.querySelector('#login-pwd');
  if (!loginUsr.value || !loginPwd.value) {
    alert('Email ou senha inválidos.');
  } else {
    alert('Olá, Tryber!');
    loginUsr.value = '';
    loginPwd.value = '';
  }
}
// Listener do botão de confirmar login
const loginBtnListener = () => {
  const loginBtn = document.querySelector('#login-confirm');
  loginBtn.addEventListener('click', loginBtnHandler);
};

// Listener do carregamento da página;
window.onload = () => {
  loginBtnListener();
  commentListener();
  agreementListener();
  submitListener();
};
