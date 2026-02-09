// Asset definitions for trash objects and bins

const TRASH_TYPES = {
    ORGANIC: 'organic',
    PLASTIC: 'plastic',
    PAPER: 'paper'
};

// Detailed trash variants for each type
const TRASH_VARIANTS = {
    organic: [
        { name: 'apple', emoji: '🍎', color: 0xff6b6b, shape: 'sphere' },
        { name: 'banana', emoji: '🍌', color: 0xffed4e, shape: 'curved' },
        { name: 'fish', emoji: '🐟', color: 0xff9999, shape: 'flat' }
    ],
    plastic: [
        { name: 'bottle', emoji: '🧴', color: 0x4ecdc4, shape: 'bottle' },
        { name: 'water-bottle', emoji: '💧', color: 0x89CFF0, shape: 'bottle' },
        { name: 'bag', emoji: '🛍️', color: 0xf39c12, shape: 'flat' }
    ],
    paper: [
        { name: 'document', emoji: '📄', color: 0xffe66d, shape: 'flat' },
        { name: 'newspaper', emoji: '📰', color: 0xe0e0e0, shape: 'flat' },
        { name: 'cardboard', emoji: '📦', color: 0xd2691e, shape: 'box' }
    ]
};

const BIN_TYPES = {
    GREEN: 'green',
    YELLOW: 'yellow',
    BLUE: 'blue'
};

// Mapping trash to correct bin
const TRASH_TO_BIN = {
    [TRASH_TYPES.ORGANIC]: BIN_TYPES.GREEN,
    [TRASH_TYPES.PLASTIC]: BIN_TYPES.YELLOW,
    [TRASH_TYPES.PAPER]: BIN_TYPES.BLUE
};

// Color definitions
const COLORS = {
    green: 0x22c55e,
    yellow: 0xf59e0b,
    blue: 0x3b82f6,
    organic: 0xff6b6b,
    plastic: 0x4ecdc4,
    paper: 0xffe66d
};

// Helper function to create emoji texture
function createEmojiTexture(emoji, bgColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 256, 256);

    // Emoji
    ctx.font = 'bold 180px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Get random variant for a trash type
function getRandomVariant(type) {
    const variants = TRASH_VARIANTS[type];
    return variants[Math.floor(Math.random() * variants.length)];
}

