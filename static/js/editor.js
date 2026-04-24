const editor = document.getElementById('editor');
const charCount = document.getElementById('char-count');

//pega o codigo do room pra usar no endpoint do ws
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room') || 'default';
const ws = new WebSocket(`ws://${window.location.host}/ws?room=${roomCode}`)

let isOpen = false;
let debounceTimer = null;
let lastSentContent = "";

editor.addEventListener('input', updateCount);

function updateCount() {
    const text = editor.value;
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    charCount.textContent = `${chars} caracteres · ${words} palavras`;
}

function wrap(before, after) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const sel = editor.value.substring(start, end);
    editor.setRangeText(before + sel + after, start, end, 'select');
    editor.focus();
    sendToWs(editor.value);
}

function prefixText(str) {
    console.log("entrou")
    const start = editor.selectionStart;
    const lineStart = editor.value.lastIndexOf('\n', start - 1) + 1;
    editor.setRangeText(str, lineStart, lineStart, 'end');
    editor.focus();
    sendToWs(editor.value);
}

function clearEditor() {
    if (editor.value && confirm('Limpar o editor?')) {
        editor.value = '';
        sendToWs(editor.value);
        updateCount();
    }
}

ws.onopen = () => {
    console.log("WebSocket connected");
    isOpen = true;
};

ws.onclose = () => {
    console.log("WebSocket closed");
    isOpen = false;
};

ws.onerror = (err) => {
    console.error("WebSocket error:", err);
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // ao abrir a tela, popula a text area com o que existe no ws
    if (data.type === "init" || data.type === "update") {
        editor.value = data.content;
        lastSentContent = data.content;
        updateCount();
    }
};

function sendToWs(content) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: "update",
            content: content
        }));

        lastSentContent = content;
    }
}

editor.addEventListener("input", () => {

    if (!isOpen)
        return;

    clearTimeout(debounceTimer);

    // timer pra n ficar enviando instantaneamente a cada tecla pressionada
    debounceTimer = setTimeout(() => {
        const content = editor.value;

        // evita mandar conteudo repetido
        if (content === lastSentContent)
            return;

        sendToWs(content);


    }, 100); // o delay de envio para o server
});