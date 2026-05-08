#!/bin/bash

#############################################
# FWStudios Quick Update Script
# Pusht Änderungen auf den Live-Server
#############################################

SERVER="root@188.245.158.54"
PROJECT_DIR="/var/www/fwstudios"

echo "🚀 Pushing updates to fwstudios.de..."

# HTML Files
echo "📄 Uploading HTML files..."
scp *.html $SERVER:$PROJECT_DIR/

# JavaScript & CSS
echo "⚡ Uploading JS and CSS..."
scp *.js *.css $SERVER:$PROJECT_DIR/ 2>/dev/null

# Backend (falls geändert)
if [ -f "backend.py" ]; then
    echo "🐍 Uploading backend.py..."
    scp backend.py $SERVER:$PROJECT_DIR/
    echo "🔄 Restarting backend..."
    ssh $SERVER "sudo systemctl restart fwstudios"
fi

echo "✅ Update complete!"
echo "🌐 Check: https://fwstudios.de"
echo "💡 Hard refresh: Cmd+Shift+R"
