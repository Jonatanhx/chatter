import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { type AppType } from "next/app";
import Head from "next/head";
import { Layout } from "~/features/layout/layout";
import { theme } from "~/styles/theme";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Chatter App</title>
        <meta
          name="description"
          content="Find out what all the chatter is about"
        />
        <link rel="icon" href="/favicon.ico" />
        <ColorSchemeScript defaultColorScheme="dark" />
      </Head>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