// Create trash object with realistic shapes
function createTrashObject(type, position, variantName = null) {
    const group = new THREE.Group();
    let mainMesh, geometry, material;

    // Get variant (either specified or random)
    const variant = variantName
        ? TRASH_VARIANTS[type].find(v => v.name === variantName)
        : getRandomVariant(type);

    const emoji = variant.emoji;
    const bgColor = '#' + variant.color.toString(16).padStart(6, '0');

    switch (type) {
        case TRASH_TYPES.ORGANIC:
            if (variant.shape === 'sphere') {
                // Apple shape (sphere)
                geometry = new THREE.SphereGeometry(0.8, 32, 32);
                material = new THREE.MeshStandardMaterial({
                    color: variant.color,
                    roughness: 0.6,
                    metalness: 0.2
                });

                mainMesh = new THREE.Mesh(geometry, material);

                if (variant.name === 'apple') {
                    // Add stem
                    const stemGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
                    const stemMaterial = new THREE.MeshStandardMaterial({
                        color: 0x8B4513,
                        roughness: 0.8
                    });
                    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
                    stem.position.y = 0.95;
                    mainMesh.add(stem);

                    // Add leaf
                    const leafGeometry = new THREE.CircleGeometry(0.2, 16);
                    const leafMaterial = new THREE.MeshStandardMaterial({
                        color: 0x228B22,
                        roughness: 0.7,
                        side: THREE.DoubleSide
                    });
                    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
                    leaf.position.set(0.15, 1.05, 0);
                    leaf.rotation.x = Math.PI / 2;
                    mainMesh.add(leaf);
                }
            } else if (variant.shape === 'curved') {
                // Banana shape (curved tube)
                const curve = new THREE.QuadraticBezierCurve3(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0.5, 0.3, 0),
                    new THREE.Vector3(1, 0, 0)
                );

                geometry = new THREE.TubeGeometry(curve, 20, 0.3, 8, false);
                material = new THREE.MeshStandardMaterial({
                    color: variant.color,
                    roughness: 0.7,
                    metalness: 0.1
                });

                mainMesh = new THREE.Mesh(geometry, material);
                mainMesh.scale.set(1.2, 1.2, 1.2);
            } else {
                // Fish shape (ellipsoid + tail)
                geometry = new THREE.SphereGeometry(0.6, 32, 32);
                geometry.scale(1.5, 0.8, 0.6);
                material = new THREE.MeshStandardMaterial({
                    color: variant.color,
                    roughness: 0.5,
                    metalness: 0.2
                });

                mainMesh = new THREE.Mesh(geometry, material);

                // Add fish tail
                const tailGeometry = new THREE.ConeGeometry(0.4, 0.6, 3);
                const tail = new THREE.Mesh(tailGeometry, material);
                tail.position.set(-1, 0, 0);
                tail.rotation.z = Math.PI / 2;
                mainMesh.add(tail);
            }

            break;


        case TRASH_TYPES.PLASTIC:
            if (variant.shape === 'bottle') {
                // Bottle shape (cylinder + cap + neck)
                const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.45, 1.5, 32);
                material = new THREE.MeshStandardMaterial({
                    color: variant.color,
                    roughness: 0.3,
                    metalness: 0.6,
                    transparent: true,
                    opacity: 0.9
                });

                const body = new THREE.Mesh(bodyGeometry, material);

                // Bottle neck
                const neckGeometry = new THREE.CylinderGeometry(0.25, 0.4, 0.4, 32);
                const neck = new THREE.Mesh(neckGeometry, material);
                neck.position.y = 0.95;
                body.add(neck);

                // Cap
                const capGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.2, 32);
                const capMaterial = new THREE.MeshStandardMaterial({
                    color: 0x2c3e50,
                    roughness: 0.5,
                    metalness: 0.4
                });
                const cap = new THREE.Mesh(capGeometry, capMaterial);
                cap.position.y = 1.25;
                body.add(cap);

                // Label with emoji
                const labelGeometry = new THREE.PlaneGeometry(0.7, 0.5);
                const labelTexture = createEmojiTexture(emoji, bgColor);
                const labelMaterial = new THREE.MeshBasicMaterial({
                    map: labelTexture,
                    transparent: true
                });
                const label = new THREE.Mesh(labelGeometry, labelMaterial);
                label.position.set(0, 0.2, 0.46);
                body.add(label);

                mainMesh = body;
            } else {
                // Flat plastic bag
                geometry = new THREE.BoxGeometry(1.2, 1.4, 0.05);
                material = new THREE.MeshStandardMaterial({
                    color: variant.color,
                    roughness: 0.6,
                    metalness: 0.3,
                    transparent: true,
                    opacity: 0.85
                });

                mainMesh = new THREE.Mesh(geometry, material);

                // Add emoji on front
                const frontTexture = createEmojiTexture(emoji, bgColor);
                const frontGeometry = new THREE.PlaneGeometry(1.0, 1.0);
                const frontMaterial = new THREE.MeshBasicMaterial({
                    map: frontTexture,
                    transparent: true
                });
                const front = new THREE.Mesh(frontGeometry, frontMaterial);
                front.position.z = 0.03;
                mainMesh.add(front);
            }
            break;

        case TRASH_TYPES.PAPER:
            if (variant.shape === 'box') {
                // Cardboard box shape
                geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
                material = new THREE.MeshStandardMaterial({
                    color: variant.color,
                    roughness: 0.95,
                    metalness: 0.05
                });

                mainMesh = new THREE.Mesh(geometry, material);

                // Add emoji on multiple sides
                const sideTexture = createEmojiTexture(emoji, bgColor);
                const sideGeometry = new THREE.PlaneGeometry(0.8, 0.8);
                const sideMaterial = new THREE.MeshBasicMaterial({
                    map: sideTexture,
                    transparent: true
                });
                const frontSide = new THREE.Mesh(sideGeometry, sideMaterial);
                frontSide.position.z = 0.51;
                mainMesh.add(frontSide);
            } else {
                // Flat paper/document shape
                geometry = new THREE.BoxGeometry(1.0, 1.3, 0.1);
                material = new THREE.MeshStandardMaterial({
                    color: variant.color,
                    roughness: 0.9,
                    metalness: 0.1
                });

                mainMesh = new THREE.Mesh(geometry, material);

                // Add emoji texture on front
                const frontTexture = createEmojiTexture(emoji, bgColor);
                const frontGeometry = new THREE.PlaneGeometry(0.8, 0.8);
                const frontMaterial = new THREE.MeshBasicMaterial({
                    map: frontTexture,
                    transparent: true
                });
                const front = new THREE.Mesh(frontGeometry, frontMaterial);
                front.position.z = 0.06;
                mainMesh.add(front);

                // Add text lines (simulating written paper)
                if (variant.name === 'document' || variant.name === 'newspaper') {
                    const lineGeometry = new THREE.PlaneGeometry(0.7, 0.05);
                    const lineMaterial = new THREE.MeshBasicMaterial({
                        color: 0x333333,
                        transparent: true,
                        opacity: 0.3
                    });

                    for (let i = 0; i < 3; i++) {
                        const line = new THREE.Mesh(lineGeometry, lineMaterial);
                        line.position.set(0, -0.2 - (i * 0.15), 0.07);
                        mainMesh.add(line);
                    }
                }
            }
            break;
    }

    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    group.add(mainMesh);

    // Add subtle outline for better visibility
    const edges = new THREE.EdgesGeometry(mainMesh.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 1,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    mainMesh.add(wireframe);

    // Position the group
    group.position.set(position.x, position.y, position.z);

    // Store metadata
    group.userData.type = type;
    group.userData.isTrash = true;

    // Add floating label above object
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 128;
    labelCanvas.height = 64;
    const labelCtx = labelCanvas.getContext('2d');
    labelCtx.font = 'bold 48px Arial';
    labelCtx.textAlign = 'center';
    labelCtx.textBaseline = 'middle';

    // Use the variant emoji for the label
    labelCtx.fillText(emoji, 64, 32);

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: labelTexture,
        transparent: true
    }));
    labelSprite.scale.set(1, 0.5, 1);
    labelSprite.position.y = 1.5;
    group.add(labelSprite);

    return group;
}

