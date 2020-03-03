const URL = 'https://games-world.herokuapp.com/games';

(async function getGamesList(){
    const games = await fetch(URL).then(res => res.json());
    displayGamesList(games);
})()


function displayGamesList(games) {
    const renderGameslist = document.createDocumentFragment();
    const container = document.getElementById('gameList');

    for (let game of games) {
        const displayGames = createHtml(game);
        renderGameslist.append(displayGames);
    }
    container.append(renderGameslist);

} 

function createHtml(game){

    const gameArticle = document.createElement('article')

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'js-deleteGame';
    deleteButton.setAttribute('data-game-id', game._id);

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.className = 'js-editGame';
    editButton.setAttribute('data-game-id', game._id);

    const cancelEditButton = document.createElement('button');
    cancelEditButton.innerHTML = 'Cancel';
    cancelEditButton.className = 'js-cancelEditGame';
    cancelEditButton.classList.add('js-hidden');
    cancelEditButton.setAttribute('data-game-id', game._id);

    const updateButton = document.createElement('button');
    updateButton.innerHTML = 'Update';
    updateButton.className = 'js-updateGame';
    updateButton.classList.add('js-hidden');
    updateButton.setAttribute('data-game-id', game._id);

    const gameTitle = document.createElement('p');
    gameTitle.innerHTML = game.title;
    gameTitle.className = 'js-title';

    const gameDescription = document.createElement('p');
    gameDescription.innerHTML = game.description;
    gameDescription.className = 'js-description';

    const gameImgUrl = document.createElement('p');
    gameImgUrl.innerHTML = game.imageUrl;
    gameImgUrl.className = 'js-gameImgUrl';
    gameImgUrl.classList.add('js-hidden');

    const gameImg = document.createElement('img');
    gameImg.src = game.imageUrl;
    gameImg.className = 'js-image';


    gameArticle.append(deleteButton, editButton, updateButton, cancelEditButton, gameTitle, gameDescription, gameImgUrl, gameImg);
    return gameArticle;
}

function getInputsValue(){
    const inputFields = document.querySelectorAll('.js-input');
    let queryString = '';

    for (let i=0; i < inputFields.length; i++){ 
        queryString += `${inputFields[i].name}=${encodeURI(inputFields[i].value)}&`;
    }
    
    return queryString;
}

function getGameHtmlElements(){
    const deleteButton = document.querySelectorAll('.js-deleteGame');
    const editButton = document.querySelectorAll('.js-editGame');
    const cancelEditButton = document.querySelectorAll('.js-cancelEditGame');
    const updateButton = document.querySelectorAll('.js-updateGame');
    
    const gameTitle = document.querySelectorAll('.js-title');
    const gameDescription = document.querySelectorAll('.js-description');
    const gameImgUrl = document.querySelectorAll('.js-gameImgUrl');

    const output = [deleteButton, editButton, cancelEditButton, updateButton, gameTitle, gameDescription, gameImgUrl];
    return output;
}

document.addEventListener('click', handleClick);

function handleClick(e) {
    const gameId = e.target.getAttribute('data-game-id');
    if (e.target.classList.contains('js-addGame')) {
        handleAddGame();
    } else if (e.target.classList.contains('js-updateGame')) {
        handleUpdateGame(gameId);
    } else if (e.target.classList.contains('js-deleteGame')) {
        handleDelete(gameId);
    } else if (e.target.classList.contains('js-editGame')) {
        handleEditGame(gameId);
    } else if (e.target.classList.contains('js-cancelEditGame')) {
        handleCancelEditGame(gameId);    
    }
}


function handleEditGame(gameId){  
    
    //[deleteButton, editButton, cancelEditButton, updateButton, gameTitle, gameDescription, gameImgUrl];
    const input = getGameHtmlElements();
    let gameDataString = '';

    for (let i = 0; i < input[4].length; i++) {
        if (input[1][i].getAttribute('data-game-id') === gameId) {
            input[4][i].contentEditable = 'true';
            input[4][i].classList.add('js-edit-fields');

            input[5][i].contentEditable = 'true';
            input[5][i].classList.add('js-edit-fields');

            input[6][i].contentEditable = 'true';
            input[6][i].classList.add('js-edit-fields');
            input[6][i].classList.remove('js-hidden');

            input[1][i].classList.add('js-hidden');
            input[0][i].classList.add('js-hidden');
            input[3][i].classList.remove('js-hidden');
            input[2][i].classList.remove('js-hidden');    
            
            gameDataString = `title=${encodeURI(input[4][i].innerHTML)}&description=${encodeURI(input[5][i].innerHTML)}&imageUrl=${encodeURI(input[6][i].innerHTML)}`;
        }   
    }
    return gameDataString;
}

function handleCancelEditGame(gameId){


}

function handleCancelEditGame(gameId){

    //[deleteButton, editButton, cancelEditButton, updateButton, gameTitle, gameDescription, gameImgUrl];
    const input = getGameHtmlElements();

    for (let i = 0; i < input[4].length; i++) {
        if (input[1][i].getAttribute('data-game-id') === gameId) {
            input[4][i].contentEditable = 'false';
            input[4][i].classList.remove('js-edit-fields');

            input[5][i].contentEditable = 'false';
            input[5][i].classList.remove('js-edit-fields');

            input[6][i].contentEditable = 'false';
            input[6][i].classList.remove('js-edit-fields');
            input[6][i].classList.add('js-hidden');

            input[1][i].classList.remove('js-hidden');
            input[0][i].classList.remove('js-hidden');
            input[3][i].classList.add('js-hidden');
            input[2][i].classList.add('js-hidden');            
        }   
    }
}

function handleAddGame() {    
    const sendData = getInputsValue();
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
       body: sendData
     })  
}


function handleUpdateGame(id) {  
    const sendData = handleEditGame(id);
    fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: sendData
     }).then(() => {
        console.log(`Game updated successfully!!`);
        location.reload();
    });
}      


function handleDelete(id) {
    fetch(`${URL}/${id}`, {
        method: 'DELETE'
    }).then(() => {
        console.log(`Game deleted successfully!!`);
        location.reload();
    });
}