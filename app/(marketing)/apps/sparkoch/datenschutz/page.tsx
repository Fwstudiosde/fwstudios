import { AppLegal } from "@/components/sections/app-legal";

export const metadata = {
  title: "Datenschutz · SparKoch",
  description:
    "Datenschutzerklärung der SparKoch-App nach DSGVO — der Link, der bei Apple und Google hinterlegt ist.",
};

export default function SparkochPrivacy() {
  return (
    <AppLegal
      appName="SparKoch"
      appHref="/apps/sparkoch"
      title="Datenschutzerklärung — SparKoch"
      updated="6. Mai 2026"
    >
      <p>
        Diese Datenschutzerklärung gilt für die Mobile-App <strong>SparKoch</strong>{" "}
        (im Folgenden „App"), entwickelt und betrieben von FWStudios. Sie informiert
        Sie darüber, welche personenbezogenen Daten wir verarbeiten, wenn Sie die
        App nutzen, und welche Rechte Sie haben.
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
        Vollständige Anbieterkennzeichnung siehe{" "}
        <a href="/impressum">Impressum</a>.
      </p>

      <h2>2. Verarbeitete Datenkategorien</h2>
      <h3>2.1 Account-Daten</h3>
      <ul>
        <li>E-Mail-Adresse (zwingend, für Login)</li>
        <li>Anzeigename (optional)</li>
        <li>Passwort-Hash (bcrypt, niemals im Klartext)</li>
        <li>Familien-Zugehörigkeit, falls Sie einer Familie beitreten</li>
      </ul>

      <h3>2.2 Inhalte, die Sie aktiv erstellen</h3>
      <ul>
        <li>Vorratsliste (erkannte oder manuell hinzugefügte Lebensmittel)</li>
        <li>Favorisierte Rezepte</li>
        <li>Markierte Angebote aus Prospekten</li>
        <li>Familien-Mitglieder (E-Mails der eingeladenen Personen)</li>
      </ul>

      <h3>2.3 Kamera- und Foto-Daten</h3>
      <p>
        Wenn Sie den Kühlschrank- oder Prospekt-Scanner nutzen, übertragen wir
        das aufgenommene Bild an die KI-API von OpenAI zur Analyse.
      </p>
      <ul>
        <li>
          Die Bilder werden ausschließlich zum Zweck der Lebensmittel- bzw.
          Angebotserkennung verwendet.
        </li>
        <li>
          Bilder werden auf unseren Servern <strong>nicht dauerhaft
          gespeichert</strong>. Lediglich die strukturierte Auswertung
          (z.&nbsp;B. „2× Tomaten, 1× Joghurt") wird Ihrem Account zugeordnet.
        </li>
        <li>
          OpenAI verarbeitet die Bilder gemäß ihrer eigenen Datenschutzerklärung
          und nutzt sie laut API-Bedingungen nicht für das Training ihrer Modelle.
        </li>
      </ul>

      <h3>2.4 Geräte- und Nutzungsdaten</h3>
      <ul>
        <li>Gerätetyp, Betriebssystem-Version, App-Version</li>
        <li>
          Eindeutige App-Installations-ID (für technische Fehleranalyse, kein
          Cross-App-Tracking)
        </li>
        <li>
          Crash-Logs (anonymisiert, nur wenn die App abstürzt)
        </li>
      </ul>

      <h2>3. Zwecke und Rechtsgrundlagen</h2>
      <ul>
        <li>
          <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong>{" "}
          Account-Verwaltung, Speicherung Ihrer Vorratsliste und Favoriten,
          Ausführung der Scanner- und Rezept-Funktionen.
        </li>
        <li>
          <strong>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):</strong>{" "}
          Stabilität, Sicherheit und Weiterentwicklung der App.
        </li>
        <li>
          <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong>{" "}
          Übertragung von Bildern an OpenAI — Sie willigen aktiv ein, indem Sie
          den Scanner verwenden.
        </li>
      </ul>

      <h2>4. Empfänger und Auftragsverarbeiter</h2>
      <h3>4.1 Supabase (Backend &amp; Datenbank)</h3>
      <p>
        Wir nutzen Supabase als Backend- und Datenbank-Anbieter.
        <br />
        Standort der Daten: <strong>EU (Frankfurt am Main)</strong>.
        <br />
        Übertragung verschlüsselt via TLS. Datenschutz von Supabase:{" "}
        <a
          href="https://supabase.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          supabase.com/privacy
        </a>
        .
      </p>

      <h3>4.2 OpenAI (Bilderkennung)</h3>
      <p>
        Bilder vom Kühlschrank- und Prospekt-Scanner werden an die OpenAI API
        übertragen.
        <br />
        Standort: USA (mit{" "}
        <a
          href="https://openai.com/policies/data-privacy-framework"
          target="_blank"
          rel="noopener noreferrer"
        >
          EU-US Data Privacy Framework
        </a>
        ). Datenschutz:{" "}
        <a
          href="https://openai.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          openai.com/privacy
        </a>
        .
      </p>

      <h3>4.3 Apple / Google (Stores)</h3>
      <p>
        Apple und Google erhalten anonymisierte Crash- und Performance-Daten
        sowie Daten, die für die Funktion der App-Store-Plattform notwendig sind
        (z.&nbsp;B. Kauf-Bestätigungen). Wir haben darauf keinen direkten
        Einfluss.
      </p>

      <h2>5. Berechtigungen auf dem Gerät</h2>
      <ul>
        <li>
          <strong>Kamera:</strong> Nur aktiv, wenn Sie den Scanner öffnen.
          Aufnahmen verlassen das Gerät erst, wenn Sie „Analysieren" antippen.
        </li>
        <li>
          <strong>Fotomediathek:</strong> Lesender Zugriff, wenn Sie ein
          bestehendes Foto auswählen statt neu zu fotografieren.
        </li>
        <li>
          <strong>Push-Benachrichtigungen:</strong> Optional. Werden nur für
          Erinnerungen an ablaufende Lebensmittel und neue Familien-Aktivitäten
          verwendet.
        </li>
      </ul>
      <p>
        Sie können diese Berechtigungen in den Geräte-Einstellungen jederzeit
        widerrufen.
      </p>

      <h2>6. Speicherdauer</h2>
      <ul>
        <li>Account-Daten: bis zur Löschung des Accounts.</li>
        <li>Vorratsliste, Rezepte, Favoriten: bis zur manuellen Löschung.</li>
        <li>Hochgeladene Bilder: nicht persistent gespeichert.</li>
        <li>Crash-Logs: max. 90 Tage.</li>
      </ul>

      <h2>7. Ihre Rechte</h2>
      <p>Sie haben gegenüber uns folgende Rechte:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
        <li>
          Beschwerderecht bei einer Aufsichtsbehörde (z.&nbsp;B. der für Sie
          zuständigen Landesdatenschutzbehörde)
        </li>
      </ul>
      <p>
        Konto-Löschung: in der App unter „Einstellungen → Account löschen" oder
        per E-Mail an{" "}
        <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>.
      </p>

      <h2>8. Datensicherheit</h2>
      <ul>
        <li>TLS-Verschlüsselung für jede Übertragung zwischen App und Server.</li>
        <li>Passwörter ausschließlich als bcrypt-Hash gespeichert.</li>
        <li>Row-Level-Security in der Datenbank — Nutzer sehen nur eigene Daten.</li>
      </ul>

      <h2>9. Kinder und Jugendliche</h2>
      <p>
        SparKoch richtet sich an Personen ab 4 Jahren (App Store-Altersfreigabe),
        eine eigenständige Vertragsabschluss-Fähigkeit setzen wir jedoch erst ab
        16 Jahren voraus. Für Minderjährige unter 16 ist die Zustimmung der
        Erziehungsberechtigten erforderlich.
      </p>

      <h2>10. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, sobald sich
        Funktionen, Drittanbieter oder rechtliche Rahmenbedingungen ändern. Bei
        wesentlichen Änderungen informieren wir Sie in der App.
      </p>

      <h2>11. Kontakt</h2>
      <p>
        Bei Fragen zum Datenschutz wenden Sie sich bitte an:{" "}
        <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>.
      </p>
    </AppLegal>
  );
}
