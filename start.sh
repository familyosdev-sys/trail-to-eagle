#!/bin/bash
# ScoutTrail PWA Launcher
# Serves ScoutTrail over HTTPS so iPhone can "Add to Home Screen"
#
# HOW TO USE (Hunter's iPhone):
# 1. On the computer, run: ./start.sh
# 2. On iPhone Safari, go to: https://192.168.1.101:8888
# 3. Tap "Continue" on the certificate warning (this is normal for local certs)
# 4. Tap the Share button (square with arrow pointing up)
# 5. Scroll down and tap "Add to Home Screen"
# 6. Tap "Add" — ScoutTrail is now an app on your home screen!
#
# The app works offline once installed. No internet needed after that.

cd "$(dirname "$0")"

# Generate self-signed SSL cert if needed
if [ ! -f cert.pem ] || [ ! -f key.pem ]; then
    echo "Generating SSL certificate..."
    openssl req -x509 -newkey rsa:2048 \
        -keyout key.pem -out cert.pem \
        -days 365 -nodes \
        -subj '/CN=192.168.1.101' \
        -addext 'subjectAltName=IP:192.168.1.101,IP:127.0.0.1,DNS:localhost' 2>/dev/null
    echo "Certificate created."
fi

echo ""
echo "══════════════════════════════════════════════"
echo "  ScoutTrail PWA Server"
echo "  https://192.168.1.101:8888"
echo "══════════════════════════════════════════════"
echo ""
echo "  iPhone Setup:"
echo "  1. Open Safari → go to https://192.168.1.101:8888"
echo "  2. Tap 'Continue' on the certificate warning"
echo "  3. Tap Share button (↑) → Add to Home Screen"
echo "  4. Open from home screen — it's an app!"
echo ""
echo "  Press Ctrl+C to stop the server."
echo ""

python3 serve.py