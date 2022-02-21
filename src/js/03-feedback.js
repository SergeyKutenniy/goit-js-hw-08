import throttle from 'lodash.throttle';

const key = 'feedback-form-state'; // ключ который хранит данные в localStorage
const formData = {}; // пустой обьект который будет хранить данные

const form = document.querySelector('.feedback-form'); // доступ к форме

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

updateForm();

function updateForm() {
  const saveData = localStorage.getItem(key);
  if (saveData) {
    const { email, message } = JSON.parse(saveData);
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
  }
}

function onFormInput() {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  localStorage.setItem(key, JSON.stringify(formData));
}

function onFormSubmit() {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    formData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(key);

  console.log(formData);
}
