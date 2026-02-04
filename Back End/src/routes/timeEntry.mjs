import { Router } from "express";
import { authenticateJWT } from "../utils/authentication.mjs";
import { startTimeEntry, stopTimeEntry, patchTimeEntry } from "../utils/timeEntryQueries.mjs";

import { db } from "../index.mjs";

const timeEntryRouter = Router();

timeEntryRouter.post('/start', authenticateJWT, (request, response) => {
    return startTimeEntry(request.user.id, request.body.project_id, response);
});

timeEntryRouter.post('/stop', authenticateJWT, async (request, response) => {
    return stopTimeEntry(request.user.id, response);
});

timeEntryRouter.patch('/', authenticateJWT, async (request, response) => {
    return patchTimeEntry(request.user.id, request.body, response);
});

export default timeEntryRouter;