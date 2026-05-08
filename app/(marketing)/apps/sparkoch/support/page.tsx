import { AppLegal } from "@/components/sections/app-legal";

export const metadata = {
  title: "Support · SparKoch",
  description:
    "Support, FAQ und Kontakt für die SparKoch-App. Account-Löschung, Probleme melden, Datenschutzanfragen.",
};

export default function SparkochSupport() {
  return (
    <AppLegal
      appName="SparKoch"
      appHref="/apps/sparkoch"
      title="Support — SparKoch"
      updated="6. Mai 2026"
    >
      <p>
        Du brauchst Hilfe mit SparKoch? Auf dieser Seite findest du Antworten auf
        häufige Fragen und alle Wege, uns zu erreichen. Diese Seite ist die im
        App Store hinterlegte offizielle Support-URL.
      </p>

      <h2>1. Schnellkontakt</h2>
      <ul>
        <li>
          E-Mail:{" "}
          <a href="mailto:hello@fwstudios.de?subject=SparKoch%20Support">
            hello@fwstudios.de
          </a>{" "}
          (Betreff bitte mit „SparKoch")
        </li>
        <li>Antwortzeit: in der Regel innerhalb von 48 Stunden, werktags.</li>
      </ul>

      <h2>2. Häufige Fragen</h2>

      <h3>Die Bilderkennung erkennt etwas falsch — was tun?</h3>
      <p>
        Nach dem Scan kannst du jede erkannte Zutat einzeln bearbeiten, löschen
        oder neue manuell ergänzen. Tippe einfach auf den Eintrag in der
        Vorratsliste. Falsche Erkennungen helfen uns — wenn du magst, schick uns
        kurz eine Beschreibung an{" "}
        <a href="mailto:hello@fwstudios.de">hello@fwstudios.de</a>.
      </p>

      <h3>Werden meine Fotos gespeichert?</h3>
      <p>
        Nein. Bilder werden nur kurzzeitig zur Analyse an die KI geschickt und
        anschließend verworfen. Auf unseren Servern liegen nur die strukturierten
        Ergebnisse (z.&nbsp;B. „Tomate, 2 Stück"). Details siehe{" "}
        <a href="/apps/sparkoch/datenschutz">Datenschutz</a>.
      </p>

      <h3>Wie lösche ich meinen Account?</h3>
      <p>
        Apple verlangt eine direkte Account-Löschung in der App. Du findest sie
        unter <strong>Einstellungen → Account → Account löschen</strong>.
        Alternativ schicke uns eine kurze E-Mail von der Adresse, mit der du
        registriert bist, an{" "}
        <a href="mailto:hello@fwstudios.de?subject=SparKoch%20Account-L%C3%B6schung">
          hello@fwstudios.de
        </a>{" "}
        — wir bestätigen die Löschung schriftlich innerhalb von 30 Tagen.
      </p>

      <h3>Ich finde mein Lieblings-Supermarkt-Prospekt nicht</h3>
      <p>
        SparKoch erkennt prinzipiell jedes Prospekt-Foto, das gut leserlich ist.
        Wenn ein bestimmter Markt häufig nicht erkannt wird, schreib uns kurz —
        wir trainieren unsere Heuristiken regelmäßig nach.
      </p>

      <h3>Funktioniert die App offline?</h3>
      <p>
        Bereits gespeicherte Rezepte und deine Vorratsliste sind offline
        verfügbar. Scanner und neue Rezeptvorschläge benötigen eine
        Internetverbindung, weil dafür die KI angefragt wird.
      </p>

      <h3>Welche Berechtigungen braucht die App?</h3>
      <ul>
        <li>
          <strong>Kamera:</strong> für Kühlschrank- und Prospekt-Scanner.
        </li>
        <li>
          <strong>Fotomediathek:</strong> falls du ein bestehendes Foto
          analysieren willst.
        </li>
        <li>
          <strong>Push-Benachrichtigungen:</strong> optional, für Erinnerungen an
          ablaufende Lebensmittel und neue Familien-Aktivitäten.
        </li>
      </ul>

      <h3>Bug entdeckt?</h3>
      <p>
        Schick uns die Schritte zur Reproduktion sowie deine Geräteversion (iOS-
        oder Android-Version) an{" "}
        <a href="mailto:hello@fwstudios.de?subject=SparKoch%20Bug-Report">
          hello@fwstudios.de
        </a>
        . Crash-Logs sammelt die App automatisch — sie helfen uns, das Problem
        zu reproduzieren.
      </p>

      <h2>3. Datenschutz-Anfragen</h2>
      <p>
        Auskunft, Berichtigung, Löschung und alle weiteren DSGVO-Rechte: Schreib
        uns mit Stichwort „Datenschutz" an{" "}
        <a href="mailto:hello@fwstudios.de?subject=SparKoch%20Datenschutz">
          hello@fwstudios.de
        </a>
        . Vollständige Datenschutzerklärung:{" "}
        <a href="/apps/sparkoch/datenschutz">Datenschutz</a>.
      </p>

      <h2>4. Kein Account, kein Login — geht das?</h2>
      <p>
        Aktuell ist ein Account nötig, weil deine Vorratsliste und Rezepte sonst
        nicht zwischen Geräten synchronisieren können. Ein lokaler Modus ohne
        Cloud ist auf der Roadmap.
      </p>

      <h2>5. Anbieter</h2>
      <p>
        SparKoch wird betrieben von <strong>FWStudios</strong>. Vollständige
        Anbieterkennzeichnung im{" "}
        <a href="/impressum">Impressum</a>. Alle Rechte vorbehalten.
      </p>
    </AppLegal>
  );
}
