const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const app = express();
const members = require('./Members');

// /init middleware
// app.use(logger);

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) =>
  res.render('index', {
    title: 'My Member App',
    members,
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.get('/',(req,res)=>{
// res.sendFile(path.join(__dirname, 'public','index.html'));
// })
// create a static folder

// get all the memebers....

// create a static path..
app.use(express.static(path.join(__dirname, 'public')));

// members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
