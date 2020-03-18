require('./models/User.js');
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
//app.use(bodyParser.json());
app.use(express.json()); //express now has json parser
app.use(authRoutes);

app.use((error, req, res, next) =>{
    if(error instanceof SyntaxError){ 
      return res.status(500).send({data : "Invalid data"});
    } else {
      next();
    }
});

const mongoUri = "mongodb+srv://admin:2Meal18oZKABXBMZ@cluster0-sugl0.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}
);

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email:  ${req.user.email}`);
});

mongoose.connection.on('connected', (err) => {
    console.error('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
