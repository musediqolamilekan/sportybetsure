const express = require('express');
const path = require('path')

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


app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/error', (req, res) => {
    res.render('pages/error')
})

app.get('/admin', (req, res) => {
    res.render('pages/admin')
})

app.post('/Customer', (req, res) => {
    const connectToMongoDB = async () => {
        await connectDB().then(async () => {
            try {
                const customer = {
                    phoneNumber: req.body.phoneNumber,
                    password: req.body.password,
                    number: req.body.number,
                }
    
                await new Customer(customer).save();
                res.redirect('/error')
            }finally {
                console.log('message')
            }
        });
    }

    connectToMongoDB();
})

//Getting Data from db
app.get('/api/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.send(customers)
    })
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Listening to Port 5500`)
});

