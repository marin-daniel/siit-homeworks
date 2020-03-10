class DisplayGameDetails {
    constructor() {
        const gamesList = new GamesList();
        this.games = gamesList.getGamesList();
    }
    

    async displayGameDetails() {
        const queryParams = location.search.split('&');
        const gameId = queryParams
            .find(param => param.includes('gameId='))
            .split('=')[1];
        const renderGameDetails = document.createDocumentFragment();
        const body = document.querySelector('body');

        for (let game of await this.games) {
            if (gameId === game._id) {
                const displayGame = this.createHtml(game);
                renderGameDetails.append(displayGame);
            }
        }
        body.append(renderGameDetails);
    }

    createHtml(game) {
        const gameArticle = document.createElement('article')

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


        gameArticle.append(editButton, updateButton, cancelEditButton, gameTitle, gameDescription, gameImgUrl, gameImg);
        return gameArticle;
    }

    getGameHtmlElements() {
        const editButton = document.querySelectorAll('.js-editGame');
        const cancelEditButton = document.querySelectorAll('.js-cancelEditGame');
        const updateButton = document.querySelectorAll('.js-updateGame');

        const gameTitle = document.querySelectorAll('.js-title');
        const gameDescription = document.querySelectorAll('.js-description');
        const gameImgUrl = document.querySelectorAll('.js-gameImgUrl');

        const output = [editButton, cancelEditButton, updateButton, gameTitle, gameDescription, gameImgUrl];
        return output;
    }

    handleEditGame(gameId) {

        //[editButton, cancelEditButton, updateButton, gameTitle, gameDescription, gameImgUrl];
        const input = this.getGameHtmlElements();
        let gameDataString = '';

        for (let i = 0; i < input[3].length; i++) {
            if (input[0][i].getAttribute('data-game-id') === gameId) {
                input[3][i].contentEditable = 'true';
                input[3][i].classList.add('js-edit-fields');

                input[4][i].contentEditable = 'true';
                input[4][i].classList.add('js-edit-fields');

                input[5][i].contentEditable = 'true';
                input[5][i].classList.add('js-edit-fields');
                input[5][i].classList.remove('js-hidden');

                input[0][i].classList.add('js-hidden');
                input[2][i].classList.remove('js-hidden');
                input[1][i].classList.remove('js-hidden');

                gameDataString = `title=${encodeURI(input[3][i].innerHTML)}&description=${encodeURI(input[4][i].innerHTML)}&imageUrl=${encodeURI(input[5][i].innerHTML)}`;
            }
        }
        return gameDataString;
    }

    handleCancelEditGame(gameId) {

        //[editButton, cancelEditButton, updateButton, gameTitle, gameDescription, gameImgUrl];
        const input = this.getGameHtmlElements();

        for (let i = 0; i < input[3].length; i++) {
            if (input[0][i].getAttribute('data-game-id') === gameId) {
                input[3][i].contentEditable = 'false';
                input[3][i].classList.remove('js-edit-fields');

                input[4][i].contentEditable = 'false';
                input[4][i].classList.remove('js-edit-fields');

                input[5][i].contentEditable = 'false';
                input[5][i].classList.remove('js-edit-fields');
                input[5][i].classList.add('js-hidden');

                input[0][i].classList.remove('js-hidden');
                input[2][i].classList.add('js-hidden');
                input[1][i].classList.add('js-hidden');
            }
        }
    }
}

const displayDetails = new DisplayGameDetails();
displayDetails.displayGameDetails();

const updateDetails = new GamesList();

document.addEventListener('click', handleClick);

function handleClick(e) {
    const gameId = e.target.getAttribute('data-game-id');
    if (e.target.classList.contains('js-updateGame')) {
        const modifiedGameData = displayDetails.handleEditGame(gameId);
        updateDetails.handleUpdateGame(gameId, modifiedGameData);
    } else if (e.target.classList.contains('js-editGame')) {
        displayDetails.handleEditGame(gameId);
    } else if (e.target.classList.contains('js-cancelEditGame')) {
        displayDetails.handleCancelEditGame(gameId);
    }
}