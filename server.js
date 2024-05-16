const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDb = require("./db");


//dot env config
dotenv.config();

//db connection
connectDb()

//middleware
app.use(express.json());


//route
app.use('/api/v1/test',require('./routes/testRoutes'))
app.use('/api/v1/auth', require('./routes/registerRoutes'))
app.use('/api/v1/new', require('./routes/UserRoutes'));
app.use("/api/v1/restaurent",require('./routes/restaurentRoutes'))

app.get('/', (req, res) => {
    return res.status(200).send('welcome to food server');

})

app.listen(3000,()=>{
    console.log('listening on port 3000'.bgMagenta)
})

