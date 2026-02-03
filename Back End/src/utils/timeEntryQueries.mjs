import { db } from "../index.mjs";

export const TimeEntryStatus = {
    RUNNING: 'running',
    PAUSED: 'paused',
    FINISHED: 'finished'
};

export function startTimeEntry(userid, projectid, response){
    db.one('INSERT INTO time_entries(user_id, project_id, start_time, status) VALUES($1, $2, $3, $4) RETURNING *',
        [
            userid,
            projectid,
            new Date(),
            TimeEntryStatus.RUNNING
        ]
    ).then((data) => {
        return response.status(200).send({project: projectid, status: data.status});
    }).catch((error) => {
        return response.status(400).send(error.toString());
    });
}