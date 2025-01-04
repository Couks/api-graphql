import "reflect-metadata";
import path from "node:path";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";
import { CustomersResolver } from "./resolvers/customers-resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AppointmentsResolver, CustomersResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server);

  console.log(`🚀 HTTP server running on ${url}`);
}
bootstrap();

/**
 * Under fetching
 * Rota HTTP que retorna dados de menos
 * (Uma unica rota trás todos os dados)
 *
 * Over fetching
 * Rota HTTP retorna mais dados do que precisamos
 */

/**
 * Schema first approach
 * Code first
 */
