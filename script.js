// Função para alternar a exibição dos detalhes do nó
function toggleNode(element) {
    // Encontra o elemento .node-details dentro do nó clicado
    const details = element.querySelector('.node-details');
    
    if (details) {
        // Toggle da classe 'hidden'
        details.classList.toggle('hidden');
        
        // Adiciona animação de pulse ao nó
        element.classList.add('active');
        setTimeout(() => {
            element.classList.remove('active');
        }, 1000);
        
        // Scroll suave para o elemento
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Função para resetar o fluxograma
function resetFlowchart() {
    // Encontra todos os nós
    const nodes = document.querySelectorAll('.node');
    
    // Esconde todos os detalhes
    nodes.forEach(node => {
        const details = node.querySelector('.node-details');
        if (details) {
            details.classList.add('hidden');
        }
    });
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Mostra uma mensagem
    showNotification('Fluxograma reiniciado! Clique nos itens para começar.', 'success');
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Cria um elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Adiciona estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#48bb78' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.4s ease;
        z-index: 1000;
        max-width: 300px;
    `;
    
    // Adiciona à página
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Adiciona animação CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Detecta quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Mostra uma mensagem de boas-vindas
    showNotification('Bem-vindo! 👋 Clique nos itens para explorar o fluxograma', 'info');
    
    // Adiciona suporte a teclado (Enter para ativar nós)
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const focused = document.activeElement;
            if (focused.classList.contains('node')) {
                toggleNode(focused);
            }
        }
    });
    
    // Faz os nós focáveis com teclado
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, index) => {
        node.setAttribute('tabindex', index + 1);
    });
});

// Função para compartilhar (opcional)
function shareFlowchart() {
    if (navigator.share) {
        navigator.share({
            title: 'IA e Criptografia - Fluxograma Interativo',
            text: 'Explore como a IA protege seus arquivos!',
            url: window.location.href
        });
    } else {
        showNotification('Compartilhamento não suportado neste navegador', 'info');
    }
}

// Função para exportar o conteúdo
function exportFlowchart() {
    const content = document.querySelector('.flowchart').innerText;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'fluxograma-criptografia.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showNotification('Fluxograma exportado com sucesso!', 'success');
}

// Adiciona efeito ao passar o mouse
const nodes = document.querySelectorAll('.node');
nodes.forEach(node => {
    node.addEventListener('mouseenter', function() {
        this.style.zIndex = 10;
    });
    
    node.addEventListener('mouseleave', function() {
        this.style.zIndex = 1;
    });
});

// Modo escuro (opcional)
function toggleDarkMode() {
    document.body.style.background = 
        document.body.style.background === 'rgb(26, 32, 44)' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : 'rgb(26, 32, 44)';
}

// Função para adicionar tooltips
function addTooltips() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        const title = node.querySelector('h3')?.textContent || 'Nó';
        node.setAttribute('title', `Clique para expandir: ${title}`);
    });
}

// Chamada da função de tooltips
addTooltips();

// Listener para detectar mudanças de tamanho da janela
window.addEventListener('resize', function() {
    // Pode ser usado para ajustar o layout se necessário
});

// Função para analytics (rastreamento de cliques)
let clickCount = 0;
nodes.forEach(node => {
    node.addEventListener('click', function() {
        clickCount++;
        // Pode enviar dados para analytics se necessário
    });
});

// Função para modo de apresentação
function enterPresentationMode() {
    document.body.style.fontSize = '18px';
    showNotification('Modo de apresentação ativado', 'success');
}

console.log('🔐 Fluxograma de Criptografia e IA carregado com sucesso!');
console.log('💡 Dica: Clique nos itens para explorar cada etapa do processo');
