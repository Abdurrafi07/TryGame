// Main Game Logic

class TrashSortingGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.trashObjects = [];
        this.bins = [];
        this.particles = [];
        this.clouds = [];
        this.sun = null;

        this.selectedObject = null;
        this.dragging = false;
        this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        this.dragOffset = new THREE.Vector3();
        this.dragIntersection = new THREE.Vector3();

        this.gameStarted = false;

        this.init();
    }

    init() {
        this.setupScene();
        this.setupLights();
        this.setupFloor();
        this.setupEnvironment(); // New: Sun and Clouds
        this.setupBins();
        this.setupEventListeners();
        this.animate();

        // Hide loading screen
        uiController.hideLoading();
    }

    setupScene() {
        // Detect mobile device
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaed9e0); // Softer blue
        this.scene.fog = new THREE.Fog(0xaed9e0, 20, 60);

        // Camera - Adaptive FOV for mobile
        const fov = this.isMobile ? 85 : 75; // Wider FOV on mobile for better view
        this.camera = new THREE.PerspectiveCamera(
            fov,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Adjust camera position for mobile (pull back a bit)
        const cameraZ = this.isMobile ? 14 : 12;
        this.camera.position.set(0, 8, cameraZ);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        const canvas = document.getElementById('game-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Handle window resize and orientation change
        const handleResize = () => {
            this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.fov = this.isMobile ? 85 : 75;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            // Adjust camera distance on orientation change
            const cameraZ = this.isMobile ? 14 : 12;
            this.camera.position.z = cameraZ;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 100); // Delay for orientation change
        });
    }

    setupLights() {
        // Ambient light - Softer and warmer
        const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
        this.scene.add(ambientLight);

        // Directional light (sun) - Warmer color
        const directionalLight = new THREE.DirectionalLight(0xfff0dd, 0.9);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -15;
        directionalLight.shadow.camera.right = 15;
        directionalLight.shadow.camera.top = 15;
        directionalLight.shadow.camera.bottom = -15;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point light for extra glow
        const pointLight = new THREE.PointLight(0xffffff, 0.3);
        pointLight.position.set(0, 5, 0);
        this.scene.add(pointLight);
    }

    setupFloor() {
        const floor = createFloor();
        this.scene.add(floor);
    }

    setupEnvironment() {
        // Add Smiling Sun
        this.sun = createSun();
        this.sun.position.set(15, 12, -15);
        this.scene.add(this.sun);

        // Add some clouds
        for (let i = 0; i < 5; i++) {
            const cloud = createCloud();
            cloud.position.set(
                (Math.random() - 0.5) * 40,
                8 + Math.random() * 5,
                -10 - Math.random() * 10
            );
            cloud.userData.speed = 0.005 + Math.random() * 0.01;
            this.clouds.push(cloud);
            this.scene.add(cloud);
        }
    }

    setupBins() {
        // Create 3 bins in a row
        const binPositions = [
            { type: BIN_TYPES.GREEN, position: { x: -5, y: 0, z: -3 } },
            { type: BIN_TYPES.YELLOW, position: { x: 0, y: 0, z: -3 } },
            { type: BIN_TYPES.BLUE, position: { x: 5, y: 0, z: -3 } }
        ];

        binPositions.forEach(config => {
            const bin = createBin(config.type, config.position);
            this.bins.push(bin);
            this.scene.add(bin);
        });
    }

    start() {
        if (this.gameStarted) return;

        this.gameStarted = true;
        soundManager.init();

        // Spawn initial trash
        this.spawnTrash();
    }

    spawnTrash() {
        // Remove old trash
        this.trashObjects.forEach(trash => {
            this.scene.remove(trash);
        });
        this.trashObjects = [];

        // Create random trash items
        const trashTypes = Object.values(TRASH_TYPES);
        const spawnCount = 3;

        for (let i = 0; i < spawnCount; i++) {
            const randomType = trashTypes[Math.floor(Math.random() * trashTypes.length)];
            const position = {
                x: (Math.random() - 0.5) * 8,
                y: 2,
                z: 3 + i * 1.5
            };

            const trash = createTrashObject(randomType, position);
            this.trashObjects.push(trash);
            this.scene.add(trash);
        }
    }

    setupEventListeners() {
        // Mouse events
        window.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));

        // Touch events for mobile
        window.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
        window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        window.addEventListener('touchend', (e) => this.onTouchEnd(e));
    }

    updateMousePosition(clientX, clientY) {
        this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    }

    onMouseDown(event) {
        if (!this.gameStarted) return;

        this.updateMousePosition(event.clientX, event.clientY);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.trashObjects, true);

        if (intersects.length > 0) {
            let object = intersects[0].object;

            // Find the parent trash object
            while (object.parent && !object.userData.isTrash) {
                object = object.parent;
            }

            if (object.userData.isTrash) {
                this.selectedObject = object;
                this.dragging = true;
                document.body.classList.add('dragging');

                soundManager.playPickup();

                // Calculate drag offset
                this.raycaster.ray.intersectPlane(this.dragPlane, this.dragIntersection);
                this.dragOffset.copy(this.dragIntersection).sub(this.selectedObject.position);
            }
        }
    }

    onMouseMove(event) {
        if (!this.dragging || !this.selectedObject) return;

        this.updateMousePosition(event.clientX, event.clientY);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        if (this.raycaster.ray.intersectPlane(this.dragPlane, this.dragIntersection)) {
            this.selectedObject.position.copy(this.dragIntersection.sub(this.dragOffset));
            this.selectedObject.position.y = 2; // Keep at constant height
        }
    }

    onMouseUp(event) {
        if (!this.dragging || !this.selectedObject) return;

        document.body.classList.remove('dragging');

        // Check if trash is dropped in correct bin
        this.checkBinCollision(this.selectedObject);

        this.dragging = false;
        this.selectedObject = null;
    }

    // Touch event handlers
    onTouchStart(event) {
        if (event.touches.length === 1) {
            // Do NOT preventDefault here yet, as it might block UI button clicks
            this.onMouseDown({
                clientX: event.touches[0].clientX,
                clientY: event.touches[0].clientY
            });

            // If we actually started dragging an object, then we can preventDefault
            if (this.dragging) {
                event.preventDefault();
            }
        }
    }

    onTouchMove(event) {
        if (event.touches.length === 1 && this.dragging) {
            // Only preventDefault if we are actively dragging to prevent scrolling
            event.preventDefault();
            this.onMouseMove({
                clientX: event.touches[0].clientX,
                clientY: event.touches[0].clientY
            });
        }
    }

    onTouchEnd(event) {
        if (this.dragging) {
            event.preventDefault();
            this.onMouseUp({});
        }
    }

    checkBinCollision(trashObject) {
        const trashPos = trashObject.position;
        let correctBin = null;
        let closestBin = null;
        let minDistance = Infinity;

        // Find closest bin
        this.bins.forEach(bin => {
            const binPos = bin.position;
            const distance = Math.sqrt(
                Math.pow(trashPos.x - binPos.x, 2) +
                Math.pow(trashPos.z - binPos.z, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestBin = bin;
            }
        });

        // Check if within bin radius
        if (minDistance < 2.5) {
            const trashType = trashObject.userData.type;
            const correctBinType = TRASH_TO_BIN[trashType];

            if (closestBin.userData.binType === correctBinType) {
                // Correct placement!
                this.onCorrectPlacement(trashObject, closestBin);
            } else {
                // Wrong bin
                this.onWrongPlacement(trashObject);
            }
        } else {
            // Not in any bin, return to original position
            this.animateReturn(trashObject);
        }
    }

    onCorrectPlacement(trashObject, bin) {
        soundManager.playSuccess();
        uiController.showSuccess();

        // Create particle effect
        const newParticles = createParticles(this.scene, bin.position);
        this.particles.push(...newParticles);

        // Animate trash falling into bin
        this.animateFallIntoBin(trashObject, bin);

        // Remove from array
        const index = this.trashObjects.indexOf(trashObject);
        if (index > -1) {
            this.trashObjects.splice(index, 1);
        }

        // Check if all trash is sorted
        setTimeout(() => {
            if (this.trashObjects.length === 0) {
                this.spawnTrash();
            }
        }, 1000);
    }

    onWrongPlacement(trashObject) {
        soundManager.playError();
        uiController.showEncouragement();

        // Shake animation
        this.animateShake(trashObject);
    }

    animateFallIntoBin(trashObject, bin) {
        const startY = trashObject.position.y;
        const endY = bin.position.y;
        const duration = 500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            trashObject.position.y = startY + (endY - startY) * progress;
            trashObject.rotation.y += 0.1;
            trashObject.scale.multiplyScalar(0.95);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.scene.remove(trashObject);
            }
        };

        animate();
    }

    animateShake(trashObject) {
        const originalPos = trashObject.position.clone();
        const shakes = 6;
        const shakeAmount = 0.3;
        let currentShake = 0;

        const shake = () => {
            if (currentShake < shakes) {
                trashObject.position.x = originalPos.x + (Math.random() - 0.5) * shakeAmount;
                trashObject.position.z = originalPos.z + (Math.random() - 0.5) * shakeAmount;
                currentShake++;
                setTimeout(shake, 50);
            } else {
                trashObject.position.copy(originalPos);
            }
        };

        shake();
    }

    animateReturn(trashObject) {
        // Gentle return animation (not needed for now, objects stay where dropped)
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Animate particles
        if (this.particles.length > 0) {
            animateParticles(this.particles, this.scene);
        }

        // Gentle floating animation for trash
        this.trashObjects.forEach((trash, index) => {
            if (!this.dragging || trash !== this.selectedObject) {
                trash.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;
                trash.rotation.y += 0.005;
            }
        });

        // Gentle bin animation
        this.bins.forEach((bin, index) => {
            bin.position.y = Math.sin(Date.now() * 0.0005 + index) * 0.1;
            // Also gentle bounce rotate
            bin.rotation.z = Math.sin(Date.now() * 0.001 + index) * 0.02;
        });

        // Animate Environment
        if (this.sun) {
            this.sun.rotation.z += 0.002;
        }

        this.clouds.forEach(cloud => {
            cloud.position.x += cloud.userData.speed;
            // Loop back clouds
            if (cloud.position.x > 25) cloud.position.x = -25;

            // Subtle float
            cloud.position.y += Math.sin(Date.now() * 0.001 + cloud.position.x) * 0.005;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new TrashSortingGame();
});
