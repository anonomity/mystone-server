import express from 'express';

import {Document, model, Model, Schema} from 'mongoose'


const MilestoneSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
       type: String,
       required: true 
    }
    ,
    started: {
        type: Object,
        required: true
    },
    deadline: {
        type: Object,
        required: true
    },
  steps: {
      type: Array,
      required: false
  },
  completed: {
      type: Array,
      required: true
  } 

},
{timestamps: true})

interface IMilestone extends Document {
    title: string;
    description: string;
    started: Object;
    deadline: Object;
    steps: Array<Object>;
    copleted: Array<Object>
}

export default model<IMilestone>("Milestone", MilestoneSchema);