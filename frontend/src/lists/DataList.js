import React, { Component } from 'react';
import {EventEmitter} from 'fbemitter';
import DataStore from '../stores/DataStore';

const emitter = new EventEmitter()
const store = new DataStore(emitter)

class DataList extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data === "categorii")
            store.getCategories()
        else if(nextProps.data === "tari")
            store.getCountries()
        emitter.addListener('CATEGORY_LOAD', ()=>{
            this.setState({
                data : store.content
            })
        })
        emitter.addListener('COUNTRY_LOAD', ()=>{
            this.setState({
                data : store.content
            })
        })
    }
    render(){
        return(
            <div>
                {this.state.data.map((c)=><h3 className="data">{c.nume}</h3>)}
            </div>
        );
    }
}

export default DataList;