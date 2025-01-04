import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment";
import { UpdateAppointmentInput } from "../dtos/inputs/update-appointment";
import { AppointmentModel } from "../dtos/models/appointment-model";
import { CustomerModel } from "../dtos/models/customer-model";
import { AppointmentsService } from "../services/appointments-service";

@Resolver(() => AppointmentModel)
export class AppointmentsResolver {
  private appointmentsService: AppointmentsService;

  constructor() {
    this.appointmentsService = new AppointmentsService();
  }

  @Query(() => [AppointmentModel])
  async appointments() {
    return this.appointmentsService.findAll();
  }

  @Query(() => AppointmentModel, { nullable: true })
  async appointment(@Arg("id") id: string) {
    return this.appointmentsService.findById(id);
  }

  @Mutation(() => AppointmentModel)
  async createAppointment(@Arg("data") data: CreateAppointmentInput) {
    return this.appointmentsService.create(data);
  }

  @Mutation(() => AppointmentModel)
  async updateAppointment(@Arg("data") data: UpdateAppointmentInput) {
    return this.appointmentsService.update(data);
  }

  @Mutation(() => Boolean)
  async deleteAppointment(@Arg("id") id: string) {
    return this.appointmentsService.delete(id);
  }

  @FieldResolver(() => CustomerModel)
  customer(@Root() appointment: AppointmentModel) {
    return appointment.customer;
  }
}
