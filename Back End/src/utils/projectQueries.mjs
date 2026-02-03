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