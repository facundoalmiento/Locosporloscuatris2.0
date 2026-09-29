// Los navegadores no le dan al dueño de un sitio un "contador de
// instalaciones" como tiene Google Play. La única forma de estimarlo es que
// la propia página le avise a Analytics cuando pasan estas dos cosas:
//
// 1. "pwa_open_standalone": se abrió ya INSTALADA (sin la barra del
//    navegador). Anda en todos lados, incluido iPhone — ahí es la única
//    señal posible, porque iOS no avisa el momento exacto de instalación.
// 2. "pwa_install": el usuario acaba de instalarla ahora mismo. Solo existe
//    en Android/Chrome — iOS no tiene este evento.
//
// Con "pwa_open_standalone" alcanza para ver en Analytics cuánta gente la
// usa instalada a lo largo del tiempo, que es más útil que un simple
// contador de instalaciones (esas se pueden borrar y no lo sabrías).
export function iniciarSeguimientoPwa() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return

  const yaInstalada =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true

  if (yaInstalada) {
    window.gtag("event", "pwa_open_standalone")
  }

  window.addEventListener("appinstalled", () => {
    window.gtag("event", "pwa_install")
  })
}
