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
        ml={4}
        mr={4}
        mt={4}
        height="calc(100vh - var(--chakra-sizes-16) - var(--chakra-space-4))"
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
