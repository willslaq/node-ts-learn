import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// SoC: Separation of Concerns (Separação de preocupações)
// Rota: Receber a requisição, chamar o responsável, devolver uma resposta / Toda transformação de dados fica na rota

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;


    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider
    })

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter;
