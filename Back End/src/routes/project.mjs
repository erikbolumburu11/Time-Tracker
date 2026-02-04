import { db } from "../index.mjs";
import { authenticateJWT } from "../utils/authentication.mjs";
import { createProject, deleteProject, getProject, getProjects, patchProject } from "../utils/projectQueries.mjs";
import { Router } from "express";
const projectRouter = Router();

projectRouter.post('/', authenticateJWT, (request, response) => {
    return createProject(request.user.id, request.body.project_name, response);
});

projectRouter.get('/', authenticateJWT, (request, response) => {
    return getProjects(request.user.id, response)
});

projectRouter.get('/:id', authenticateJWT, (request, response) => {
    return getProject(request.user.id, request.params.id, response)
});

projectRouter.patch('/:id', authenticateJWT, (request, response) => {
    const projectId = request.params.id;
    const userId = request.user.id;
    const { name } = request.body;

    return patchProject(projectId, userId, name, response)
});

projectRouter.delete('/:id', authenticateJWT, (request, response) => {
    return deleteProject(request.user.id, request.params.id, response)
});

export default projectRouter;