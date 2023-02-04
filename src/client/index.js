import {clickEventListener, resetEventListener, example1Listener, example2Listener} from './js/formEventHandler';
import {queryCountryInfo} from "./js/restcountries";
import './styles/main.scss';
import './styles/fontawesome/fontawesome.scss';
import './styles/fontawesome/solid.scss';

document.getElementById('btn1').addEventListener('click', clickEventListener);
document.getElementById('reset-button').addEventListener('click', resetEventListener);
document.getElementById('btn-example-1').addEventListener('click', example1Listener);
document.getElementById('btn-example-2').addEventListener('click', example2Listener);

document.getElementById('btn-query-country-info').addEventListener('click', queryCountryInfo)
