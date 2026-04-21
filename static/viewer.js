const content = document.getElementById('content');
const ws = new WebSocket("ws://localhost:8888/ws");

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    document.getElementById('progress').style.width = pct + '%';
});

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

function copyHTML() {
    const html = content.innerHTML;
    navigator.clipboard.writeText(html).then(() => {
        showToast('HTML copiado!');
    }).catch(() => {
        showToast('Erro ao copiar.');
    });
}

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "init" || data.type === "update") {
        // avoid unnecessary overwrite (helps cursor stability)
        content.innerHTML = marked.parse(data.content);
    }
};