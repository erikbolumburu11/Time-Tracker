import { Router } from "express";
import { authenticateJWT } from "../utils/authentication.mjs";
import { startTimeEntry, stopTimeEntry } from "../utils/timeEntryQueries.mjs";

import { db } from "../index.mjs";

const timeEntryRouter = Router();

timeEntryRouter.post('/start', authenticateJWT, (request, response) => {
    return startTimeEntry(request.user.id, request.body.project_id, response);
});

timeEntryRouter.post('/stop', authenticateJWT, async (request, response) => {
    return stopTimeEntry(request.user.id, response);

});

export default timeEntryRouter;