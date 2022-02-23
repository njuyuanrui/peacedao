import { useEffect } from "react";
import Head from "next/head";
import Intro from "../components/Intro";
import Gallery from "../components/Gallery";
import Roadmap from "../components/Roadmap";
import Whitelist from "../components/Whitelist";
import Team from "../components/Team";
import FAQ from "../components/FAQ";
import Mint from "../components/Mint";
import Summary from "../components/Summary";

export default function Home() {
  useEffect(() => {
    if (window.console) {

    }
  }, []);

  return (
    <div>
      <Head>
        <title>国产韭菜 NFT - 限量 5000 根国产韭菜 NFT！</title>
        <meta name="description" content="国产韭菜 团结！" />
        <link rel="icon" href="/favicon.png" />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Intro />
      <Gallery />
      <Mint />
      <Roadmap />
      {/* <Whitelist /> */}
      <FAQ />
      {/* <Team /> */}
      <Summary />
    </div>
  );
}
