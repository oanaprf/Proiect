var express = require("express")
var Sequelize = require("sequelize")

var sequelize = new Sequelize('locuri_de_interes','root','',{
    dialect:'mysql',
    host:'localhost',
    define: {
        freezeTableName: true,
        timestamps: false
    }
})

sequelize.authenticate().then(function(){
    console.log('Autentificat cu succes')
})

var app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE")
    next()
})

app.use(express.static('../frontend/build'))

var Tari = sequelize.define('tara',{
    nume: Sequelize.STRING,
})

var Categorii = sequelize.define('categorie',{
    nume: Sequelize.STRING
})

var Webcams = sequelize.define('webcam',{
    nume: Sequelize.STRING,
    descriere: Sequelize.STRING,
    id_tara: Sequelize.INTEGER,
    id_categorie: Sequelize.INTEGER
})

Webcams.belongsTo(Tari, {foreignKey: 'id_tara', targetKey: 'id'})
Webcams.belongsTo(Categorii, {foreignKey: 'id_categorie', targetKey: 'id'})

var tara_not_found = 'Aceasta tara nu exista.'
var categorie_not_found = 'Aceasta categorie nu exista.'
var webcam_not_found = 'Acest webcam nu exista.'


app.get('/tari',function(req,res){
    Tari.findAll().then(function(tari){
        res.status(200).send(tari)
    })
})

app.get('/tari/:id',function(req,res){
    Tari.findOne({where: {id:req.params.id}}).then(function(tara){
        if(tara){
            res.status(200).send(tara)
        }else{
            res.status(404).send(tara_not_found)
        }
    })
})

app.get('/tari2/:nume',function(req,res){
    Tari.findOne({where: {nume:req.params.nume}}).then(function(tara){
        if(tara){
            res.status(200).send(tara)
        }else{
            res.status(404).send(tara_not_found)
        }
    })
})

app.post('/tari',function(req,res){
    Tari.create(req.body).then(function(tara){
        res.status(201).send(tara)
    })
})

app.put('/tari/:id',function(req,res){
    Tari.findById(req.params.id).then(function(tara){
        if(tara){
            tara.update(req.body).then(function(tara){
                res.status(201).send(tara)
            }).catch(function(error){
                res.send(200).send(error)
            })
        }else{
            res.status(404).send(tara_not_found)
        }
    })
})

app.delete('/tari/:id',function(req,res){
    Tari.findById(req.params.id).then(function(tara){
        if(tara){
            tara.destroy().then(function(){
                res.status(204).send('Tara a fost stearsa.')
            })
        }else{
            res.status(404).send(tara_not_found)
        }
    })
})


app.get('/categorii',function(req, res) {
    Categorii.findAll().then(function(tari){
        res.status(200).send(tari)
    })
})

app.get('/categorii/:id',function(req, res) {
    Categorii.findOne({where: {id:req.params.id}}).then(function(categorie){
        if(categorie){
            res.status(200).send(categorie)
        }else{
            res.status(404).send(categorie_not_found)
        }
    })
})

app.get('/categorii2/:nume',function(req, res) {
    Categorii.findOne({where: {nume:req.params.nume}}).then(function(categorie){
        if(categorie){
            res.status(200).send(categorie)
        }else{
            res.status(404).send(categorie_not_found)
        }
    })
})

app.post('/categorii',function(req,res){
    Categorii.create(req.body).then(function(categorie){
        res.status(201).send(categorie)
    })
})

app.put('/categorii/:id',function(req,res){
    Categorii.findById(req.params.id).then(function(categorie){
        if(categorie){
            categorie.update(req.body).then(function(categ){
                res.status(201).send(categ)
            }).catch(function(error){
                res.status(200).send(error)
            })
        }else{
            res.status(404).send(categorie_not_found)
        }
    })
})

app.delete('/categorii/:id',function(req,res){
    Categorii.findById(req.params.id).then(function(categorie){
        if(categorie){
            categorie.destroy().then(function(){
                res.status(204).send('Categoria a fost stearsa.')
            })
        }else{
            res.status(404).send(categorie_not_found)
        }
    })
})


app.get('/webcams',function(req, res) {
    Webcams.findAll().then(function(webcams){
        res.status(200).send(webcams)
    })
})

app.get('/webcams/:id',function(req,res){
    Webcams.findOne({where: {id:req.params.id}}).then(function(webcam){
        if(webcam){
            res.status(200).send(webcam)
        }else{
            res.status(404).send(webcam_not_found)
        }
    })
})

app.post('/webcams',function(req, res) {
    Webcams.create(req.body).then(function(webcam){
        res.status(201).send(webcam)
    })
})

app.put('/webcams/:id',function(req, res) {
    Webcams.findById(req.params.id).then(function(webcam){
        if(webcam){
            webcam.update(req.body).then(function(web){
                res.status(201).send(web)
            }).catch(function(error){
                res.status(200).send(error)
            })
        }else{
            res.status(404).send(webcam_not_found)
        }
    })
})

app.delete('/webcams/:id',function(req, res) {
    Webcams.findById(req.params.id).then(function(webcam) {
        if(webcam){
            webcam.destroy().then(function(){
                res.status(204).send('Webcam-ul a fost sters')
            })
        }else{
            res.status(404).send(webcam_not_found)
        }
    })
})


app.get('/tari/:id/webcams',function(req, res) {
    Webcams.findAll({where: {id_tara:req.params.id}}).then(function(webcams){
        res.status(200).send(webcams)
    })
})

app.get('/categorii/:id/webcams', function(req, res) {
    Webcams.findAll({where: {id_categorie: req.params.id}}).then(function(webcams) {
        res.status(200).send(webcams)
    })
})

var unirest = require('unirest');

app.get('/api', function(req, res) {
    unirest.get("https://webcamstravel.p.mashape.com/webcams/list?show=webcams:title,url,location")
        .header("X-Mashape-Key", "mC507XFFsVmsh3WEEyrhIsQb5F08p1KwfjxjsnThz4VLBmNyVi")
        .end(function (result) {
            res.status(result.status).send(result.body.result.webcams)
    });
})



app.listen(8080)