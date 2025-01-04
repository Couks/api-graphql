import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class CustomerModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
