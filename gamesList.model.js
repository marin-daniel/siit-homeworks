class GamesList {

    URL = 'https://games-world.herokuapp.com/games';   

    getGamesList(){
        return fetch(this.URL).then(res => res.json());
        }

    handleAddGame(sendQueryString) {    
        fetch(this.URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        body: sendQueryString
        })  
    }
    
    handleUpdateGame(id, modifiedGameData) {
        fetch(`${this.URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: modifiedGameData
        }).then(() => {
            console.log(`Game updated successfully!!`);
            location.reload();
        });
    }

    handleDelete(id) {
        fetch(`${this.URL}/${id}`, {
            method: 'DELETE'
        }).then(() => {
            console.log(`Game deleted successfully!!`);
            location.reload();
        });
    }
}