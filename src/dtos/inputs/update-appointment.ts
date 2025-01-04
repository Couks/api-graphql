import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateAppointmentInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  customerId?: string;

  @Field({ nullable: true })
  startsAt?: Date;

  @Field({ nullable: true })
  endsAt?: Date;
}
