import React,{Component} from 'react'
import ReactDom from 'react-dom'

export default class chatHistory extends Component{
    static defaultProps = {
        history : [],
    }

    constructor(props){
        super(props)
        this.scrollAtBottom = true
    }
    componentWillUpdate(nextProps){
        this.historyChanged = this.props.history.length !== nextProps.history.length
        if(this.historyChanged){
            const scrollHeight = this.refs.messageList.scrollHeight
            const clientHeight = this.refs.messageList.clientHeight
            const scrollPos = this.refs.messageList.scrollTop
            const scrollBottom = scrollHeight - clientHeight
            /*If scrollBottom is less than or equal to zero. This would indicate there is not enough data to scroll.
            Or if the scroll position is at the bottom.*/
            this.scrollAtBottom = (scrollBottom <= 0 || scrollPos === scrollBottom)
        }
        if(!this.scrollAtBottom){
            const numMessages = this.refs.messageList.childNodes.length
            this.topMessage = numMessages === 0 ? null : this.refs.messageList.childNodes[0]
        }
    }
    componentDidUpdate(){
        if(this.historyChanged){
            if(this.scrollAtBottom){
                this.scrollToBottom()
            }
            if(this.topMessage){
                ReactDom.findDOMNode(this.topMessage).scrollIntoView()
            }
        }
    }

    getMessagesHistory(){
        let {history} = this.props
        if(!history || !history.length)
            return null
        return history.map(function (messageObj) {
            let messageDate = new Date(messageObj.when);
            let messageDateTime = messageDate.toLocaleDateString() +
                ' at ' + messageDate.toLocaleTimeString();
            return(  <li className="collection-item message-item avatar">
                <img src="//robohash.org/107378?set=set2&bgset=bg2&size=70x70" alt="107378" className="circle" />
                <span className="title">Anonymous robot #{messageObj.who}</span>
                <p>
                    <i className="prefix mdi-action-alarm" />
                    <span className="message-date">{messageDateTime}</span>
                    <br />
                    <span>{messageObj.what}</span>
                </p>
            </li>)
        })
    }

    onScroll(){
        /*scroll to fetch history*/
        const scrollTop = this.refs.messageList.scrollTop
        if(scrollTop === 0){
            this.props.fetchHistory()
        }
    }

    /*call if new message comes*/
    scrollToBottom(){
        const {messageList} = this.refs
        let maxScrollTop = messageList.scrollHeight - messageList.clientHeight
        ReactDom.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }

    render(){
        let messageHistory = this.getMessagesHistory()
        return(
            <ul className="collection message-list" ref="messageList" onScroll={this.onScroll.bind(this)}>
                {messageHistory}
            </ul>
        )
    }
}