// Create bin object
function createBin(binType, position) {
    const group = new THREE.Group();

    // Bin body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(1.5, 1.5, 2.5, 32);
    let color;

    switch (binType) {
        case BIN_TYPES.GREEN:
            color = COLORS.green;
            break;
        case BIN_TYPES.YELLOW:
            color = COLORS.yellow;
            break;
        case BIN_TYPES.BLUE:
            color = COLORS.blue;
            break;
    }

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.4,
        metalness: 0.5
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Bin lid
    const lidGeometry = new THREE.CylinderGeometry(1.6, 1.6, 0.3, 32);
    const lid = new THREE.Mesh(lidGeometry, bodyMaterial);
    lid.position.y = 1.4;
    lid.castShadow = true;
    group.add(lid);

    // Add outline
    const edges = new THREE.EdgesGeometry(bodyGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    group.add(wireframe);

    group.position.set(position.x, position.y, position.z);

    // Store metadata
    group.userData.binType = binType;
    group.userData.isBin = true;

    return group;
}

// Create floor/ground
function createFloor() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const material = new THREE.MeshStandardMaterial({
        color: 0x90ee90,
        roughness: 0.8,
        metalness: 0.2
    });

    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;

    return floor;
}

// Create particle effect for success
function createParticles(scene, position) {
    const particleCount = 20;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(Math.random(), Math.random(), Math.random())
        });

        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
            position.x + (Math.random() - 0.5) * 2,
            position.y + (Math.random() - 0.5) * 2,
            position.z + (Math.random() - 0.5) * 2
        );

        particle.userData.velocity = {
            x: (Math.random() - 0.5) * 0.2,
            y: Math.random() * 0.2,
            z: (Math.random() - 0.5) * 0.2
        };

        particle.userData.lifetime = 60; // frames

        scene.add(particle);
        particles.push(particle);
    }

    return particles;
}

// Animate particles
function animateParticles(particles, scene) {
    particles.forEach((particle, index) => {
        particle.userData.lifetime--;

        if (particle.userData.lifetime <= 0) {
            scene.remove(particle);
            particles.splice(index, 1);
            return;
        }

        particle.position.x += particle.userData.velocity.x;
        particle.position.y += particle.userData.velocity.y;
        particle.position.z += particle.userData.velocity.z;

        particle.userData.velocity.y -= 0.01; // gravity

        // Fade out
        particle.material.opacity = particle.userData.lifetime / 60;
        particle.material.transparent = true;
    });
}
