import { AppLegal } from "@/components/sections/app-legal";

export const metadata = {
  title: "Nutzungsbedingungen · Peinlich nicht zu wissen",
  description:
    'Allgemeine Nutzungsbedingungen (EULA) für die Quiz-App „Peinlich nicht zu wissen".',
};

export default function PnzwTerms() {
  return (
    <AppLegal
      appName="Peinlich nicht zu wissen"
      appHref="/apps/peinlich-nicht-zu-wissen"
      title="Nutzungsbedingungen — Peinlich nicht zu wissen"
      updated="6. Mai 2026"
    >
      <p>
        Diese Nutzungsbedingungen regeln die Nutzung der App{" "}
        <strong>Peinlich nicht zu wissen</strong> („App"). Mit dem Download, der
        Installation oder der Nutzung der App akzeptierst du diese Bedingungen.
      </p>

      <h2>1. Anbieter</h2>
      <p>
        Anbieter der App ist <strong>FWStudios</strong>, vertreten durch
        Finn Weinnoldt. Vollständige Anbieterangaben im{" "}
        <a href="/impressum">Impressum</a>.
      </p>

      <h2>2. Lizenz</h2>
      <p>
        FWStudios räumt dir ein einfaches, nicht ausschließliches, nicht
        übertragbares Recht ein, die App auf einem dir gehörenden oder von dir
        kontrollierten Endgerät zu installieren und für persönliche, nicht
        kommerzielle Zwecke zu nutzen. Reverse Engineering, Dekompilieren oder
        Modifizieren des Codes ist nicht gestattet, soweit nicht zwingendes
        Recht etwas anderes erlaubt.
      </p>

      <h2>3. Werbung</h2>
      <p>
        Die App ist kostenlos und finanziert sich durch werbliche Anzeigen
        zwischen Quiz-Runden. Mit der Nutzung der App nimmst du zur Kenntnis,
        dass werbliche Anzeigen eingeblendet werden. Details, welche Daten dabei
        verarbeitet werden, und wie du deine Einwilligung steuerst, findest du
        im{" "}
        <a href="/apps/peinlich-nicht-zu-wissen/datenschutz">Datenschutz</a>.
      </p>

      <h2>4. Inhalte</h2>
      <p>
        Die in der App angebotenen Quiz-Fragen wurden nach bestem Wissen
        recherchiert. Sie ersetzen jedoch keine Bildungs-, Rechts- oder
        Fachberatung. Trotz aller Sorgfalt können Fehler auftreten — solltest du
        einen entdecken, freuen wir uns über einen Hinweis an{" "}
        <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>.
      </p>

      <h2>5. Pflichten der Nutzer:innen</h2>
      <ul>
        <li>
          Du verwendest die App nicht in einer Weise, die Rechte Dritter,
          geltendes Recht oder die Funktionsfähigkeit der App beeinträchtigt.
        </li>
        <li>
          Du unterlässt insbesondere Versuche, die Werbeintegration zu umgehen,
          das Konto- oder Tracking-Verhalten Dritter zu manipulieren oder
          Schadsoftware in die App einzuschleusen.
        </li>
      </ul>

      <h2>6. Verfügbarkeit und Änderungen</h2>
      <p>
        Wir bemühen uns um eine möglichst hohe Verfügbarkeit der App,
        garantieren diese aber nicht. Wir behalten uns das Recht vor, einzelne
        Funktionen anzupassen, einzustellen oder die App weiterzuentwickeln.
      </p>

      <h2>7. Haftung</h2>
      <p>
        Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach
        dem Produkthaftungsgesetz. Bei leichter Fahrlässigkeit haften wir nur
        bei Verletzung wesentlicher Vertragspflichten und der Höhe nach begrenzt
        auf den vertragstypischen, vorhersehbaren Schaden. Eine darüber
        hinausgehende Haftung ist ausgeschlossen, soweit gesetzlich zulässig.
      </p>

      <h2>8. Anwendbares Recht</h2>
      <p>
        Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Bist du
        Verbraucher:in, gelten zwingende verbraucherschützende Regelungen
        deines Wohnsitzstaates unberührt.
      </p>

      <h2>9. Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>
        . Wir sind nicht verpflichtet, an einem Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen, und wir nehmen daran
        nicht teil.
      </p>

      <h2>10. Änderungen dieser Nutzungsbedingungen</h2>
      <p>
        Wir können diese Nutzungsbedingungen anpassen, sofern dies zur
        Aufrechterhaltung des Vertragsgleichgewichts erforderlich ist. Über
        wesentliche Änderungen informieren wir dich rechtzeitig in der App.
      </p>
    </AppLegal>
  );
}
