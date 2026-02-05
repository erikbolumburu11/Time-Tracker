import { Router } from "express";
import { authenticateJWT } from "../utils/authentication.mjs";
import { startTimeEntry, stopTimeEntry, patchTimeEntry, getTimeEntries, getTimeEntry, getActiveTimeEntry, deleteTimeEntry, getProjectTimeEntries } from "../utils/timeEntryQueries.mjs";

const timeEntryRouter = Router();

timeEntryRouter.get('/', authenticateJWT, (request, response) => {
    return getTimeEntries(request.user.id, response);
});

timeEntryRouter.get('/active', authenticateJWT, (request, response) => {
    return getActiveTimeEntry(request.user.id, response);
});

timeEntryRouter.get('/:id', authenticateJWT, (request, response) => {
    return getTimeEntry(request.user.id, request.params.id, response);
});

timeEntryRouter.get('/project/:projectId', authenticateJWT, (request, response) => {
    return getProjectTimeEntries(request.user.id, request.params.projectId, response);
});

timeEntryRouter.post('/start', authenticateJWT, (request, response) => {
    return startTimeEntry(request.user.id, request.body.project_id, response);
});

timeEntryRouter.post('/stop', authenticateJWT, async (request, response) => {
    return stopTimeEntry(request.user.id, response);
});

timeEntryRouter.patch('/:id', authenticateJWT, async (request, response) => {
    return patchTimeEntry(request.user.id, request.params.id, request.body, response);
});

timeEntryRouter.delete('/:id', authenticateJWT, async (request, response) => {
    return deleteTimeEntry(request.user.id, request.params.id, response);
});

export default timeEntryRouter;