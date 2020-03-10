class DisplayGamesList {
    constructor() {
        const gamesList = new GamesList();
        this.games = gamesList.getGamesList();
    }

    async displayGamesList() {
        const renderGameslist = document.createDocumentFragment();
        const container = document.getElementById('gameList');

        for (let game of await this.games) {
            const displayGames = this.createHtml(game);
            renderGameslist.append(displayGames);
        }

        container.append(renderGameslist);
    }

    createHtml(game) {
        const gameEntry = document.createElement('p');
        const gameLink = document.createElement('a');
        gameLink.innerHTML = game.title;
        gameLink.href = `gameDetails.html?gameId=${game._id}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'js-deleteGame';
        deleteButton.setAttribute('data-game-id', game._id);

        gameEntry.append(gameLink, deleteButton)

        return gameEntry;
    }

    getInputsValue() {
        const inputFields = document.querySelectorAll('.js-input');
        let queryString = '';

        for (let i = 0; i < inputFields.length; i++) {
            queryString += `${inputFields[i].name}=${encodeURI(inputFields[i].value)}&`;
        }

        return queryString;
    }
}

const displayGames = new DisplayGamesList();
displayGames.displayGamesList();

const deleteGame = new GamesList();

document.addEventListener('click', handleClick);

function handleClick(e) {
    const gameId = e.target.getAttribute('data-game-id');
    if (e.target.classList.contains('js-addGame')) {
        const sendQueryString = displayGames.getInputsValue();
        deleteGame.handleAddGame(sendQueryString);
    } else if (e.target.classList.contains('js-deleteGame')) {
        deleteGame.handleDelete(gameId);
    }
}