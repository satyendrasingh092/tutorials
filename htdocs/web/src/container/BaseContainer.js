import React ,{Component} from 'react'
import SearchComponent from '../components/searchComponent'
export default class BaseContainer extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }

    render(){
        return(
            <div className="conatiner">
                <SearchComponent/>
            </div>
        )
    }
}
