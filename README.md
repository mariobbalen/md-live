# mdLive

<div align="center">

**Um editor de Markdown colaborativo em tempo real**

[Sobre](#sobre) • [Desenvolvedores](#desenvolvedores) • [Requisitos](#requisitos) • [Instalação](#instalação) • [Execução](#execução)

</div>

---

## Sobre

**mdLive** é uma aplicação web moderna que permite editar Markdown em tempo real de forma colaborativa. Múltiplos usuários podem se conectar a uma mesma "sala" e editar documentos Markdown simultaneamente, com sincronização automática através de WebSocket.

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

### Como Funciona

1. **Servidor Tornado**: Aguarda conexões HTTP e WebSocket na porta 8888
2. **Salas (Rooms)**: Cada sala possui seu próprio conteúdo Markdown e lista de clientes
3. **WebSocket**: Sincroniza mudanças em tempo real entre clientes da mesma sala
4. **Cliente**: Interface web que se conecta ao servidor via WebSocket

## Desenvolvedores

| Nome | RA |
|------|--------|
| Pablo Henrique Strücker Sarturi | 1136331 | 
| Mário Bernardo Balen | 1136196 | 


## Requisitos

Para executar este projeto, você precisará de:

- **Python 3.10**
- **pip** (gerenciador de pacotes Python)
- **Tornado 6.0+** (framework web com suporte a WebSocket)

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/mariobbalen/md-live
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

### 3. Instalar a dependência do Tornado

```bash
pip install tornado
```

## Execução

### Iniciar o servidor

```bash
python server.py
```

Você verá a mensagem:
```
Servidor rodando em http://localhost:8888
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