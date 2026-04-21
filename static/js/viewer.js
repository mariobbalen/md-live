const content = document.getElementById('content');

//pega o codigo do room pra usar no endpoint do ws
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room') || 'default';
const ws = new WebSocket(`ws://${window.location.host}/ws?room=${roomCode}`)

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

    // se abriu, ou atualizou, ajusta o conteudo
    if (data.type === "init" || data.type === "update") {
        content.innerHTML = marked.parse(data.content);
    }
};