# 🚀 FWStudios Deployment Anleitung

## Schritt 1: Server mieten

### Empfohlene Anbieter:
- **Hetzner Cloud** (beste Preis-Leistung, Deutschland)
- **DigitalOcean** (einfach, weltweit)
- **Contabo** (günstig, Deutschland)

### Minimale Anforderungen:
- **OS**: Ubuntu 22.04 oder 24.04 LTS
- **RAM**: 2GB (empfohlen 4GB)
- **Storage**: 20GB SSD
- **Kosten**: ca. 4-10€/Monat

### Bei Hetzner:
1. Account erstellen auf hetzner.com
2. "Cloud" → "Server erstellen"
3. Standort: Nürnberg oder Falkenstein
4. Image: Ubuntu 22.04
5. Server-Typ: CX11 oder besser
6. SSH-Key hinzufügen (empfohlen) oder Root-Passwort notieren
7. Server erstellen

**Wichtig**: Notiere dir die **Server-IP-Adresse**!

---

## Schritt 2: Domain konfigurieren

### Bei deinem Domain-Provider (z.B. Strato, 1&1, Namecheap):

1. Gehe zu DNS-Einstellungen
2. Erstelle folgende A-Records:

```
Type    Name    Value           TTL
A       @       DEINE-SERVER-IP 3600
A       www     DEINE-SERVER-IP 3600
```

**Beispiel** (wenn deine Domain `fwstudios.de` ist):
```
A       @       123.45.67.89    3600
A       www     123.45.67.89    3600
```

**Wichtig**: DNS-Änderungen können 1-24 Stunden dauern!

### DNS prüfen:
```bash
# Auf deinem lokalen Mac:
nslookup fwstudios.de
```

---

## Schritt 3: Mit Server verbinden

### Via SSH (Terminal auf Mac):

```bash
# Ersetze SERVER-IP mit deiner echten IP
ssh root@DEINE-SERVER-IP
```

Beim ersten Mal wird gefragt "Are you sure...?" → Tippe `yes` und Enter

Wenn Passwort abgefragt wird → gib Root-Passwort ein

---

## Schritt 4: Dateien auf Server hochladen

### Option A: Mit SCP (empfohlen)

**Öffne ein NEUES Terminal-Fenster auf deinem Mac** (nicht das SSH-Fenster!):

```bash
# Navigiere zum Projekt-Ordner
cd /Users/finnweinnoldt/Downloads/fwstudios

# Lade alle Dateien auf den Server hoch
# Ersetze SERVER-IP mit deiner echten IP
scp -r * root@DEINE-SERVER-IP:/var/www/fwstudios/
```

Beispiel:
```bash
scp -r * root@123.45.67.89:/var/www/fwstudios/
```

### Option B: Mit FileZilla (GUI)

1. FileZilla herunterladen und installieren
2. Neue Verbindung:
   - Host: `sftp://DEINE-SERVER-IP`
   - Benutzer: `root`
   - Passwort: dein Root-Passwort
   - Port: `22`
3. Verbinden
4. Erstelle Ordner `/var/www/fwstudios`
5. Lade alle Dateien aus dem fwstudios-Ordner hoch

---

## Schritt 5: Deployment-Script ausführen

### Zurück im SSH-Terminal:

```bash
# Gehe ins Projekt-Verzeichnis
cd /var/www/fwstudios

# Mache Script ausführbar
chmod +x deploy.sh

# Führe Deployment aus
sudo bash deploy.sh
```

### Das Script fragt dich:
1. **Domain**: Gib `fwstudios.de` ein (oder deine Domain)
2. **E-Mail**: Gib deine E-Mail für SSL-Zertifikat ein
3. **SSL installieren?**: Warte bis DNS propagiert ist, dann `y` eingeben

**Wichtig**: Wenn die Domain noch nicht auf den Server zeigt, bei SSL erstmal `n` eingeben!

---

## Schritt 6: SSL-Zertifikat nachinstallieren

Falls du SSL übersprungen hast, kannst du es später installieren:

```bash
sudo certbot --nginx -d fwstudios.de -d www.fwstudios.de
```

---

## Schritt 7: Testen!

### Prüfe ob alles läuft:

```bash
# Backend-Status
sudo systemctl status fwstudios

# Logs anzeigen
sudo journalctl -u fwstudios -f
```

Sollte zeigen:
```
● fwstudios.service - FWStudios Backend
   Active: active (running)
```

### Website testen:
- Öffne Browser: `https://fwstudios.de`
- Admin-Login: `https://fwstudios.de/admin-login`

