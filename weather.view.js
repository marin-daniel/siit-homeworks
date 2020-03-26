class DisplayWeatherParams {
    constructor() {
        const getApiParams = new GetWeatherApi();
        this.params = getApiParams.getParams();
        document.querySelector('.displayWeather').addEventListener('click', this.handleDeleteClick.bind(this))
    }

    async displayParams() {
        const parameters = await this.params;
        this.setForFirstUse();
        this.renderHtml(parameters);
    }

    renderHtml(parameters){
        let tempToDisplay = this.tempConvert(parameters)
        document.querySelector('.temp').innerHTML = tempToDisplay;
        document.querySelector('.humidity').innerHTML = parameters.main.humidity;
        document.querySelector('.pressure').innerHTML = parameters.main.pressure;
    }

    handleDeleteClick(e) {
        //write in both local storage and cookies in the same time for the homework purpose
        if (e.target.name === 'prefTemp') {

                localStorage.setItem('prefDegree', e.target.value); 
                document.cookie = `prefDegree= ${e.target.value}; expires=Thu 18 Dec 2020 12:00:00 UTC`;

            this.displayParams();
        }
    }

    // set local storage and cookies for the first use of the web page. Set degree Celsius as default;
    setForFirstUse(){
        if(localStorage.getItem('prefDegree') === null) {
            localStorage.setItem('prefDegree = celsius');

        }
        if(document.cookie.split('=')[1] === undefined) {
            document.cookie = 'prefDegree=celsius; expires=Thu 18 Dec 2020 12:00:00 UTC';

        }
    }

    tempConvert(parameters) {
        let temp = '';
        let symbol = '';

        const tempDegCelsius = (parameters.main.temp - 273.15).toFixed(1);
        const tempDegFahrenheit = (parameters.main.temp * (9 / 5) - 459.67).toFixed(1);

        const tempFromLocalStorage = localStorage.getItem('prefDegree');
        const tempFromCookie = document.cookie.split('=')[1];

        if (tempFromLocalStorage === 'fahrenheit' || tempFromCookie === 'fahrenheit') {
            temp = tempDegFahrenheit;
            symbol = '&degF';
            document.querySelector('#fahrenheit').setAttribute('checked', true);

        } else {
            temp = tempDegCelsius;
            symbol = '&degC';
            document.querySelector('#celsius').setAttribute('checked', true);
        }
        return `${temp}${symbol}`;
    }
}

const weather = new DisplayWeatherParams();
weather.displayParams();


//refresh data once per minute
setInterval(() => weather.displayParams(), 60000);