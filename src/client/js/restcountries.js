// https://restcountries.com/#api-endpoints-v3

const getCountry = () => {
    return encodeURIComponent(document.getElementById('country-input').value);
}

const displayResultElement = (jsonElement) => {
    const firstCurrency = jsonElement.currencies[Object.keys(jsonElement.currencies)[0]];
    document.getElementById('country-result').classList.remove('hidden');
    document.getElementById('img-flag').src = jsonElement.flags.svg;
    document.getElementById('img-flag').alt = jsonElement.flags.alt;
    document.getElementById('country-name').innerText = jsonElement.name.official;
    document.getElementById('country-capital').innerText = jsonElement.capital;
    document.getElementById('country-region').innerText = jsonElement.region;
    document.getElementById('country-subregion').innerText = jsonElement.subregion;
    document.getElementById('country-population').innerText = new Intl.NumberFormat().format(jsonElement.population);
    document.getElementById('country-currency').innerText = `${firstCurrency.name} (${firstCurrency.symbol})`;
}

let myMap = undefined;

const useCountryDetailsFromSelection = (event) => {
    event.preventDefault();
    document.getElementById('more-than-one-country-container').classList.add('hidden');
    const countryId = event.currentTarget.dataset.myId;
    const element = myMap.get(countryId);
    myMap = undefined;
    displayResultElement(element);
}

const createAndAppendImageCell = (res, row) => {
    let imgCell = document.createElement('td');
    let img = document.createElement('img');
    img.src = res.flags.svg ? res.flags.svg : res.flags.png;
    img.alt = res.flags.alt;
    img.width = 60;
    imgCell.append(img);
    row.append(imgCell);
}

const createAndAppendNameCell = (res, row) => {
    let cell = document.createElement('td');
    cell.innerText = res.name.official;
    row.append(cell);
}

const createAndAppendActionCell = (res, row) => {
    let actionCell = document.createElement('td');
    let button = document.createElement('button');
    button.type = 'button';
    button.classList.add('button-secondary');
    button.dataset.myId = res.cioc;
    button.addEventListener('click', useCountryDetailsFromSelection);
    button.innerText = 'use';
    actionCell.append(button);
    row.append(actionCell);
}

function createTableRowForCountry(res) {
    let row = document.createElement('tr');
    createAndAppendImageCell(res, row);
    createAndAppendNameCell(res, row);
    createAndAppendActionCell(res, row);
    return row;
}

const queryCountryInfo = (event) => {
    const country = getCountry();
    const query = `https://restcountries.com/v3.1/name/${country}`;
    fetch(query).then(async (response) => {
        if (response.ok) {
            const json = await response.json();
            if (json.length > 1) { // more than one hit, user needs to decide which one to use
                document.getElementById('country-result').classList.add('hidden');
                const tblBody = document.getElementById('tbl-country-select-body');
                tblBody.replaceChildren();
                myMap = new Map();
                for (const res of json) {
                    myMap.set(res.cioc, res);
                    let row = createTableRowForCountry(res);
                    tblBody.append(row);
                }
                document.getElementById('more-than-one-country-container').classList.remove('hidden');
            } else {
                displayResultElement(json[0]);
            }
        }
    })
}

export {queryCountryInfo}