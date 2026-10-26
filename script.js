(() => {
  const D = window.URNA, $ = s => document.querySelector(s);
  const tela = $("#tela"), tec = $("#teclado"), ov = $("#overlay");
  const BR = { 1:"⠁",2:"⠃",3:"⠉",4:"⠙",5:"⠑",6:"⠋",7:"⠛",8:"⠓",9:"⠊",0:"⠚" };
  let st, ctx;
  const reset = () => { st = { mode: "intro", num: "", cand: null, msg: "", cats: new Set() }; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

  function som(f, d) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.07, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
      o.start(); o.stop(ctx.currentTime + d);
    } catch (e) {}
  }
  const avatar = c => c.foto ? `<img src="${esc(c.foto)}" alt="Foto de ${esc(c.nome)}">` : `<svg viewBox="0 0 100 120" role="img" aria-label="Avatar de ${esc(c.nome)}"><rect width="100" height="120" fill="${c.cor}"/><circle cx="50" cy="46" r="20" fill="#fff" opacity=".92"/><path d="M12 120c0-28 16-42 38-42s38 14 38 42z" fill="#fff" opacity=".92"/></svg>`;

  function render() {
    const rod = (v, l) => `<div class="rodape">Aperte a tecla:<br>VERDE para ${v}<br>LARANJA para ${l}</div>`;
    let h = "";
    if (st.mode === "intro") {
      h = `<h1>ELEIÇÕES ${D.data}</h1><div class="aviso">Hoje tem eleição.<br>Só você vota.</div>
           <div class="rodape">Brincadeira privada, não é um sistema oficial.<br>Aperte VERDE para iniciar.</div>`;
    } else if (st.mode === "lista") {
      h = `<h1>CANDIDATOS</h1><div class="cargo">${esc(D.cargo)}</div>
           <div class="cands">${D.candidatos.map(c => `<div class="cand">${avatar(c)}<b>${esc(c.num)}</b><span>${esc(c.nome)}</span></div>`).join("")}</div>
           <div class="rodape">Aperte VERDE para continuar e digitar o número.</div>`;
    } else if (st.mode === "msg") {
      h = `<h1>${esc(D.cargo.toUpperCase())}</h1><div class="aviso">${esc(st.msg)}</div><div class="rodape">Aperte VERDE para voltar à urna.</div>`;
    } else if (st.mode === "branco") {
      h = `<h1>SEU VOTO PARA</h1><div class="cargo">${esc(D.cargo)}</div><div class="aviso">VOTO EM BRANCO</div>${rod("CONFIRMAR este voto", "REINICIAR este voto")}`;
    } else {
      const c = st.cand, n = st.num.padEnd(2, " ").split("");
      const boxes = n.map(d => `<span class="box">${d.trim()}</span>`).join("");
      let meio = "", rd = `<div class="rodape">Digite o número do candidato.</div>`;
      if (c) {
        meio = `<div class="row"><div class="info"><div>Nome:<br><b>${esc(c.nome)}</b></div><div>Partido:<br><b>${esc(c.sigla)} · ${esc(c.partido)}</b></div>
                <button class="ver" data-act="plano">Ver proposta</button></div><div class="foto">${avatar(c)}<div>${esc(c.nome.split(" ")[0])}</div></div></div>`;
        rd = rod("CONFIRMAR este voto", "REINICIAR este voto");
      } else if (st.num.length === 2) {
        meio = `<div class="aviso">NÚMERO ERRADO<br>CANDIDATO INEXISTENTE<br>VOTO NULO</div>`;
        rd = rod("CONFIRMAR este voto", "REINICIAR este voto");
      }
      h = `<h1>SEU VOTO PARA</h1><div class="cargo">${esc(D.cargo)}</div><div class="num">Número:${boxes}</div>${meio}${rd}`;
    }
    tela.innerHTML = `<div class="lcd">${h}</div>`;
  }

  function press(k) {
    if (!ov.hidden) return;
    som(900, 0.05);
    if (/^\d$/.test(k)) {
      if (st.mode === "voting" && st.num.length < 2) {
        st.num += k;
        if (st.num.length === 2) st.cand = D.candidatos.find(c => c.num === st.num) || null;
      }
    } else if (k === "corrige") {
      if (st.mode !== "intro" && st.mode !== "msg" && st.mode !== "lista") { st.mode = "voting"; st.num = ""; st.cand = null; }
    } else if (k === "branco") {
      if (st.mode === "voting" && !st.num) st.mode = "branco";
    } else if (k === "confirma") {
      if (st.mode === "intro") st.mode = "lista";
      else if (st.mode === "lista") st.mode = "voting";
      else if (st.mode === "msg") { st.mode = "voting"; st.num = ""; st.cand = null; }
      else if (st.mode === "branco") { som(700, 0.2); st.mode = "msg"; st.msg = "Voto em branco registrado. Dá para votar de novo quando quiser."; }
      else if (st.mode === "voting" && st.cand) {
        som(700, 0.2);
        if (st.cand.num === "08") { som(500, 0.9); return posse(); }
        st.msg = st.cand.msg; st.mode = "msg";
      } else if (st.mode === "voting" && st.num.length === 2) {
        som(700, 0.2); st.mode = "msg"; st.msg = "Voto nulo registrado. Dá para votar de novo quando quiser.";
      }
    }
    render();
  }

  function lista(itens) { return `<ul>${itens.map(i => `<li><b>${esc(i[0])}</b>${esc(i[1])}</li>`).join("")}</ul>`; }
  function plano() {
    const c = st.cand, p = D.planos[c.num];
    const corpo = c.num === "08"
      ? p.map((g, i) => `<details data-i="${i}"><summary>${esc(g.cat)}</summary>${lista(g.itens)}</details>`).join("")
      : lista(p);
    abrir(`<h2>${esc(c.nome)}</h2><p class="sub">${esc(c.partido)}${c.slogan ? " · “" + esc(c.slogan) + "”" : ""}</p>${corpo}
      <button class="btn" data-act="fechar">Voltar à urna</button>`);
    ov.querySelectorAll("details").forEach(d => d.addEventListener("toggle", () => { if (d.open) st.cats.add(+d.dataset.i); }));
  }

  // Decretos fixos: busca as propostas do 08 pelo título (assim o texto vem do proposals.js).
  // Para trocar, mude os títulos aqui ou crie  decretos: [...]  no proposals.js.
  function decretos() {
    const titulos = D.decretos || ["Palavra dada", "O elogio na hora", "Gol do Vasco"];
    const todos = D.planos["08"].flatMap(g => g.itens);
    return titulos.map(t => todos.find(i => i[0] === t)).filter(Boolean);
  }
  function posse() {
    const dec = decretos(), passos = [
      `<h2>Posse</h2><div class="faixa"></div><p class="sub">Eu, Harlley, ${esc(D.cargo)}, prometo cumprir o que está escrito aqui Pérola Marinho.</p>`,
      `<h2>Primeiros decretos</h2><p class="sub">Assinados no primeiro dia de mandato.</p>${lista(dec)}`,
      `<h2>Gaveta secreta</h2><p class="sub">Só abre para quem votou no 08.</p>${lista(D.secretas)}`,
      `<div class="dip"><h2>Diploma de eleitora oficial do 08</h2><p>${esc(D.data)}</p><p>${esc(D.final)}</p></div>`
    ];
    let i = 0;
    const mostra = () => {
      abrir(passos[i] + (i < passos.length - 1
        ? `<button class="btn" data-act="prox">Próximo</button>`
        : `<button class="btn" data-act="reiniciar">Reiniciar a urna</button>`) +
        `<button class="btn sec" data-act="voltar">Voltar à urna</button>`);
    };
    ov.onclick = e => { const a = e.target.dataset && e.target.dataset.act; if (a === "prox") { i++; mostra(); } else acao(a); };
    mostra();
  }
  function abrir(html) { ov.innerHTML = `<div class="painel">${html}</div>`; ov.hidden = false; const b = ov.querySelector("button"); if (b) b.focus(); }
  function acao(a) {
    if (a === "fechar") { ov.hidden = true; render(); }
    if (a === "voltar") { ov.hidden = true; st.mode = "voting"; st.num = ""; st.cand = null; render(); }
    if (a === "reiniciar") { ov.hidden = true; reset(); render(); }
  }
  ov.onclick = e => acao(e.target.dataset && e.target.dataset.act);
  tela.addEventListener("click", e => { if (e.target.dataset.act === "plano") plano(); });

  // Teclado físico da urna: 1-2-3 / 4-5-6 / 7-8-9 / 0
  [..."123456789", "0"].forEach(d => {
    const b = document.createElement("button");
    b.className = "key" + (d === "0" ? " z" : "") + (d === "5" ? " pt" : "");
    b.innerHTML = `${d}<span class="br" aria-hidden="true">${BR[d]}</span>`; b.setAttribute("aria-label", "Tecla " + d);
    b.onclick = () => press(d); tec.appendChild(b);
  });
  [["branco", "BRANCO", "⠃⠗⠁⠝⠉⠕"], ["corrige", "CORRIGE", "⠉⠕⠗⠗⠊⠛⠑"], ["confirma", "CONFIRMA", "⠉⠕⠝⠋⠊⠗⠍⠁"]].forEach(([k, t, br]) => {
    const b = document.createElement("button");
    b.className = "key acao " + k; b.innerHTML = `${t}<span class="br" aria-hidden="true">${br}</span>`;
    b.onclick = () => press(k); tec.appendChild(b);
  });
  const brk = { Backspace: "corrige", Delete: "corrige", Enter: "confirma", b: "branco", B: "branco" };
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !ov.hidden) return acao(ov.querySelector("[data-act=voltar]") ? "voltar" : "fechar");
    if (!ov.hidden) return;
    const k = /^\d$/.test(e.key) ? e.key : brk[e.key];
    if (!k) return;
    e.preventDefault();
    const idx = /^\d$/.test(k) ? [..."1234567890"].indexOf(k) : 10 + ["branco","corrige","confirma"].indexOf(k);
    const el = tec.children[idx]; if (el) { el.classList.add("p"); setTimeout(() => el.classList.remove("p"), 110); }
    press(k);
  });
  reset(); render();
})();