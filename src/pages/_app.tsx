import Layout from "@/components/layout";
import ViewedPagesProvider, {
  useViewedPagesStore,
} from "@/store/viewedPagesStore";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { loadFromLocalStorage } = useViewedPagesStore();
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <ChakraProvider>
      <Layout>
        <ViewedPagesProvider>
          <Component {...pageProps} />
        </ViewedPagesProvider>
      </Layout>
    </ChakraProvider>
  );
}
