import React, {Component} from 'react'
import {connect} from 'react-redux'
import I from 'immutable'
import ChatInput from '../components/chatInput'
import ChatHistory from '../components/chatHistory'
import ChatUsers from '../components/chatUsers'
import ChatUsersTyping from '../components/chatUsersTyping '
import {
    addHistory, addMessage, addTyingUser, addUser, removeTypingUser, removeUser,
    setUserId
} from "../actions/chatHistoryActions";

class App extends Component {
    static defaultProps = {
        history: []
    }

    constructor(props) {
        super(props)
        this.genSync.bind(this)
        this.asyncFunc.bind(this)
        this.promiseFunc.bind(this)
    }

    componentDidMount() {
        const userId = Math.round(Math.random() * 10000).toString()
        this.props.setUserId(userId)
        this.PubNub = PUBNUB.init({
            publish_key: 'pub-c-af89afed-ac35-4b9b-bcc0-275a9aaf7377',
            subscribe_key: 'sub-c-fcae27c8-2555-11e8-97e5-2e7e45341bc1',
            ssl: (location.protocol.toLowerCase() === 'https:'),
        })
        this.PubNub.subscribe({
            channel: 'ReactChat',
            message: this.props.addMessage,
            presence: this.onPresenceChange.bind(this)
        });
        this.fetchHistory();
        window.addEventListener('beforeunload', this.leaveChat);

        this.asyncFunc('p1','p2').then(val => console.log(val))
        this.promiseFunc().then(val => console.log(val))
    }


    componentWillUnmount() {
        this.leaveChat()
    }

    leaveChat = () => {
        this.PubNub.unsubscribe({channel: 'ReactChat',});
    }

    onPresenceChange(presenceData) {
        switch (presenceData.action) {
            case 'join':
                this.props.addUser(presenceData.uuid)
                break
            case 'leave':
            case 'timeout':
                this.props.removeUser(presenceData.uuid)
                break
            case 'state-change':
                if (presenceData.data) {
                    if (presenceData.data.isTyping === true) {
                        this.props.addTypingUser(presenceData.uuid)
                    } else {
                        this.props.removeTypingUser(presenceData.uuid)
                    }
                }
                break
            default:
                console.log("UnKnown action performed")
                break;
        }
    }

    fetchHistory = () => {
        const {props} = this;
        this.PubNub.history({
            channel: 'ReactChat',
            count: 15,
            start: props.lastMsgTimeStamp,
            callback: (data) => {
                // data is Array(3), where index 0 is an array of messages
                // and index 1 and 2 are start and end dates of the messages
                props.addHistory(data[0], data[1]);
            },
        });
    }

    sendMessage(message) {
        this.PubNub.publish({
            channel: 'ReactChat',
            message: message,
        });
    }

    render() {
        const {history, userId, users, typingUsers} = this.props
        return (<div className="message-container">
            <ChatUsers users={users}/>
            <ChatHistory history={history.toJS()} fetchHistory={this.fetchHistory}/>
            <ChatUsersTyping typingUsers={typingUsers}/>
            <ChatInput userId={userId} sendMessage={this.sendMessage.bind(this)} setTypingState={this.setTypingState}/>
        </div>)
    }

    setTypingState = (isTyping) => {
        this.PubNub.state({
                channel: 'ReactChat',
                uuid: this.props.userId,
                state: {isTyping}
            }
        )
    }

    /*------------------------------------------------Async and Await -------------------------------------------------*/

    isPromise = (obj) => Boolean(obj) && typeof obj.then === 'function'

    next(iter, callback, prev = undefined) {
        const item = iter.next(prev)
        const value = item.value
        if (item.done === true) return callback(prev)

        var self = this
        if (this.isPromise(value)) {
            value.then((val) => {
                setTimeout(() => self.next(iter, callback, val) ,0)
            })
        } else {
            setTimeout(() => self.next(iter, callback, value),0)
        }
    }

    genSync = function (fn) {
        let self = this
        return function (...args) {
            console.log(...args)
            return new Promise(resolve => self.next(fn(...args), val => resolve(val)))
        }
    }


    fetchSomething = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve('Future Value')
        }, 300 )
    }, (reject) => reject('error occurred'))

    /*work of myGen :
    * factory for iterator
    * */
    myGen = function* () {
        let value = yield this.fetchSomething()
        value = yield value + '2'
        value = yield value + '3'
        yield value + '4'
    }
    asyncFunc = this.genSync(this.myGen.bind(this))

    promiseFunc = () => new Promise((resolve) => {
        this.fetchSomething().then(result => {
            resolve(result + ' 2');
        });
    });

    /*----------------------------------------------------------------------------------------------------------------*/
}

function mapDispatchToProps(dispatch) {
    return {
        addMessage: (message) => dispatch(addMessage(message)),
        addHistory: (messages, timeStamp) => dispatch(addHistory(messages, timeStamp)),
        setUserId: (userId) => dispatch(setUserId(userId)),
        addUser: (uuid) => dispatch(addUser(uuid)),
        removeUser: (uuid) => dispatch(removeUser(uuid)),
        addTypingUser: (uuid) => dispatch(addTyingUser(uuid)),
        removeTypingUser: (uuid) => dispatch(removeTypingUser(uuid))
    }
}

function mapStateToProps(state) {
    return {
        history: state.app.getIn(['chatHistory', 'messages'], I.List()),
        userId: state.app.getIn(['chatHistory', 'userId']),
        users: state.app.getIn(['chatHistory', 'users']),
        lastMsgTimeStamp: state.app.getIn(['chatHistory', 'lastMsgTimeStamp']),
        typingUsers: state.app.getIn(['chatHistory', 'typingUsers'])
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)