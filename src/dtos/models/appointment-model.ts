import { Field, ID, ObjectType } from "type-graphql";
import { CustomerModel } from "./customer-model";

@ObjectType()
export class AppointmentModel {
  @Field(() => ID)
  id: string;

  @Field(() => CustomerModel)
  customer: CustomerModel;

  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;
}
