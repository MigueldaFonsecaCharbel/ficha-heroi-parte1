document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. SAUDAÇÃO DINÂMICA BASEADA NO HORÁRIO LOCAL
    // -------------------------------------------------------------
    const greetingEl = document.getElementById("dynamic-greeting");
    if (greetingEl) {
        const hora = new Date().getHours();
        let saudacao = "OLÁ, OPERADOR";
        if (hora >= 5 && hora < 12) {
            saudacao = "BOM DIA, OPERADOR";
        } else if (hora >= 12 && hora < 18) {
            saudacao = "BOA TARDE, OPERADOR";
        } else {
            saudacao = "BOA NOITE, OPERADOR";
        }
        greetingEl.innerHTML = `<i class="fa-solid fa-satellite-dish" aria-hidden="true"></i> ${saudacao} // LINK SEGURO ATIVO`;
    }

    // -------------------------------------------------------------
    // 2. TEMA ESCURO / CLARO (MODO NOTURNO DA GUILDA) + LOCALSTORAGE
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("ghost_theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon" aria-hidden="true"></i> <span>MODO ESCURO</span>';
            themeToggleBtn.setAttribute("aria-pressed", "true");
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            themeToggleBtn.innerHTML = isLight 
                ? '<i class="fa-solid fa-moon" aria-hidden="true"></i> <span>MODO ESCURO</span>' 
                : '<i class="fa-solid fa-sun" aria-hidden="true"></i> <span>MODO CLARO</span>';
            themeToggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
            localStorage.setItem("ghost_theme", isLight ? "light" : "dark");
        });
    }

    // -------------------------------------------------------------
    // 3. MENU HAMBÚRGUER RESPONSIVO (ACESSIBILIDADE E DOM)
    // -------------------------------------------------------------
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            const isOpen = mainNav.classList.contains("active");
            navToggle.setAttribute("aria-expanded", isOpen);
            const icon = navToggle.querySelector("i");
            if (icon) {
                icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
                navToggle.setAttribute("aria-expanded", "false");
                const icon = navToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });
    }

    // -------------------------------------------------------------
    // 4. INVENTÁRIO DINÂMICO (HARDWARE REAL E GADGETS TÁTICOS DE CAMPO)
    // -------------------------------------------------------------
    const inventoryGrid = document.getElementById("inventory-grid");
    const itemCounter = document.getElementById("item-counter");
    const filterBtns = document.querySelectorAll(".filter-bar .filter-btn");
    const inventoryModal = document.getElementById("inventory-modal-overlay");
    const inventoryModalClose = document.getElementById("inventory-modal-close");
    const inventoryModalImage = document.getElementById("inventory-modal-image");
    const inventoryModalTitle = document.getElementById("inventory-modal-title");
    const inventoryModalRarity = document.getElementById("inventory-modal-rarity");
    const inventoryModalType = document.getElementById("inventory-modal-type");
    const inventoryModalDescription = document.getElementById("inventory-modal-description");

    function abrirDetalhesInventario(item) {
        if (!inventoryModal) return;

        inventoryModalImage.src = item.imagem;
        inventoryModalImage.alt = item.nome;
        inventoryModalTitle.textContent = item.nome;
        inventoryModalRarity.textContent = item.rotuloRaridade;
        inventoryModalRarity.className = `tag tag-${item.raridade}`;
        inventoryModalType.textContent = item.tipo.toUpperCase();
        inventoryModalDescription.textContent = item.desc;
        inventoryModal.classList.add("is-open");
        inventoryModal.setAttribute("aria-hidden", "false");
        inventoryModal.inert = false;
        inventoryModalClose.focus();
    }

    function fecharDetalhesInventario() {
        if (!inventoryModal) return;
        inventoryModal.classList.remove("is-open");
        inventoryModal.setAttribute("aria-hidden", "true");
        inventoryModal.inert = true;
    }

    function renderInventario(itensFiltrados) {
        if (!inventoryGrid) return;

        inventoryGrid.innerHTML = "";

        itensFiltrados.forEach(item => {
            const card = document.createElement("article");

            card.className = `inventory-card rarity-${item.raridade}`;
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `Ver detalhes de ${item.nome}`);

            card.innerHTML = `
                <div class="inventory-card-top">

                    <div class="inventory-icon-frame">
                        <img
                            class="inventory-item-image"
                            src="${item.imagem}"
                            alt="${item.nome}"
                            loading="lazy"
                        >
                    </div>

                </div>

                <h3>${item.nome}</h3>

                <span class="tag tag-${item.raridade}">[${item.rotuloRaridade}]</span>

                <p>${item.desc}</p>
            `;

            card.addEventListener("click", () => abrirDetalhesInventario(item));
            card.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    abrirDetalhesInventario(item);
                }
            });
            inventoryGrid.appendChild(card);
        });

        if (itemCounter) {
            itemCounter.textContent =
                `${itensFiltrados.length} / ${inventarioData.length} ITENS`;
        }
    }

    
