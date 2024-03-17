window.addEventListener('load', init);

//Globals
const apiUrl = 'http://localhost/prg03-eindopdracht/prg03-eindopdracht/index.php';
const apiUrlInfo = 'http://localhost/prg03-eindopdracht/prg03-eindopdracht/index.php?id=';
let collection;
let pokemonData = {};

let dialog;
let dialogContent;
let dialogExit;

let favourites = JSON.parse(localStorage.getItem('favourite-pokemon')) || [];




/**
 * Initialize after the DOM is ready
 */
function init() {
    // Hier wordt het DOM-element gebruikt om de ID 'pokemon-collection' op te halen vanuit html en op te slaan in de variabele 'collection'.
    collection = document.getElementById('pokemon-collection');
    getPokemon(apiUrl, successHandler);

    dialog = document.getElementById('pokemon-detail');
    dialogContent = document.getElementById('modal-content');
    dialogExit = document.getElementById('modal-close');
    dialogExit.addEventListener('click', dialogClose);
}

// Haalt de data op van de API en geeft deze door aan de successHandler
function getPokemon(url, functionSucces) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText); // gooit een error als de response niet ok is
            }
            return response.json();// return de response als deze wel oke is
        })
        .then(functionSucces)
        .catch(errorHandler);
}

// Deze functie successHandler wordt aangeroepen wanneer de gegevens van de Pokémon succesvol zijn opgehaald
function successHandler(data) {
    for (const pokemon of data) {
        console.log(pokemon);
        // console.log(pokemon.id);
        // console.log(pokemon.number);

        let divCard = document.createElement("div")
        divCard.classList.add('pokemon-card');
        divCard.dataset.name = pokemon.name;
        collection.appendChild(divCard);

        pokemonDetails(pokemon);
    }
}

// Haalt de extra informatie op van de API
function extraPokemonDetails(id) {
    return fetch(`${apiUrlInfo}${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fout bij het ophalen van de gegevens.');
            }
            return response.json();
        })
        .catch(errorHandler);
}

function pokemonDetails(data) {
    // console.log(data.id);
    // console.log(data.name);

    //Hier wordt een variable div aangemaakt en vervolgens geselecteerd. en wordt gebruikt om de kaart van een specifieke Pokémon te selecteren in de pokemonlijst.
    let div = document.querySelector(`.pokemon-card[data-name='${data.name}']`); //
    console.log(div);

    // Er wordt een nieuw h2 element gemaakt en toegevoegd aan het eerder geselecteerde div element. (bevat de naam en id)
    let name = document.createElement('h2');
    name.innerText = `${data.name} - #${data.number}`;
    div.appendChild(name); // title wordt toegevoegd in de div

    let image = document.createElement('img');
    image.src = data.image;
    div.appendChild(image);

    let buttonBox = document.createElement('div');
    buttonBox.classList.add('buttonBox');
    div.appendChild(buttonBox);

    let infoButton = document.createElement('button');
    infoButton.innerText = 'More details';
    buttonBox.appendChild(infoButton);
    infoButton.addEventListener('click', submitButtonInfo);
    infoButton.dataset.id = data.id;


    let favoButton = document.createElement('button');
    favoButton.innerText = 'Add to favourites'
    favoButton.classList.add('favobutton');

    buttonBox.appendChild(favoButton);
    if (favourites.includes(data.name)) {
        div.classList.add('favourite-pokemon');
    }
    favoButton.addEventListener('mouseover', () => { //
        favoButton.style.backgroundColor = 'white';
    });
    favoButton.addEventListener('mouseout', () => {
        favoButton.style.backgroundColor = '';
    });
    favoButton.addEventListener('click', () => {
        if (div.classList.contains('favourite-pokemon')) { // check of de div de class favourite-pokemon heeft
            div.classList.remove('favourite-pokemon');
            deleteFromFavourites(data.name);
        } else {
            div.classList.add('favourite-pokemon');
            addToFavourites(data.name);
        }
        updateFavouriteButtonText(favoButton, data.name);
    });

    updateFavouriteButtonText(favoButton, data.name);
    pokemonData[data.id] = data
}


function submitButtonInfo(e) {
    // console.log(e.target);
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    const pokemonId = e.target.dataset.id;
    const pokemon = pokemonData[pokemonId]; //
    // console.log(pokemon.id);

    dialog.showModal();
    dialogContent.innerHTML = '';

    let text = document.createElement('h2');
    text.innerHTML = `name: ${pokemon.name} <br> Nr. ${pokemon.number}`;
    dialogContent.appendChild(text); // title wordt toegevoegd in de div

    let image = document.createElement('img');
    image.src = pokemon.image;
    dialogContent.appendChild(image);

    // Ophalen van informatie vanuit index.php via fetchPokemonDetails
    extraPokemonDetails(pokemonId)
        .then(data => {
            if (data) {
                let text = document.createElement('h2');
                text.innerHTML = `Type: ${data.type} <br> Japanese Name: ${data.japaneseName}`;
                dialogContent.appendChild(text);
            }
            else {
                console.error('Geen gegevens ontvangen voor Pokémon met id', pokemonId);
            }
        })
        .catch(error => {
            console.error('Fout bij het ophalen van de gegevens:', error);
        });
}


// Sluit de pop-up
function dialogClose() {
    dialog.close();
}

// Voegt de Pokémon toe aan de favorieten in de localhost
function addToFavourites(pokemonName) {
    if (!favourites.includes(pokemonName)) { // check of de naam al in de array zit
        favourites.push(pokemonName); // voeg de naam toe aan de array
        localStorage.setItem('favourite-pokemon', JSON.stringify(favourites)); // update de localstorage
    }
}

// Verwijderd de Pokémon van de favorieten uit de localhost
function deleteFromFavourites(pokemonName) {
    if (favourites.includes(pokemonName)) { // check of de naam in de array zit
        favourites = favourites.filter(favourite => favourite !== pokemonName); // filter de naam uit de array
        localStorage.setItem('favourite-pokemon', JSON.stringify(favourites)); // update de localstorage (.stringfy zet JavaScript-objecten om te zetten naar een JSON-string.)
    }
}

// Update de tekst van de favorieten knop
function updateFavouriteButtonText(button, pokemonName) {
    if (favourites.includes(pokemonName)) {
        button.textContent = 'Remove from favourites';

    } else {
        button.textContent = 'Add to favourites';
    }
}


// Deze functie wordt aangeroepen wanneer er een fout is bij het ophalen van de Pokémon-gegevens.
function errorHandler(error) {
    console.log(error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.innerText = 'Er is helaas iets fout gegaan met de API, probeer het later opnieuw';
    collection.before(error);
}
