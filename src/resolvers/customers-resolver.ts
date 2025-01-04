import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CustomerModel } from "../dtos/models/customer-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer";
import { UpdateCustomerInput } from "../dtos/inputs/update-customer";
import { CustomersService } from "../services/customers-service";

@Resolver(() => CustomerModel)
export class CustomersResolver {
  private customersService: CustomersService;

  constructor() {
    this.customersService = new CustomersService();
  }

  @Query(() => [CustomerModel])
  async customers() {
    return this.customersService.findAll();
  }

  @Query(() => CustomerModel, { nullable: true })
  async customer(@Arg("id") id: string) {
    return this.customersService.findById(id);
  }

  @Mutation(() => CustomerModel)
  async createCustomer(@Arg("data") data: CreateCustomerInput) {
    return this.customersService.create(data);
  }

  @Mutation(() => CustomerModel)
  async updateCustomer(@Arg("data") data: UpdateCustomerInput) {
    return this.customersService.update(data);
  }

  @Mutation(() => Boolean)
  async deleteCustomer(@Arg("id") id: string) {
    return this.customersService.delete(id);
  }
}
