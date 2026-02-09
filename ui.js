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

        // Animate score
        this.scoreElement.parentElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.scoreElement.parentElement.style.transform = 'scale(1)';
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
            '🎉 Hebat!',
            '⭐ Pintar sekali!',
            '🌟 Bagus!',
            '👏 Benar!',
            '💚 Keren!'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showFeedback(randomMessage, 'success');
        this.addScore(10);
    }

    showEncouragement() {
        const messages = [
            '🤔 Coba lagi ya!',
            '💡 Hmm, yang lain!',
            '😊 Hampir betul!',
            '🎯 Pilih yang tepat!',
            '🌈 Ayo semangat!'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showFeedback(randomMessage, 'error', 1200);
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
