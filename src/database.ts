import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://tavo0520:tavoracho@cluster0.qdhdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log('DB conectada'))
.catch(err => console.log(`error al conectar la BD ${err}`,err));  
