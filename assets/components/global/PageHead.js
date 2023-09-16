/**
 *
 *  This is the page head
 *
 */

import Head from "next/head";

export const PageHead = ({ data }) => {
  const KEYWORDS = Array.isArray(data.keywords) ? data.keywords.join(", ") : "";

  return (
    <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.desc} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="robots" content={data.robots} />
      <link rel="canonical" href={data.canonical} />
      <link rel="icon" type="image/x-icon" href={data.favicon} />
      <link rel="icon" type="image/png" sizes="16x16" href={data.f16} />
      <link rel="icon" type="image/png" sizes="32x32" href={data.f32} />
      <link rel="icon" type="image/png" sizes="48x48" href={data.f48} />
      <link rel="icon" type="image/png" sizes="64x64" href={data.f64} />
      <link rel="icon" type="image/png" sizes="96x96" href={data.f96} />
      <link rel="icon" type="image/png" sizes="128x128" href={data.f128} />
      <link rel="icon" type="image/png" sizes="192x192" href={data.f192} />
      <link rel="icon" type="image/png" sizes="512x512" href={data.f512} />
      <link rel="apple-touch-icon" sizes="57x57" href={data.ati57} />
      <link rel="apple-touch-icon" sizes="76x76" href={data.ati76} />
      <link rel="apple-touch-icon" sizes="120x120" href={data.ati120} />
      <link rel="apple-touch-icon" sizes="152x152" href={data.ati152} />
      <link rel="apple-touch-icon" sizes="180x180" href={data.ati180} />
      <link rel="icon" type="image/png" sizes="72x72" href={data.android72} />
      <link rel="icon" type="image/png" sizes="96x96" href={data.android96} />
      <link
        rel="icon"
        type="image/png"
        sizes="144x144"
        href={data.android144}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={data.android192}
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={data.ms32} />
      <meta name="msapplication-square70x70logo" content={data.ms70} />
      <meta name="msapplication-square150x150logo" content={data.ms150} />
      <meta name="msapplication-wide310x150logo" content={data.ms310} />
    </Head>
  );
};
