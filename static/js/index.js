function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function enterRoom(event) {
    event.preventDefault();
    const code = document.getElementById('roomCode').value.trim().toUpperCase();

    if (code.length < 3) {
        showToast('Código muito curto');
        return;
    }

    showToast('Entrando na sala ' + code + '...');

    setTimeout(() => {
        window.location.href = `editor?room=${code}`;
    }, 1000);
}

function createRoom() {
    const newCode = generateRoomCode();
    showToast('Sala criada: ' + newCode);

    setTimeout(() => {
        window.location.href = `editor?room=${newCode}`;
    }, 1000);
}

// Auto-uppercase input
document.getElementById('roomCode').addEventListener('input', function (e) {
    this.value = this.value.toUpperCase();
});
