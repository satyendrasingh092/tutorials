import {Component} from 'react'
import MDaysWeather from '../components/weatherApp/mDaysWeather'

export default class WeatherAppContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            list : []
        }
    }
    fetchWeatherData(){
        let countryCode = "In"
        let zipCode = "560102"
        let url = "http://samples.openweathermap.org/data/2.5/forecast?zip="+{zipCode}+","+{countryCode}
        fetch("http://samples.openweathermap.org/data/2.5/forecast?zip=94040&appid=b6907d289e10d714a6e88b30761fae22").then(
            (response) => response.json()
        ).then((data) => this.setState({
            "list" : data.list
        }))
    }
    render(){
        return (<MDaysWeather weatherList={this.state.list}/>)
    }
}