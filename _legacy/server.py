#!/usr/bin/env python3
"""
Simple HTTP Server with clean URLs (without .html extension)
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse, unquote

PORT = 8081

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)

        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]

        # Default to index
        if path == '' or path == '/':
            path = 'fwstudios-website.html'
        # If path doesn't have an extension and file doesn't exist, try .html
        elif not os.path.splitext(path)[1]:
            # Check if .html version exists
            html_path = path + '.html'
            if os.path.isfile(html_path):
                path = html_path

        # Update the path
        self.path = '/' + path

        # Call parent handler
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print(f"Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
