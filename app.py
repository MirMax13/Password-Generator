import pymongo
import http.server
import socketserver

handler = http.server.SimpleHTTPRequestHandler

hostName = "localhost"
port = 3000

httpd = socketserver.TCPServer(("", port), handler)

print(f"Server listening on port {port}")
httpd.serve_forever()

myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient['mydatabase']
