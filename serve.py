#!/usr/bin/env python3
"""HTTPS server for ScoutTrail PWA with self-signed cert for local network."""

import http.server
import ssl
import os
import subprocess
import sys

PORT = 8888
CERT_FILE = 'cert.pem'
KEY_FILE = 'key.pem'

def generate_cert():
    """Generate self-signed SSL cert for the local IP."""
    if os.path.exists(CERT_FILE) and os.path.exists(KEY_FILE):
        print(f"Using existing certs: {CERT_FILE}, {KEY_FILE}")
        return
    
    print("Generating self-signed SSL certificate...")
    subprocess.run([
        'openssl', 'req', '-x509', '-newkey', 'rsa:2048',
        '-keyout', KEY_FILE, '-out', CERT_FILE,
        '-days', '365', '-nodes',
        '-subj', '/CN=192.168.1.101',
        '-addext', 'subjectAltName=IP:192.168.1.101,IP:127.0.0.1,DNS:localhost'
    ], check=True, capture_output=True)
    print(f"Created {CERT_FILE} and {KEY_FILE}")

class PWAHandler(http.server.SimpleHTTPRequestHandler):
    """Serve ScoutTrail with correct headers for PWA/iOS."""
    
    def end_headers(self):
        # PWA-critical headers
        path = self.path.lower()
        
        if path.endswith('.js') or path == '/app.js' or path == '/sw.js':
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            self.send_header('Service-Worker-Allowed', '/')
        elif path.endswith('.json'):
            self.send_header('Content-Type', 'application/json; charset=utf-8')
        elif path.endswith('.html') or path == '/':
            self.send_header('Content-Type', 'text/html; charset=utf-8')
        elif path.endswith('.png'):
            self.send_header('Content-Type', 'image/png')
        elif path.endswith('.svg'):
            self.send_header('Content-Type', 'image/svg+xml')
        elif path.endswith('.webp'):
            self.send_header('Content-Type', 'image/webp')
        elif path.endswith('.ico'):
            self.send_header('Content-Type', 'image/x-icon')
        elif path.endswith('.webmanifest') or path.endswith('.json'):
            self.send_header('Content-Type', 'application/manifest+json')
        
        # CORS for service worker
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Range')
        
        # Cache control — service worker handles caching
        self.send_header('Cache-Control', 'no-cache')
        
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    generate_cert()
    
    print(f"\n{'='*50}")
    print(f"  ScoutTrail PWA Server")
    print(f"  HTTPS: https://192.168.1.101:{PORT}")
    print(f"  Local: https://localhost:{PORT}")
    print(f"{'='*50}")
    print(f"\n  On iPhone Safari:")
    print(f"  1. Open: https://192.168.1.101:{PORT}")
    print(f"  2. Tap 'Continue' on certificate warning")
    print(f"  3. Tap Share > Add to Home Screen")
    print(f"  4. Open from home screen — it's an app now!")
    print(f"{'='*50}\n")
    
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(CERT_FILE, KEY_FILE)
    
    server = http.server.HTTPServer(('0.0.0.0', PORT), PWAHandler)
    server.socket = context.wrap_socket(server.socket, server_side=True)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        server.server_close()

if __name__ == '__main__':
    main()