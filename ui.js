// UI Controller

class UIController {
    constructor() {
        this.score = 0;
        this.scoreElement = document.getElementById('score');
        this.feedbackElement = document.getElementById('feedback');
        this.instructionsOverlay = document.getElementById('instructions');
        this.startBtn = document.getElementById('start-btn');
        this.muteBtn = document.getElementById('mute-btn');
        this.loadingScreen = document.getElementById('loading-screen');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => {
            this.hideInstructions();
            if (window.gameInstance) {
                window.gameInstance.start();
            }
        });

        this.muteBtn.addEventListener('click', () => {
            const isMuted = soundManager.toggleMute();
            this.muteBtn.textContent = isMuted ? '🔇' : '🔊';
        });
    }

    hideLoading() {
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
        }, 1000);
    }

    showInstructions() {
        this.instructionsOverlay.classList.add('active');
    }

    hideInstructions() {
        this.instructionsOverlay.classList.remove('active');
    }

    addScore(points) {
        this.score += points;
        this.scoreElement.textContent = this.score;

        // Animate score with bounce
        this.scoreElement.parentElement.style.transform = 'scale(1.3) rotate(5deg)';
        setTimeout(() => {
            this.scoreElement.parentElement.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }

    showFeedback(message, type = 'success', duration = 1500) {
        this.feedbackElement.textContent = message;
        this.feedbackElement.className = `feedback show ${type}`;

        setTimeout(() => {
            this.feedbackElement.classList.remove('show');
        }, duration);
    }

    showSuccess() {
        const messages = [
            '🎉 Hebat Sekali!',
            '⭐ Pintar Banget!',
            '🌟 Keren Abis!',
            '👏 Mantap!',
            '💚 Bagus Banget!',
            '🏆 Juara!',
            '✨ Luar Biasa!',
            '🎯 Tepat Sekali!',
            '🌈 Sempurna!',
            '💫 Wow Amazing!'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showFeedback(randomMessage, 'success', 1800);
        this.addScore(10);
    }

    showEncouragement() {
        const messages = [
            '💪 Ayo Coba Lagi!',
            '😊 Hampir Benar!',
            '🎯 Coba Yang Lain!',
            '🌈 Semangat!',
            '💡 Hmm, Pikir Lagi!',
            '🤗 Jangan Menyerah!',
            '⭐ Kamu Pasti Bisa!',
            '🎨 Cobalah Lagi!',
            '🚀 Ayo Lagi!'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showFeedback(randomMessage, 'error', 1400);
    }

    getScore() {
        return this.score;
    }

    resetScore() {
        this.score = 0;
        this.scoreElement.textContent = this.score;
    }
}

// Create global UI controller
const uiController = new UIController();
