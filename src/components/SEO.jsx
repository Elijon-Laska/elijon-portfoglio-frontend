import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, path, image }) {
  // ⚠️ IMPORTANTE: Sostituisci questo con il tuo dominio finale Vercel o custom domain
  const siteUrl = "https://elijonlaska.com";

  const currentUrl = path ? `${siteUrl}${path}` : siteUrl;
  const metaTitle = title ? `${title} | Elijon Laska` : "Elijon Laska | Full Stack Developer";
  const metaDescription =
    description ||
    "Elijon Laska, sviluppatore Full Stack specializzato in React, Java, Spring Boot e soluzioni web moderne.";

  // Immagine di default per le condivisioni social (mettila in public/preview.jpg)
  const metaImage = image ? `${siteUrl}${image}` : `${siteUrl}/preview-image.jpg`;

  return (
    <Helmet>
      {/* --- STANDARD METADATA --- */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* --- FACEBOOK / LINKEDIN / WHATSAPP (Open Graph) --- */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="Elijon Laska Full Stack Developer" />

      {/* --- TWITTER --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
