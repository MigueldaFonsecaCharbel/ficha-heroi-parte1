document.addEventListener("DOMContentLoaded", () => {
    const bioElement = document.querySelector(".bio");
    const textoOriginal = bioElement.textContent.trim();
    bioElement.textContent = "";

    let i = 0;
    function digitarTexto() {
        if (i < textoOriginal.length) {
            bioElement.textContent += textoOriginal.charAt(i);
            i++;
            setTimeout(digitarTexto, 25); // Velocidade da digitação
        }
    }
    digitarTexto();

    const terminalInput = document.querySelector(".terminal-input");
    const terminalResponse = document.querySelector(".terminal-response");

    function gerarResposta(mensagem) {
        const texto = mensagem.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (/\b(oi|ola|olá|hello|bom dia|boa tarde|boa noite)\b/.test(texto)) {
            return "[GHOST] Canal seguro estabelecido. Olá, operador. Quem está transmitindo?";
        }

        if (/\bqap\b/.test(texto)) {
            return "[GHOST] QAP confirmado. Ghost na escuta, canal seguro aberto.";
        }

        if (/\bqra\b/.test(texto)) {
            return "[GHOST] QRA: Ghost. Identidade operacional protegida.";
        }

        if (/\bqth\b/.test(texto)) {
            return "[GHOST] QTH mascarado. Localização indisponível neste canal.";
        }

        if (/\bqsl\b/.test(texto)) {
            return "[GHOST] QSL recebido. Instrução compreendida e registrada.";
        }

        if (texto.includes("quem e") || texto.includes("quem voce") || texto.includes("quem você") || texto.includes("ghost")) {
            return "[GHOST] Identidade: Ghost. Operador de inteligência cibernética, análise preditiva e operações de campo. Meu registro oficial foi apagado.";
        }

        if (texto.includes("missao") || texto.includes("missão") || texto.includes("o que faz")) {
            return "[GHOST] Missão atual: proteger infraestruturas críticas, interceptar ameaças e manter o equilíbrio sem deixar rastros.";
        }

        if (texto.includes("tudo bem") || texto.includes("como voce esta") || texto.includes("como esta")) {
            return "[GHOST] Tudo dentro dos parâmetros, operador. Sistemas ativos e canal seguro funcionando.";
        }

        if (texto.includes("status")) {
            return "[GHOST] Status: ativo. Sistemas operacionais, canais criptografados e telemetria dentro dos parâmetros.";
        }

        return "[GHOST]: Comando não reconhecido: ALPHA comprometido";
    }

    terminalInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const mensagem = terminalInput.value.trim();
            
            if (mensagem !== "") {
                terminalResponse.textContent = gerarResposta(mensagem);
                terminalInput.value = "";
            }
        }
    });
const links = document.querySelectorAll(".btn-link");

links.forEach(link => {
    link.addEventListener("click", (e) => {
        if (link.getAttribute("href") === "#") {
            e.preventDefault();
            alert(`[SISTEMA GHOST] Acessando módulo externo: ${link.textContent}`);
        }
    });
});
});
const canvas = document.getElementById("matrix-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = 120;
    canvas.height = 120;

    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*";
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(10, 14, 23, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00F0FF"; // Mude para "#00FF66" se preferir verde Matrix clássico
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);
}