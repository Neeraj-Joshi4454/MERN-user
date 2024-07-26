const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


function dbConnect(){
    
    try{
        mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('Great! connected to DB :)')
        })
    }catch(error){
        console.log('Failed to connect : ', error)
    }
}

module.exports = {dbConnect}