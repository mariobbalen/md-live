# md-live

<div align="center">

**Um editor de Markdown colaborativo em tempo real**

[Sobre](#sobre) • [Requisitos](#requisitos) • [Instalação](#instalação) • [Execução](#execução) • [Recursos](#recursos) • [Desenvolvedores](#desenvolvedores)

</div>

---

## Sobre

**md-live** é uma aplicação web moderna que permite editar Markdown em tempo real de forma colaborativa. Múltiplos usuários podem se conectar a uma mesma "sala" e editar documentos Markdown simultaneamente, com sincronização automática através de WebSocket.

O projeto utiliza:
- **Backend**: Servidor Tornado (Python) com suporte a WebSocket
- **Frontend**: HTML5, CSS3 e JavaScript vanilla
- **Comunicação**: WebSocket para sincronização em tempo real

### Funcionalidades

- ✅ **Editor em tempo real**: Edite Markdown com visualização instantânea
- ✅ **Colaboração**: Múltiplos usuários em salas compartilhadas
- ✅ **Sincronização automática**: Todas as mudanças propagadas para todos os clientes
- ✅ **Interface intuitiva**: Interface limpa e responsiva
- ✅ **Salas dinâmicas**: Crie quantas salas quiser dinamicamente

---

## Requisitos

Para executar este projeto, você precisará de:

- **Python 3.8+** (recomendado 3.10 ou superior)
- **pip** (gerenciador de pacotes Python)
- **Tornado 6.0+** (framework web com suporte a WebSocket)

**Navegadores suportados:**
- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/md-live.git
cd md-live
```

### 2. Criar um ambiente virtual (recomendado)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar as dependências

```bash
pip install tornado
```

Ou, se você tem um arquivo `requirements.txt`:

```bash
pip install -r requirements.txt
```

---

## Execução

### Iniciar o servidor

```bash
python server.py
```

Você verá a mensagem:
```
Server running on http://localhost:8888
```

### Acessar a aplicação

Abra seu navegador web e acesse:

- **Página inicial**: http://localhost:8888/
- **Editor**: http://localhost:8888/editor?room=seu_room_id
- **Visualizador**: http://localhost:8888/viewer?room=seu_room_id

### Parâmetros

- `room`: ID da sala para trabalhar colaborativamente (padrão: "default")

**Exemplo:**
```
http://localhost:8888/editor?room=projeto-novo
```

### Parar o servidor

Pressione `Ctrl+C` no terminal onde o servidor está rodando.

---

## Recursos

### Estrutura do Projeto

```
md-live/
├── server.py           # Servidor Tornado principal
├── templates/          # Templates HTML
│   ├── index.html     # Página inicial
│   ├── editor.html    # Interface do editor
│   └── viewer.html    # Visualizador de markdown
├── static/            # Arquivos estáticos
│   ├── css/           # Estilos CSS
│   │   ├── index.css
│   │   ├── editor.css
│   │   └── viewer.css
│   └── js/            # Scripts JavaScript
│       ├── index.js
│       ├── editor.js
│       └── viewer.js
├── example_lorem.md   # Arquivo de exemplo
└── README.md          # Este arquivo
```

### Como Funciona

1. **Servidor Tornado**: Aguarda conexões HTTP e WebSocket na porta 8888
2. **Salas (Rooms)**: Cada sala possui seu próprio conteúdo Markdown e lista de clientes
3. **WebSocket**: Sincroniza mudanças em tempo real entre clientes da mesma sala
4. **Cliente**: Interface web que se conecta ao servidor via WebSocket

---

## Uso Colaborativo

### Compartilhando uma Sala

1. Abra http://localhost:8888/editor?room=nome-da-sala
2. Compartilhe a URL com outros usuários
3. Todos os usuários na mesma sala verão as alterações em tempo real

### Exemplo de Fluxo

```
Editor A                 Servidor              Editor B
   |                        |                    |
   |----(abre editor)------->|                    |
   |                         |                    |
   |<----(init conteúdo)-----|                    |
   |                         |                    |
   |                         |<----(abre editor)-|
   |                         |                    |
   |                         |---(init conteúdo)>|
   |                         |                    |
   |----(escreve texto)----->|                    |
   |                         |----(broadcast)--->|
   |                         |                    |
```

---

## Desenvolvadores

Projeto desenvolvido por:

| Nome | RA |
|------|--------|
| Pablo Henrique Strücker Sarturi | 1136331 | 
| Mário Bernardo Balen | 1136196 | 

---