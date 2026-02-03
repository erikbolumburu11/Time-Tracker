import { db } from "../index.mjs";

export function startTimeEntry(userid, projectid, response){
    db.one('INSERT INTO time_entries(user_id, project_id, start_time) VALUES($1, $2, $3) RETURNING *',
        [
            userid,
            projectid,
            new Date(),
        ]
    ).then((data) => {
        return response.status(200).send({id: data.id, project: projectid});
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
}

export async function stopTimeEntry(userId, response) {
    db.oneOrNone(`
        UPDATE time_entries
        SET end_time = NOW()
        WHERE user_id = $1
        AND end_time IS NULL
        RETURNING *
    `, [userId]
    ).then((data) => {
        return response.status(200).send({
            id: data.id,
            project_id: data.project_id,
            start_time: data.start_time,
            end_time: data.end_time
        })
    }).catch((error) => {
        return response.status(400).send(error.toString);
    });
}