const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
// const connect = require('./config/database.js');
const user = require('./routes/User.js');
const vehicle = require('./routes/Vehicle.js');

const app = express();

// connect to database
// connect();


// Load env
dotenv.config({ path: '.env' })


// Body Parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());


// routes
app.use('/api/user', user);
app.use('/api/vehicle', vehicle);

app.use(express.static(path.join(__dirname, './client/build')));
app.use('/*', (req, res) => res.sendFile(path.join(__dirname, './client/build', 'index.html')));

// Cookie parser
app.use(cookieParser());
// app.get('/', (req, res) => 
//   res.send({ msg: "Welcome here" })
// );

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Connect to port
const PORT = process.env.PORT || 8081;

app.listen( PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))