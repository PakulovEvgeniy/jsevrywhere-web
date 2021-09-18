import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import {setContext} from 'apollo-link-context';
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

const uri = process.env.API_URI;
const httpLink = createHttpLink({uri});
const cache = new InMemoryCache();

const data = {
    isLoggedIn: !!localStorage.getItem('token')
}
cache.writeQuery({
    query: gql`query GetLocalData { isLoggedIn }`,
    data
});

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

client.onResetStore(() => cache.writeQuery({
    query: gql`query GetLocalData { isLoggedIn }`,
    data: {isLoggedIn: false}
}));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};
ReactDOM.render(<App />, document.getElementById('root'));