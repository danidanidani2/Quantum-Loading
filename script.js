// Sistema de Carga Cuántica Épica
class QuantumLoading {
    constructor() {
        this.load = 0;
        this.speed = 1;
        this.startTime = Date.now();
        this.isComplete = false;
        this.soundEnabled = true;
        this.currentTheme = 'quantum';
        this.particles = [];
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.startLoading();
        this.createInitialParticles();
        this.playBackgroundSound();
        console.log('🚀 Sistema de Carga Cuántica Iniciado');
    }

    setupElements() {
        this.elements = {
            loadingText: document.getElementById('loadingText'),
            loadingSubtitle: document.getElementById('loadingSubtitle'),
            progressFill: document.getElementById('progressFill'),
            timeElapsed: document.getElementById('timeElapsed'),
            loadingSpeed: document.getElementById('loadingSpeed'),
            particlesCount: document.getElementById('particlesCount'),
            currentStatus: document.getElementById('currentStatus'),
            themeToggle: document.getElementById('themeToggle'),
            speedControl: document.getElementById('speedControl'),
            soundToggle: document.getElementById('soundToggle'),
            quantumParticles: document.getElementById('quantum-particles'),
            universeBackground: document.querySelector('.universe-background'),
            quantumOrb: document.querySelector('.quantum-orb'),
            completionCanvas: document.getElementById('completionCanvas'),
            completionControls: document.getElementById('completionControls'),
            restartBtn: document.getElementById('restartBtn'),
            loadingSystem: document.querySelector('.loading-system'),
            experienceControls: document.querySelector('.experience-controls')
        };
    }

    setupEventListeners() {
        // Controles de experiencia
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.elements.speedControl.addEventListener('click', () => this.toggleSpeed());
        this.elements.soundToggle.addEventListener('click', () => this.toggleSound());

        // Reiniciar carga al hacer click en el orb
        this.elements.quantumOrb.addEventListener('click', () => {
            if (this.isComplete) {
                this.restartLoading();
            }
        });

        // Botón de reinicio
        this.elements.restartBtn.addEventListener('click', () => {
            this.restartLoading();
        });
    }

    startLoading() {
        this.loadingInterval = setInterval(() => this.updateLoading(), 30 / this.speed);
        this.updateStatsInterval = setInterval(() => this.updateStats(), 100);
        this.particleInterval = setInterval(() => this.createParticles(), 200);
    }

    updateLoading() {
        if (this.isComplete) return;

        this.load += this.speed;
        
        if (this.load > 100) {
            this.load = 100;
            this.completeLoading();
        }

        this.updateUI();
        this.updateBackgroundEffects();
    }

    updateUI() {
        // Actualizar porcentaje
        const percentageElement = this.elements.loadingText.querySelector('.percentage');
        percentageElement.textContent = Math.min(this.load, 100);
        
        // Actualizar barra de progreso
        this.elements.progressFill.style.width = `${this.load}%`;
        
        // Actualizar efectos de brillo
        if (this.load > 0) {
            const glow = document.querySelector('.progress-glow');
            glow.style.opacity = (this.load / 100) * 0.5;
        }

        // Actualizar subtítulo dinámico
        this.updateLoadingSubtitle();
    }

    updateLoadingSubtitle() {
        const subtitles = {
            0: 'Inicializando sistema cuántico...',
            10: 'Cargando módulos de energía...',
            25: 'Sincronizando dimensiones...',
            40: 'Activando partículas cuánticas...',
            60: 'Estabilizando vortex temporal...',
            75: 'Preparando experiencia épica...',
            90: 'Finalizando secuencia...',
            100: '¡Sistema listo!'
        };

        const milestones = Object.keys(subtitles).map(Number).sort((a, b) => a - b);
        const currentMilestone = milestones.reduce((prev, curr) => 
            this.load >= curr ? curr : prev, 0
        );

        this.elements.loadingSubtitle.textContent = subtitles[currentMilestone];
        
        // Actualizar estado actual
        const statusIcon = this.elements.currentStatus.querySelector('i');
        const statusText = this.elements.currentStatus.querySelector('span');
        statusText.textContent = subtitles[currentMilestone];
        
        // Cambiar icono según progreso
        if (this.load >= 90) {
            statusIcon.className = 'fas fa-check';
            statusIcon.style.animation = 'none';
        } else if (this.load >= 60) {
            statusIcon.className = 'fas fa-rocket';
        } else if (this.load >= 25) {
            statusIcon.className = 'fas fa-cog fa-spin';
        }
    }

