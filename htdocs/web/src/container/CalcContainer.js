import {Component} from 'react'
import MyCalculator from '../components/MyCalculator'

export default class CalcContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            result:"",
            number1 : "",
            number2 : "",
            action : ''
        }
    }
    render(){
        return(<div style={{display:'flex',justifyContent:'center'}}>
            <MyCalculator buttonsClickHandler={this.buttonsClickHandler.bind(this)} result={this.state.result}/>
        </div>)
    }

    buttonsClickHandler(e){
        let res = this.state.result + e
        let action = this.state.action
        let no1 = this.state.number1
        let no2 = this.state.number2
        switch (e){
            case '=':
                switch (action){
                    case '/':
                        res = parseInt(no1) / parseInt(no2)
                        break
                    case '*':
                        res = parseInt(no1) * parseInt(no2)
                        break
                    case '+':
                        res = parseInt(no1) + parseInt(no2)
                        break
                    case '-':
                        res = parseInt(no1) - parseInt(no2)
                        break
                    default:
                        res = 0
                        break
                }
                action = ''
                break
            case '/':
                action = e
                break
            case '*':
                action = e
                break
            case '+':
                action = e
                break
            case '-':
                action = e
                break
            case 'reset':
                action = ''
                no1 = ''
                no2 = ''
                res = ''
                break
            default:
                if(this.state.action){
                    no2 += e
                }else{
                    no1 += e
                }
                break
        }
        this.setState({
            result : res,
            number1 : no1,
            number2 : no2,
            action : action
        })
    }
}