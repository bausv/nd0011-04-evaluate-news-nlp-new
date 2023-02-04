const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');

// Introduced express-rate-limit base on
// https://github.com/bausv/nd0011-04-evaluate-news-nlp-new/security/code-scanning/2
const rateLimit = require('express-rate-limit');

const app = express();
const port = 8080;

const limiter = rateLimit({
  windowMs: 60*1000, // 1 minute
  max: 10,
});

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(limiter);

app.get('/', (req, res) => {
  res.sendFile('dist/index.html'); // , { root: __dirname + '/..' });
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile('./img/favicon.ico', {root: __dirname});
});

app.post('/test', async function(req, res) {
  if (req && req.body && req.body.text) {
    const response = await queryMeaningCloud(req.body.text, 'en');
    res.send(response);
  } else {
    res.send('error - request didn\'t contain text body!');
  }
});

const queryMeaningCloud = async (txt, lang) => {
  const formdata = new FormData();
  formdata.append('key', process.env.API_KEY);
  formdata.append('txt', txt);
  formdata.append('lang', lang); // 2-letter code, like en es fr ...

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return await fetch('https://api.meaningcloud.com/sentiment-2.1', requestOptions)
      .then((response) => response.json());
};

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
  console.log(`MeaningCloud API key has ${process.env.API_KEY ? '' : 'NOT '}been provided.`);
});
