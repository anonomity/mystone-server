import express from 'express'

import projectSchema from "../models/Projects";
import addTodo from "../models/Projects";
import deletedTodo from "../models/Projects";
import editTodo from "../models/Projects";

export const postProject = (req: express.Request,res: express.Response,next: express.NextFunction) => {
    const proj = new projectSchema({
        projectTitle: req.body.title,
        projectDesc: req.body.desc,
        // todo: {
            
        // }
    })
    proj.save()

    res.status(200).json({message: "Project successfully added"})
}

export const postTodo = (req: express.Request,res: express.Response,next: express.NextFunction) => {
  
    const projId = req.params.id
    const todo = req.body.desc
    const editTodo = req.body.checked
    
    projectSchema.findById(projId)
      .then(project => {
        
        if(editTodo){
          //edit
          
          let newProject = project.editTodo(todo)
          
          res.status(200).json({project: newProject})
        }
        else {
          
          let newProject = project.addTodo(todo)
          
          res.status(200).json({project: newProject})
        }
        
      })
      .catch(err => {
        console.log(err)
      })

}

export const getProjects = (req: express.Request,res: express.Response,next: express.NextFunction) => {
    projectSchema.find()
    .then(projects => {
      res.status(200).json({projects: projects})
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProjectView = (req: express.Request,res: express.Response,next: express.NextFunction) => {
    const projId = req.params.id.split(":")[1].substring(2);
    projectSchema.findById(projId)
    .then(project => {
        if(!project) {
          const error = new Error('Could not find project');
          console.log(error)
        }
        res.status(200).json({message: "Post fetched", project: project})
      })
      .catch(err => {
        if(!err.statusCode) {
          err.statusCode = 500
        }
        next(err);
      })

}

export const deleteTodo = (req: express.Request,res: express.Response,next: express.NextFunction) => {
  projectSchema.findById(req.body.projId)
    .then(proj => {
      return proj.deletedTodo(req.body._id)
        
    })
    .catch(err =>{
      console.log(err)
    })

}