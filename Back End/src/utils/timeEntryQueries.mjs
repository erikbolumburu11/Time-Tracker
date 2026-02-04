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
        if (!data) {
          return response.status(400).send({ error: "No active timer" });
        }

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

export async function patchTimeEntry(userId, body, response) {
    try{
        const { id, project_id, start_time, end_time } = body;

        if (!id) {
            return response.status(400).send('Time Entry ID Required');
        }

        const updates = [];
        const values = [];
        let paramCount = 1;
        
        if (start_time) {
            updates.push(`start_time = $${paramCount++}`);
            values.push(new Date(start_time));
        }
        if (end_time) {
            updates.push(`end_time = $${paramCount++}`);
            values.push(new Date(end_time));
        }
        if (project_id) {
            updates.push(`project_id = $${paramCount++}`);
            values.push(project_id);
        }

        if (updates.length === 0) {
            return response.status(400).json({ error: 'No valid fields to update' });
        }
        
        values.push(id, userId);
        
        const result = await db.query(
            `UPDATE time_entries 
             SET ${updates.join(', ')}
             WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
             RETURNING *`,
            values
        );
        
        if (result.length === 0) {
            return response.status(404).json({ error: 'Time entry not found or unauthorized' });
        }
        
        return response.json(result[0]);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}