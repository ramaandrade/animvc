#!/usr/bin/env python3
"""
Servidor local para o AnimVC: A Jornada do Fundador
Executa na porta 8080 com suporte completo a PWA e MIME types
"""
import http.server
import socketserver
import os
import sys

PORT = 8080

class PWAHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def guess_type(self, path):
        if path.endswith('.json') or path.endswith('.webmanifest'):
            return 'application/manifest+json'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        if path.endswith('.js'):
            return 'application/javascript'
        if path.endswith('.css'):
            return 'text/css'
        return super().guess_type(path)

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    
    with socketserver.TCPServer(("", PORT), PWAHandler) as httpd:
        print(f"🚀 Servidor AnimVC rodando em: http://localhost:{PORT}")
        print("Pressione Ctrl+C para encerrar o servidor.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nEncerrando servidor.")
            sys.exit(0)
