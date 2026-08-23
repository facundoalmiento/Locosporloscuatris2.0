import { Resend } from "resend";
import { siteConfig } from "../../src/config/site.js";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Mientras no verifiques tu propio dominio en Resend, "onboarding@resend.dev"
// es la dirección de prueba que Resend deja usar sin configuración extra.
const FROM = process.env.EMAIL_FROM ?? "Locos por los Cuatris <onboarding@resend.dev>";
const LINK_CUENTA = `${siteConfig.sitioUrl}/#/mi-cuenta`;
const MASCOTA_URL = `${siteConfig.sitioUrl}/mascota-email.png`;

// Escapa texto que viene de datos cargados por usuarios (nombre, marca,
// modelo) antes de meterlo en el HTML del mail — evita que algo como
// "<b>" en el nombre de un vehículo rompa el diseño del email.
function escapeHtml(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Cascarón compartido por todos los mails del sitio: header con logo +
// mascota, el cuerpo (distinto en cada mail) y el footer. Escrito con
// tablas y estilos en línea porque es lo único que Gmail/Outlook/etc.
// respetan de forma confiable — un email no es una página web.
function renderShell({
  tituloPagina,
  subtituloHeader,
  bodyHtml,
  footerNota,
}: {
  tituloPagina: string;
  subtituloHeader: string;
  bodyHtml: string;
  footerNota: string;
}) {
  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(tituloPagina)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#0a0a0a;padding:20px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:900;letter-spacing:0.05em;text-transform:uppercase;color:#ffffff;">
                        LPLC<span style="color:#a3e635;">2.0</span>
                      </p>
                      <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#a1a1aa;">
                        ${escapeHtml(subtituloHeader)}
                      </p>
                    </td>
                    <td style="width:76px;vertical-align:middle;" align="right">
                      <img
                        src="${MASCOTA_URL}"
                        width="76"
                        alt="Mascota de Locos por los Cuatris con antiparras y protector, lista para salir"
                        style="display:block;width:76px;height:auto;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            ${bodyHtml}

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #f0f0f0;">
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#71717a;">
                  🐹 ${escapeHtml(footerNota)}
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#a1a1aa;">
                  Te llega esto porque tenés una cuenta en ${escapeHtml(siteConfig.nombre)}.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function botonHtml(texto: string, href: string) {
  return `
    <tr>
      <td style="padding:8px 32px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="border-radius:10px;background:#a3e635;">
              <a href="${href}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#0a0a0a;text-decoration:none;">
                ${escapeHtml(texto)} →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ---------------------------------------------------------------------
// Recordatorio de mantenimiento
// ---------------------------------------------------------------------

interface GrupoPendiente {
  vehiculo: string;
  items: string[];
}

interface RecordatorioMantenimientoEmailInput {
  to: string;
  nombre: string;
  tituloTravesia: string;
  dias: number;
  chequeoFinal: boolean;
  grupos: GrupoPendiente[];
}

export async function enviarRecordatorioMantenimiento({
  to,
  nombre,
  tituloTravesia,
  dias,
  chequeoFinal,
  grupos,
}: RecordatorioMantenimientoEmailInput) {
  if (!resend) {
    throw new Error("RESEND_API_KEY no está configurada");
  }

  const diasTexto = dias === 0 ? "es hoy" : `en ${dias} día${dias === 1 ? "" : "s"}`;

  const chequeoHtml = chequeoFinal
    ? `
      <tr>
        <td style="padding:0 32px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fef9c3;border:1px solid #fde047;border-radius:12px;">
            <tr>
              <td style="padding:16px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#713f12;">
                🏁 <strong>Última semana:</strong> dale una revisada general al cuatriciclo (frenos, cubiertas, luces) antes de salir, aunque las fechas estén al día.
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : "";

  const gruposHtml =
    grupos.length > 0
      ? `
      <tr>
        <td style="padding:0 32px 8px;">
          <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#18181b;">
            🔧 Mantenimiento vencido
          </p>
        </td>
      </tr>
      ${grupos
        .map(
          (g) => `
      <tr>
        <td style="padding:0 32px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #e4e4e7;border-radius:12px;">
            <tr>
              <td style="padding:14px 18px;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:#18181b;">${escapeHtml(g.vehiculo)}</p>
                <p style="margin:0;font-size:13px;color:#52525b;">${g.items.map(escapeHtml).join(" &nbsp;•&nbsp; ")}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
        )
        .join("")}`
      : "";

  const bodyHtml = `
    <tr>
      <td style="padding:28px 32px 20px;font-family:Arial,Helvetica,sans-serif;">
        <p style="margin:0 0 16px;font-size:15px;color:#3f3f46;">Hola ${escapeHtml(nombre)},</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;">
          <tr>
            <td style="padding:18px 20px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;color:#a3e635;">
                Se acerca
              </p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:900;color:#ffffff;">
                ${escapeHtml(tituloTravesia)}
              </p>
              <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#d4d4d8;">
                ${diasTexto}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${chequeoHtml}
    ${gruposHtml}
    ${botonHtml("Actualizar registro", LINK_CUENTA)}`;

  const html = renderShell({
    tituloPagina: tituloTravesia,
    subtituloHeader: "Registro de mantenimiento",
    bodyHtml,
    footerNota: "Nos vemos en la próxima travesía — cuidá la máquina.",
  });

  await resend.emails.send({
    from: FROM,
    to,
    subject: `🔧 ${tituloTravesia} ${diasTexto} — revisá tu cuatriciclo`,
    html,
  });
}

// ---------------------------------------------------------------------
// Bienvenida (primera vez que alguien se registra/loguea)
// ---------------------------------------------------------------------

export async function enviarBienvenida({ to, nombre }: { to: string; nombre: string }) {
  if (!resend) {
    throw new Error("RESEND_API_KEY no está configurada");
  }

  const bodyHtml = `
    <tr>
      <td style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
        <p style="margin:0 0 16px;font-size:15px;color:#3f3f46;">Hola ${escapeHtml(nombre)},</p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#3f3f46;">
          ¡Bienvenido a ${escapeHtml(siteConfig.nombre)}! Ya tenés tu cuenta lista. Desde "Mi cuenta" podés:
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 0 10px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #e4e4e7;border-radius:12px;">
                <tr>
                  <td style="padding:14px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#18181b;">
                    🏍️ <strong>Cargar tus cuatriciclos</strong> y llevar el registro de mantenimiento
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 10px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #e4e4e7;border-radius:12px;">
                <tr>
                  <td style="padding:14px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#18181b;">
                    🔧 Recibir un aviso antes de cada travesía si algo está vencido
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #e4e4e7;border-radius:12px;">
                <tr>
                  <td style="padding:14px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#18181b;">
                    🏅 Armar tu <strong>Pasaporte Off-Road</strong>: historial e insignias por cada travesía
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${botonHtml("Ir a mi cuenta", LINK_CUENTA)}`;

  const html = renderShell({
    tituloPagina: `Bienvenido a ${siteConfig.nombre}`,
    subtituloHeader: "Bienvenida",
    bodyHtml,
    footerNota: "Nos vemos en la próxima travesía.",
  });

  await resend.emails.send({
    from: FROM,
    to,
    subject: `🐹 ¡Bienvenido a ${siteConfig.nombre}!`,
    html,
  });
}