    updateBackgroundEffects() {
        // Actualizar blur del fondo
        const blurValue = this.scale(this.load, 0, 100, 20, 0);
        this.elements.universeBackground.style.filter = `blur(${blurValue}px)`;
        
        // Actualizar opacidad del texto
        const textOpacity = this.scale(this.load, 0, 100, 1, 0.3);
        this.elements.loadingText.style.opacity = textOpacity;
        
        // Efectos especiales en hitos
        if (this.load === 25 || this.load === 50 || this.load === 75) {
            this.createMilestoneEffect();
        }
    }

    updateStats() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        
        this.elements.timeElapsed.textContent = `${minutes}:${seconds}`;
        this.elements.loadingSpeed.textContent = `${(this.speed * 3.33).toFixed(1)} MB/s`;
        this.elements.particlesCount.textContent = `${this.particles.length} partículas`;
    }

    createInitialParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => this.createParticle(), i * 100);
        }
    }

    createParticles() {
        if (this.particles.length < 30) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        
        const size = 2 + Math.random() * 4;
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const duration = 2000 + Math.random() * 2000;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animationDuration = `${duration}ms`;
        
        // Color aleatorio
        const colors = ['var(--quantum-blue)', 'var(--quantum-purple)', 'var(--quantum-pink)', 'var(--quantum-green)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        this.elements.quantumParticles.appendChild(particle);
        this.particles.push(particle);
        
        // Remover partícula después de la animación
        setTimeout(() => {
            const index = this.particles.indexOf(particle);
            if (index > -1) {
                this.particles.splice(index, 1);
            }
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration);
    }

    createMilestoneEffect() {
        // Efecto de pulso en el orb
        this.elements.quantumOrb.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });

        // Crear explosión de partículas
        for (let i = 0; i < 10; i++) {
            this.createEnergyParticle();
        }

        // Efecto de sonido
        this.playSound('transitionSound');
    }

    createEnergyParticle() {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        
        const orbRect = this.elements.quantumOrb.getBoundingClientRect();
        const centerX = orbRect.left + orbRect.width / 2;
        const centerY = orbRect.top + orbRect.height / 2;
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        this.elements.quantumParticles.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }

    completeLoading() {
        this.isComplete = true;
        clearInterval(this.loadingInterval);
        clearInterval(this.updateStatsInterval);
        clearInterval(this.particleInterval);
        
        // Efectos de finalización
        this.playCompletionEffects();
        this.playSound('completeSound');
        
        // Cambiar estado
        document.body.classList.add('loading-complete');
        
        // Mostrar controles de finalización
        setTimeout(() => {
            this.showCompletionControls();
        }, 1500);
        
        console.log('✅ Carga cuántica completada');
    }

    showCompletionControls() {
        // Ocultar elementos de carga
        this.elements.loadingSystem.style.opacity = '0.3';
        this.elements.experienceControls.style.opacity = '0.3';
        
        // Mostrar controles de finalización
        this.elements.completionControls.classList.remove('hidden');
        
        // Efecto especial de aparición
        this.elements.completionControls.style.animation = 'fadeInUp 1s ease-out';
        
        // Crear partículas de celebración adicionales
        this.createCelebrationParticles();
    }

    createCelebrationParticles() {
        // Partículas especiales de celebración
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                this.createCelebrationParticle();
            }, i * 100);
        }
    }

    createCelebrationParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${Math.random() > 0.5 ? 'var(--quantum-green)' : 'var(--quantum-pink)'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            box-shadow: 0 0 15px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        // Animación de flotación
        const animation = particle.animate([
            { 
                transform: 'translateY(0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translateY(-${100 + Math.random() * 100}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)'
        });
        
        animation.onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }

    playCompletionEffects() {
        // Efecto de confetti
        this.createConfetti();
        
        // Animación final del orb
        this.elements.quantumOrb.style.animation = 'completeExplosion 1s ease-out forwards';
        
        // Mostrar efectos de finalización
        const completionEffects = document.querySelector('.completion-effects');
        completionEffects.classList.add('active');
    }

    createConfetti() {
        const colors = ['#00f5ff', '#b300ff', '#ff00f7', '#00ff88'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 2px;
                    top: -10px;
                    left: ${Math.random() * 100}vw;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                document.body.appendChild(confetti);
                
                const animation = confetti.animate([
                    { 
                        transform: 'translateY(0) rotate(0deg)',
                        opacity: 1
                    },
                    { 
                        transform: `translateY(100vh) rotate(${360 + Math.random() * 360}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: 2000 + Math.random() * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
                });
                
                animation.onfinish = () => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                };
            }, i * 80);
        }
    }

    toggleTheme() {
        const themes = ['quantum', 'nebula', 'matrix', 'sunset'];
        const currentIndex = themes.indexOf(this.currentTheme);
        this.currentTheme = themes[(currentIndex + 1) % themes.length];
        
        this.applyTheme(this.currentTheme);
        this.elements.themeToggle.innerHTML = `<i class="fas fa-palette"></i> Tema: ${this.currentTheme}`;
    }

    applyTheme(theme) {
        const root = document.documentElement;
        
        const themeColors = {
            quantum: {
                blue: '#00f5ff',
                purple: '#b300ff',
                pink: '#ff00f7',
                green: '#00ff88'
            },
            nebula: {
                blue: '#6366f1',
                purple: '#8b5cf6',
                pink: '#ec4899',
                green: '#10b981'
            },
            matrix: {
                blue: '#00ff00',
                purple: '#00cc00',
                pink: '#009900',
                green: '#006600'
            },
            sunset: {
                blue: '#ff6b35',
                purple: '#ff8e53',
                pink: '#ffb174',
                green: '#ffd397'
            }
        };
        
        const colors = themeColors[theme];
        root.style.setProperty('--quantum-blue', colors.blue);
        root.style.setProperty('--quantum-purple', colors.purple);
        root.style.setProperty('--quantum-pink', colors.pink);
        root.style.setProperty('--quantum-green', colors.green);
    }

    toggleSpeed() {
        const speeds = [1, 2, 0.5];
        const currentIndex = speeds.indexOf(this.speed);
        this.speed = speeds[(currentIndex + 1) % speeds.length];
        
        this.elements.speedControl.innerHTML = `<i class="fas fa-tachometer-alt"></i> Velocidad: ${this.speed}x`;
        
        // Reiniciar intervalos con nueva velocidad
        if (!this.isComplete) {
            clearInterval(this.loadingInterval);
            this.loadingInterval = setInterval(() => this.updateLoading(), 30 / this.speed);
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        
        if (this.soundEnabled) {
            this.elements.soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> Sonido';
            this.playBackgroundSound();
        } else {
            this.elements.soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Sonido';
            this.stopBackgroundSound();
        }
    }

    playBackgroundSound() {
        if (this.soundEnabled) {
            try {
                const sound = document.getElementById('loadingSound');
                sound.volume = 0.3;
                const playPromise = sound.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        console.log('Audio bloqueado por política de autoplay');
                    });
                }
            } catch (error) {
                console.warn('Error reproduciendo sonido de fondo:', error);
            }
        }
    }

    stopBackgroundSound() {
        const sound = document.getElementById('loadingSound');
        sound.pause();
        sound.currentTime = 0;
    }

    playSound(soundId) {
        if (this.soundEnabled) {
            try {
                const sound = document.getElementById(soundId);
                if (sound) {
                    sound.currentTime = 0;
                    const playPromise = sound.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            console.log(`Audio ${soundId} bloqueado por el navegador`);
                        });
                    }
                }
            } catch (error) {
                console.warn(`Error reproduciendo ${soundId}:`, error);
            }
        }
    }

    restartLoading() {
        // Ocultar controles de finalización
        this.elements.completionControls.classList.add('hidden');
        
        // Restaurar opacidad de elementos de carga
        this.elements.loadingSystem.style.opacity = '1';
        this.elements.experienceControls.style.opacity = '1';
        
        // Resetear estado
        this.load = 0;
        this.isComplete = false;
        this.startTime = Date.now();
        
        // Remover clases de completado
        document.body.classList.remove('loading-complete');
        
        // Resetear efectos visuales
        this.elements.universeBackground.style.filter = 'blur(20px)';
        this.elements.quantumOrb.style.animation = '';
        document.querySelector('.completion-effects').classList.remove('active');
        
        // Limpiar partículas existentes
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
        
        // Reiniciar intervalos
        this.startLoading();
        this.createInitialParticles();
        this.playBackgroundSound();
        
        console.log('🔄 Reiniciando viaje cuántico...');
    }

    scale(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}

// Manejo de errores de audio
function handleAudioErrors() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('error', () => {
            console.warn(`Audio no disponible: ${audio.src}`);
        });
    });
}

// Efectos adicionales al cargar la página
window.addEventListener('load', () => {
    // Crear partículas iniciales adicionales
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                background: var(--quantum-blue);
            `;
            document.getElementById('quantum-particles').appendChild(particle);
            
            // Auto-remover partículas después de animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 3000);
        }, i * 100);
    }
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    handleAudioErrors();
    new QuantumLoading();
});