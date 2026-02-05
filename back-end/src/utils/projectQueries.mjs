import { db } from "../index.mjs";

export function createProject(userid, name, response){
    db.one('INSERT INTO projects(user_id, name) VALUES($1, $2) RETURNING *',
        [
            userid,
            name,
        ]
    ).then((data) => {
        return response.status(200).send({id: data.id, name: data.name});
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
}

export function getProjects(userid, response){
    db.manyOrNone('SELECT * FROM projects WHERE user_id = $1',
        [
            userid
        ]
    ).then((projects) => {
        return response.status(200).send(projects);
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
}

export function getProject(userId, projectId, response){
    db.one('SELECT * FROM projects WHERE user_id = $1 AND id = $2',
        [
            userId,
            projectId
        ]
    ).then((project) => {
        return response.status(200).send(project);
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
}

export function patchProject(projectId, userId, name, response){
    db.one(`
        UPDATE projects
        SET name = $1
        WHERE id = $2 AND user_id = $3
        RETURNING id, name
        `, [name, projectId, userId]
    ).then((project) => {
        return response.status(200).send(project);
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
}

export function deleteProject(userId, projectId, response){
    db.oneOrNone(`
        DELETE FROM projects
        WHERE user_id = $1 AND id = $2
        RETURNING *
        `, [userId, projectId]
    ).then((project) => {
        return response.status(200).send(`Project "${project.name}" Deleted`)
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
}