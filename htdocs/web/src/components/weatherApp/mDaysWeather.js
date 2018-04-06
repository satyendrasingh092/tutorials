import {Component} from 'react'
import SingleDayWeather from 'singleDayWeather'

export default class mDaysWeather extends Component{
    render(){
        return <div></div>
        let mTiles = this.getMDaysWeather()
        return(
            <div style={{display :'flex'}}>
                {mTiles}
            </div>
        )
    }

    getMDaysWeather(props=this.props){
        let {weatherList} = props
        if(weatherList && weatherList.length){
            return weatherList.map(function(weatherObj){
                let temp = weatherObj.main.temp
                let icon = weatherObj.weather.icon
                let imgSrc = "http://openweathermap.org/img/w/"+{icon}+".png"
                return <SingleDayWeather temp={temp} imgSrc={imgSrc}/>
            })
        }
        return []
    }
}