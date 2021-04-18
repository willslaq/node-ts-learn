import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

// SoC: Separation of Concerns (Separação de preocupações)
// Rota: Receber a requisição, chamar o responsável, devolver uma resposta / Toda transformação de dados fica na rota

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider
    })

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter;
