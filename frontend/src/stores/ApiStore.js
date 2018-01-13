import axios from 'axios';
const SERVER = 'https://webcamstravel.p.mashape.com/webcams/list';

class ApiStore{
    constructor(ee){
        this.emitter = ee;
        this.content = [];
    }
    getAPIWebcams(){
        axios({
            method:'get',
            url: SERVER,
            headers :{"X-Mashape-Key": "mC507XFFsVmsh3WEEyrhIsQb5F08p1KwfjxjsnThz4VLBmNyVi"}
        }).then((res) =>{
            this.content = res.data
            this.emitter.emit('API_WEBCAM_LOAD')
        })
    }
}

export default ApiStore;