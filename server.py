from pathlib import Path
import os.path
import tornado.ioloop
import tornado.web
import tornado.websocket
import json

clients = set()
document = ""
BASE_DIR = Path(__file__).resolve().parent

class EditorHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("editor.html")

class PreviewHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("viewer.html")

class MarkdownSocket(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True  # allow connections (dev only)

    def open(self):
        print("WebSocket OPENED")
        clients.add(self)

        self.write_message(json.dumps({
            "type": "init",
            "content": document
        }))

    def on_message(self, message):
        global document
        data = json.loads(message)

        if data["type"] == "update":
            document = data["content"]

            for client in clients:
                if client != self:
                    client.write_message(json.dumps({
                        "type": "update",
                        "content": document
                    }))

    def on_close(self):
        print("WebSocket CLOSED")
        clients.remove(self)


def make_app():
    handlers = [
        (r"/editor", EditorHandler),
        (r"/preview", PreviewHandler),
        (r"/ws", MarkdownSocket)
    ]

    # define os handlers, e os caminhos dos arquivos
    return tornado.web.Application(handlers, debug=True,
        template_path=os.path.join(BASE_DIR, "templates"),
        static_path=os.path.join(BASE_DIR, "static"))


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    print("Server running on http://localhost:8888")
    tornado.ioloop.IOLoop.current().start()