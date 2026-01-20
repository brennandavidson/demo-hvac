import Script from 'next/script';

export function GHLFormScript() {
  return (
    <Script
      src="https://link.msgsndr.com/js/form_embed.js"
      strategy="afterInteractive"
    />
  );
}
