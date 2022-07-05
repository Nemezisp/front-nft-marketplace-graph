import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import { Fragment } from "react";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/30149/nft-marketplace/v0.0.2",
});

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Nft Marketplace</title>
        <meta
          name="description"
          content="Fully decentralized Nft Marketplace"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Header />
            <Component {...pageProps} />
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </Fragment>
  );
}

export default MyApp;
