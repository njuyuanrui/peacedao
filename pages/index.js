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
        <title>国产良心 NFT - 全宇宙限量 1000 的中国国产良心 NFT！</title>
        <meta name="description" content="中国人不骗中国人，放心！" />
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
      <Roadmap />
      <Whitelist />
      <FAQ />
      <Team />
      <Mint />
      <Summary />
    </div>
  );
}
