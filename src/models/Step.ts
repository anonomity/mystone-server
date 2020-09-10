import mongoose from 'mongoose';
import {Document, model, Model, Schema} from 'mongoose'
import { timeStamp } from 'console';

const StepSchema: Schema = new Schema({
    title: {
        type: String, 
        required: true
    },
    checked: {
        completed: { 
            type: Boolean,
            required: true
        },
        completedAt :  {
            type: Date,
            required: false
        }
        
    },
    createdAt: {
        type: Object,
        required: false
    },
}, 
{timestamps: true} )

interface IStep extends Document {
    title: string;
    checked: Object;
    createdAt: Object;
}

export default model<IStep>("Step", StepSchema);
