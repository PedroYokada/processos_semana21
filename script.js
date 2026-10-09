(() => {
  "use strict";

  const STORAGE_KEY = "processosSemana21SimpleV3";
  const LEGACY_KEY = "processosSemana21SimpleV2";
  const STAGES = [
    ["problem", "Etapa 1 — Wall of Confusion"],
    ["calms", "Etapa 2 — DevOps e CALMS"],
    ["pipeline", "Etapa 3 — Pipeline"],
    ["bug", "Etapa 4 — Decisão de deploy"],
    ["dora", "Etapa 5 — Métricas DORA"],
    ["final", "Desafio final"],
  ];
  const MILESTONES = [
    ["pipeline", "✓ Pipeline completo"],
    ["bug", "✓ Bug identificado"],
    ["final", "✓ Semana 21 concluída"],
  ];

  const defaultState = {
    identity: { name: "", className: "", number: "", date: "" },
    theme: "light",
    stages: {},
    quizScores: {},
    quizAnswers: {},
    pipeline: { selected: [], verified: false, simulationComplete: false },
    responses: {
      deployJustification: "",
      doraDiagnosis: "",
      doraRecommendation: "",
      finalProblems: "",
      finalCalms: "",
      finalPipeline: "",
      finalMetrics: "",
      finalJustification: "",
    },
    calculations: { cfr: "", mttr: "" },
  };

  const quizData = {
    lesson1: {
      title: "Quiz da Aula 1",
      questions: [
        {
          q: "O que melhor representa o Wall of Confusion?",
          options: [
            "Um firewall físico",
            "Conflito de objetivos e falta de comunicação entre Dev e Ops",
            "Um erro de compilação",
            "Uma metodologia de testes",
          ],
          answer: 1,
          exp: "O material descreve o Wall of Confusion como o conflito histórico entre Desenvolvimento e Operações, que trabalham com objetivos e responsabilidades isoladas.",
        },
        {
          q: "Por que o DevOps surge como evolução do fluxo ágil?",
          options: [
            "Para eliminar testes",
            "Para integrar a ponta final do fluxo, incluindo operações e infraestrutura",
            "Para substituir requisitos",
            "Para impedir deploys frequentes",
          ],
          answer: 1,
          exp: "A aula explica que Agile melhorou colaboração e velocidade, mas ainda faltava integrar operações e infraestrutura ao fluxo.",
        },
        {
          q: "Qual pilar CALMS trata diretamente de tarefas repetitivas e erro humano?",
          options: ["Culture", "Automation", "Measurement", "Sharing"],
          answer: 1,
          exp: "Automation propõe automatizar o que é repetitivo para reduzir trabalho manual e erro humano.",
        },
        {
          q: "Qual pilar CALMS ajuda a substituir opinião por evidência?",
          options: ["Lean", "Culture", "Measurement", "Sharing"],
          answer: 2,
          exp: "Measurement enfatiza medir desempenho e qualidade por meio de dados.",
        },
        {
          q: "DevOps deve ser entendido principalmente como:",
          options: [
            "Uma ferramenta específica",
            "Apenas GitHub Actions",
            "Uma cultura que integra pessoas, processos e tecnologia",
            "Uma etapa de codificação",
          ],
          answer: 2,
          exp: "Os materiais apresentam DevOps como uma cultura de integração entre pessoas, processos e tecnologia.",
        },
      ],
    },
    lesson2: {
      title: "Quiz da Aula 2",
      questions: [
        {
          q: "O que caracteriza um pipeline de feedback?",
          options: [
            "Manual entregue ao cliente",
            "Processo automático de validação a cada alteração",
            "Reunião semanal",
            "Canal de suporte",
          ],
          answer: 1,
          exp: "O material define pipeline de feedback como uma sequência automática de passos que valida o código a cada mudança.",
        },
        {
          q: "Qual é a sequência central mostrada na aula?",
          options: [
            "Teste → Código → Build → Resultado",
            "Código → Build → Teste → Resultado",
            "Monitor → Teste → Código → Build",
            "Build → Cliente → Código → Teste",
          ],
          answer: 1,
          exp: "A sequência central é código/commit → build → teste → resultado/monitoramento.",
        },
        {
          q: "Se o build passou, mas 2 + 2 está retornando 5, qual etapa deve barrar o erro?",
          options: ["Build", "Teste", "Commit", "Deploy"],
          answer: 1,
          exp: "O build verifica preparação/compilação. Testes automatizados validam o comportamento esperado.",
        },
        {
          q: "O que significa fail fast?",
          options: [
            "Aceitar falhas sem correção",
            "Descobrir falhas o mais cedo possível",
            "Fazer deploy sem teste",
            "Reduzir o número de desenvolvedores",
          ],
          answer: 1,
          exp: "Fail fast significa obter feedback cedo para reduzir impacto e custo de correção.",
        },
        {
          q: "Qual é a diferença central entre teste e monitoramento?",
          options: [
            "Não existe diferença",
            "Teste verifica comportamento; monitoramento torna estado/falhas visíveis",
            "Monitoramento compila; teste publica",
            "Teste só serve em produção",
          ],
          answer: 1,
          exp: "O roteiro do professor reforça que teste valida comportamento e monitoramento torna a falha visível para ação rápida.",
        },
      ],
    },
    lesson3: {
      title: "Quiz da Aula 3",
      questions: [
        {
          q: "Para que servem as métricas DORA no contexto da aula?",
          options: [
            "Medir desempenho do fluxo e apoiar decisões",
            "Avaliar individualmente programadores",
            "Substituir testes",
            "Escolher linguagem de programação",
          ],
          answer: 0,
          exp: "A aula usa DORA para medir desempenho de times e apoiar melhoria baseada em dados.",
        },
        {
          q: "Qual métrica indica o tempo até uma mudança chegar à produção?",
          options: [
            "MTTR",
            "Lead Time",
            "Change Fail Rate",
            "Deployment Frequency",
          ],
          answer: 1,
          exp: "Lead Time representa o tempo total da mudança até produção.",
        },
        {
          q: "Qual métrica indica com que frequência o time entrega mudanças?",
          options: ["Deployment Frequency", "MTTR", "Lead Time", "CFR"],
          answer: 0,
          exp: "Deployment Frequency mede a frequência de entrega/deploy.",
        },
        {
          q: "Qual métrica mostra quanto tempo o serviço leva para se recuperar após falha?",
          options: [
            "Lead Time",
            "MTTR",
            "Deployment Frequency",
            "Change Fail Rate",
          ],
          answer: 1,
          exp: "MTTR é o tempo médio para restaurar o serviço após uma falha.",
        },
        {
          q: "20 deploys, 4 com falha. Qual é o Change Fail Rate?",
          options: ["4%", "10%", "20%", "80%"],
          answer: 2,
          exp: "4 ÷ 20 × 100 = 20%.",
        },
      ],
    },
    final: {
      title: "Quiz final — Semana 21",
      questions: [
        {
          q: "Uma equipe trabalha em silos e só descobre incompatibilidades em produção. Qual conceito descreve melhor o problema?",
          options: [
            "Deployment Frequency",
            "Wall of Confusion",
            "MTTR",
            "Lean",
          ],
          answer: 1,
          exp: "O Wall of Confusion representa o isolamento e conflito entre Dev e Ops.",
        },
        {
          q: "O time possui dezenas de tarefas manuais repetitivas. Qual pilar CALMS é o foco mais direto?",
          options: ["Automation", "Sharing", "Culture", "Measurement"],
          answer: 0,
          exp: "Automation busca automatizar tarefas repetitivas e reduzir erro humano.",
        },
        {
          q: "O código compila, mas um teste automatizado falha. O que o pipeline deve fazer?",
          options: [
            "Prosseguir para produção",
            "Interromper o fluxo",
            "Ignorar o teste",
            "Esperar o cliente reclamar",
          ],
          answer: 1,
          exp: "A lógica de negócio está comprometida; o fluxo deve ser interrompido.",
        },
        {
          q: "Uma empresa entrega rápido, mas 40% dos deploys causam incidentes. Qual indicador evidencia o problema?",
          options: [
            "Lead Time",
            "Change Fail Rate",
            "Deployment Frequency",
            "Quantidade de commits",
          ],
          answer: 1,
          exp: "Change Fail Rate mede a porcentagem de mudanças que causam falha.",
        },
        {
          q: "Uma falha demora oito horas para ser recuperada. Qual métrica merece atenção?",
          options: ["MTTR", "Lead Time", "CFR", "Deployment Frequency"],
          answer: 0,
          exp: "MTTR mede o tempo de recuperação do serviço.",
        },
        {
          q: "Qual afirmação é mais correta?",
          options: [
            "Mais deploys sempre significam melhor performance",
            "Velocidade deve ser analisada junto com estabilidade",
            "DORA é ranking de desenvolvedores",
            "Fail fast significa programar sem cuidado",
          ],
          answer: 1,
          exp: "A aula enfatiza o equilíbrio entre velocidade e estabilidade.",
        },
        {
          q: "Qual sequência melhor representa a progressão da Semana 21?",
          options: [
            "DORA → CALMS → Wall of Confusion",
            "Problema → cultura → pipeline → medição → melhoria",
            "Teste → requisito → banco de dados",
            "Deploy → código → planejamento",
          ],
          answer: 1,
          exp: "A refatoração pedagógica conecta o problema às práticas, métricas e melhoria contínua.",
        },
        {
          q: "Se o MTTR está alto, qual direção de melhoria é coerente com o material?",
          options: [
            "Melhorar monitoramento e alertas",
            "Eliminar testes",
            "Fazer menos comunicação",
            "Aumentar o número de bugs",
          ],
          answer: 0,
          exp: "A aula relaciona MTTR alto à necessidade de melhorar monitoramento e alertas.",
        },
      ],
    },
  };

  let pipelineRunning = false;
  let state = loadState();

  function cloneDefaultState() {
    return JSON.parse(JSON.stringify(defaultState));
  }
  function storageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }
  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (_) {
      return false;
    }
  }
  function storageRemove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (_) {
      return false;
    }
  }
  function deepMerge(target, source) {
    for (const [k, v] of Object.entries(source || {})) {
      if (
        v &&
        typeof v === "object" &&
        !Array.isArray(v) &&
        target[k] &&
        typeof target[k] === "object" &&
        !Array.isArray(target[k])
      )
        deepMerge(target[k], v);
      else target[k] = v;
    }
    return target;
  }
  function migrateLegacy(saved) {
    const fresh = cloneDefaultState();
    if (!saved || typeof saved !== "object") return fresh;
    if (saved.identity)
      fresh.identity = { ...fresh.identity, ...saved.identity };
    if (saved.theme === "dark" || saved.theme === "light")
      fresh.theme = saved.theme;

    if (saved.stages && typeof saved.stages === "object") {
      fresh.stages = { ...saved.stages };
      delete fresh.stages.pipeline;
      delete fresh.stages.bug;
    } else if (saved.missions && typeof saved.missions === "object") {
      const legacyMap = {
        aula1: "problem",
        calms: "calms",
        dora: "dora",
        final: "final",
      };
      for (const [oldKey, newKey] of Object.entries(legacyMap)) {
        if (saved.missions?.[oldKey]) fresh.stages[newKey] = true;
      }
    }

    fresh.quizScores = saved.quizScores || {};
    fresh.quizAnswers = saved.quizAnswers || {};
    if (saved.responses && typeof saved.responses === "object") {
      fresh.responses = { ...fresh.responses, ...saved.responses };
    } else {
      fresh.responses.deployJustification = saved.deployJustification || "";
      fresh.responses.doraDiagnosis = saved.doraDiagnosis || "";
      fresh.responses.doraRecommendation = saved.doraRecommendation || "";
      fresh.responses.finalProblems = saved.finalProblems || "";
      fresh.responses.finalCalms = saved.finalCalms || "";
      fresh.responses.finalPipeline = saved.finalPipeline || "";
      fresh.responses.finalMetrics = saved.finalMetrics || "";
      fresh.responses.finalJustification = saved.finalJustification || "";
    }
    if (saved.calculations && typeof saved.calculations === "object") {
      fresh.calculations = { ...fresh.calculations, ...saved.calculations };
    } else {
      fresh.calculations.cfr = saved.cfr || "";
      fresh.calculations.mttr = saved.mttr || "";
    }
    return fresh;
  }
  function loadState() {
    try {
      const current = storageGet(STORAGE_KEY);
      if (current) return deepMerge(cloneDefaultState(), JSON.parse(current));
      const legacy = storageGet(LEGACY_KEY);
      return legacy ? migrateLegacy(JSON.parse(legacy)) : cloneDefaultState();
    } catch (_) {
      return cloneDefaultState();
    }
  }
  function saveState() {
    storageSet(STORAGE_KEY, JSON.stringify(state));
    updateProgress();
    validateDelivery();
  }
  function $(id) {
    return document.getElementById(id);
  }
  function escapeHtml(s = "") {
    return String(s).replace(
      /[&<>'"]/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[c],
    );
  }
  function toast(msg) {
    const el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => (el.hidden = true), 2300);
  }
  function completeStage(key, message = "✓ Etapa concluída") {
    if (!state.stages[key]) {
      state.stages[key] = true;
      saveState();
      toast(message);
    } else saveState();
  }
  function stageCount() {
    return STAGES.filter(([k]) => state.stages[k]).length;
  }

  function updateProgress() {
    const completed = stageCount();
    const pct = Math.round((completed / STAGES.length) * 100);
    if ($("panelStudentName"))
      $("panelStudentName").textContent = state.identity.name || "Aluno";
    if ($("stagesText"))
      $("stagesText").textContent = `${completed} / ${STAGES.length}`;
    if ($("panelProgressText")) $("panelProgressText").textContent = `${pct}%`;
    if ($("panelProgressBar")) $("panelProgressBar").style.width = `${pct}%`;
    if ($("progressLabel"))
      $("progressLabel").textContent = `Progresso da Semana: ${pct}%`;
    if ($("progressCount"))
      $("progressCount").textContent =
        `${completed} de ${STAGES.length} etapas`;
    if ($("progressBar")) $("progressBar").style.width = `${pct}%`;
    if ($("progressChips"))
      $("progressChips").innerHTML = STAGES.map(
        ([k, n]) =>
          `<span class="${state.stages[k] ? "done" : ""}">${state.stages[k] ? "✓" : "○"} ${escapeHtml(n.replace(/^Etapa \d+ — /, ""))}</span>`,
      ).join("");
    document.querySelectorAll("[data-stage]").forEach((el) => {
      const done = !!state.stages[el.dataset.stage];
      el.classList.toggle("completed", done);
      const status = el.querySelector(".quest-state");
      if (status) status.textContent = done ? "✓ Concluído" : "○ Pendente";
    });
    if ($("milestoneShelf")) {
      const unlocked = MILESTONES.filter(([k]) => state.stages[k]);
      $("milestoneShelf").innerHTML = unlocked.length
        ? unlocked
            .map(
              ([, label]) =>
                `<span class="milestone">${escapeHtml(label)}</span>`,
            )
            .join("")
        : '<span class="milestone pending">Nenhum marco concluído ainda</span>';
    }
    if ($("weekComplete")) $("weekComplete").hidden = !state.stages.final;
  }

  function initIdentity() {
    const map = {
      studentName: "name",
      studentClass: "className",
      studentNumber: "number",
      studentDate: "date",
    };
    Object.entries(map).forEach(([id, key]) => {
      const el = $(id);
      if (!el) return;
      el.value = state.identity[key] || "";
      el.addEventListener("input", () => {
        state.identity[key] = el.value;
        saveState();
        $("saveStatus").textContent = "✓ Progresso salvo localmente";
      });
    });
    if (!state.identity.date && $("studentDate")) {
      $("studentDate").value = new Date().toISOString().slice(0, 10);
      state.identity.date = $("studentDate").value;
      saveState();
    }
  }
  function initTheme() {
    document.documentElement.dataset.theme = state.theme;
    updateThemeButton();
    $("themeToggle")?.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = state.theme;
      updateThemeButton();
      saveState();
    });
  }
  function updateThemeButton() {
    const b = $("themeToggle");
    if (b)
      b.innerHTML =
        state.theme === "dark"
          ? "☀️ <span>Modo claro</span>"
          : "🌙 <span>Modo escuro</span>";
  }

  function initNav() {
    const menu = $("mainNav"),
      menuToggle = $("menuToggle"),
      panel = $("studentPanel"),
      panelToggle = $("studentPanelToggle");
    const closeMenu = () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    };
    const closePanel = () => {
      panel.hidden = true;
      panelToggle.setAttribute("aria-expanded", "false");
    };
    menuToggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    document
      .querySelectorAll("#mainNav a")
      .forEach((a) => a.addEventListener("click", closeMenu));
    panelToggle.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      panelToggle.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) $("studentPanelClose").focus();
    });
    $("studentPanelClose").addEventListener("click", closePanel);
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!panel.hidden) {
        closePanel();
        panelToggle.focus();
        return;
      }
      if (menu.classList.contains("open")) {
        closeMenu();
        menuToggle.focus();
      }
    });
    document.addEventListener("pointerdown", (e) => {
      if (
        !panel.hidden &&
        !panel.contains(e.target) &&
        !panelToggle.contains(e.target)
      )
        closePanel();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) closeMenu();
    });
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((e) => obs.observe(e));
  }

  const calms = {
    culture: {
      title: "C — Culture",
      problem: "Equipes isoladas e responsabilidade fragmentada.",
      analogy:
        "Time de futebol: ataque, defesa e goleiro precisam jogar como uma equipe.",
      application:
        "Colaboração, transparência e responsabilidade compartilhada.",
    },
    automation: {
      title: "A — Automation",
      problem: "Tarefas repetitivas manuais criam lentidão e erro humano.",
      analogy:
        "Portão automático: uma ação repetitiva passa a acontecer de forma previsível.",
      application: "Automatizar build, testes e tarefas repetíveis do fluxo.",
    },
    lean: {
      title: "L — Lean",
      problem: "Etapas que não agregam valor aumentam espera e retrabalho.",
      analogy:
        "Fila de cantina com etapas desnecessárias antes de comprar o lanche.",
      application: "Eliminar desperdícios e reduzir gargalos do processo.",
    },
    measurement: {
      title: "M — Measurement",
      problem: "A equipe diz que melhorou, mas não consegue provar.",
      analogy: "Não basta achar que correu mais rápido: é preciso cronometrar.",
      application: "Usar indicadores para avaliar desempenho e qualidade.",
    },
    sharing: {
      title: "S — Sharing",
      problem: "Conhecimento e falhas ficam presos em silos.",
      analogy:
        "Em jogo cooperativo, esconder informação prejudica todo o time.",
      application: "Compartilhar ferramentas, sucessos, aprendizados e falhas.",
    },
  };
  function initCalms() {
    document.querySelectorAll(".calms-card").forEach((btn) =>
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".calms-card")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const c = calms[btn.dataset.calms];
        $("calmsDetail").innerHTML =
          `<h3>${c.title}</h3><p><strong>Problema:</strong> ${c.problem}</p><p><strong>Analogia:</strong> ${c.analogy}</p><p><strong>Aplicação no processo:</strong> ${c.application}</p>`;
      }),
    );
    document
      .querySelectorAll('[data-challenge="calms"] button')
      .forEach((btn) =>
        btn.addEventListener("click", () => {
          const ok = btn.dataset.answer === "automation";
          const f = $("calmsChallengeFeedback");
          f.className = `inline-feedback ${ok ? "good" : "bad"}`;
          f.textContent = ok
            ? "✓ Correto. Automation atua diretamente sobre tarefas repetitivas e redução de erro humano."
            : "✕ Tente novamente. O cenário destaca tarefas manuais repetitivas.";
          if (ok) completeStage("calms", "✓ Etapa 2 concluída");
        }),
      );
  }

  function initWall() {
    $("simulateWall").addEventListener("click", () => {
      const box = $("codeBox"),
        wall = $("wall");
      wall.classList.remove("removed");
      box.classList.remove("cross");
      void box.offsetWidth;
      box.classList.add("hit");
      $("wallFeedback").className = "inline-feedback bad";
      $("wallFeedback").textContent =
        "✕ O código é transferido entre silos. O problema aparece tarde e gera retrabalho.";
      setTimeout(() => box.classList.remove("hit"), 1200);
    });
    $("removeWall").addEventListener("click", () => {
      const box = $("codeBox");
      $("wall").classList.add("removed");
      box.classList.remove("hit");
      void box.offsetWidth;
      box.classList.add("cross");
      $("wallFeedback").className = "inline-feedback good";
      $("wallFeedback").textContent =
        "✓ DevOps reduz silos ao integrar pessoas, processos, automação e feedback.";
      completeStage("problem", "✓ Etapa 1 concluída");
      setTimeout(() => box.classList.remove("cross"), 1500);
    });
  }

  const pipelineMeta = {
    commit: {
      title: "Commit / Push",
      description: "envia a alteração e dispara o fluxo",
    },
    build: { title: "Build", description: "prepara o software" },
    test: { title: "Teste", description: "valida o comportamento" },
    result: {
      title: "Resultado / Alerta",
      description: "mostra o resultado à equipe",
    },
  };
  const correctPipeline = ["commit", "build", "test", "result"];

  function ensurePipelineState() {
    if (!state.pipeline || typeof state.pipeline !== "object") {
      state.pipeline = {
        selected: [],
        verified: false,
        simulationComplete: false,
      };
    }
    if (!Array.isArray(state.pipeline.selected)) state.pipeline.selected = [];
    state.pipeline.selected = state.pipeline.selected
      .filter((key) => pipelineMeta[key])
      .slice(0, 4);
    state.pipeline.verified = state.pipeline.verified === true;
    state.pipeline.simulationComplete =
      state.pipeline.simulationComplete === true;
  }

  function renderPipeline() {
    ensurePipelineState();
    const slots = $("pipelineSlots");
    const choices = $("pipelineChoices");
    const counter = $("pipelineCounter");
    const runButton = $("runPipeline");
    const bugBattle = $("bugBattle");
    if (!slots || !choices) return;

    const selected = state.pipeline.selected;
    slots.innerHTML = correctPipeline
      .map((_, index) => {
        const key = selected[index];
        if (!key) {
          return `<article class="pipeline-slot empty" data-slot="${index}"><b>${index + 1}</b><div><span>Etapa ${index + 1}</span><small>Escolha uma etapa</small></div><em>○</em></article>`;
        }
        const item = pipelineMeta[key];
        let stateClass = "";
        let statusText = item.description;
        let marker = "○";
        if (state.pipeline.simulationComplete && state.pipeline.verified) {
          if (key === "commit") {
            stateClass = "success";
            statusText = "✓ Alteração enviada";
            marker = "✓";
          }
          if (key === "build") {
            stateClass = "success";
            statusText = "✓ Build concluído";
            marker = "✓";
          }
          if (key === "test") {
            stateClass = "error";
            statusText = "✕ Falhou: esperado 4, obtido 5";
            marker = "✕";
          }
          if (key === "result") {
            stateClass = "warning";
            statusText = "⚠ Alerta enviado — fluxo interrompido";
            marker = "⚠";
          }
        }
        return `<article class="pipeline-slot ${stateClass}" data-slot="${index}" data-pipeline-step="${key}"><b>${index + 1}</b><div><span>${escapeHtml(item.title)}</span><small class="pipeline-step-status">${escapeHtml(statusText)}</small></div><em>${marker}</em></article>`;
      })
      .join('<i class="pipeline-arrow" aria-hidden="true">→</i>');

    choices.querySelectorAll("[data-pipeline-choice]").forEach((button) => {
      const key = button.dataset.pipelineChoice;
      button.disabled =
        selected.includes(key) || selected.length >= 4 || pipelineRunning;
      button.classList.toggle("selected", selected.includes(key));
    });

    if (counter) counter.textContent = `${selected.length} de 4 etapas`;
    if (runButton)
      runButton.disabled = !state.pipeline.verified || pipelineRunning;
    if (bugBattle) bugBattle.hidden = !state.pipeline.simulationComplete;
  }

  function addPipelineStep(key) {
    ensurePipelineState();
    if (
      !pipelineMeta[key] ||
      state.pipeline.selected.includes(key) ||
      state.pipeline.selected.length >= 4 ||
      pipelineRunning
    )
      return;
    state.pipeline.selected.push(key);
    state.pipeline.verified = false;
    state.pipeline.simulationComplete = false;
    state.stages.pipeline = false;
    state.stages.bug = false;
    saveState();
    renderPipeline();
    const feedback = $("pipelineFeedback");
    if (feedback) {
      feedback.className = "inline-feedback info";
      feedback.textContent =
        state.pipeline.selected.length < 4
          ? "Continue escolhendo as etapas até completar o fluxo."
          : "As quatro etapas foram escolhidas. Agora verifique a sequência.";
    }
  }

  function undoPipeline() {
    ensurePipelineState();
    if (!state.pipeline.selected.length || pipelineRunning) return;
    state.pipeline.selected.pop();
    state.pipeline.verified = false;
    state.pipeline.simulationComplete = false;
    state.stages.pipeline = false;
    state.stages.bug = false;
    saveState();
    resetPipelineVisualState();
    renderPipeline();
    const feedback = $("pipelineFeedback");
    if (feedback) {
      feedback.className = "inline-feedback info";
      feedback.textContent =
        "Última etapa removida. Continue a montagem do pipeline.";
    }
  }

  function restartPipeline() {
    if (pipelineRunning) return;
    ensurePipelineState();
    state.pipeline = {
      selected: [],
      verified: false,
      simulationComplete: false,
    };
    state.stages.pipeline = false;
    state.stages.bug = false;
    saveState();
    resetPipelineVisualState();
    renderPipeline();
    const explanation = $("pipelineExplanation");
    if (explanation) explanation.hidden = true;
    const feedback = $("pipelineFeedback");
    if (feedback) {
      feedback.className = "inline-feedback info";
      feedback.textContent = "Pipeline reiniciado. Escolha a primeira etapa.";
    }
  }

  function resetPipelineVisualState() {
    document
      .querySelectorAll("#pipelineSlots .pipeline-slot")
      .forEach((slot) => {
        slot.classList.remove("processing", "success", "error", "warning");
        const status = slot.querySelector(".pipeline-step-status");
        const key = slot.dataset.pipelineStep;
        if (status && key && pipelineMeta[key])
          status.textContent = pipelineMeta[key].description;
        const icon = slot.querySelector("em");
        if (icon) icon.textContent = "○";
      });
  }

  function checkPipeline() {
    ensurePipelineState();
    const feedback = $("pipelineFeedback");
    if (state.pipeline.selected.length < 4) {
      if (feedback) {
        feedback.className = "inline-feedback bad";
        feedback.textContent = `✕ Ainda faltam ${4 - state.pipeline.selected.length} etapa(s). Complete o fluxo antes de verificar.`;
      }
      return;
    }

    const ok = state.pipeline.selected.every(
      (key, index) => key === correctPipeline[index],
    );
    state.pipeline.verified = ok;
    state.pipeline.simulationComplete = false;
    state.stages.bug = false;

    if (ok) {
      completeStage(
        "pipeline",
        "✓ Etapa 3 concluída — pipeline organizado corretamente",
      );
      if (feedback) {
        feedback.className = "inline-feedback good";
        feedback.textContent =
          "✓ Pipeline organizado corretamente: Commit / Push → Build → Teste → Resultado / Alerta. Agora execute a simulação.";
      }
    } else {
      state.stages.pipeline = false;
      saveState();
      if (feedback) {
        feedback.className = "inline-feedback bad";
        feedback.textContent =
          "✕ A sequência ainda não está correta. Dica: o que precisa acontecer primeiro para uma alteração iniciar o pipeline?";
      }
    }
    renderPipeline();
  }

  function initPipeline() {
    ensurePipelineState();
    renderPipeline();
    $("pipelineChoices")
      ?.querySelectorAll("[data-pipeline-choice]")
      .forEach((button) => {
        button.addEventListener("click", () =>
          addPipelineStep(button.dataset.pipelineChoice),
        );
      });
    $("undoPipeline")?.addEventListener("click", undoPipeline);
    $("resetPipeline")?.addEventListener("click", restartPipeline);
    $("checkPipeline")?.addEventListener("click", checkPipeline);
    $("runPipeline")?.addEventListener("click", runPipelineAnimation);
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function setPipelineStepState(key, className, statusText, icon) {
    const slot = document.querySelector(
      `#pipelineSlots .pipeline-slot[data-pipeline-step="${key}"]`,
    );
    if (!slot) return;
    slot.classList.remove("processing", "success", "error", "warning");
    if (className) slot.classList.add(className);
    const status = slot.querySelector(".pipeline-step-status");
    if (status) status.textContent = statusText;
    const marker = slot.querySelector("em");
    if (marker) marker.textContent = icon;
  }

  async function runPipelineAnimation() {
    ensurePipelineState();
    if (pipelineRunning || !state.pipeline.verified) return;
    pipelineRunning = true;
    const runButton = $("runPipeline");
    const feedback = $("pipelineFeedback");
    const explanation = $("pipelineExplanation");
    if (runButton) {
      runButton.disabled = true;
      runButton.setAttribute("aria-busy", "true");
    }
    if (explanation) explanation.hidden = true;
    renderPipeline();
    resetPipelineVisualState();

    try {
      await setPipelineStepState("commit", "processing", "PROCESSANDO...", "…");
      await sleep(650);
      await setPipelineStepState(
        "commit",
        "success",
        "✓ Alteração enviada",
        "✓",
      );

      await setPipelineStepState("build", "processing", "PROCESSANDO...", "…");
      await sleep(650);
      await setPipelineStepState("build", "success", "✓ Build concluído", "✓");

      await setPipelineStepState("test", "processing", "PROCESSANDO...", "…");
      await sleep(700);
      await setPipelineStepState(
        "test",
        "error",
        "✕ Falhou: esperado 4, obtido 5",
        "✕",
      );

      await setPipelineStepState(
        "result",
        "warning",
        "⚠ Alerta enviado — fluxo interrompido",
        "⚠",
      );
      if (feedback) {
        feedback.className = "inline-feedback bad";
        feedback.textContent =
          "✕ Teste falhou: esperado 4, obtido 5. O deploy foi interrompido e a equipe recebeu um alerta.";
      }
      state.pipeline.simulationComplete = true;
      saveState();
      if (explanation) explanation.hidden = false;
      renderPipeline();
      document
        .querySelector("#bugBattle")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      pipelineRunning = false;
      if (runButton) {
        runButton.removeAttribute("aria-busy");
        runButton.disabled = !state.pipeline.verified;
      }
      renderPipeline();
    }
  }

  function bindResponse(id, key) {
    const el = $(id);
    if (!el) return;
    el.value = state.responses[key] || "";
    el.addEventListener("input", (e) => {
      state.responses[key] = e.target.value;
      saveState();
    });
  }
  function initBugBattle() {
    bindResponse("deployJustification", "deployJustification");
    const challenge = $("bugBattle");
    if (challenge) challenge.hidden = !state.pipeline?.simulationComplete;
    document.querySelectorAll("[data-bug-answer]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const ok = btn.dataset.bugAnswer === "stop";
        const f = $("bugFeedback");
        if (!f) return;
        f.className = `inline-feedback ${ok ? "good" : "bad"}`;
        f.textContent = ok
          ? "✓ Correto. Como um teste crítico falhou, o pipeline deve interromper o deploy antes que o defeito chegue ao usuário."
          : "✕ Decisão incorreta. O teste já comprovou um defeito conhecido; continuar o deploy aumenta o risco para o usuário.";
        if (ok)
          completeStage(
            "bug",
            "✓ Etapa 4 concluída — decisão de deploy correta",
          );
      }),
    );
  }

  function timeToMin(t) {
    if (!/^\d{2}:\d{2}$/.test(t)) return null;
    const [h, m] = t.split(":").map(Number);
    if (
      !Number.isInteger(h) ||
      !Number.isInteger(m) ||
      h < 0 ||
      h > 23 ||
      m < 0 ||
      m > 59
    )
      return null;
    return h * 60 + m;
  }
  function formatMinutes(d) {
    const h = Math.floor(d / 60),
      m = d % 60;
    return h ? `${h}h${m ? ` ${m}min` : ""}` : `${m}min`;
  }
  function stopAnimatedNumber(el) {
    if (el?._animationFrame) {
      cancelAnimationFrame(el._animationFrame);
      el._animationFrame = null;
    }
  }
  function animateNumber(el, start, end, duration, fmt) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = fmt(end);
      return;
    }
    stopAnimatedNumber(el);
    const t0 = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - t0) / duration),
        v = start + (end - start) * (1 - Math.pow(1 - p, 3));
      el.textContent = fmt(v);
      if (p < 1) el._animationFrame = requestAnimationFrame(tick);
      else el._animationFrame = null;
    }
    el._animationFrame = requestAnimationFrame(tick);
  }
  function initDora() {
    $("calcCfr").addEventListener("click", () => {
      const totalRaw = $("deployTotal").value.trim(),
        failRaw = $("deployFailures").value.trim(),
        total = Number(totalRaw),
        fail = Number(failRaw);
      if (
        !totalRaw ||
        !failRaw ||
        !Number.isFinite(total) ||
        !Number.isFinite(fail) ||
        total <= 0 ||
        fail < 0 ||
        fail > total
      ) {
        stopAnimatedNumber($("cfrResult"));
        $("cfrResult").textContent = "Dados inválidos";
        return;
      }
      const pct = (fail / total) * 100;
      animateNumber(
        $("cfrResult"),
        0,
        pct,
        650,
        (v) => `${v.toFixed(1).replace(".0", "")}%`,
      );
      state.calculations.cfr = `${pct.toFixed(1).replace(".0", "")}%`;
      saveState();
      toast(
        `Isso significa que ${fail} de ${total} deploys apresentaram falha.`,
      );
    });
    $("calcMttr").addEventListener("click", () => {
      const a = timeToMin($("failureTime").value),
        b = timeToMin($("recoveryTime").value);
      if (a == null || b == null) {
        $("mttrResult").textContent = "Dados inválidos";
        return;
      }
      let d = b - a;
      if (d < 0) d += 1440;
      const text = formatMinutes(d);
      $("mttrResult").textContent = text;
      state.calculations.mttr = text;
      saveState();
    });
    bindResponse("doraDiagnosis", "doraDiagnosis");
    bindResponse("doraRecommendation", "doraRecommendation");
    $("completeDora").addEventListener("click", () => {
      const f = $("doraFeedback");
      if (
        state.responses.doraDiagnosis.trim().length < 15 ||
        state.responses.doraRecommendation.trim().length < 15
      ) {
        f.className = "inline-feedback bad";
        f.textContent =
          "Escreva uma análise e uma recomendação um pouco mais desenvolvidas.";
        return;
      }
      f.className = "inline-feedback good";
      f.textContent =
        "✓ Diagnóstico registrado. Você usou dados para apoiar uma decisão de melhoria.";
      completeStage("dora", "✓ Etapa 5 concluída");
    });
  }

  function renderQuiz(containerId, key) {
    const data = quizData[key],
      root = $(containerId),
      saved = state.quizAnswers[key] || {};
    root.innerHTML = `<div class="quiz-head"><h3>${data.title}</h3><span class="quiz-score">${state.quizScores[key] != null ? `Último resultado: ${state.quizScores[key]}/${data.questions.length}` : ""}</span></div><div class="quiz-body">${data.questions.map((q, qi) => `<div class="question" data-q="${qi}"><h4>${qi + 1}. ${escapeHtml(q.q)}</h4><div class="options">${q.options.map((opt, oi) => `<label class="option"><input type="radio" name="${key}-${qi}" value="${oi}" ${String(saved[qi]) === String(oi) ? "checked" : ""}> <span>${escapeHtml(opt)}</span></label>`).join("")}</div><div class="explanation" hidden></div></div>`).join("")}</div><div class="quiz-actions"><button class="btn primary correct-quiz" type="button">Corrigir quiz</button><button class="btn secondary retry-quiz" type="button">Refazer quiz</button></div>`;
    root.querySelectorAll("input").forEach((inp) =>
      inp.addEventListener("change", () => {
        state.quizAnswers[key] = state.quizAnswers[key] || {};
        state.quizAnswers[key][inp.closest(".question").dataset.q] = Number(
          inp.value,
        );
        saveState();
      }),
    );
    root
      .querySelector(".correct-quiz")
      .addEventListener("click", () => correctQuiz(root, key));
    root.querySelector(".retry-quiz").addEventListener("click", () => {
      state.quizAnswers[key] = {};
      state.quizScores[key] = null;
      saveState();
      renderQuiz(containerId, key);
    });
  }
  function correctQuiz(root, key) {
    const data = quizData[key];
    let score = 0;
    data.questions.forEach((q, qi) => {
      const box = root.querySelector(`.question[data-q="${qi}"]`),
        selected = box.querySelector("input:checked");
      box
        .querySelectorAll(".option")
        .forEach((o) => o.classList.remove("correct", "wrong"));
      const exp = box.querySelector(".explanation");
      exp.hidden = false;
      exp.textContent = q.exp;
      if (!selected) {
        exp.textContent = "Sem resposta. " + q.exp;
        return;
      }
      const val = Number(selected.value);
      if (val === q.answer) {
        score++;
        selected.closest(".option").classList.add("correct");
      } else {
        selected.closest(".option").classList.add("wrong");
        box
          .querySelector(`input[value="${q.answer}"]`)
          .closest(".option")
          .classList.add("correct");
      }
    });
    state.quizScores[key] = score;
    root.querySelector(".quiz-score").textContent =
      `Resultado: ${score}/${data.questions.length}`;
    saveState();
    if (score >= Math.ceil(data.questions.length * 0.6))
      toast(key === "final" ? "✓ Revisão final concluída" : "✓ Quiz concluído");
    else toast("Revise as explicações e tente novamente.");
  }

  function initCheckpoints() {
    document.querySelectorAll(".checkpoint-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const k = btn.dataset.complete;
        if (k === "calms") {
          state.stages.problem = true;
          state.stages.calms = true;
          saveState();
          toast("✓ Aula 1 concluída");
          return;
        }
        if (k === "pipeline" && !state.pipeline?.verified) {
          toast("Monte e verifique o pipeline antes de concluir esta etapa.");
          $("pipelineLab")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          return;
        }
        completeStage(k, "✓ Etapa concluída");
      }),
    );
  }
  function initFinalMission() {
    const fields = [
      ["finalProblems", "finalProblems"],
      ["finalCalms", "finalCalms"],
      ["finalPipeline", "finalPipeline"],
      ["finalMetrics", "finalMetrics"],
      ["finalJustification", "finalJustification"],
    ];
    fields.forEach(([id, key]) => bindResponse(id, key));
    $("completeFinalMission").addEventListener("click", () => {
      const ok = fields.every(([, k]) => state.responses[k].trim().length >= 8),
        f = $("finalMissionFeedback");
      if (!ok) {
        f.className = "inline-feedback bad";
        f.textContent =
          "Preencha todos os campos com uma resposta minimamente desenvolvida.";
        return;
      }
      f.className = "inline-feedback good";
      f.textContent =
        "✓ Desafio final concluído. Sua análise conecta cultura, automação, feedback e medição.";
      completeStage("final", "✓ Semana 21 concluída");
    });
  }

  function scoreText(k) {
    return state.quizScores[k] == null
      ? "Não realizado"
      : `${state.quizScores[k]}/${quizData[k].questions.length}`;
  }
  function stageSummary() {
    return STAGES.map(([k, n]) => `${state.stages[k] ? "✓" : "○"} ${n}`).join(
      "\n",
    );
  }
  function reportData() {
    return {
      name: state.identity.name || "—",
      className: state.identity.className || "—",
      number: state.identity.number || "—",
      date: state.identity.date || "—",
      stages: stageSummary(),
      progress: `${stageCount()}/${STAGES.length} etapas`,
      quiz1: scoreText("lesson1"),
      quiz2: scoreText("lesson2"),
      quiz3: scoreText("lesson3"),
      quizFinal: scoreText("final"),
      deploy: state.responses.deployJustification || "Não respondido",
      dora: `CFR calculado: ${state.calculations.cfr || "—"}; Recuperação calculada: ${state.calculations.mttr || "—"}.
Diagnóstico: ${state.responses.doraDiagnosis || "Não respondido"}
Recomendação: ${state.responses.doraRecommendation || "Não respondido"}`,
      final: `Problemas: ${state.responses.finalProblems || "Não respondido"}
CALMS: ${state.responses.finalCalms || "Não respondido"}
Pipeline: ${state.responses.finalPipeline || "Não respondido"}
Métricas: ${state.responses.finalMetrics || "Não respondido"}
Justificativa: ${state.responses.finalJustification || "Não respondido"}`,
    };
  }
  function buildReportHtml() {
    const r = reportData();
    return `<h1>Relatório — Semana 21</h1><p><strong>Disciplina:</strong> Processos de Desenvolvimento de Software e Metodologias Ágeis</p><p><strong>Nome:</strong> ${escapeHtml(r.name)} · <strong>Turma:</strong> ${escapeHtml(r.className)} · <strong>Nº:</strong> ${escapeHtml(r.number)} · <strong>Data:</strong> ${escapeHtml(r.date)}</p><h2>Etapas concluídas</h2><pre>${escapeHtml(r.stages)}</pre><p><strong>Progresso:</strong> ${escapeHtml(r.progress)}</p><h2>Quizzes</h2><p>Aula 1: ${r.quiz1}<br>Aula 2: ${r.quiz2}<br>Aula 3: ${r.quiz3}<br>Quiz final: ${r.quizFinal}</p><h2>Decisão de deploy</h2><pre>${escapeHtml(r.deploy)}</pre><h2>Diagnóstico DORA</h2><pre>${escapeHtml(r.dora)}</pre><h2>Desafio final</h2><pre>${escapeHtml(r.final)}</pre><h2>Síntese</h2><p>Problema entre equipes → cultura DevOps e CALMS → pipeline de feedback → build/test/monitoramento → fail fast → métricas DORA → decisão baseada em dados → melhoria contínua.</p>`;
  }
  function validateDelivery() {
    const missing = [];
    if (!state.identity.name.trim()) missing.push("nome");
    if (!state.identity.className.trim()) missing.push("turma");
    const box = $("deliveryValidation");
    if (!box) return;
    if (missing.length) {
      box.textContent = `Antes de gerar o relatório, preencha: ${missing.join(" e ")}.`;
      box.className = "message-box";
    } else {
      box.textContent =
        "✓ Identificação mínima preenchida. Você já pode gerar o relatório.";
      box.className = "inline-feedback good";
    }
  }
  function refreshReport() {
    const html = buildReportHtml();
    $("reportPreview").innerHTML = html;
    $("printReportContent").innerHTML = html;
  }
  function initReport() {
    $("previewReport").addEventListener("click", refreshReport);
    $("printReport").addEventListener("click", () => {
      refreshReport();
      window.print();
    });
    $("generatePdf").addEventListener("click", () => {
      if (!state.identity.name.trim() || !state.identity.className.trim()) {
        validateDelivery();
        toast("Preencha nome e turma.");
        return;
      }
      const r = reportData();
      if (window.jspdf?.jsPDF) {
        const { jsPDF } = window.jspdf,
          doc = new jsPDF({ unit: "mm", format: "a4" });
        const margin = 15,
          max = 180;
        let y = 16;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Relatório — Semana 21", margin, y);
        y += 9;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const sections = [
          `Disciplina: Processos de Desenvolvimento de Software e Metodologias Ágeis
Nome: ${r.name} | Turma: ${r.className} | Nº: ${r.number} | Data: ${r.date}`,
          `Etapas concluídas (${r.progress})
${r.stages}`,
          `Quizzes
Aula 1: ${r.quiz1}
Aula 2: ${r.quiz2}
Aula 3: ${r.quiz3}
Quiz final: ${r.quizFinal}`,
          `Decisão de deploy
${r.deploy}`,
          `Diagnóstico DORA
${r.dora}`,
          `Desafio final
${r.final}`,
          `Síntese
Problema → DevOps/CALMS → pipeline → feedback → DORA → decisão → melhoria contínua.`,
        ];
        for (const s of sections) {
          const lines = doc.splitTextToSize(s, max);
          if (y + lines.length * 5 > 280) {
            doc.addPage();
            y = 16;
          }
          doc.text(lines, margin, y);
          y += lines.length * 5 + 5;
        }
        doc.save("relatorio_semana21_processos.pdf");
        toast("PDF gerado.");
      } else {
        refreshReport();
        toast("jsPDF indisponível. Abrindo modo de impressão.");
        setTimeout(() => window.print(), 300);
      }
    });
    refreshReport();
  }

  function initReset() {
    $("resetProgress").addEventListener("click", () => {
      if (confirm("Deseja apagar todo o progresso salvo neste navegador?")) {
        storageRemove(STORAGE_KEY);
        storageRemove(LEGACY_KEY);
        storageRemove("processosSemana21StateV1");
        location.reload();
      }
    });
  }
  function restoreComputed() {
    if (state.calculations.cfr)
      $("cfrResult").textContent = state.calculations.cfr;
    if (state.calculations.mttr)
      $("mttrResult").textContent = state.calculations.mttr;
  }

  function init() {
    initTheme();
    initNav();
    initIdentity();
    initReveal();
    initWall();
    initCalms();
    initPipeline();
    initBugBattle();
    initDora();
    renderQuiz("quiz1", "lesson1");
    renderQuiz("quiz2", "lesson2");
    renderQuiz("quiz3", "lesson3");
    renderQuiz("quizFinal", "final");
    initCheckpoints();
    initFinalMission();
    initReport();
    initReset();
    restoreComputed();
    updateProgress();
    validateDelivery();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
