import {Component} from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select'


export default class searchComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            value : ''
        }
    }

    onChange(searchVal) {
        this.setState({
            value: searchVal,
        });
    }

    getUsers(input){
        if (!input || input.length < 3 ) {
            return Promise.resolve({ options: [] });
        }

        let url = "https://api.github.com/search/users?q="+input
        return fetch(url)
            .then((response) => response.json())
            .then((json) => {
                return { options: json.items };
            });
    }

    gotoUser(value,event){
        window.open(value.html_url);
    }

    render() {
       const AsyncComponent = Select.Async;
        return (
            <div className="section">
                <AsyncComponent  value={this.state.value} onChange={this.onChange.bind(this)}
                                onValueClick={this.gotoUser} valueKey="id" labelKey="login"
                                 loadOptions={this.getUsers.bind(this)}
                                 />
            </div>
        )
    }
}