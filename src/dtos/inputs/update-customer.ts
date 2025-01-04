import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateCustomerInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
