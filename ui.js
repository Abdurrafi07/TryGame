// UI Controller

class UIController {
    constructor() {
        this.score = 0;
        this.scoreElement = document.getElementById('score');
        this.feedbackElement = document.getElementById('feedback');
        this.bigRewardElement = document.getElementById('big-reward');
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

    showBigReward() {
        const rewards = ['⭐', '❤️', '🎈', '🍭', '🌈'];
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

        this.bigRewardElement.textContent = randomReward;
        this.bigRewardElement.className = 'big-reward';
        if (randomReward === '❤️') this.bigRewardElement.classList.add('heart');

        // Trigger reflow
        void this.bigRewardElement.offsetWidth;

        this.bigRewardElement.classList.add('show');

        setTimeout(() => {
            this.bigRewardElement.classList.remove('show');
        }, 1000);
    }

    showSuccess() {
        const messages = [
            'HORE! 🎉',
            'PINTAR! ⭐',
            'HEBAT! 🌟',
            'YAY! 👏',
            'BAGUS! 💚',
            'KEREN! ✨',
            'WOW! 💫',
            'OK! 👍',
            'LUCU! 😊'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showFeedback(randomMessage, 'success', 1800);
        this.addScore(10);

        // Show big visual reward for playgroup kids
        this.showBigReward();
    }

    showEncouragement() {
        const messages = [
            'AYO! 💪',
            'LAGI! 😊',
            'COBA! 🎯',
            'SEMANGAT! 🌈',
            'HMM? 🤔',
            'BISA! ⭐',
            'SINI! 🎨'
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
