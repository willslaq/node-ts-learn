import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [X] Recebimento das informações
 * [X] Tratativa de erros/excessões
 * [X] Acesso ao repositório
 */

interface RequestDTO {
  provider: string;
  date: Date;
}

/**
 * Dependcy Inversion (SOLID)
 * DRY: Don't repeat Yourself (Nunca repita regra de negócio)
 */

/**
 * Single Responsability Principle:
 *  -> Serviço só pode possuir um serviço, uma única responsabilidade, neste caso Criar
 * Dependency Invertion Principle:
 *  -> Inverter a dependência passando o repositório como parâmetro para não intanciar novo repositório,
 *  ...não tendo acesso assim, ao que está sendo trabalhado em outro arquivo
 */

class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
