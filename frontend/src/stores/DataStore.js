import axios from 'axios';
const SERVER = 'https://locuri-de-interes-oanaprf.c9users.io';

class DataStore{
    constructor(ee){
        this.emitter = ee;
        this.content = [];
    }
    getCategories(){
        axios(SERVER + '/categorii').then((res) =>{
            this.content = res.data
            this.emitter.emit('CATEGORY_LOAD')
        })
    }
    getCountries(){
        axios(SERVER + '/tari').then((res) =>{
            this.content = res.data
            this.emitter.emit('COUNTRY_LOAD')
        })
    }
    getWebcams(){
        axios(SERVER + '/webcams').then((res) =>{
            this.content = res.data
            this.emitter.emit('WEBCAM_LOAD')
        })
    }
    addWebcam(webcam){
        axios({
            method: 'post',
            url: SERVER + '/webcams',
            headers: {"Content-Type":"application/json"},
            data: webcam
        }).then(() => this.getWebcams())
          .catch((error) => console.warn(error))
    }
    updateWebcam(id, webcam){
        axios({
            method: 'put',
            url: SERVER + '/webcams/' + id,
            headers: {"Content-Type":"application/json"},
            data: webcam
        }).then(() => this.getWebcams())
          .catch((error) => console.warn(error))
    }
    deleteWebcam(id){
        axios.delete(SERVER + '/webcams/' + id)
        .then(() => this.getWebcams())
        .catch((error) => console.warn(error))
    }
    
    getCategoryIdByName(name){
         axios(SERVER + '/categorii2/' + name).then((res) =>{
            this.content = res.data
            this.emitter.emit('CATEGORY_ID_LOAD')
        })
    }
    getCountryIdByName(name){
         axios(SERVER + '/tari2/' + name).then((res) =>{
            this.content = res.data
            this.emitter.emit('COUNTRY_ID_LOAD')
        })
    }
    
    getWebcamsByCategory(id_categ){
         axios(SERVER + '/categorii' + id_categ + '/webcams').then((res) =>{
            this.content = res.data
            this.emitter.emit('WEBCAMS_BY_CATEGORY_LOAD')
        })
    }
}

export default DataStore;