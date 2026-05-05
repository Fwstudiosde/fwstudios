# ⚡ Schnellstart - FWStudios Deployment

## In 5 Schritten online:

### 1️⃣ Server mieten
- **Hetzner Cloud** oder **DigitalOcean**
- Ubuntu 22.04
- 2GB RAM (ca. 5€/Monat)
- Notiere: **Server-IP-Adresse**

### 2️⃣ Domain konfigurieren
Bei deinem Domain-Provider (z.B. Strato):
```
A-Record: @ → DEINE-SERVER-IP
A-Record: www → DEINE-SERVER-IP
```

### 3️⃣ Mit Server verbinden
```bash
ssh root@DEINE-SERVER-IP
```

### 4️⃣ Dateien hochladen
**In neuem Terminal auf deinem Mac:**
```bash
cd /Users/finnweinnoldt/Downloads/fwstudios
scp -r * root@DEINE-SERVER-IP:/var/www/fwstudios/
```

### 5️⃣ Deployment ausführen
**Zurück im SSH-Terminal:**
```bash
cd /var/www/fwstudios
chmod +x deploy.sh
sudo bash deploy.sh
```

Script fragt nach:
- Domain: `fwstudios.de` (deine Domain)
- E-Mail: für SSL-Zertifikat
- SSL installieren: `y` (wenn Domain bereits zeigt)

---

## ✅ Fertig!

Website ist online unter:
- **https://fwstudios.de**
- **https://fwstudios.de/admin-login**

---

## 🆘 Probleme?

### Website nicht erreichbar?
```bash
# Status prüfen
sudo systemctl status fwstudios
sudo systemctl status nginx

# Logs ansehen
sudo journalctl -u fwstudios -f
```

### SSL funktioniert nicht?
```bash
# Domain-Propagation prüfen (kann 24h dauern)
nslookup fwstudios.de

# SSL nachinstallieren
sudo certbot --nginx -d fwstudios.de -d www.fwstudios.de
```

### Änderungen hochladen
```bash
# HTML/CSS/JS Dateien
scp -r *.html *.js *.css root@SERVER-IP:/var/www/fwstudios/

# Backend (backend.py)
scp backend.py root@SERVER-IP:/var/www/fwstudios/
ssh root@SERVER-IP "sudo systemctl restart fwstudios"
```

---

## 📖 Ausführliche Anleitung

Siehe `DEPLOYMENT.md` für detaillierte Anweisungen!

---

## 💡 Kosten

- **Server**: 4-10€/Monat (Hetzner CX11: ~4€)
- **Domain**: 5-15€/Jahr
- **SSL**: Kostenlos (Let's Encrypt)

**Gesamt: ~5-10€/Monat**
