import mongoose, { Schema, model, Document } from 'mongoose';

const projectSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',
        require: true,
        min: 4,
        lowercase: true
    },
    name: {
        type: String,
        require: true,
        min: 6,
    },
    type: {
        type: String,
        require: true,
        enum : ['ADMIN','WEB','MOVIL'],
        min: 6,
    },
    date_delivery: {
        type: String,
        require: true,
    },
    status: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    createdAt:  { 
        type: Date, 
        required: false, 
        default: Date.now 
    }


}, {
    
});
export default model('Project', projectSchema );