import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const appointment = {
        provider,
        date
    }

    return response.json({ message: 'Hello World' })
})

export default appointmentsRouter;