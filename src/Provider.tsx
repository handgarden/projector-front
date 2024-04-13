import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const link = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

