function getGamesList(){
    return fetch('https://games-world.herokuapp.com/games')
    .then(res => {
        if(res.ok) {
            return res.json();
        }
    
        throw 'Something went wrong';

    });
}

getGamesList().then(console.log)


async function displayGamesList(){

    try{
        const games = await getGamesList();
    
        const div = document.getElementById('gameList');
        const renderGameslist = document.createDocumentFragment();
        const h2 = document.createElement('h2');
        h2.innerHTML = 'Games List';
        renderGameslist.append(h2);               
        
        for (let game of games){

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.className = 'delete';

            const gameTitle = document.createElement('a');
            gameTitle.innerHTML = `Title: ${game.title}`;
            gameTitle.href = `https://games-world.herokuapp.com/games/${game._id}`;
            gameTitle.className = 'title';

            const gameDescription = document.createElement('p');
            gameDescription.innerHTML = `Description: ${game.description}`;

            const gameImg = document.createElement('img');
            gameImg.src = `${game.imageUrl}`;
            gameImg.className = 'image';


            renderGameslist.append(deleteButton);
            renderGameslist.append(gameTitle);
            renderGameslist.append(gameDescription);
            renderGameslist.append(gameImg);  

            deleteButton.addEventListener('click', () => {
                fetch(gameTitle.href, {
                    method: 'DELETE',
                    }).then(() => {
                        console.log(`Game ${game.title} deleted successfully!!`)
                        location.reload();
                    });
            });
             
        }
        div.append(renderGameslist);

    } catch(e) {
        const errorMessage = document.createElement('p');
        div.append(errorMessage);
        errorMessage.innerHTML = 'Server Down';
    }     
}
displayGamesList()


document.querySelector('.add').addEventListener('click', () => {
    fetch('https://games-world.herokuapp.com/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'title=Call%20of%20Duty%C2%AE%3A%20WWII%20Returned&description=A%20breathtaking%20experience%20that%20redefines%20World%20War%20II%20for%20a%20new%20gaming%20generation.%20Land%20in%20Normandy%20on%20D-Day%20and%20battle%20across%20Europe%20through%20iconic%20locations%20in%20history%E2%80%99s%20most%20monumental%20war.%20Experience%20classic%20Call%20of%20Duty%20combat%2C%20the%20bonds%20of%20camaraderie%2C%20and%20the%20unforgiving%20nature%20of%20war.&imageUrl=https://psmedia.playstation.com/is/image/psmedia/call-of-duty-wwii-two-column-01-ps4-eu-19apr17?$TwoColumn_Image$'
    }).then(() => {
        location.reload();
    })
}) 