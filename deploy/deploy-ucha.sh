#!/bin/bash
# =============================================
# Deploy Script untuk ucha.my.id
# Website Cinta Rio & Ucha
# =============================================
#
# Cara pakai:
# 1. Upload folder 'ucha-website' ke VPS
# 2. Jalankan: bash deploy-ucha.sh
# =============================================

set -e

echo "💕 Deploying Rio & Ucha Love Story ke ucha.my.id..."
echo ""

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"

# Variables
DOMAIN="ucha.my.id"
WEB_ROOT="/var/www/$DOMAIN"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"

# Step 1: Install Nginx (if not installed)
echo "📦 [1/6] Checking Nginx..."
if ! command -v nginx &> /dev/null; then
    echo "   Installing Nginx..."
    sudo apt update && sudo apt install -y nginx
    echo "   ✅ Nginx installed"
else
    echo "   ✅ Nginx already installed"
fi

# Step 2: Create web root directory
echo "📁 [2/6] Creating web root directory..."
sudo mkdir -p "$WEB_ROOT"
echo "   ✅ Directory created: $WEB_ROOT"

# Step 3: Copy website files
echo "📄 [3/6] Copying website files..."
sudo cp "$PARENT_DIR/index.html" "$WEB_ROOT/"
sudo cp "$PARENT_DIR/style.css" "$WEB_ROOT/"
sudo cp "$PARENT_DIR/script.js" "$WEB_ROOT/"

# Copy music file if exists
if [ -f "$PARENT_DIR/music.mp3" ]; then
    sudo cp "$PARENT_DIR/music.mp3" "$WEB_ROOT/"
    echo "   ✅ Music file copied"
fi

sudo chown -R www-data:www-data "$WEB_ROOT"
echo "   ✅ Files copied and permissions set"

# Step 4: Setup Nginx config
echo "⚙️  [4/6] Setting up Nginx config..."
sudo cp "$SCRIPT_DIR/nginx-ucha.conf" "$NGINX_CONF"
sudo ln -sf "$NGINX_CONF" "$NGINX_ENABLED"
echo "   ✅ Nginx config installed"

# Step 5: Test and reload Nginx
echo "🔄 [5/6] Testing and reloading Nginx..."
if sudo nginx -t 2>&1; then
    sudo systemctl reload nginx
    echo "   ✅ Nginx reloaded successfully"
else
    echo "   ❌ Nginx config test failed!"
    exit 1
fi

# Step 6: Setup SSL (optional)
echo "🔒 [6/6] SSL Setup..."
echo "   To enable SSL, run:"
echo "   sudo apt install -y certbot python3-certbot-nginx"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""

# Done!
echo "============================================="
echo "✅ Deploy selesai!"
echo "🌐 Website: http://$DOMAIN"
echo ""
echo "📋 Next steps:"
echo "   1. Pastikan DNS sudah mengarah ke IP VPS ini"
echo "   2. Setup SSL dengan certbot (lihat command di atas)"
echo "   3. Tambahkan file musik (music.mp3) jika ada"
echo "============================================="
