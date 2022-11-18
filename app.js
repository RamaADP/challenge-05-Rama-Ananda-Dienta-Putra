const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');;
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');

require('./utils/db');
require('dotenv/config')
const car = require('./model/cars');


const app = express();
const port = 9000;

//EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

app.get('/',  async (req, res) => {
    const cars = await car.find();
    
    res.render('carCard', {
        cars,
        layout: 'layouts/main-layout',
        title:'List Cars',
        mainTitle: 'List Cars',
    }); 
});

app.get('/addNewCar', (req, res) => {
    res.render('addNewCar.ejs', {
        layout: 'layouts/main-layout',
        title:'Add New Car',
        mainTitle: 'Add New Car',
    }); 
});

app.get('/editCar/:nama', async (req,res) => {
    const cars = await car.findOne({nama: req.params.nama});

    res.render('editCar', {
        cars,
        layout: 'layouts/main-layout',
        title: 'Update Car Information',
        mainTitle: 'Update Car Information',

    })
});

//Tambah Data Mobil 
app.post('/addNewCar', async (req, res) => {
    console.log(req.body)
    await car.insertMany(req.body, () => {
        req.flash('msg', 'Car Information Has Been Listed!');
        res.redirect('/')
    })
})

//Hapus Data Mobil
app.delete('/', (req, res) => {
    car.deleteOne({nama: req.body.nama}).then((result)=> {
        req.flash('msg', 'Data contact berhasil dihapus!');
        res.redirect('/')
    })
})

//Ubah Data Mobil
app.put(
    '/', (req, res) => {
        car.updateOne(
            {_id: req.body._id},
            {
                $set: {
                    nama: req.body.nama,
                    biaya: req.body.biaya,
                    ukuran: req.body.ukuran,
                    foto: req.body.foto,
                },
            }
        ).then((result)=> {
            req.flash('msg', 'Data contact berhasil dihapus!');
            res.redirect('/')
        });
    })



app.get('/:ukuran', async (req, res) => {
    const cars = await car.find({ukuran: req.params.ukuran});
    res.render('carCard', {
        cars,
        layout: 'layouts/main-layout',
        title: 'List Cars',
        mainTitle: 'List of ' + req.params.ukuran +' Cars',
    }); 
});

app.listen(port, () => {
    console.log(`Server sudah berjalan di http://locathost:${port}`)
})