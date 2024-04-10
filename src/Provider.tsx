import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import useJwtToken from "./core/auth/hook/useJwtToken";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const token = useJwtToken();
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

