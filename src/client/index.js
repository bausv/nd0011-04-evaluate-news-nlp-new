import { clickEventListener, resetEventListener } from "./js/formEventHandler";
import './styles/main.scss';
import './styles/fontawesome/fontawesome.scss'
import './styles/fontawesome/solid.scss'

document.getElementById('btn1').addEventListener("click", clickEventListener);
document.getElementById('reset-button').addEventListener("click", resetEventListener)