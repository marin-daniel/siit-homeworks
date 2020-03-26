class GetWeatherApi {

    apiKey = '64bdb603a3b2a01882213cfbc58712ef';
    location = 'Brasov,ro';
    url = `http://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`;

    getParams(){
        return fetch(this.url).then(res => res.json());
    }
}