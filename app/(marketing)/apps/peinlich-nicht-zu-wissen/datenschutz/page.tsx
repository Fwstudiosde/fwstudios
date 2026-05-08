import { AppLegal } from "@/components/sections/app-legal";

export const metadata = {
  title: "Datenschutz · Peinlich nicht zu wissen",
  description:
    'Datenschutzerklärung der Quiz-App „Peinlich nicht zu wissen" — der Link, der bei Apple und Google hinterlegt ist.',
};

export default function PnzwPrivacy() {
  return (
    <AppLegal
      appName="Peinlich nicht zu wissen"
      appHref="/apps/peinlich-nicht-zu-wissen"
      title="Datenschutzerklärung — Peinlich nicht zu wissen"
      updated="6. Mai 2026"
    >
      <p>
        Diese Datenschutzerklärung gilt für die Mobile-App{" "}
        <strong>Peinlich nicht zu wissen</strong> („App"), entwickelt und
        betrieben von FWStudios. Sie beschreibt, welche personenbezogenen Daten
        wir verarbeiten und welche Rechte du hast.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der DSGVO ist:
        <br />
        <strong>FWStudios</strong>
        <br />
        Inhaber: Finn Weinnoldt
        <br />
        E-Mail: <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>
        <br />
        Vollständige Anbieterkennzeichnung im{" "}
        <a href="/impressum">Impressum</a>.
      </p>

      <h2>2. Was wir nicht sammeln</h2>
      <p>
        Die App benötigt keinen Account. Wir verarbeiten weder deinen Namen noch
        deine E-Mail-Adresse. Es gibt keine Profile, keine Cloud-Synchronisation,
        kein Login.
      </p>

      <h2>3. Was lokal auf dem Gerät bleibt</h2>
      <ul>
        <li>Anzahl gespielter Runden, gewählte Kategorie</li>
        <li>Gerätesprache und Theme-Einstellung</li>
      </ul>
      <p>
        Diese Daten verlassen dein Gerät nicht und werden nicht an uns
        übertragen.
      </p>

      <h2>4. Werbung über Google Mobile Ads (AdMob)</h2>
      <p>
        Die App finanziert sich über Werbung. Zwischen Quiz-Runden zeigen wir
        gelegentlich eine Vollbild-Anzeige (Interstitial-Ad), bereitgestellt
        durch <strong>Google Ireland Limited (Google AdMob)</strong>.
      </p>

      <h3>4.1 Welche Daten verarbeitet AdMob?</h3>
      <ul>
        <li>
          Werbe-Identifier (auf iOS: IDFA, sofern du zugestimmt hast; auf
          Android: Werbe-ID)
        </li>
        <li>
          Annähernde Standortinformationen (auf Basis der IP-Adresse, ohne GPS)
        </li>
        <li>App-Version, Geräte-Modell, Betriebssystem-Version</li>
        <li>
          Zeitstempel und Häufigkeit eingeblendeter Anzeigen (zur Frequency-Cap)
        </li>
        <li>Bei personalisierter Werbung: Werbeprofil-Daten von Google</li>
      </ul>

      <h3>4.2 Personalisiert oder nicht?</h3>
      <p>
        Beim ersten Start fragt die App deine Einwilligung über das{" "}
        <strong>Google User Messaging Platform (UMP) Consent-Banner</strong> ab
        — die Implementierung des IAB Transparency &amp; Consent Framework
        (TCF&nbsp;v2.2). Du kannst entscheiden zwischen:
      </p>
      <ul>
        <li>
          <strong>Personalisierte Werbung</strong> — relevantere Anzeigen, dafür
          Verwendung deiner Werbe-ID;
        </li>
        <li>
          <strong>Nicht personalisierte Werbung</strong> — generische Anzeigen,
          ohne Profilbildung.
        </li>
      </ul>
      <p>
        Du kannst deine Auswahl jederzeit in der App unter{" "}
        <em>Einstellungen → Werbe-Einstellungen</em> ändern. Auf iOS kannst du
        zusätzlich App-Tracking unter{" "}
        <em>Einstellungen → Datenschutz → Tracking</em> jederzeit deaktivieren.
      </p>

      <h3>4.3 Empfänger und Drittland-Übermittlung</h3>
      <p>
        Werbedaten werden an{" "}
        <strong>Google Ireland Limited</strong> (Gordon House, Barrow Street,
        Dublin 4, Irland) übertragen, dort zum Teil an Google LLC in den USA
        weitergegeben. Google ist nach dem{" "}
        <a
          href="https://www.dataprivacyframework.gov/s/"
          target="_blank"
          rel="noopener noreferrer"
        >
          EU-US Data Privacy Framework
        </a>
        zertifiziert. Datenschutz von Google AdMob:{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/technologies/ads
        </a>
        .
      </p>

      <h2>5. Crash- und Performance-Daten der Stores</h2>
      <p>
        Apple und Google sammeln in begrenztem Umfang anonymisierte Crash- und
        Performance-Daten — abhängig davon, ob du das in den Einstellungen
        deines Geräts erlaubst (z.&nbsp;B. „App Analytics teilen"). Wir haben
        darauf keinen direkten Einfluss.
      </p>

      <h2>6. Rechtsgrundlagen</h2>
      <ul>
        <li>
          <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</strong> für
          personalisierte Werbung über das UMP-Consent-Banner.
        </li>
        <li>
          <strong>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)</strong>{" "}
          für nicht personalisierte Werbung zur Refinanzierung der App und für
          die Erhebung anonymisierter Crash-Daten zur Stabilität.
        </li>
      </ul>

      <h2>7. Speicherdauer</h2>
      <ul>
        <li>Lokale App-Einstellungen: bis zur App-Deinstallation.</li>
        <li>Werbe-Einwilligung: 12 Monate (Standard nach IAB TCF), danach erneute Abfrage.</li>
        <li>Bei AdMob: gemäß Google-Aufbewahrungsrichtlinien.</li>
      </ul>

      <h2>8. Deine Rechte</h2>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Widerspruch gegen Direktwerbung (Art. 21 DSGVO)</li>
        <li>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO) — über das Consent-Banner in der App</li>
        <li>
          Beschwerderecht bei einer Aufsichtsbehörde (z.&nbsp;B. der für dich
          zuständigen Landesdatenschutzbehörde)
        </li>
      </ul>
      <p>
        Anfragen bitte an{" "}
        <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>.
      </p>

      <h2>9. Werbe-ID zurücksetzen</h2>
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

      <h2>10. Kinder und Jugendliche</h2>
      <p>
        Die App richtet sich an Personen ab 12 Jahren. Personalisierte Werbung
        wird nur ausgespielt, wenn das Consent-Banner zustimmend bestätigt wurde
        — unter 16-Jährige bekommen unabhängig davon nur nicht personalisierte
        Werbung gemäß Art. 8 DSGVO.
      </p>

      <h2>11. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Erklärung anzupassen, sobald sich Funktionen,
        Werbenetzwerke oder rechtliche Rahmenbedingungen ändern. Die jeweils
        aktuelle Fassung ist hier abrufbar.
      </p>

      <h2>12. Kontakt</h2>
      <p>
        Bei Fragen zum Datenschutz wende dich bitte an{" "}
        <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>.
      </p>
    </AppLegal>
  );
}
