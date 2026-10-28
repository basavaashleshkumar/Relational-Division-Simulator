#!/usr/bin/env python3
"""
Launcher for Relational Division Simulator with Cloudflare Tunnel
Serves on http://localhost:8000 and tunnels via cloudflared
"""

import os
import sys
import re
import threading
import subprocess
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else int(os.environ.get('PORT', 8080))
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CLOUDFLARED_BIN = os.path.join(ROOT_DIR, "cloudflared.exe")

class CustomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        mime = super().guess_type(path)
        if path.endswith('.js') or path.endswith('.mjs'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        if path.endswith('.html'):
            return 'text/html; charset=utf-8'
        if path.endswith('.json'):
            return 'application/json; charset=utf-8'
        return mime

def run_http_server(httpd):
    try:
        httpd.serve_forever()
    except Exception as e:
        pass

def main():
    if not os.path.exists(CLOUDFLARED_BIN):
        print(f"[ERROR] cloudflared.exe not found at {CLOUDFLARED_BIN}")
        sys.exit(1)

    print("=" * 70)
    print("  RELATIONAL.DIV // Starting Local Server & Cloudflare Tunnel")
    print(f"  Root Directory: {ROOT_DIR}")
    print(f"  Local Port    : {PORT}")
    print("=" * 70)

    # Start HTTP server
    try:
        httpd = ThreadingHTTPServer(("0.0.0.0", PORT), CustomHandler)
    except Exception as e:
        print(f"[ERROR] Could not start HTTP server on port {PORT}: {e}")
        sys.exit(1)

    server_thread = threading.Thread(target=run_http_server, args=(httpd,), daemon=True)
    server_thread.start()
    print(f"[+] Local HTTP server active at: http://localhost:{PORT}")

    url_pattern = re.compile(r"https://(?!(?:api)\b)[a-zA-Z0-9-]+\.trycloudflare\.com")
    tunnel_url = None

    def run_tunnel_with_retries():
        nonlocal tunnel_url
        attempts = 0
        max_attempts = 10
        while attempts < max_attempts:
            attempts += 1
            cmd = [
                CLOUDFLARED_BIN,
                "tunnel",
                "--no-prechecks",
                "--protocol", "http2",
                "--edge-ip-version", "4",
                "--no-autoupdate",
                "--url", f"http://localhost:{PORT}"
            ]
            print(f"[+] [Attempt {attempts}/{max_attempts}] Spawning Cloudflare Tunnel: {' '.join(cmd)}")
            try:
                proc = subprocess.Popen(
                    cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                    bufsize=1
                )
                for line in proc.stdout:
                    sys.stdout.write(line)
                    sys.stdout.flush()
                    if not tunnel_url:
                        match = url_pattern.search(line)
                        if match and "api.trycloudflare.com" not in match.group(0):
                            tunnel_url = match.group(0)
                            print("\n" + "=" * 70)
                            print(f"  PUBLIC CLOUDFLARE TUNNEL IS LIVE!")
                            print(f"  URL: {tunnel_url}")
                            print(f"  Local Port: http://localhost:{PORT}")
                            print(f"  Simulation Workspace: {tunnel_url}/simulation.html")
                            print(f"  Dashboard: {tunnel_url}/dashboard.html")
                            print(f"  Documentation: {tunnel_url}/documentation.html")
                            print("=" * 70 + "\n")
                    if "Tunnel not found" in line:
                        print("\n[!] Ephemeral quick tunnel expired on edge. Restarting fresh connector...\n")
                        tunnel_url = None
                        proc.kill()
                        break
                proc.wait()
            except Exception as e:
                print(f"[!] Cloudflare tunnel process error: {e}")
            if attempts < max_attempts:
                print(f"[!] Tunnel exited. Retrying in 3 seconds... (Attempt {attempts}/{max_attempts})")
                time.sleep(3)

    tunnel_thread = threading.Thread(target=run_tunnel_with_retries, daemon=True)
    tunnel_thread.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[!] Shutting down...")
    finally:
        httpd.shutdown()
        print("[+] Cleanup complete.")

if __name__ == "__main__":
    main()
