const clickEventListener = (event) => {
    event.preventDefault();
    document.getElementById('error-message').innerText = '';
    const value = document.getElementById('user-input').value;
    if (!value || value.length === 0) {
        document.getElementById('error-message').innerText = 'Please enter some text to analyze!';
        return;
    }
    const requestBody = JSON.stringify({
        text: value
    });
    console.log(requestBody);
    fetch('/test', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody,
        credentials: "same-origin",
    }).then((response) => response.json())
        .then((response) => {
            console.log(JSON.stringify(response));
            document.getElementById('result').innerText = JSON.stringify(response);
            document.getElementById('agreement').innerText = response.agreement;
            document.getElementById('subjectivity').innerText = response.subjectivity;
            document.getElementById('irony').innerText = response.irony;
            document.getElementById('result-text').innerText = response.sentence_list[0].text;
        });
};

export { clickEventListener };