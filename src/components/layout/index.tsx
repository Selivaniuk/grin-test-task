import Head from "next/head";
import Header from "../header";
import { FC, PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Box
        as="main"
        mx={8}
        mt={4}
        mb={8}
        height="calc(100vh - var(--chakra-sizes-16) - var(--chakra-space-4) - var(--chakra-space-8))"
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
