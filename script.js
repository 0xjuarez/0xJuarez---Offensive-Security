// Insertar el año actual en el footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = `© ${currentYear} 0xJuarez — No system is secure.`;
    }
    
    // Cargar datos de HTB
    loadHTBProfile();
});

// Función para cargar el perfil de HTB
async function loadHTBProfile() {
    const statsContainer = document.getElementById('htb-stats');
    const userId = '2806180';
    
    try {
        // Intentar obtener datos del perfil de HackTheBox
        // La API pública de HTB puede tener limitaciones
        const response = await fetch(`https://www.hackthebox.com/api/v4/user/profile/basic?user_id=${userId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayHTBStats(data);
        } else {
            // Si la API no funciona, mostrar datos alternativos
            displayDefaultHTBStats();
        }
    } catch (error) {
        // Si hay error de CORS u otro, mostrar datos alternativos
        console.log('No se pudo cargar datos de HTB de forma automática');
        displayDefaultHTBStats();
    }
}

// Función para mostrar estadísticas de HTB
function displayHTBStats(data) {
    const statsContainer = document.getElementById('htb-stats');
    
    // Construir HTML con los datos disponibles
    let html = '<div class="htb-stats-display">';
    
    if (data.profile && data.profile.rank) {
        html += `
            <div class="htb-stat">
                <div class="htb-stat-value">${data.profile.rank}</div>
                <div class="htb-stat-label">Ranking</div>
            </div>
        `;
    }
    
    if (data.profile && data.profile.owned_machines) {
        html += `
            <div class="htb-stat">
                <div class="htb-stat-value">${data.profile.owned_machines}</div>
                <div class="htb-stat-label">Máquinas</div>
            </div>
        `;
    }
    
    if (data.profile && data.profile.owned_challenges) {
        html += `
            <div class="htb-stat">
                <div class="htb-stat-value">${data.profile.owned_challenges}</div>
                <div class="htb-stat-label">Retos</div>
            </div>
        `;
    }
    
    html += '</div>';
    
    if (html.includes('htb-stat')) {
        statsContainer.innerHTML = html;
    } else {
        displayDefaultHTBStats();
    }
}

// Función para mostrar estadísticas por defecto
function displayDefaultHTBStats() {
    const statsContainer = document.getElementById('htb-stats');
    statsContainer.innerHTML = `
        <div class="htb-default-message">
            <p><i class=\"fas fa-info-circle\"></i> Perfil de HTB activo</p>
            <p style=\"font-size: 11px; color: #777; margin-top: 10px;\">Id: 2806180</p>
            <p style=\"font-size: 12px; margin-top: 15px;\">Ranking, máquinas comprometidas, retos completados y progreso documentado en tu perfil público.</p>
        </div>
    `;
}

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
