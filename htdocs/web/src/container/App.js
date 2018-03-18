import React,{Component} from 'react'
import ChatInput from '../components/chatInput'
import ChatHistory from '../components/chatHistory'
export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId : Math.round(Math.random()*10000).toString(),
            history : []
        }
    }
    componentDidMount(){
        this.PubNub = PUBNUB.init({
            publish_key: 'pub-c-af89afed-ac35-4b9b-bcc0-275a9aaf7377',
            subscribe_key: 'sub-c-fcae27c8-2555-11e8-97e5-2e7e45341bc1',
            ssl: (location.protocol.toLowerCase() === 'https:'),
        })
        this.PubNub.subscribe({
            channel: 'ReactChat',
            message: (message) => this.setState({
                history: this.state.history.concat(message)
            }),
        });
    }
    sendMessage (message){
        console.log(message)
        this.PubNub.publish({
            channel: 'ReactChat',
            message: message,
        });
    }
   render(){
        const {history , userId} = this.state
       return (<div>
           <ChatHistory history = {history}/>
           <ChatInput userId={userId} sendMessage ={this.sendMessage.bind(this)}/>
       </div>)
   }
}