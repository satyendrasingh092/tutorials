import {Component} from 'react'

export default class MyCalculator extends Component {

    constructor(props) {
        super(props)
        this.buttonsClickHandler.bind(this)
        this.onKeyUp.bind(this)
    }

    componentDidMount() {
    }

    render() {
        let myCalculator = this.getCalculator()
        return (<div>
            {myCalculator}
        </div>)
    }

    getCalculator() {
        let buttons = this.getButtons()
        let result = this.props.result || 0
        return (<div>
            <div id="resultDiv" contentEditable style={{
                width: '200px',
                height: '70px',
                color: 'white',
                background: 'black',
                fontSize: '22px',
                textAlign: 'right',
                padding: '15px'
            }} onKeyPress={(e) => this.onKeyUp(e)}>
                {result}
            </div>
            {buttons}
        </div>)
    }

    onKeyUp(e) {
        let val = String.fromCharCode(e.keyCode)
        this.props.buttonsClickHandler(val)
    }

    buttonsClickHandler(e) {
        let val = e.target.value
        this.props.buttonsClickHandler(val)
    }

    getButtons() {
        return (<div>
            <div style={{display: 'flex'}}>
                <button style={{width: '50px', height: '50px'}} value="7" onClick={(e) => this.buttonsClickHandler(e)}>
                    7
                </button>
                <button style={{width: '50px', height: '50px'}} value="8" onClick={(e) => this.buttonsClickHandler(e)}>
                    8
                </button>
                <button style={{width: '50px', height: '50px'}} value="9" onClick={(e) => this.buttonsClickHandler(e)}>
                    9
                </button>
                <button style={{width: '50px', height: '50px'}} value="reset"
                        onClick={(e) => this.buttonsClickHandler(e)}>DEL
                </button>
            </div>
            <div style={{display: 'flex'}}>
                <button style={{width: '50px', height: '50px'}} value="4" onClick={(e) => this.buttonsClickHandler(e)}>
                    4
                </button>
                <button style={{width: '50px', height: '50px'}} value="5" onClick={(e) => this.buttonsClickHandler(e)}>
                    5
                </button>
                <button style={{width: '50px', height: '50px'}} value="6" onClick={(e) => this.buttonsClickHandler(e)}>
                    6
                </button>
                <button style={{width: '50px', height: '50px'}} value="/" onClick={(e) => this.buttonsClickHandler(e)}>
                    /
                </button>
            </div>
            <div style={{display: 'flex'}}>
                <button style={{width: '50px', height: '50px'}} value="3" onClick={(e) => this.buttonsClickHandler(e)}>
                    3
                </button>
                <button style={{width: '50px', height: '50px'}} value="2" onClick={(e) => this.buttonsClickHandler(e)}>
                    2
                </button>
                <button style={{width: '50px', height: '50px'}} value="1" onClick={(e) => this.buttonsClickHandler(e)}>
                    1
                </button>
                <button style={{width: '50px', height: '50px'}} value="*" onClick={(e) => this.buttonsClickHandler(e)}>
                    *
                </button>
            </div>
            <div style={{display: 'flex'}}>
                <button style={{width: '50px', height: '50px'}} value="." onClick={(e) => this.buttonsClickHandler(e)}>
                    .
                </button>
                <button style={{width: '50px', height: '50px'}} value="0" onClick={(e) => this.buttonsClickHandler(e)}>
                    0
                </button>
                <button style={{width: '50px', height: '50px'}} value="=" onClick={(e) => this.buttonsClickHandler(e)}>
                    =
                </button>
                <button style={{width: '50px', height: '50px'}} value="+" onClick={(e) => this.buttonsClickHandler(e)}>
                    +
                </button>
            </div>
        </div>)

    }
}