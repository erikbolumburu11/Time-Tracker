import { Router } from "express";
import { authenticateJWT } from "../utils/authentication.mjs";
import { startTimeEntry } from "../utils/timeEntryQueries.mjs";

import { db } from "../index.mjs";

const timeEntryRouter = Router();

timeEntryRouter.post('/', authenticateJWT, (request, response) => {
    return startTimeEntry(request.user.id, request.body.project_id, response);
});

timeEntryRouter.patch('/', authenticateJWT, async (request, response) => {
    try {
        const userId = request.user.id;
        const { id, status, start_time, end_time, project_id } = request.body;
        
        const updates = [];
        const values = [];
        let paramCount = 1;
        
        if (status) {
            updates.push(`status = $${paramCount++}`);
            values.push(status);
        }
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
        
        values.push(userId);
        
        const result = await db.query(
            `UPDATE time_entries 
             SET ${updates.join(', ')}
             WHERE id = ${id}
             RETURNING *`,
            values
        );
        
        response.json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default timeEntryRouter;