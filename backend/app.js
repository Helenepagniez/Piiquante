const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const app = express();


require('dotenv').config();
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
// mongoose connect
mongoose.connect('mongodb+srv://${user}:${pass}@cluster0.d0thd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
     useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS - partage de ressources entre serveurs
app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); //bodyparser

app.use(mongoSanitize()); // En prévention des injections
app.use(helmet()); // helmet

app.use('/images', express.static(path.join(__dirname, 'images'))); // gestion images de manière statiques
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
    
 // export de l'application
module.exports = app;