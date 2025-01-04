import { randomUUID } from "node:crypto";
import { AppointmentModel } from "../dtos/models/appointment-model";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment";
import { UpdateAppointmentInput } from "../dtos/inputs/update-appointment";
import { CustomersService } from "./customers-service";

export class AppointmentsService {
  private appointments: AppointmentModel[] = [];
  private customersService: CustomersService;

  constructor() {
    this.customersService = new CustomersService();
  }

  async findAll(): Promise<AppointmentModel[]> {
    return this.appointments;
  }

  async findById(id: string): Promise<AppointmentModel | null> {
    return (
      this.appointments.find((appointment) => appointment.id === id) || null
    );
  }

  async create(data: CreateAppointmentInput): Promise<AppointmentModel> {
    const customer = await this.customersService.findById(data.customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    const appointment = {
      id: randomUUID(),
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      customer,
    } as AppointmentModel;

    this.appointments.push(appointment);
    return appointment;
  }

  async update(data: UpdateAppointmentInput): Promise<AppointmentModel> {
    const appointmentIndex = this.appointments.findIndex(
      (appointment) => appointment.id === data.id
    );

    if (appointmentIndex === -1) {
      throw new Error("Appointment not found");
    }

    const appointment = this.appointments[appointmentIndex];

    if (data.customerId) {
      const customer = await this.customersService.findById(data.customerId);
      if (!customer) {
        throw new Error("Customer not found");
      }
      appointment.customer = customer;
    }

    this.appointments[appointmentIndex] = {
      ...appointment,
      startsAt: data.startsAt || appointment.startsAt,
      endsAt: data.endsAt || appointment.endsAt,
    };

    return this.appointments[appointmentIndex];
  }

  async delete(id: string): Promise<boolean> {
    const appointmentIndex = this.appointments.findIndex(
      (appointment) => appointment.id === id
    );

    if (appointmentIndex === -1) {
      return false;
    }

    this.appointments.splice(appointmentIndex, 1);
    return true;
  }
}
