import React, { Component } from 'react';
import {EventEmitter} from 'fbemitter';
import DataStore from '../stores/DataStore';

const emitter = new EventEmitter()
const store = new DataStore(emitter)

class WebcamForm extends Component{
     constructor(props){
        super(props)
        this.state = {
            categorii:[],
            tari:[],
            numeWebcam:'',
            urlWebcam:'',
            categorieWebcam:'',
            taraWebcam:''
        }
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handleInputChangeCategory=this.handleInputChangeCategory.bind(this)
        this.handleInputChangeCountry=this.handleInputChangeCountry.bind(this)
    }
    componentDidMount() {
        store.getCategories()
        emitter.addListener('CATEGORY_LOAD', ()=>{
            this.setState({
                categorii : store.content
            })
        })
        store.getCountries()
        emitter.addListener('COUNTRY_LOAD', ()=>{
            this.setState({
                tari : store.content
            })
        })
        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            numeWebcam:nextProps.numeWebcam,
            urlWebcam:nextProps.urlWebcam,
            categorieWebcam:nextProps.categorieWebcam,
            taraWebcam:nextProps.taraWebcam
        })
    }
    handleInputChange(event){
        let nume=event.target.name
        let valoare=event.target.value
        this.setState({
          [nume]:valoare
        })
    }
    handleInputChangeCategory(event){
        let nume=event.target.name
        let valoare=event.target.value
        store.getCategoryIdByName(valoare)
        emitter.addListener('CATEGORY_ID_LOAD', ()=>{
            this.setState({
                [nume] : store.content.id
            })
        })
    }
    handleInputChangeCountry(event){
        let nume=event.target.name
        let valoare=event.target.value
        store.getCountryIdByName(valoare)
        emitter.addListener('COUNTRY_ID_LOAD', ()=>{
            this.setState({
                [nume] : store.content.id
            })
        })
    }
    render(){
        if(!this.props.isEditing)
            return(
                <div className="form">
                <form>
                    <h3 className="h4FormTitle">ADAUGA UN WEBCAM</h3>
                    <h4 className="h4Form">Titlu</h4><input name="numeWebcam" type="text" value={this.state.numeWebcam} onChange={this.handleInputChange}/>
                    <h4 className="h4Form">Url</h4><input name="urlWebcam" type="text" value={this.state.urlWebcam} onChange={this.handleInputChange}/>
                    <h4 className="h4Form">Categorie</h4><select name="categorieWebcam" onChange={this.handleInputChangeCategory}>
                    <option disabled selected value> selecteaza o categorie </option>
                    {this.state.categorii.map((c)=>
                        <option>{c.nume}</option>
                    )}
                    </select>
                     <h4 className="h4Form">Tara</h4><select name="taraWebcam" onChange={this.handleInputChangeCountry}>
                     <option disabled selected value> selecteaza o tara </option>
                    {this.state.tari.map((t)=>
                        <option>{t.nume}</option>
                    )}
                    </select>
                    <input type="button" className="btn btn-danger btn-sm" value="Adauga" onClick={()=>
                        {if(this.state.numeWebcam.length === 0 || this.state.urlWebcam.length === 0 || this.state.categorieWebcam.length === 0 || this.state.taraWebcam.length === 0)
                            alert("Completati toate campurile!")
                        else 
                            {   
                                this.props.onAdd({nume:this.state.numeWebcam, 
                                        descriere: this.state.urlWebcam, 
                                        id_categorie:this.state.categorieWebcam,
                                        id_tara:this.state.taraWebcam})
                                this.props.onClear()
                            }
                        }
                    }/>
                </form>
                </div>
            );
        else
            return(
                <div className="form">
                <form>
                    <h3 className="h4FormTitle">MODIFICA WEBCAM</h3>
                    <h4 className="h4Form">Titlu</h4><input name="numeWebcam" type="text" value={this.state.numeWebcam} onChange={this.handleInputChange}/>
                    <h4 className="h4Form">Url</h4><input name="urlWebcam" type="text" value={this.state.urlWebcam} onChange={this.handleInputChange}/>
                    <h4 className="h4Form">Categorie</h4><select name="categorieWebcam" onChange={this.handleInputChangeCategory}>
                    <option disabled selected value> selecteaza o categorie </option>
                    { 
                    this.state.categorii.map((c)=>
                        <option>{c.nume}</option>
                    )}
                    </select>
                     <h4 className="h4Form">Tara</h4><select name="taraWebcam" onChange={this.handleInputChangeCountry}>
                     <option disabled selected value> selecteaza o tara </option>
                    {this.state.tari.map((t)=>
                        <option>{t.nume}</option>
                    )}
                    </select>
                    <input type="button" className="btn btn-danger btn-sm" value="Modifica" onClick={()=>
                        {if(this.state.numeWebcam.length === 0 || this.state.urlWebcam.length === 0 || this.state.categorieWebcam.length === 0 || this.state.taraWebcam.length === 0)
                            alert("Completati toate campurile!")
                        else 
                            {   
                                this.props.onUpdate(this.props.idWebcam,{nume:this.state.numeWebcam, 
                                        descriere: this.state.urlWebcam, 
                                        id_categorie:this.state.categorieWebcam,
                                        id_tara:this.state.taraWebcam})
                                this.props.onClear()
                            }
                        }
                    }/>
                </form>
                </div>
            );
    }
}

export default WebcamForm;