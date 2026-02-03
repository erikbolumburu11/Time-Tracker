import { db } from "../index.mjs";
import { authenticateJWT } from "../utils/authentication.mjs";
import { createProject } from "../utils/projectQueries.mjs";
import { Router } from "express";
const projectRouter = Router();

projectRouter.post('/', authenticateJWT, (request, response) => {
    return createProject(request.user.id, request.body.project_name, response);
});

projectRouter.get('/', authenticateJWT, (request, response) => {
    db.manyOrNone('SELECT * FROM projects WHERE user_id = $1',
        [
            request.user.id
        ]
    ).then((projects) => {
        return response.status(200).send(projects);
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
});

export default projectRouter;