---

## 🔧 Nützliche Befehle

### Service Management:
```bash
# Status prüfen
sudo systemctl status fwstudios

# Backend neustarten
sudo systemctl restart fwstudios

# Backend stoppen
sudo systemctl stop fwstudios

# Backend starten
sudo systemctl start fwstudios

# Logs in Echtzeit
sudo journalctl -u fwstudios -f
```

### Nginx Management:
```bash
# Nginx neustarten
sudo systemctl restart nginx

# Nginx testen
sudo nginx -t

# Nginx Logs
sudo tail -f /var/log/nginx/error.log
```

### Dateien aktualisieren:
```bash
# Auf deinem Mac (in neuem Terminal)
cd /Users/finnweinnoldt/Downloads/fwstudios
scp -r *.html *.js *.css root@SERVER-IP:/var/www/fwstudios/

# Auf dem Server
sudo systemctl restart fwstudios
```

### Backend-Code aktualisieren:
```bash
# Auf deinem Mac
cd /Users/finnweinnoldt/Downloads/fwstudios
scp backend.py root@SERVER-IP:/var/www/fwstudios/

# Auf dem Server
sudo systemctl restart fwstudios
```

---

## 🐛 Troubleshooting

### Problem: Website zeigt 502 Bad Gateway
```bash
# Prüfe Backend-Status
sudo systemctl status fwstudios

# Logs ansehen
sudo journalctl -u fwstudios -n 50

# Backend neustarten
sudo systemctl restart fwstudios
```

### Problem: SSL-Zertifikat funktioniert nicht
```bash
# Prüfe ob Domain auf Server zeigt
nslookup fwstudios.de

# SSL neu installieren
sudo certbot --nginx -d fwstudios.de -d www.fwstudios.de --force-renew
```

### Problem: Änderungen werden nicht angezeigt
```bash
# Cache leeren
sudo systemctl restart fwstudios
sudo systemctl restart nginx

# Browser-Cache leeren (Strg+Shift+R)
```

### Problem: Verbindung zum Server nicht möglich
```bash
# Firewall prüfen
sudo ufw status

# Sollte zeigen:
# 80/tcp (Nginx Full)    ALLOW
# 443/tcp (Nginx Full)   ALLOW
# 22/tcp (OpenSSH)       ALLOW
```

---

## 📊 Monitoring

### Server-Ressourcen überwachen:
```bash
# CPU und RAM
htop

# Festplatte
df -h

# Netzwerk
sudo iftop
```

---

## 🔐 Sicherheit

### Empfohlene zusätzliche Schritte:

1. **Nicht-Root-User erstellen**:
```bash
adduser fwstudios
usermod -aG sudo fwstudios
```

2. **SSH mit Key statt Passwort**:
```bash
# Auf deinem Mac
ssh-keygen -t ed25519
ssh-copy-id root@SERVER-IP
```

3. **Fail2Ban installieren** (schützt vor Brute-Force):
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

4. **Automatische Updates**:
```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## 📱 Backup

### Manuelles Backup erstellen:
```bash
# Auf dem Server
cd /var/www
sudo tar -czf fwstudios-backup-$(date +%Y%m%d).tar.gz fwstudios/

# Backup herunterladen (auf deinem Mac)
scp root@SERVER-IP:/var/www/fwstudios-backup-*.tar.gz ~/Downloads/
```

### Automatisches Backup-Script:
```bash
# Auf dem Server
sudo nano /usr/local/bin/backup-fwstudios.sh
```

Inhalt:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
cd /var/www
tar -czf /backups/fwstudios-$DATE.tar.gz fwstudios/
# Alte Backups löschen (älter als 30 Tage)
find /backups -name "fwstudios-*.tar.gz" -mtime +30 -delete
```

Ausführbar machen und Cronjob erstellen:
```bash
sudo chmod +x /usr/local/bin/backup-fwstudios.sh
sudo mkdir -p /backups
sudo crontab -e
```

Zeile hinzufügen (täglich um 2 Uhr nachts):
```
0 2 * * * /usr/local/bin/backup-fwstudios.sh
```

---

## 🎉 Fertig!

Deine Website läuft jetzt unter:
- **Frontend**: https://fwstudios.de
- **Admin**: https://fwstudios.de/admin-login
- **API**: https://fwstudios.de/api/

### Bei Fragen oder Problemen:
- Logs prüfen: `sudo journalctl -u fwstudios -f`
- Nginx Logs: `sudo tail -f /var/log/nginx/error.log`
