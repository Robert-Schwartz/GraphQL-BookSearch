// React
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ==============================================

// Import Apollo
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// ==============================================

// Import pages and components
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
// ==============================================

// Link to graphQL server
const httpLink = createHttpLink({
	uri: "/graphql",
});
// ==============================================

// Set headers to the user Auth token for each request
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// Link to API
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
// ==============================================

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<>
					<Navbar />
					<Switch>
						<Route exact path="/" component={SearchBooks} />
						<Route exact path="/saved" component={SavedBooks} />
						<Route render={() => <h1 className="display-2">Wrong page!</h1>} />
					</Switch>
				</>
			</Router>
		</ApolloProvider>
	);
}
// ==============================================

export default App;
