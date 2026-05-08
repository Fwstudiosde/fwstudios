import { AppLegal } from "@/components/sections/app-legal";

export const metadata = {
  title: "Support · Peinlich nicht zu wissen",
  description:
    'Support, FAQ und Kontakt für die Quiz-App „Peinlich nicht zu wissen". Werbe-Einstellungen, Bug-Reports, Datenschutzanfragen.',
};

export default function PnzwSupport() {
  return (
    <AppLegal
      appName="Peinlich nicht zu wissen"
      appHref="/apps/peinlich-nicht-zu-wissen"
      title="Support — Peinlich nicht zu wissen"
      updated="6. Mai 2026"
    >
      <p>
        Brauchst du Hilfe? Auf dieser Seite findest du Antworten auf häufige
        Fragen und alle Wege, uns zu erreichen. Diese Seite ist die im App
        Store hinterlegte offizielle Support-URL.
      </p>

      <h2>1. Schnellkontakt</h2>
      <ul>
        <li>
          E-Mail:{" "}
          <a href="mailto:hello@fwstudios.de?subject=PNZW%20Support">
            hello@fwstudios.de
          </a>{" "}
          (Betreff bitte mit „PNZW")
        </li>
        <li>Antwortzeit: in der Regel innerhalb von 48 Stunden, werktags.</li>
      </ul>

      <h2>2. Häufige Fragen</h2>

      <h3>Warum kommt manchmal eine Werbeanzeige?</h3>
      <p>
        Die App ist kostenlos und finanziert sich über gelegentliche
        Vollbild-Werbeanzeigen (Google Mobile Ads / AdMob). Sie erscheinen
        zwischen Quiz-Runden, nicht während einer Frage. Details siehe{" "}
        <a href="/apps/peinlich-nicht-zu-wissen/datenschutz">Datenschutz</a>.
      </p>

      <h3>Wie ändere ich meine Werbe-Einwilligung?</h3>
      <p>
        Tippe in der App auf{" "}
        <strong>Einstellungen → Werbe-Einstellungen</strong>. Dort kannst du
        zwischen personalisierter und nicht personalisierter Werbung wechseln,
        oder die Auswahl widerrufen. Die App funktioniert in allen Fällen
        identisch.
      </p>

      <h3>Auf iOS: App-Tracking ist abgelehnt — bekomme ich trotzdem Werbung?</h3>
      <p>
        Ja, aber nur nicht personalisiert. Wir respektieren die App-Tracking-
        Transparency-Entscheidung von Apple. Wenn du das Tracking-Prompt mit
        „Bitte nicht erlauben" beantwortet hast, sehen Werbeanbieter keine
        Werbe-ID — die Anzeigen sind dann generisch.
      </p>

      <h3>Wie kann ich meine Werbe-ID zurücksetzen?</h3>
      <ul>
        <li>
          <strong>iOS:</strong> Einstellungen → Datenschutz &amp; Sicherheit →
          Tracking — App-Anfragen ablehnen oder pauschal Tracking deaktivieren.
        </li>
        <li>
          <strong>Android:</strong> Einstellungen → Datenschutz → Werbung →
          „Werbe-ID zurücksetzen" oder „Werbe-ID löschen".
        </li>
      </ul>

      <h3>Eine Frage ist falsch oder nicht mehr aktuell — was tun?</h3>
      <p>
        Wir freuen uns über Hinweise! Schick uns die genaue Frage und deinen
        Verbesserungsvorschlag an{" "}
        <a href="mailto:hello@fwstudios.de?subject=PNZW%20Frage-Korrektur">
          hello@fwstudios.de
        </a>
        . Korrekturen rollen wir mit der nächsten App-Version aus.
      </p>

      <h3>Funktioniert die App offline?</h3>
      <p>
        Ja, die Quiz-Fragen sind komplett in der App enthalten. Eine
        Internetverbindung wird nur für das Laden von Werbeanzeigen benötigt.
        Ohne Internet erscheinen einfach keine Anzeigen.
      </p>

      <h3>Warum brauche ich keinen Account?</h3>
      <p>
        Die App speichert nichts auf unseren Servern. Es gibt nichts zu
        synchronisieren — und entsprechend nichts, wofür ein Login nötig wäre.
      </p>

      <h3>Bug entdeckt?</h3>
      <p>
        Schick uns eine kurze Beschreibung mit den Schritten zur Reproduktion
        und deiner Geräteversion (iOS- oder Android-Version) an{" "}
        <a href="mailto:hello@fwstudios.de?subject=PNZW%20Bug-Report">
          hello@fwstudios.de
        </a>
        .
      </p>

      <h2>3. Datenschutz-Anfragen</h2>
      <p>
        Auskunft, Widerspruch, Widerruf einer Werbe-Einwilligung — alle DSGVO-
        Rechte sind im{" "}
        <a href="/apps/peinlich-nicht-zu-wissen/datenschutz">
          Datenschutz
        </a>{" "}
        beschrieben. Anfragen bitte an{" "}
        <a href="mailto:hello@fwstudios.de?subject=PNZW%20Datenschutz">
          hello@fwstudios.de
        </a>
        .
      </p>

      <h2>4. Anbieter</h2>
      <p>
        Peinlich nicht zu wissen wird betrieben von{" "}
        <strong>FWStudios</strong>. Vollständige Anbieterkennzeichnung im{" "}
        <a href="/impressum">Impressum</a>. Alle Rechte vorbehalten.
      </p>
    </AppLegal>
  );
}
