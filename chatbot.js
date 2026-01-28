/* ========================
   CHATBOT FUNCTIONALITY
======================== */

// Datos del chatbot
const chatbotData = {
    horarios: {
        titulo: "Horario de Atención",
        contenido: "📅 <strong>Lunes a Viernes:</strong> 7:00 AM - 4:00 PM\n📅 <strong>Sábado:</strong> 7:00 AM - 12:00 PM\n📅 <strong>Domingo:</strong> Cerrado"
    },
    sucursales: {
        titulo: "Sucursales",
        contenido: "🏪 <strong>Agua Buena:</strong> Carretera Principal Km 2.5\n📞 Teléfono: 995-0029\n\n🏪 <strong>Los Santos:</strong> Centro Comercial El Progreso\n📞 Teléfono: 966-8960"
    },
    contacto: {
        titulo: "Información de Contacto",
        contenido: "📞 <strong>Oficina Agua Buena:</strong> 995-0029\n📞 <strong>Oficina Los Santos:</strong> 966-8960\n\n💬 <strong>WhatsApp:</strong> +507 6564-7668\n📧 <strong>E-mail:</strong> coopelprogreso19@yahoo.es\n📱 <strong>Instagram:</strong> @coop.elprogreso\n👍 <strong>Facebook:</strong> Cooperativa El Progreso"
    }
};

// Estado del chatbot
let chatbotActive = false;

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initChatbot);

function initChatbot() {
    // Crear estructura del chatbot
    const chatbotHTML = `
        <!-- Chatbot Widget -->
        <div id="chatbot-widget" class="chatbot-widget">
            <!-- Botón flotante -->
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Abrir chat">
                <i class="fas fa-comments"></i>
                <span class="chatbot-badge">1</span>
            </button>

            <!-- Ventana del chat -->
            <div id="chatbot-window" class="chatbot-window">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <i class="fas fa-robot"></i>
                        Asistente El Progreso
                    </div>
                    <button id="chatbot-close" class="chatbot-close" aria-label="Cerrar chat">
                        ✕
                    </button>
                </div>

                <!-- Mensajes -->
                <div id="chatbot-messages" class="chatbot-messages">
                    <div class="chatbot-message bot-message">
                        <p>¡Hola! 👋 Bienvenido a la Cooperativa El Progreso. ¿En qué podemos ayudarte?</p>
                    </div>
                </div>

                <!-- Opciones -->
                <div id="chatbot-options" class="chatbot-options">
                    <button class="chatbot-option-btn" onclick="showOption('horarios')">
                        <i class="fas fa-clock"></i>
                        Horario de Atención
                    </button>
                    <button class="chatbot-option-btn" onclick="showOption('sucursales')">
                        <i class="fas fa-map-marker-alt"></i>
                        Sucursales
                    </button>
                    <button class="chatbot-option-btn" onclick="showOption('contacto')">
                        <i class="fas fa-phone"></i>
                        Contacto
                    </button>
                </div>
            </div>
        </div>
    `;

    // Insertar chatbot al final del body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Obtener elementos
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatbotWindow = document.getElementById('chatbot-window');

    // Event listeners
    toggleBtn.addEventListener('click', toggleChatbot);
    closeBtn.addEventListener('click', closeChatbot);

    // Cerrar chatbot al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!document.getElementById('chatbot-widget').contains(e.target)) {
            if (chatbotActive) {
                closeChatbot();
            }
        }
    });
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotActive = !chatbotActive;
    
    if (chatbotActive) {
        chatbotWindow.classList.add('active');
        // Remover badge
        document.querySelector('.chatbot-badge').style.display = 'none';
    } else {
        chatbotWindow.classList.remove('active');
    }
}

function closeChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotActive = false;
    chatbotWindow.classList.remove('active');
    // Mostrar badge nuevamente
    document.querySelector('.chatbot-badge').style.display = 'flex';
}

function showOption(option) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const optionsContainer = document.getElementById('chatbot-options');
    const data = chatbotData[option];

    if (!data) return;

    // Agregar mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user-message';
    
    const messageText = document.createElement('p');
    messageText.textContent = {
        horarios: '📅 Horario de Atención',
        sucursales: '🏪 Sucursales',
        contacto: '📞 Contacto'
    }[option] || option;
    
    userMessage.appendChild(messageText);
    messagesContainer.appendChild(userMessage);

    // Agregar respuesta del bot después de un pequeño delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot-message';
        
        const messageTitle = document.createElement('h4');
        messageTitle.textContent = data.titulo;
        
        const messageContent = document.createElement('p');
        messageContent.innerHTML = data.contenido.replace(/\n/g, '<br>');
        
        botMessage.appendChild(messageTitle);
        botMessage.appendChild(messageContent);
        messagesContainer.appendChild(botMessage);

        // Scroll al último mensaje
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);

    // Scroll al último mensaje
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
