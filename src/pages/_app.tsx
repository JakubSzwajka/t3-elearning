import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import MainLayout from "~/components/layouts/mainLayout";
import type LoginLayout from "~/components/layouts/loginLayout";
import type { NextPage } from "next";

type PageWithMainLayout = NextPage & { layout: typeof MainLayout };

type PageWithLoginLayout = NextPage & { layout: typeof LoginLayout };

type PageWithLayout = PageWithMainLayout | PageWithLoginLayout;

type AppLayoutProps = {
  Component: PageWithLayout;
  pageProps: {
    session: Session | null;
  };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) => {
  const Layout = Component.layout ? Component.layout : MainLayout;

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
