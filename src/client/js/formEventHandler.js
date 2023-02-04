import {getPossibleFormValidationErrors} from './formValidation';

const exampleText1 =
    'In the country of Sokovia, the Avengers – Tony Stark, Steve Rogers, Thor, Bruce Banner, Natasha Romanoff, and ' +
    'Clint Barton – raid a Hydra outpost led by Wolfgang von Strucker, who has been experimenting on humans using ' +
    'the scepter previously wielded by Loki. They encounter two of Strucker\'s experiments – twins Pietro, who has ' +
    'superhuman speed, and Wanda Maximoff, who can manipulate minds and project energy – and apprehend Strucker, ' +
    'while Stark retrieves Loki\'s scepter.';
const exampleText2 = 'Main dishes were quite good, but desserts were too sweet for me.';

const clickEventListener = (event) => {
  event.preventDefault();
  document.getElementById('error-message').innerText = '';
  document.getElementById('error-message').classList.add('hidden');
  const validationMessage = getPossibleFormValidationErrors();
  if (!validationMessage) {
    document.getElementById('spinner-icon').classList.add('fa-spin');
    const value = document.getElementById('user-input').value;
    const requestBody = JSON.stringify({
      text: value,
    });
    console.log(requestBody);
    doServerRequest(requestBody, setResponseValues);
  } else {
    showFormError(validationMessage);
  }
};

const showFormError = (message) => {
  document.getElementById('error-message').classList.remove('hidden');
  document.getElementById('error-message').innerText = message;
};

const doServerRequest = (requestBody, callbackOnSuccess) => {
  fetch('/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
    credentials: 'same-origin',
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }).then((response) => {
    callbackOnSuccess(response.agreement, response.subjectivity, response.irony, response.sentence_list[0].text);
  }).catch((error) => {
    showFormError(`error processing request: ${error}`);
    document.getElementById('spinner-icon').classList.remove('fa-spin');
  });
};


const responseIconTranslate = new Map();
responseIconTranslate.set('AGREEMENT', 'fa-thumbs-up');
responseIconTranslate.set('DISAGREEMENT', 'fa-thumbs-down');
responseIconTranslate.set('OBJECTIVE', 'fa-robot');
responseIconTranslate.set('SUBJECTIVE', 'fa-masks-theater');
responseIconTranslate.set('NONIRONIC', 'fa-face-meh');
responseIconTranslate.set('IRONIC', 'fa-face-smile-wink');

const resetDefaults = () => {
  const iconElems = document.getElementsByTagName('i');
  const translateValues = Array.from(responseIconTranslate.values());
  for (const elem of iconElems) {
    elem.classList.remove(...translateValues);
    console.log(elem);
    console.log(elem.classList);
  }
};

const setResponseValues = (agreement, subjectivity, irony, sentence) => {
  resetDefaults();
  document.getElementById('agreement').innerText = agreement;
  document.getElementById('subjectivity').innerText = subjectivity;
  document.getElementById('irony').innerText = irony;
  document.getElementById('result-text').innerText = sentence;
  document.getElementById('agreement-icon').classList.add(responseIconTranslate.get(agreement));
  document.getElementById('subjectivity-icon').classList.add(responseIconTranslate.get(subjectivity));
  document.getElementById('irony-icon').classList.add(responseIconTranslate.get(irony));
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('spinner-icon').classList.remove('fa-spin');
};

const resetEventListener = (event) => {
  event.preventDefault();
  document.getElementById('error-message').innerText = '';
  document.getElementById('user-input').value = '';
  document.getElementById('agreement').innerText = '';
  document.getElementById('subjectivity').innerText = '';
  document.getElementById('irony').innerText = '';
  document.getElementById('result-text').innerText = '';
  resetDefaults();
  document.getElementById('result').classList.add('hidden');
};

const example1Listener = (event) => {
  event.preventDefault();
  document.getElementById('user-input').value = exampleText1;
};
const example2Listener = (event) => {
  event.preventDefault();
  document.getElementById('user-input').value = exampleText2;
};

export {clickEventListener, setResponseValues, doServerRequest, resetEventListener, example1Listener, example2Listener};
