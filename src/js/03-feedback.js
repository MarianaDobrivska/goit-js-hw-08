import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('form');
const FORM_STORAGE_KEY = 'feedback-form-state';
let userData = {};
const storageData = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));

for (const key in storageData) {
  formEl[key].value = storageData[key];
}

function onFormInput(event) {
  const { name, value } = event.target;
  userData[name] = value;
  //   console.log(userData);
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(userData));
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: {
      email: { value: emailValue },
      message: { value: messageValue },
    },
  } = event.currentTarget;

  if (emailValue === '' || messageValue === '') {
    Notiflix.Notify.warning('Please fill in all fields');
  } else {
    const formData = new FormData(event.currentTarget);
    console.log(userData);
    event.currentTarget.reset();
    localStorage.removeItem(FORM_STORAGE_KEY);
  }
}

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));
