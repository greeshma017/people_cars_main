import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/pages/Index";
import Show from "./components/pages/Show";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/person/:id" element={<Show />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
