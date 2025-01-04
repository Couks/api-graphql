import { randomUUID } from "node:crypto";
import { CustomerModel } from "../dtos/models/customer-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer";
import { UpdateCustomerInput } from "../dtos/inputs/update-customer";

export class CustomersService {
  private customers: CustomerModel[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Doe", email: "jane@example.com" },
  ];

  async findAll(): Promise<CustomerModel[]> {
    return this.customers;
  }

  async findById(id: string): Promise<CustomerModel | null> {
    return this.customers.find((customer) => customer.id === id) || null;
  }

  async create(data: CreateCustomerInput): Promise<CustomerModel> {
    const customerExists = this.customers.some(
      (customer) => customer.email === data.email
    );

    if (customerExists) {
      throw new Error("Customer with this email already exists");
    }

    const customer = {
      id: randomUUID(),
      ...data,
    };

    this.customers.push(customer);
    return customer;
  }

  async update(data: UpdateCustomerInput): Promise<CustomerModel> {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === data.id
    );

    if (customerIndex === -1) {
      throw new Error("Customer not found");
    }

    if (data.email) {
      const emailExists = this.customers.some(
        (customer) => customer.email === data.email && customer.id !== data.id
      );

      if (emailExists) {
        throw new Error("Email already in use");
      }
    }

    const customer = this.customers[customerIndex];

    this.customers[customerIndex] = {
      ...customer,
      name: data.name || customer.name,
      email: data.email || customer.email,
    };

    return this.customers[customerIndex];
  }

  async delete(id: string): Promise<boolean> {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id
    );

    if (customerIndex === -1) {
      return false;
    }

    this.customers.splice(customerIndex, 1);
    return true;
  }
}
