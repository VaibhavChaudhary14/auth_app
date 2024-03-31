import mongoose from 'mongoose';

export async function connect(){
    try {
       mongoose.connect(process.env.MONGO_URI!)
       const connection = mongoose.connection

       connection.on('connected', () => {
        console.log('MongoDB connected successfully');
       })

       connection.on('error', (error) => { // Add the error parameter here
        console.log('Mongodb connection error, please make sure Mongodb is up and running: ' + error);
        process.exit();
    })
    

    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);


    }
}