import { AppLegal } from "@/components/sections/app-legal";

export const metadata = {
  title: "Nutzungsbedingungen · SparKoch",
  description:
    "Allgemeine Nutzungsbedingungen (EULA) für die SparKoch-App.",
};

export default function SparkochTerms() {
  return (
    <AppLegal
      appName="SparKoch"
      appHref="/apps/sparkoch"
      title="Nutzungsbedingungen — SparKoch"
      updated="6. Mai 2026"
    >
      <p>
        Diese Nutzungsbedingungen regeln die Nutzung der SparKoch-App
        („App"). Mit dem Download, der Installation oder der Nutzung der App
        akzeptierst du diese Bedingungen.
      </p>

      <h2>1. Anbieter</h2>
      <p>
        Anbieter der App ist <strong>FWStudios</strong>, vertreten durch
        Finn Weinnoldt. Vollständige Anbieterangaben im{" "}
        <a href="/impressum">Impressum</a>.
      </p>

      <h2>2. Vertragsschluss und Konto</h2>
      <p>
        Voraussetzung für die Nutzung ist die Erstellung eines Nutzerkontos mit
        einer gültigen E-Mail-Adresse. Mit Abschluss der Registrierung kommt ein
        unentgeltlicher Nutzungsvertrag zwischen dir und FWStudios zustande,
        soweit du die App in der kostenfreien Basisversion verwendest.
        Kostenpflichtige Features werden — falls vorhanden — vor dem Kauf
        eindeutig gekennzeichnet.
      </p>

      <h2>3. Lizenz</h2>
      <p>
        FWStudios räumt dir ein einfaches, nicht ausschließliches, nicht
        übertragbares Recht ein, die App auf einem dir gehörenden oder von dir
        kontrollierten Endgerät zu installieren und für persönliche, nicht
        kommerzielle Zwecke zu nutzen. Eine darüber hinausgehende Nutzung,
        insbesondere die kommerzielle Verwertung, das Reverse Engineering, das
        Dekompilieren oder das Verändern des Codes ist nicht gestattet, soweit
        nicht zwingendes Recht etwas anderes erlaubt.
      </p>

      <h2>4. Pflichten der Nutzer:innen</h2>
      <ul>
        <li>
          Du bist für die Richtigkeit deiner Account-Daten und die Sicherheit
          deines Passworts selbst verantwortlich.
        </li>
        <li>
          Du verwendest die App nicht in einer Weise, die Rechte Dritter, geltendes
          Recht oder die Funktionsfähigkeit der App beeinträchtigt — insbesondere
          keine automatisierten Massenanfragen, keine missbräuchlichen Inhalte,
          keine Versuche, Dritte zu identifizieren.
        </li>
        <li>
          Du verwendest den Foto-Scanner nur für eigene Fotos oder Bilder, deren
          Verarbeitung dir gestattet ist.
        </li>
      </ul>

      <h2>5. Inhalte und Rezepte</h2>
      <p>
        Die App schlägt Rezepte und Nährwerte auf Basis von KI-Modellen vor.
        Diese Inhalte ersetzen keine medizinische, ernährungswissenschaftliche
        oder lebensmittelrechtliche Beratung. Bei Allergien, Unverträglichkeiten
        oder gesundheitlichen Einschränkungen prüfe Zutaten und Rezepte
        eigenverantwortlich, bevor du sie zubereitest.
      </p>

      <h2>6. Verfügbarkeit und Änderungen</h2>
      <p>
        Wir bemühen uns um eine möglichst hohe Verfügbarkeit der App, garantieren
        diese aber nicht. Die App, einzelne Funktionen oder Drittanbieter-Dienste
        können sich ändern, eingeschränkt oder eingestellt werden. Wir
        informieren über wesentliche Änderungen in der App.
      </p>

      <h2>7. Haftung</h2>
      <p>
        Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach
        dem Produkthaftungsgesetz. Bei leichter Fahrlässigkeit haften wir nur bei
        Verletzung wesentlicher Vertragspflichten und der Höhe nach begrenzt auf
        den vertragstypischen, vorhersehbaren Schaden. Eine darüber hinausgehende
        Haftung ist ausgeschlossen, soweit gesetzlich zulässig. Die Haftung für
        Daten- und Inhaltsverlust ist auf den Aufwand beschränkt, der bei
        ordnungsgemäßer und regelmäßiger Datensicherung entstanden wäre.
      </p>

      <h2>8. Beendigung</h2>
      <p>
        Du kannst dein Konto jederzeit löschen — in der App unter „Einstellungen
        → Account löschen" oder per E-Mail an{" "}
        <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>. Wir können
        dieses Vertragsverhältnis aus wichtigem Grund kündigen, insbesondere
        wenn du wesentlich gegen diese Nutzungsbedingungen verstößt.
      </p>

      <h2>9. Anwendbares Recht</h2>
      <p>
        Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Bist du
        Verbraucher:in, gelten zwingende verbraucherschützende Regelungen deines
        Wohnsitzstaates unberührt.
      </p>

      <h2>10. Streitschlichtung</h2>
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

      <h2>11. Änderungen dieser Nutzungsbedingungen</h2>
      <p>
        Wir können diese Nutzungsbedingungen anpassen, sofern dies zur
        Aufrechterhaltung des Vertragsgleichgewichts erforderlich ist. Über
        wesentliche Änderungen informieren wir dich rechtzeitig in der App.
        Widersprichst du nicht innerhalb von vier Wochen, gilt deine Zustimmung
        als erteilt; wir weisen dich beim Hinweis auf die Änderung gesondert
        darauf hin.
      </p>
    </AppLegal>
  );
}
