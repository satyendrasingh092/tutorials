import React, {Component} from 'react'

export default class chatInput extends Component {
    static defaultProps  = {
            userId:''
    }
    constructor(props){
        super(props)
        this.stopTypingTimeOut = undefined
        this.isTyping = false
    }

    componentDidMount(){
        this.refs.txtMessage.focus()
    }
    onSubmit(e){
        e.preventDefault();
        const message = this.refs.txtMessage.value;
        if (message.length === 0) {
            return;
        }
        let messageObj = {
            what : message,
            when : new Date().valueOf(),
            who  : this.props.userId
        }
        this.props.sendMessage(messageObj)
        this.refs.txtMessage.value = ''
        this.refs.txtMessage.focus()
    }

    resetStopTypingTimeout(){
        const {setTypingState} = this.props
       if(this.stopTypingTimeOut){
           clearTimeout(this.stopTypingTimeOut);
       }
       let self = this
      this.stopTypingTimeOut = setTimeout(function () {
          self.isTyping = false
          setTypingState(self.isTyping)
          self.stopTypingTimeOut = undefined
      },3*1000)
    }

    onChange(){
        const {setTypingState}  = this.props
        let isInputEmpty = this.refs.txtMessage.length === 0
        if(!isInputEmpty){
            if(this.isTyping === false){
                this.isTyping = true
                setTypingState(this.isTyping)
            } 
            this.resetStopTypingTimeout()
        }else{
            if(this.isTyping === true){
                this.isTyping = false
                setTypingState(this.isTyping)
                if(this.stopTypingTimeOut){
                    clearTimeout(this.stopTypingTimeOut)
                    this.stopTypingTimeOut = undefined
                }
            }
        }
    }
    render() {
        return (<footer className="message-form">
            <form className="container" onSubmit={this.onSubmit.bind(this)}>
                <div className="row">
                    <div className="input-field col s10">
                        <i className="prefix mdi-communication-chat"/>
                        <input type="text"  ref="txtMessage"  placeholder="Type your message"
                               onChange={this.onChange.bind(this)}/>
                        <span className="chip left">
                            <img src="//robohash.org/503483?set=set2&bgset=bg2&size=70x70"/>
                            <span>Anonymous robot #{this.props.userId}</span>
                        </span>
                    </div>
                    <div className="input-field col s2">
                        <button type="submit"  className="waves-effect waves-light btn-floating btn-large">
                            <i className="mdi-content-send"/>
                        </button>
                    </div>
                </div>
            </form>
        </footer>)
    }
}
