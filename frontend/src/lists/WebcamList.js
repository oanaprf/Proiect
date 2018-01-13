import React, { Component } from 'react';
import {EventEmitter} from 'fbemitter';
import DataStore from '../stores/DataStore';
import WebcamForm from '../forms/WebcamForm';

const emitter = new EventEmitter()
const store = new DataStore(emitter)

function addWebcam(webcam){
    store.addWebcam(webcam)
}

function updateWebcam(id,webcam) {
    store.updateWebcam(id,webcam)
}

const deleteWebcam = (id) => {
    store.deleteWebcam(id)
}

class WebcamList extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
            editing:false,
            idEdit:"",
            numeEdit:"",
            urlEdit:"",
            categorieEdit:"",
            taraEdit:""
        }
        this.handlerClear = this.handlerClear.bind(this);
    }
    componentDidMount(){
        store.getWebcams()
        emitter.addListener('WEBCAM_LOAD', ()=>{
            this.setState({
                data : store.content
            })
        })
    }
    handlerClear(){
        this.setState({
            editing:false,
            idEdit:"",
            numeEdit:"",
            urlEdit:"",
            categorieEdit:"",
            taraEdit:""
        })
    }
    render(){
        return(
            <div>
                <WebcamForm onAdd={addWebcam} isEditing={this.state.editing} onUpdate={updateWebcam} idWebcam={this.state.idEdit} onClear={this.handlerClear}
                    numeWebcam={this.state.numeEdit} urlWebcam={this.state.urlEdit} categorieWebcam={this.state.categorieEdit} taraWebcam={this.state.taraEdit}/>
                <div className="Webcams">
                    {this.state.data.map((webcam)=>
                            <table>
                                <tbody>
                                    <tr>
                                        <td rowSpan="3"><iframe title={webcam.nume} src={webcam.descriere}/></td>
                                        <td><button className="btn btn-danger" onClick={()=>deleteWebcam(webcam.id)}>✘</button><br/>
                                            <button className="btn btn-warning" onClick={()=>this.setState({editing:true, idEdit:webcam.id, numeEdit:webcam.nume, urlEdit:webcam.descriere, 
                                                    categorieEdit:webcam.id_categorie, taraEdit:webcam.id_tara})}>✎</button><br/>
                                            <button className="btn btn-info" onClick={()=>
                                                this.setState({editing:false, idEdit:"", numeEdit:"", urlEdit:"", 
                                                    categorieEdit:"", taraEdit:""})}>↩</button></td>
                                    </tr>
                                </tbody>
                            </table>
                    )}
                 </div>
            </div>
        );
    }
}

export default WebcamList;