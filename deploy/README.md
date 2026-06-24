# 💕 Rio & Ucha Love Story — Deploy ke ucha.my.id

## Struktur Folder

```
ucha-website/
├── index.html          # Halaman utama website
├── style.css           # Semua styling
├── script.js           # Semua interaktivitas
├── music.mp3           # (Opsional) File musik background
└── deploy/
    ├── nginx-ucha.conf # Config Nginx untuk ucha.my.id
    ├── deploy-ucha.sh  # Script deploy otomatis
    └── README.md       # File ini
```

## Persiapan DNS

Di dashboard domain tempat kamu beli `ucha.my.id`, tambahkan:

| Type | Name | Value |
|------|------|-------|
| A | @ | IP VPS kamu |
| A | www | IP VPS kamu |

Tunggu DNS propagate (biasanya 5-30 menit).

## Cara Deploy

### Opsi A — SCP (Command Line)

```bash
scp -r ucha-website/ user@IP_VPS:/tmp/ucha-deploy/
```

### Opsi B — Upload via SFTP (FileZilla/WinSCP)

Upload folder `ucha-website` ke `/tmp/ucha-deploy/` di VPS.

### Jalankan Deploy Script

```bash
ssh user@IP_VPS
cd /tmp/ucha-deploy/ucha-website
bash deploy/deploy-ucha.sh
```

Script deploy akan:

1. ✅ Install Nginx (jika belum ada)
2. ✅ Copy file website ke `/var/www/ucha.my.id/`
3. ✅ Setup config Nginx
4. ✅ Reload Nginx

## Setup SSL (HTTPS)

Setelah DNS propagate:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ucha.my.id -d www.ucha.my.id
```

## Deploy Manual (Tanpa Script)

```bash
# 1. Install Nginx
sudo apt update && sudo apt install -y nginx

# 2. Copy files
sudo mkdir -p /var/www/ucha.my.id
sudo cp index.html style.css script.js /var/www/ucha.my.id/
sudo chown -R www-data:www-data /var/www/ucha.my.id

# 3. Setup Nginx
sudo cp deploy/nginx-ucha.conf /etc/nginx/sites-available/ucha.my.id
sudo ln -sf /etc/nginx/sites-available/ucha.my.id /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 4. Setup SSL
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ucha.my.id -d www.ucha.my.id
```

## Menambahkan Musik

Letakkan file `music.mp3` di folder utama `ucha-website/`, lalu jalankan ulang deploy script.

Atau copy manual:

```bash
sudo cp music.mp3 /var/www/ucha.my.id/
```

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Website tidak muncul | Cek DNS: `dig ucha.my.id` |
| 502 Bad Gateway | Cek Nginx: `sudo systemctl status nginx` |
| SSL gagal | Pastikan DNS sudah propagate dulu, lalu jalankan `sudo certbot --nginx -d ucha.my.id` |
| Permission denied | Jalankan: `sudo chown -R www-data:www-data /var/www/ucha.my.id` |
| Port 80 blocked | Buka firewall: `sudo ufw allow 'Nginx Full'` |