const inventarioData = [
    {
        id: 1,
        nome: "Crypto-Key Biometric M-9",
        tipo: "tecnologia",
        raridade: "raro",
        rotuloRaridade: "RARO",
        desc: "Chave de hardware física com leitor de impressões digitais e circuito de auto-destruição para invalidação de logs.",
        imagem: "assets/inventario/crypto-key.png"
    },
    {
        id: 2,
        nome: "Scanner Acústico de Parede",
        tipo: "tecnologia",
        raridade: "raro",
        rotuloRaridade: "RARO",
        desc: "Dispositivo portátil de eco-localização por laser e micro-sonar para mapeamento de alvos através de divisórias sólidas.",
        imagem: "assets/inventario/scanner-acustico.png"
    },
    {
        id: 3,
        nome: "Deck Palantir Cripto-Satelital",
        tipo: "inteligencia",
        raridade: "lendario",
        rotuloRaridade: "LENDÁRIO",
        desc: "Terminal tático blindado de campo com uplink satelital dedicado para varredura e interceptação de dados globais.",
        imagem: "assets/inventario/deck-palantir.png"
    },
    {
        id: 4,
        nome: "Terno Executivo Kevlar-X",
        tipo: "equipamentos",
        raridade: "lendario",
        rotuloRaridade: "LENDÁRIO",
        desc: "Vestimenta alfaiatada sob medida com tramas internas de aramida e absorção de impacto balístico de alta densidade.",
        imagem: "assets/inventario/terno-kevlar.png"
    },
    {
        id: 5,
        nome: "Emissor EMP de Cinto Mk.II",
        tipo: "equipamentos",
        raridade: "raro",
        rotuloRaridade: "RARO",
        desc: "Dispositivo de pulso eletromagnético focalizado para colapso temporário de circuitos de vigilância e câmeras locais.",
        imagem: "assets/inventario/emissor-emp.png"
    }
];


    // Renderização inicial
    renderInventario(inventarioData);

    if (inventoryModalClose) {
        inventoryModalClose.addEventListener("click", fecharDetalhesInventario);
    }

    if (inventoryModal) {
        inventoryModal.addEventListener("click", event => {
            if (event.target === inventoryModal) fecharDetalhesInventario();
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") fecharDetalhesInventario();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            if (filterValue === "todos") {
                renderInventario(inventarioData);
            } else if (filterValue === "raro" || filterValue === "lendario") {
                renderInventario(inventarioData.filter(i => i.raridade === filterValue));
            } else {
                renderInventario(inventarioData.filter(i => i.tipo === filterValue));
            }
        });
    });

    // -------------------------------------------------------------
    // 5. SISTEMA DE XP E NÍVEL (COM LOCALSTORAGE)
    // -------------------------------------------------------------
    const xpSalvo = Number.parseInt(localStorage.getItem("ghost_xp"), 10);
    const nivelSalvo = Number.parseInt(localStorage.getItem("ghost_nivel"), 10);
    let xpAtual = Number.isFinite(xpSalvo) && xpSalvo >= 0 ? xpSalvo : 40;
    let nivelAtual = Number.isFinite(nivelSalvo) && nivelSalvo >= 1 ? nivelSalvo : 1;
    const xpMax = 100;

    const btnGainXp = document.getElementById("btn-gain-xp");
    const xpProgressbar = document.getElementById("xp-progressbar");
    const xpCounter = document.getElementById("xp-counter");
    const agentLevelEl = document.getElementById("agent-level");
    const xpFeedback = document.getElementById("xp-feedback");

    function atualizarInterfaceXp() {
        if (xpProgressbar) xpProgressbar.value = Math.min(xpAtual, xpMax);
        if (xpCounter) xpCounter.textContent = `${xpAtual} / ${xpMax} XP`;
        if (agentLevelEl) agentLevelEl.textContent = nivelAtual;
    }

    atualizarInterfaceXp();

    if (btnGainXp) {
        btnGainXp.addEventListener("click", () => {
            xpAtual += 25;
            if (xpAtual >= xpMax) {
                nivelAtual += 1;
                xpAtual = xpAtual - xpMax;
                if (xpFeedback) {
                    xpFeedback.textContent = `⚡ LEVEL UP! Nível operacional ${nivelAtual} alcançado!`;
                    xpFeedback.className = "xp-feedback level-up";
                }
            } else {
                if (xpFeedback) {
                    xpFeedback.textContent = "+25 XP obtidos em missão de campo!";
                    xpFeedback.className = "xp-feedback active";
                }
            }

            localStorage.setItem("ghost_xp", xpAtual);
            localStorage.setItem("ghost_nivel", nivelAtual);
            atualizarInterfaceXp();
        });
    }

    // -------------------------------------------------------------
    // 6. HISTÓRIA EXPANSÍVEL (VER MAIS / VER MENOS COM OPERADOR TERNÁRIO)
    // -------------------------------------------------------------
    const btnToggleStory = document.getElementById("btn-toggle-story");
    const storyMore = document.getElementById("story-more");

    if (btnToggleStory && storyMore) {
        btnToggleStory.addEventListener("click", () => {
            const isHidden = storyMore.classList.contains("hidden");
            storyMore.classList.toggle("hidden", !isHidden);
            btnToggleStory.setAttribute("aria-expanded", isHidden);
            btnToggleStory.textContent = isHidden ? "VER MENOS" : "VER HISTÓRIA COMPLETA";
        });
    }

    // -------------------------------------------------------------
    // 7. VALIDAÇÃO DE FORMULÁRIO DE CONTATO COM A GUILDA
    // -------------------------------------------------------------
    const guildForm = document.getElementById("guild-form");
    const formFeedback = document.getElementById("form-feedback");

    if (guildForm) {
        guildForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nomeInput = document.getElementById("operator-name");
            const emailInput = document.getElementById("operator-email");
            const subjectInput = document.getElementById("operator-subject");
            const messageInput = document.getElementById("operator-message");

            const errorName = document.getElementById("error-name");
            const errorEmail = document.getElementById("error-email");
            const errorSubject = document.getElementById("error-subject");
            const errorMessage = document.getElementById("error-message");

            // Limpa erros anteriores
            [errorName, errorEmail, errorSubject, errorMessage].forEach(el => { if (el) el.textContent = ""; });
            [nomeInput, emailInput, subjectInput, messageInput].forEach(el => {
                if (el) el.classList.remove("invalid");
            });
            if (formFeedback) { formFeedback.className = "form-feedback"; formFeedback.textContent = ""; }

            let temErro = false;

            if (!nomeInput || !emailInput || !subjectInput || !messageInput) {
                if (formFeedback) {
                    formFeedback.textContent = "❌ Falha no formulário: campos obrigatórios não foram encontrados.";
                    formFeedback.className = "form-feedback error";
                }
                return;
            }

            if (!nomeInput.value.trim()) {
                errorName.textContent = "Informe o nome ou codinome do operador.";
                nomeInput.classList.add("invalid");
                temErro = true;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                errorEmail.textContent = "O e-mail de contato é obrigatório.";
                emailInput.classList.add("invalid");
                temErro = true;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                errorEmail.textContent = "Formato de e-mail inválido (ex: operador@guilda.org).";
                emailInput.classList.add("invalid");
                temErro = true;
            }

            if (!subjectInput.value.trim()) {
                errorSubject.textContent = "O assunto da solicitação é obrigatório.";
                subjectInput.classList.add("invalid");
                temErro = true;
            }

            if (!messageInput.value.trim()) {
                errorMessage.textContent = "Insira os parâmetros da mensagem operacional.";
                messageInput.classList.add("invalid");
                temErro = true;
            }

            if (temErro) {
                if (formFeedback) {
                    formFeedback.textContent = "❌ Falha no despacho: verifique os campos destacados.";
                    formFeedback.className = "form-feedback error";
                }
                return;
            }

            // Sucesso simulado
            if (formFeedback) {
                formFeedback.textContent = `✔ TRANSMISSÃO BEM-SUCEDIDA! Mensagem despachada em canal seguro para ${emailInput.value.trim()}.`;
                formFeedback.className = "form-feedback success";
            }
            guildForm.reset();
        });
    }

    // -------------------------------------------------------------
    // 8. TERMINAL INTERATIVO LOCAL
    // -------------------------------------------------------------
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const terminalSend = document.getElementById("terminal-send");

    function processarComando(cmdTexto) {
        const cmd = cmdTexto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let resposta = `\n> ${cmdTexto}\n`;

        if (cmd === "qap") {
            resposta += "[GHOST] QAP confirmado. Operador na escuta, canal seguro ativo.";
        } else if (cmd === "qra") {
            resposta += "[GHOST] QRA: Agent Ghost. Identidade criptografada.";
        } else if (cmd === "qth") {
            resposta += "[GHOST] QTH: Coordenadas em mascaramento orbital (Redacted).";
        } else if (cmd === "qsl") {
            resposta += "[GHOST] QSL recebido. Instruções operacionais compreendidas.";
        } else if (cmd === "status") {
            resposta += "[GHOST] Status: Sistemas operacionais 100% íntegros. Firewall ativo.";
        } else if (cmd === "missao" || cmd === "missoes") {
            resposta += "[GHOST] Missão atual: Proteção de infraestruturas críticas e contrainteligência.";
        } else if (cmd === "identidade") {
            resposta += "[GHOST] Operador autônomo ex-Unidade 8200. Registro governamental apagado.";
        } else if (cmd === "help" || cmd === "ajuda") {
            resposta += "[SISTEMA] Comandos suportados: QAP, QRA, QTH, QSL, STATUS, MISSAO, IDENTIDADE, CLEAR, HELP.";
        } else if (cmd === "clear" || cmd === "cls") {
            if (terminalOutput) terminalOutput.textContent = "[SISTEMA] Console limpo. Pronto para novos comandos.";
            return;
        } else {
            resposta += `[GHOST] Comando não reconhecido: '${cmdTexto}'. Digite 'HELP' para listar comandos.`;
        }

        if (terminalOutput) {
            terminalOutput.textContent += resposta;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }

    if (terminalInput && terminalSend) {
        terminalSend.addEventListener("click", () => {
            const val = terminalInput.value.trim();
            if (val) {
                processarComando(val);
                terminalInput.value = "";
            }
        });

        terminalInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const val = terminalInput.value.trim();
                if (val) {
                    processarComando(val);
                    terminalInput.value = "";
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 9. AVATAR MATRIX COM CANVAS (EXCLUSIVO)
    // -------------------------------------------------------------
    const canvas = document.getElementById("matrix-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = 132;
        canvas.height = 132;

        const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-_";
        const fontSize = 10;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        setInterval(() => {
            ctx.fillStyle = "rgba(5, 8, 13, 0.18)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00F0FF";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.94) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 33);
    }

    // -------------------------------------------------------------
    // 10. MAPA TÁTICO DE HISTÓRICO COM TOOLTIP (HOVER) E MODAL (CLIQUE)
    // -------------------------------------------------------------
    if (typeof L !== 'undefined' && document.getElementById('history-map')) {
        const historyMap = L.map('history-map', { center: [20, 15], zoom: 2, zoomControl: false });
        const satelliteTiles = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; Esri',
                maxZoom: 19
            }
        ).addTo(historyMap);

        let fallbackLoaded = false;
        satelliteTiles.on('tileerror', () => {
            if (fallbackLoaded) return;
            fallbackLoaded = true;
            historyMap.removeLayer(satelliteTiles);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(historyMap);
        });

        setTimeout(() => historyMap.invalidateSize(), 100);

        const missoesHistorico = [
            {
                coords: [33.3152, 44.3661], // Iraque / Oriente Médio
                title: "FASE I // TEATRO DO ORIENTE MÉDIO",
                status: "ARQUIVO ENCERRADO",
                location: "Iraque, Líbano, Jordânia",
                period: "2014 – 2018",
                desc: "Primeiro ciclo de campo focado em inteligência de sinais, evacuação de ativos críticos sob alta hostilidade e neutralização de redes clandestinas de interceptação."
            },
            {
                coords: [52.5200, 13.4050], // Berlim / Eurásia
                title: "FASE II // FRONTEIRA EURASIÁTICA",
                status: "MONITORAMENTO ATIVO",
                location: "Berlim, Báltico, Cárpatos",
                period: "2019 – 2022",
                desc: "Operações de rastreio orbital, auditoria de backbones de fibra óptica e contrainteligência digital em corredores de alta tensão geopolítica."
            },
            {
                coords: [-14.2350, -51.9253], // Brasil / Américas
                title: "FASE III // TEATRO DAS AMÉRICAS",
                status: "ACESSO RESTRITO",
                location: "Brasil, Panamá, México",
                period: "2023 – Presente",
                desc: "Infiltração defensiva de cadeias financeiras regionais e proteção ativa de infraestruturas críticas de energia contra ameaças persistentes avançadas (APTs)."
            }
        ];

        missoesHistorico.forEach(m => {
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="width: 28px; height: 28px; border: 2px solid #00F0FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px #00F0FF; background: rgba(10, 14, 23, 0.85); cursor: pointer;"><div style="width: 7px; height: 7px; background-color: #00F0FF; border-radius: 50%;"></div></div>',
                iconSize: [28, 28]
            });

            const marker = L.marker(m.coords, { icon: customIcon }).addTo(historyMap);

            // Tooltip ao passar o mouse por cima
            marker.bindTooltip(`<strong>${m.title}</strong><br><span style="color: #FFB700;">${m.status}</span>`, {
                direction: 'top',
                offset: [0, -10],
                className: 'tactical-map-tooltip'
            });

            // Ação ao clicar no marcador
            marker.on('click', () => {
                document.getElementById("history-modal-title").textContent = m.title;
                const badge = document.getElementById("history-modal-status");
                badge.textContent = m.status;
                
                if(m.status === "ARQUIVO ENCERRADO") {
                    badge.style.background = "rgba(34, 197, 94, 0.2)";
                    badge.style.border = "1px solid #22c55e";
                    badge.style.color = "#22c55e";
                } else if(m.status === "MONITORAMENTO ATIVO") {
                    badge.style.background = "rgba(234, 179, 8, 0.2)";
                    badge.style.border = "1px solid #eab308";
                    badge.style.color = "#eab308";
                } else {
                    badge.style.background = "rgba(239, 68, 68, 0.2)";
                    badge.style.border = "1px solid #ef4444";
                    badge.style.color = "#ef4444";
                }

                document.getElementById("history-modal-location").textContent = m.location;
                document.getElementById("history-modal-period").textContent = m.period;
                document.getElementById("history-modal-desc").textContent = m.desc;
                document.getElementById("history-modal-overlay").style.display = "flex";
            });
        });

        const closeHistoryModal = () => {
            document.getElementById("history-modal-overlay").style.display = "none";
        };

        document.getElementById("history-modal-close").addEventListener("click", closeHistoryModal);
        document.getElementById("history-modal-btn").addEventListener("click", closeHistoryModal);
    }

});
