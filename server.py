from pathlib import Path
import os.path
import tornado.ioloop
import tornado.web
import tornado.websocket
import json

# como os clients vivem no escopo global, mesmo ao fechar o socket, eles estao salvos como uma variavel normal
room_clients = {}
room_contents = {}
BASE_DIR = Path(__file__).resolve().parent

# define os handlers, que serao as coisas as serem renderizadas (websocket incluso)
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class EditorHandler(tornado.web.RequestHandler):
    def get(self):
        # busca nas variaveis (tanto query como no body do post)
        room_id = self.get_argument("room", "default")
        self.render("editor.html", room=room_id)

class ViewerHandler(tornado.web.RequestHandler):
    def get(self):
        room_id = self.get_argument("room", "default")
        self.render("viewer.html", room=room_id)

class MarkdownSocket(tornado.websocket.WebSocketHandler):
    # permite qualquer conexao independente da origem (n protege de Cross-Site WebSocket Hijacking)
    def check_origin(self, origin):
        return True 

    def open(self):
        self.room_id = self.get_argument("room", "default")
        print(f"WebSocket ABERTO {self.room_id}")
        
        # se for novo, cria
        if self.room_id not in room_clients:
            room_clients[self.room_id] = set()
            room_contents[self.room_id] = ""
            
        room_clients[self.room_id].add(self)
        
        # manda o conteudo pro room especifico, dizendo que eh a primeira msg (init)
        self.write_message(json.dumps({
            "type": "init",
            "content": room_contents[self.room_id]
        }))

    def on_message(self, message):
        data = json.loads(message)
        if data.get("type") == "update":
            room_contents[self.room_id] = data.get("content", "")
            
            # manda apenas para quem esta no mesmo room
            for client in room_clients[self.room_id]:
                # exceto para quem escreveu
                if client is not self:
                    client.write_message(json.dumps({
                        "type": "update",
                        "content": room_contents[self.room_id]
                    }))

    def on_close(self):
        print(f"WebSocket FECHADO {self.room_id}")
        if self.room_id in room_clients:
            room_clients[self.room_id].discard(self) # Use discard to avoid errors if already gone


def make_app():
    handlers = [
        (r"/", MainHandler),
        (r"/editor", EditorHandler),
        (r"/viewer", ViewerHandler),
        (r"/ws", MarkdownSocket)
    ]

    # define os handlers, e os caminhos dos arquivos
    return tornado.web.Application(handlers, debug=True,
        template_path=os.path.join(BASE_DIR, "templates"),
        static_path=os.path.join(BASE_DIR, "static"))


if __name__ == "__main__":
    try:
        app = make_app()
        app.listen(8888)
        print("Servidor rodando em http://localhost:8888")
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("Servidor finalizado.")