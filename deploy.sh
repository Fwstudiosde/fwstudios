#!/bin/bash

#############################################
# FWStudios Deployment Script
# Für Ubuntu 22.04/24.04 Server
#############################################

set -e  # Exit on error

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}"
echo "========================================"
echo "  FWStudios Deployment Script"
echo "========================================"
echo -e "${NC}"

# Prüfe ob als root ausgeführt wird
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Bitte als root ausführen: sudo bash deploy.sh${NC}"
    exit 1
fi

# Frage nach Domain
echo -e "${YELLOW}Gib deine Domain ein (z.B. fwstudios.de):${NC}"
read DOMAIN

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Domain darf nicht leer sein!${NC}"
    exit 1
fi

# Frage nach Email für SSL-Zertifikat
echo -e "${YELLOW}Gib deine E-Mail für SSL-Zertifikat ein:${NC}"
read EMAIL

if [ -z "$EMAIL" ]; then
    echo -e "${RED}E-Mail darf nicht leer sein!${NC}"
    exit 1
fi

echo -e "${GREEN}[1/8] System aktualisieren...${NC}"
apt update && apt upgrade -y

echo -e "${GREEN}[2/8] Notwendige Pakete installieren...${NC}"
apt install -y python3 python3-pip python3-venv nginx certbot python3-certbot-nginx ufw git

echo -e "${GREEN}[3/8] Firewall konfigurieren...${NC}"
ufw --force enable
ufw allow 'Nginx Full'
ufw allow OpenSSH

echo -e "${GREEN}[4/8] Projekt-Verzeichnis einrichten...${NC}"
PROJECT_DIR="/var/www/fwstudios"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Prüfe ob Dateien bereits existieren
if [ ! -f "backend.py" ]; then
    echo -e "${YELLOW}Hinweis: Dateien müssen noch hochgeladen werden!${NC}"
    echo -e "${YELLOW}Führe nach Upload erneut aus: sudo bash deploy.sh${NC}"
fi

echo -e "${GREEN}[5/8] Python Virtual Environment erstellen...${NC}"
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip

# Installiere Dependencies wenn requirements.txt existiert
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

# Erstelle data Verzeichnis
mkdir -p data

echo -e "${GREEN}[6/8] Systemd Service erstellen...${NC}"
cat > /etc/systemd/system/fwstudios.service << EOF
[Unit]
Description=FWStudios Backend
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$PROJECT_DIR
Environment="PATH=$PROJECT_DIR/venv/bin"
ExecStart=$PROJECT_DIR/venv/bin/gunicorn --workers 4 --bind 127.0.0.1:5001 backend:app
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Setze Berechtigungen
chown -R www-data:www-data $PROJECT_DIR

echo -e "${GREEN}[7/8] Nginx konfigurieren...${NC}"
cat > /etc/nginx/sites-available/fwstudios << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Erhöhe Buffer-Größen
    client_max_body_size 50M;
    client_body_buffer_size 128k;

    # Root Verzeichnis
    root $PROJECT_DIR;
    index fwstudios-website.html index.html;

    # API Requests an Flask Backend
    location /api/ {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Statische Dateien (HTML, CSS, JS)
    location / {
        try_files \$uri \$uri.html \$uri/ =404;
    }

    # JavaScript und CSS Files
    location ~* \.(js|css)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Bilder und andere statische Assets
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Sicherheits-Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Aktiviere Nginx Config
ln -sf /etc/nginx/sites-available/fwstudios /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Teste Nginx Config
nginx -t

echo -e "${GREEN}[8/8] Services starten...${NC}"
systemctl daemon-reload
systemctl enable fwstudios
systemctl restart fwstudios
systemctl restart nginx

echo -e "${GREEN}[BONUS] SSL-Zertifikat installieren...${NC}"
echo -e "${YELLOW}Achtung: Domain muss bereits auf Server-IP zeigen!${NC}"
echo -e "${YELLOW}Möchtest du jetzt SSL installieren? (y/n)${NC}"
read INSTALL_SSL

if [ "$INSTALL_SSL" = "y" ] || [ "$INSTALL_SSL" = "Y" ]; then
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m $EMAIL --redirect
    echo -e "${GREEN}SSL-Zertifikat erfolgreich installiert!${NC}"
else
    echo -e "${YELLOW}Du kannst SSL später installieren mit:${NC}"
    echo "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
fi

echo -e "${GREEN}"
echo "========================================"
echo "  Deployment erfolgreich!"
echo "========================================"
echo -e "${NC}"
echo -e "${GREEN}Deine Website ist jetzt erreichbar unter:${NC}"
echo -e "http://$DOMAIN"
if [ "$INSTALL_SSL" = "y" ] || [ "$INSTALL_SSL" = "Y" ]; then
    echo -e "https://$DOMAIN"
fi
echo ""
echo -e "${YELLOW}Nützliche Befehle:${NC}"
echo "- Status prüfen: sudo systemctl status fwstudios"
echo "- Logs anzeigen: sudo journalctl -u fwstudios -f"
echo "- Backend neustarten: sudo systemctl restart fwstudios"
echo "- Nginx neustarten: sudo systemctl restart nginx"
echo ""
echo -e "${GREEN}Admin-Login:${NC}"
echo -e "https://$DOMAIN/admin-login"
echo ""
