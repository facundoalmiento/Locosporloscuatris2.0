// Inicialización del Google tag (gtag.js) para conversiones de Google Ads.
// Va en un archivo aparte (no inline en el <head>) porque la política de
// seguridad del sitio (CSP) no permite scripts inline sin debilitarla.
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "AW-18373477535");
// Google vinculó automáticamente una propiedad de Analytics a la cuenta de
// Ads (se ve tráfico real con este ID). La configuramos también acá, a
// propósito, para poder mandarle eventos propios (como "se instaló la
// PWA") — sin este config explícito, gtag no sabe que también le tiene que
// avisar a esta propiedad cuando mandamos un evento personalizado.
gtag("config", "G-NQC4BD57Z0");
