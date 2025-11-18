document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initModals()
  initFormHandlers()
  loadStores()
})

function initNavigation() {
  const menuToggle = document.getElementById("menuToggle")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")

  menuToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("show")
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show")
    })
  })

  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav") && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show")
    }
  })
}

function initModals() {
  const loginModal = document.getElementById("loginModal")
  const cadastroModal = document.getElementById("cadastroModal")
  const btnLogin = document.getElementById("btnLogin")
  const btnCadastro = document.getElementById("btnCadastro")
  const closeLogin = document.getElementById("closeLogin")
  const closeCadastro = document.getElementById("closeCadastro")
  const switchToCadastro = document.getElementById("switchToCadastro")
  const switchToLogin = document.getElementById("switchToLogin")
  const heroCta = document.getElementById("heroCta")
  const ctaButton = document.getElementById("ctaButton")

  btnLogin?.addEventListener("click", () => openModal(loginModal))
  btnCadastro?.addEventListener("click", () => openModal(cadastroModal))
  heroCta?.addEventListener("click", () => openModal(loginModal))
  ctaButton?.addEventListener("click", () => openModal(cadastroModal))

  closeLogin?.addEventListener("click", () => closeModal(loginModal))
  closeCadastro?.addEventListener("click", () => closeModal(cadastroModal))

  switchToCadastro?.addEventListener("click", (e) => {
    e.preventDefault()
    closeModal(loginModal)
    openModal(cadastroModal)
  })

  switchToLogin?.addEventListener("click", (e) => {
    e.preventDefault()
    closeModal(cadastroModal)
    openModal(loginModal)
  })

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) closeModal(loginModal)
    if (e.target === cadastroModal) closeModal(cadastroModal)
  })
}

function openModal(modal) {
  modal?.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeModal(modal) {
  modal?.classList.remove("show")
  document.body.style.overflow = "auto"
}

function initFormHandlers() {
  const loginForm = document.getElementById("loginForm")
  const cadastroForm = document.getElementById("cadastroForm")

  loginForm?.addEventListener("submit", handleLogin)
  cadastroForm?.addEventListener("submit", handleCadastro)
}

function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  if (!email || !password) {
    showNotification("Por favor, preencha todos os campos", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Email inválido", "error")
    return
  }

  showNotification("Login realizado com sucesso!", "success")
  setTimeout(() => {
    localStorage.setItem("user", JSON.stringify({ email }))
    document.getElementById("loginModal").classList.remove("show")
    document.getElementById("loginForm").reset()
  }, 1000)
}

function handleCadastro(e) {
  e.preventDefault()
  const nome = document.getElementById("cadastroNome").value
  const email = document.getElementById("cadastroEmail").value
  const password = document.getElementById("cadastroPassword").value
  const confirm = document.getElementById("cadastroConfirm").value

  if (!nome || !email || !password || !confirm) {
    showNotification("Por favor, preencha todos os campos", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Email inválido", "error")
    return
  }

  if (password !== confirm) {
    showNotification("As senhas não coincidem", "error")
    return
  }

  if (password.length < 6) {
    showNotification("A senha deve ter pelo menos 6 caracteres", "error")
    return
  }

  showNotification("Cadastro realizado com sucesso!", "success")
  setTimeout(() => {
    localStorage.setItem("user", JSON.stringify({ nome, email }))
    document.getElementById("cadastroModal").classList.remove("show")
    document.getElementById("cadastroForm").reset()
  }, 1000)
}

const stores = [
  {
    id: 1,
    name: "Padaria São Vicente",
    category: "Alimentação",
    emoji: "🥖",
    rating: 4.8,
    reviews: 342,
    delivery: true,
  },
  { id: 2, name: "Farmácia Popular", category: "Farmácia", emoji: "💊", rating: 4.6, reviews: 189, delivery: true },
  {
    id: 3,
    name: "Supermercado Local",
    category: "Supermercado",
    emoji: "🛒",
    rating: 4.7,
    reviews: 521,
    delivery: true,
  },
  {
    id: 4,
    name: "Loja de Roupas Moda",
    category: "Vestuário",
    emoji: "👕",
    rating: 4.5,
    reviews: 156,
    delivery: false,
  },
  { id: 5, name: "Mercado Fresco", category: "Hortifruti", emoji: "🥬", rating: 4.9, reviews: 278, delivery: true },
  { id: 6, name: "Livraria Conhecimento", category: "Livros", emoji: "📚", rating: 4.4, reviews: 95, delivery: true },
]

function loadStores() {
  const storesGrid = document.getElementById("storesGrid")
  if (!storesGrid) return

  storesGrid.innerHTML = stores
    .map(
      (store) => `
        <div class="store-card" onclick="handleStoreClick(${store.id})">
            <div class="store-image">${store.emoji}</div>
            <div class="store-info">
                <div style="margin-bottom: 0.5rem;">
                    <div class="store-name">${store.name}</div>
                    <div class="store-category">${store.category}</div>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <span style="background-color: ${store.delivery ? "#5BB8A1" : "#F6A45D"}; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                        ${store.delivery ? "Entrega" : "Retirada"}
                    </span>
                </div>
                <div class="store-rating">
                    <span class="star">★</span>
                    <span>${store.rating}</span>
                    <span style="color: #999; font-size: 0.85rem;">(${store.reviews})</span>
                </div>
                <button class="store-btn">Ver Loja</button>
            </div>
        </div>
    `,
    )
    .join("")
}

function handleStoreClick(storeId) {
  const store = stores.find((s) => s.id === storeId)
  if (store) {
    showNotification(`Abrindo ${store.name}...`, "info")
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background-color: ${type === "success" ? "#5BB8A1" : type === "error" ? "#F46C5B" : "#0C7884"};
        color: white;
        z-index: 2000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
