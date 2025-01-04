import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCustomerInput {
  @Field()
  name: string;

  @Field()
  email: string;
}
