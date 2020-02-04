document.querySelector('form').addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  const reqFields = document.querySelectorAll('.js-required');
  const radios = document.querySelectorAll('[name=gender]');

  for(let i = 0; i < reqFields.length; i++) {
    const field = reqFields[i];
    
    if(field.value === '') {    
      const errorMessage = showErrorMessage('Marked fields are required!!!');
      field.classList.add('error');
     
      field.addEventListener(
        'change', 
        () => {
          removeErrorState(field);
          hideErrorMessage(errorMessage);
        }, 
        { once: true }
      );
      e.preventDefault();
    }
  }
  
  if(!radios[0].checked && !radios[1].checked) {
    const parent = radios[0].parentElement.parentElement;
    parent.classList.add('error');

    const errorMessage = showErrorMessage('Marked fields are required!!!');

    radios[0].addEventListener('change', () => {
      removeErrorState(parent);
      hideErrorMessage(errorMessage);
    });
    radios[1].addEventListener('change', () => {
      removeErrorState(parent);
      hideErrorMessage(errorMessage);
    });    
    e.preventDefault();
  }  
}

function removeErrorState(elem) {
  elem.classList.remove('error');
}

function hideErrorMessage(messageRef) {
  messageRef.remove();
}

function showErrorMessage(message) {
  const i = document.createElement('i');
  i.classList.add('fas','fa-exclamation-triangle');
  
  const p = document.createElement('p');  
  p.innerHTML = message; 

  const form = document.querySelector('form');
  p.prepend(i);
  form.prepend(p);
  p.classList.add('errorMessage')
}

function showSuccessMessage() {
  if(document.location.search === '') {
    return;
  }

  const urlString = window.location.search;
  const urlParam = new URLSearchParams(urlString);
  const displayName = urlParam.get('firstName');

  const check = document.createElement('i');
  check.classList.add('fas','fa-check-circle');

  const close = document.createElement('i');
  close.classList.add('fas','fa-window-close');
  
  const closeButton = document.createElement('button');
  closeButton.addEventListener(
    'click', 
    () => {
      p.classList.add('hidden');
    }, 
    { once: true }
  );

  const p = document.createElement('p');  
  p.classList.add('success-message');  
  p.innerHTML = 'Thank you for contacting us, ' + displayName;

  const body = document.querySelector('body');
  closeButton.append(close);
  p.prepend(check);
  p.append(closeButton);
  body.prepend(p);
}

window.addEventListener('DOMContentLoaded', showSuccessMessage);

