import express from "express";

import {postTodo, postProject, getProjects, getProjectView, deleteTodo} from "../controllers/projects";
 

 
export const routes = express.Router();

routes.post("/new-project", postProject)

routes.post("/projects/:id", postTodo);

routes.get("/projects/:id", getProjectView)

routes.get("/projects", getProjects)

routes.post("/projects/:id/:id", deleteTodo)
//////////////////////////////////////////////////////////

