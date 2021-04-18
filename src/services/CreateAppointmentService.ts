import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

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
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
