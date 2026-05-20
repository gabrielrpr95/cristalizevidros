/* ============================================
   CRISTALIZE - Script principal
   ============================================ */

// ⚠️ EDITE AQUI quando tiver o WhatsApp:
// Ex: "5512999998888" (formato: 55 + DDD + número, só dígitos)
const WHATSAPP_NUMBER = ""; // deixe vazio para usar Instagram como fallback
const INSTAGRAM_URL = "https://instagram.com/cristalizeilhabela";

// ------- Ano dinâmico no footer -------
document.getElementById("year").textContent = new Date().getFullYear();

// ------- Menu mobile -------
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// fecha o menu ao clicar em um link
navList.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navList.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ------- Sombra do header ao rolar -------
const header = document.getElementById("header");
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ------- Reveal on scroll -------
const revealTargets = document.querySelectorAll(
  ".section-head, .service-card, .about-text, .about-visual, .diff-item, .contact-info, .contact-form"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => observer.observe(el));

// ------- Formulário de orçamento -------
const form = document.getElementById("orcamentoForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const telefone = form.telefone.value.trim();
  const servico = form.servico.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !telefone || !servico) {
    alert("Por favor, preencha nome, telefone e tipo de serviço.");
    return;
  }

  const texto =
    `*Novo orçamento - Cristalize*\n\n` +
    `*Nome:* ${nome}\n` +
    `*Telefone:* ${telefone}\n` +
    `*Serviço:* ${servico}\n` +
    (mensagem ? `*Descrição:* ${mensagem}\n` : "") +
    `\nGostaria de receber um orçamento. Obrigado!`;

  if (WHATSAPP_NUMBER) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  } else {
    // fallback: copia mensagem e abre Instagram
    if (navigator.clipboard) {
      navigator.clipboard.writeText(texto).then(() => {
        alert(
          "WhatsApp ainda não configurado.\n\n" +
          "Sua mensagem foi copiada — cole no nosso Direct do Instagram!"
        );
        window.open(INSTAGRAM_URL, "_blank");
      }).catch(() => {
        alert("Entre em contato pelo nosso Instagram @cristalizeilhabela");
        window.open(INSTAGRAM_URL, "_blank");
      });
    } else {
      alert("Entre em contato pelo nosso Instagram @cristalizeilhabela");
      window.open(INSTAGRAM_URL, "_blank");
    }
  }
});

// ------- Máscara simples para telefone -------
const tel = document.getElementById("telefone");
tel.addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (v.length > 6) {
    v = v.replace(/(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (v.length > 2) {
    v = v.replace(/(\d{2})(\d{0,5}).*/, "($1) $2");
  } else if (v.length > 0) {
    v = v.replace(/(\d{0,2})/, "($1");
  }
  e.target.value = v;
});
