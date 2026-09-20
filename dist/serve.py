#!/usr/bin/env python3
"""
RELATIONAL.DIV — High-Performance Zero-Dependency Production Static Server
Department of Computer Science and Engineering, SCOPE
Principal Investigator: Basavaashlesh | Faculty Mentor: Dr. Swaminathan A
"""

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = int(os.environ.get('PORT', 8000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ProductionHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Security and caching headers
        self.send_header('X-Content-Type-Options', 'nosniff')
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

def start_server():
    global PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", PORT), ProductionHandler) as httpd:
                url = f"http://localhost:{PORT}/"
                print("=" * 70)
                print("  RELATIONAL.DIV // Academic Research Laboratory Platform [v2.4.0]")
                print("  Author : Basavaashlesh (Principal Investigator)")
                print("  Mentor : Dr. Swaminathan A, Assistant Professor")
                print("=" * 70)
                print(f"  -> Serving production distribution at: {url}")
                print(f"  -> Workspace : {url}simulation.html")
                print(f"  -> Dashboard : {url}dashboard.html")
                print(f"  -> Docs      : {url}documentation.html")
                print("=" * 70)
                print("  Press Ctrl + C to stop the server.")
                
                # Automatically open default web browser
                if "--no-browser" not in sys.argv:
                    webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError:
            PORT += 1

if __name__ == '__main__':
    try:
        start_server()
    except KeyboardInterrupt:
        print("\nServer stopped cleanly.")
