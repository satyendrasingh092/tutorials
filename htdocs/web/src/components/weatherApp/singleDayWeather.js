import {Component} from 'react'

export default class singleDayWeather extends Component{

    render(){
        let {imgSrc ,temp}= this.props
        return <div></div>
        return (
            <div style={{display:"flex" , flexDirection:'column',justifyContent:"center"}}>
                <img style={{width : '50px' , height:'50px'}} src={imgSrc}/>
                <span>{temp}</span>
            </div>
        )
    }
}