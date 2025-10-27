const readerDiv = document.getElementById("reader");
const formContainer = document.getElementById("formContainer");

let currentUser = null;
let html5QrCode = null;
let currentFacingMode = "user"; // Inicia com frontal

function dataHoje() {
    return new Date().toISOString().slice(0, 10);
}

function iniciarLeitor() {
    console.log("iniciarLeitor called");
    // Clear any previous error messages
    const errorDiv = document.getElementById("cameraError");
    if (errorDiv) {
        errorDiv.remove();
    }

    if (html5QrCode && html5QrCode.isScanning()) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            html5QrCode = null; // Reset instance
        }).catch(err => console.error("Erro ao parar câmera:", err));
    }

    html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: currentFacingMode },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
            try {
                const obj = JSON.parse(decodedText);
                if (!obj.id || !obj.nome) throw "QR inválido";

                currentUser = obj;

                // No need to verify open entries, always allow new registration

                formContainer.innerHTML = `
                    <p>Olá, ${obj.nome}. Registre seu horário de trabalho.</p>
                    <form id="registroForm" novalidate>
                        <input type="hidden" id="funcionarioId" name="id" value="${obj.id}">

                        <label for="area">Área:</label>
                        <select id="area" name="area" required>
                            <option value="" disabled selected>Selecione uma área</option>
                            ${AREAS.map(area => `<option value="${area}">${area}</option>`).join('')}
                        </select>

                        <label for="projeto">Projeto:</label>
                        <select id="projeto" name="projeto" required>
                            <option value="" disabled selected>Selecione um projeto</option>
                            ${PROJETOS.map(proj => `<option value="${proj}">${proj}</option>`).join('')}
                        </select>

                        <label for="numeroProjeto">Número do Projeto:</label>
                        <input type="text" id="numeroProjeto" name="numeroProjeto" required>

                        <label for="horaInicio">Hora de Início:</label>
                        <input type="time" id="horaInicio" name="horaInicio" required>

                        <label for="horaFim">Hora de Fim:</label>
                        <input type="time" id="horaFim" name="horaFim" required>

                        <button type="submit" disabled>Registrar</button>
                    </form>
                `;

                const form = document.getElementById("registroForm");
                const button = form.querySelector("button");
                const inputs = [form.horaInicio, form.horaFim, form.area, form.projeto, form.numeroProjeto];

                function validarFormulario() {
                    const valido = inputs.every(input => input.value.trim() !== "");
                    button.disabled = !valido;
                }

                inputs.forEach(input => {
                    input.addEventListener("input", validarFormulario);
                });

                validarFormulario(); // inicializar estado botão

                form.addEventListener("submit", enviarFormulario);

                formContainer.style.display = "block";
                html5QrCode.stop();

            } catch (e) {
                console.error("QR inválido:", e);
            }
        },
        (error) => { /* Ignora erros */ }
    ).catch(err => {
        console.error("Erro ao iniciar câmera:", err);
        // Display error message to user
        const readerDiv = document.getElementById("reader");
        const errorDiv = document.createElement("div");
        errorDiv.id = "cameraError";
        errorDiv.style.color = "#ff6b6b";
        errorDiv.style.textAlign = "center";
        errorDiv.style.padding = "20px";
        errorDiv.innerHTML = `
            <p>Erro ao acessar a câmera. Verifique se as permissões estão concedidas e se o dispositivo tem câmera disponível.</p>
            <button id="retryCameraBtn" style="padding: 10px 20px; background-color: #64ffda; color: #0a192f; border: none; border-radius: 8px; cursor: pointer; font-weight: 700;">Tentar Novamente</button>
        `;
        readerDiv.appendChild(errorDiv);
        const retryBtn = errorDiv.querySelector("#retryCameraBtn");
        retryBtn.addEventListener("click", () => {
            console.log("Retry button clicked");
            iniciarLeitor();
        });
    });
}

async function enviarFormulario(e) {
    e.preventDefault();

    const payload = {
        data: dataHoje(),
        id: currentUser.id,
        nome: currentUser.nome,
        horaInicio: document.getElementById("horaInicio").value,
        horaFim: document.getElementById("horaFim").value,
        area: document.getElementById("area").value,
        projeto: document.getElementById("projeto").value,
        numeroProjeto: document.getElementById("numeroProjeto").value
    };

    try {
        const resp = await fetch("/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const j = await resp.json();

        if (j.status === "ok") {
            alert(`Registro de ${j.acao} salvo com sucesso!`);
            // Reset form and restart camera automatically
            formContainer.style.display = "none";
            iniciarLeitor();
        } else {
            alert(j.message || "Erro ao registrar.");
        }
    } catch (err) {
        alert("Erro na requisição: " + err);
    }
}

window.onload = () => {
    iniciarLeitor();
};

// Toggle camera functionality
document.getElementById('toggleCameraBtn').addEventListener('click', () => {
    currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
    iniciarLeitor();
});

// Admin login functionality
document.getElementById('adminBtn').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'flex';
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'none';
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (result.status === 'ok') {
        window.location.href = '/admin';
    } else {
        alert('Credenciais inválidas');
    }
});
