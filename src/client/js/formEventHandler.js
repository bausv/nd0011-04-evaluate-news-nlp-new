import {getPossibleFormValidationErrors} from "./formValidation";

const clickEventListener = (event) => {
    event.preventDefault();
    document.getElementById('error-message').innerText = '';
    document.getElementById('error-message').classList.add('hidden');
    const validationMessage = getPossibleFormValidationErrors();
    if (!validationMessage) {
        const value = document.getElementById('user-input').value;
        const requestBody = JSON.stringify({
            text: value
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
}

const doServerRequest = (requestBody, callbackOnSuccess) => {
    fetch('/test', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody,
        credentials: "same-origin",
    }).then((response) => response.json())
        .then((response) => {
            callbackOnSuccess(response.agreement, response.subjectivity, response.irony, response.sentence_list[0].text)
        }).catch((error) => {
        document.getElementById('error-message').innerText = `error processing request: ${JSON.stringify(error)}`
    });
};

const setResponseValues = (agreement, subjectivity, irony, sentence) => {
    document.getElementById('agreement').innerText = agreement;
    document.getElementById('subjectivity').innerText = subjectivity;
    document.getElementById('irony').innerText = irony;
    document.getElementById('result-text').innerText = sentence;
}

export {clickEventListener, setResponseValues, doServerRequest};