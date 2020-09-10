import mongoose from 'mongoose'
import {Document, model, Model, Schema} from 'mongoose';



const projectSchema: Schema = new Schema({
    projectTitle: {
        type: String,
        required: true 
    },
    projectDesc: {
        type: String,
        required: true
    },
    todos :{
        tasks : [
            {
                desc: {
                    type: String,
                    required: true
                },
                checked: {
                    checked: {
                      type: Boolean,
                      required: false
                      
                    },
                    when : {
                      type: Date,
                      required: false
                    }
                  },
                createdAt: {
                    type: Object,
                    required: true
                },
                deleted: {
                    type: Boolean,
                    required: true
                }
            }
        ]
        
    }
    
},
{ timestamps: true })



projectSchema.methods.addTodo= function(todo: String) {
    
    
    const updatedTodoItems = [...this.todos.tasks];
    //TODO: Check if todo exists
      updatedTodoItems.push({
        desc: todo,
        checked: {
          checked: false},
        createdAt: new Date(),
        deleted: false
        
      });

    const  updatedTodos= {
      tasks: updatedTodoItems
    };
    this.todos = updatedTodos;
    this.save()
    return this;
  };

  projectSchema.methods.findTodo= function(todo: String) {
    const updatedTodoItems = [...this.todos.tasks];

    for(let i =0; i > updatedTodoItems.length; i++){
      if(updatedTodoItems[i].desc === todo){
        return true 
      }
      

    }
    return false
  }
  projectSchema.methods.editTodo= function(todo: String) {
    const updatedTodoItems = [...this.todos.tasks];
    console.log(updatedTodoItems)
    for(let i =0; i < updatedTodoItems.length; i++){
      if(updatedTodoItems[i].desc === todo){
        updatedTodoItems[i].checked.checked = !updatedTodoItems[i].checked.checked
        // this.todos = updatedTodoItems
        if(updatedTodoItems[i].checked.checked){
            updatedTodoItems[i].checked.when = new Date()
        }
        this.todos.tasks = updatedTodoItems;
        this.save()
        return this;
      }

    }
    return undefined
  }
 

  projectSchema.methods.deletedTodo= function(todo: String) {
        
    const updatedTodoItems = [...this.todos.tasks];
    for(let i = 0; i < updatedTodoItems.length; i++){
      if(updatedTodoItems[i]._id == todo){
        if(updatedTodoItems[i].checked.checked === false){
          const filteredArr= updatedTodoItems.filter(item => item !== updatedTodoItems[i])
          this.todos.tasks = filteredArr;
        }
        else {
          updatedTodoItems[i].deleted = true
          this.todos.tasks = updatedTodoItems;
        }
        return this.save()
      } 
    }
      
  }
  
  interface IProject extends Document {
    projectTitle: string;
    projectDesc: string;
    todos: Object
    addTodo: (todo: string) => Object;
    findTodo: (todo: string) => boolean;
    editTodo: (todo: string) => Object;
    deletedTodo : (todo: string) => void;
  }

export default  model<IProject>("Project", projectSchema); 