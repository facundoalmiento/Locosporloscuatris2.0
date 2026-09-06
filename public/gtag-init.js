// Inicialización del Google tag (gtag.js) para conversiones de Google Ads.
// Va en un archivo aparte (no inline en el <head>) porque la política de
// seguridad del sitio (CSP) no permite scripts inline sin debilitarla.
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "AW-18373477535");
