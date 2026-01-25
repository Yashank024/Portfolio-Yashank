// Initialize Icons
lucide.createIcons();

// ------------------------------------------------------------------
// PROFESSIONAL 3D ROBOT INTERACTION
// Smooth, error-handled, production-ready
// ------------------------------------------------------------------

// ✅ PREVENT MULTIPLE INITIALIZATIONS
let threeJSInitialized = false;

const initThreeJS = () => {
    // Prevent multiple initializations
    if (threeJSInitialized) {
        console.warn('Three.js already initialized, skipping...');
        return;
    }

    const container = document.getElementById('hero-canvas');
    if (!container) {
        console.warn('3D container not found');
        return;
    }

    const scene = new THREE.Scene();

    // ✅ CLOCK FOR ANIMATION TIMING
    const clock = new THREE.Clock();

    // ✅ MOBILE DETECTION
    const isMobile = window.innerWidth < 768;

    // Camera - Adjusted for mobile
    const cameraFOV = isMobile ? 60 : 50; // Wider FOV on mobile to show full robot
    const camera = new THREE.PerspectiveCamera(cameraFOV, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = isMobile ? 6 : 5; // Pull back slightly on mobile

    // ✅ RENDERER WITH ERROR HANDLING
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: window.innerWidth > 768, // Only desktop
            powerPreference: 'low-power' // Avoid black screen on mid laptops
        });

        // ✅ CRITICAL: Pixel ratio cap at 1 (Safe for all GPUs)
        renderer.setPixelRatio(1);
        renderer.setSize(container.clientWidth, container.clientHeight);

        // ✅ CRITICAL: Shadows OFF (FPS saver)
        renderer.shadowMap.enabled = false;

        // Professional settings (Stable sweet spot)
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05; // ✅ stable sweet spot
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.physicallyCorrectLights = true;

        container.appendChild(renderer.domElement);

        // ✅ CRITICAL: WebGL Context Lost Handler (prevents permanent black screen)
        const canvas = renderer.domElement;

        canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('⚠️ WebGL context lost. Reducing quality...');
            const loadingText = document.getElementById('loading-text');
            if (loadingText) {
                loadingText.innerHTML = '<span class="text-yellow-500">⚠️ GPU overloaded. Reloading...</span>';
            }
        }, false);

        canvas.addEventListener('webglcontextrestored', () => {
            console.log('✅ WebGL context restored. Reloading page...');
            setTimeout(() => window.location.reload(), 1000);
        }, false);

        threeJSInitialized = true;
        console.log('✅ Three.js renderer created successfully');

    } catch (error) {
        console.error('❌ Failed to create WebGL renderer:', error);
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            loadingText.textContent = '3D rendering unavailable. Please try refreshing.';
            loadingText.classList.remove('animate-pulse');
            loadingText.classList.add('text-red-500');
        }
        return;
    }

    // Set white background
    // ✅ WHITE BACKGROUND
    scene.background = new THREE.Color("#ffffff");

    // ✅ BALANCED STUDIO LIGHTING (4-Light Setup)

    // Ambient (base brightness)
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Key Light (main)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(3, 5, 6);
    scene.add(keyLight);

    // Fill Light (soft)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // Rim Light (back edge glow)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    console.log('✅ Balanced Studio Lighting Setup applied');

    // Create Circular Platform
    const platformGeometry = new THREE.CylinderGeometry(2, 2, 0.15, 64);
    const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.3,      // ✅ Reduced reflection
        roughness: 0.65,     // ✅ Calmer appearance
        transparent: true,
        opacity: 0.85        // ✅ Less intense
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(0, -1.8, 0);
    platform.receiveShadow = true;
    platform.castShadow = true;
    scene.add(platform);

    // Add platform glow ring
    const ringGeometry = new THREE.TorusGeometry(2, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 1 // ✅ Full opacity for better platform definition
    });
    const glowRing = new THREE.Mesh(ringGeometry, ringMaterial);
    glowRing.position.set(0, -1.73, 0);
    glowRing.rotation.x = Math.PI / 2;
    scene.add(glowRing);


    // GLTF Loader for Mech Model
    const loader = new THREE.GLTFLoader();
    let model; // Reference to the loaded model

    // GLTF model path (switched from GLB)
    const modelPath = 'assets/3d_model/mech_kaino.gltf';

    console.log('Attempting to load model from:', modelPath);

    loader.load(modelPath,
        // Success callback
        (gltf) => {
            model = gltf.scene;

            console.log('✅ Model loaded successfully!', model);

            // ✅ INDEPENDENT BRIGHTNESS CONTROL (Arms & Body Separate)

            // Keywords to identify arm parts
            const ARM_KEYWORDS = ["arm", "weapon", "gun", "cannon", "barrel"];

            // 🎨 TUNE THESE VALUES INDEPENDENTLY:
            const ARM_BRIGHTNESS = 2.0;   // Arms brightness (1.0=normal, 1.3=brighter)
            const BODY_BRIGHTNESS = 1.05;  // Body/legs brightness (1.0=normal, 1.2=brighter)

            model.traverse((obj) => {
                if (!obj.isMesh) return;

                obj.castShadow = false;
                obj.receiveShadow = false;

                const mat = obj.material;
                if (!mat) return;

                // Check if this is an arm part
                const meshName = (obj.name || "").toLowerCase();
                const isArmPart = ARM_KEYWORDS.some(keyword => meshName.includes(keyword));

                // Handle multi-material
                const materials = Array.isArray(mat) ? mat : [mat];

                materials.forEach((m) => {
                    // ✅ Correct color space for textures (ALL parts)
                    if (m.map) {
                        m.map.colorSpace = THREE.SRGBColorSpace;
                        m.map.needsUpdate = true;
                    }

                    // ✅ CRITICAL: Disable AO map darkening (ALL parts)
                    if (m.aoMap) {
                        m.aoMapIntensity = 0.0;
                    }

                    // ✅ ARMS: Apply arm-specific brightness
                    if (isArmPart) {
                        console.log(`🔫 Arm part detected: ${meshName}`);

                        // Black materials don't brighten with color multiply
                        // So we add EMISSIVE glow instead
                        if (m.emissive) {
                            // Convert ARM_BRIGHTNESS to emissive intensity
                            const emissiveIntensity = (ARM_BRIGHTNESS - 1.0) * 0.5;
                            m.emissive.setHex(0xffffff);
                            m.emissiveIntensity = Math.max(0, emissiveIntensity);
                        }

                        // Also try color multiply (works if arms have texture)
                        if (m.color) {
                            m.color.multiplyScalar(ARM_BRIGHTNESS);
                        }

                        // Arm material settings
                        if (typeof m.roughness === "number") {
                            m.roughness = 0.45;
                        }
                        if (typeof m.metalness === "number") {
                            m.metalness = 0.35;
                        }
                        m.envMapIntensity = 0.60;

                        m.needsUpdate = true;
                        return;
                    }

                    // ✅ BODY + LEGS: Apply body-specific brightness
                    if (m.color) {
                        m.color.multiplyScalar(BODY_BRIGHTNESS);
                    }

                    // Body material tuning
                    if (typeof m.roughness === "number") {
                        m.roughness = 0.60;
                    }

                    if (typeof m.metalness === "number") {
                        m.metalness = 0.25;
                    }

                    m.envMapIntensity = 0.40;

                    m.needsUpdate = true;
                });
            });

            // Hide Loading Text
            const loadingText = document.getElementById('loading-text');
            if (loadingText) loadingText.style.display = 'none';

            // ✅ Auto scale & center
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            model.position.x += (model.position.x - center.x);
            model.position.y += (model.position.y - center.y);
            model.position.z += (model.position.z - center.z);

            // ✅ Mobile-responsive scaling
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetScale = isMobile ? 2.8 : 3.8; // Desktop: larger for prominence
            const scale = targetScale / maxDim;
            model.scale.set(scale, scale, scale);

            // ✅ Place on platform
            const boxFinal = new THREE.Box3().setFromObject(model);
            const bottomY = boxFinal.min.y;
            const targetY = -1.8;
            model.position.y += (targetY - bottomY);

            model.position.x = 0;
            model.position.z = 0;

            scene.add(model);
            console.log('✅ Model added to scene!');
        },
        // Progress callback
        (xhr) => {
            if (xhr.total > 0) {
                const percent = ((xhr.loaded / xhr.total) * 100).toFixed(1);
                console.log('Loading:', percent + '%');
            }
        },
        // Error callback
        (error) => {
            console.error('❌ Error loading model:', error);
            console.error('Attempted path:', modelPath);
            console.error('Error details:', error.message);

            const loadingText = document.getElementById('loading-text');
            if (loadingText) {
                loadingText.textContent = `Error: Model failed to load. Check console (F12) for details.`;
                loadingText.classList.remove('animate-pulse');
                loadingText.classList.add('text-red-500');
            }
        });

    // ✅ MOUSE ROTATION (Y-axis only)
    let targetRotation = 0;

    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        targetRotation = x * 0.8; // Rotation range
    });

    // ✅ CRITICAL: 30 FPS CAP (smooth UI + scroll)
    let last = 0;

    // ✅ 5) PERFORMANCE: Visibility Check
    let isVisible = true;
    document.addEventListener("visibilitychange", () => {
        isVisible = !document.hidden;
    });

    function animate(timestamp) {
        requestAnimationFrame(animate);

        if (!isVisible) return; // Stop rendering when hidden

        // ✅ FPS cap at 30 (33ms per frame)
        if (timestamp - last < 33) return;
        last = timestamp;

        // Update rotation based on mouse (smooth rotation only)
        if (model) {
            model.rotation.y += (targetRotation - model.rotation.y) * 0.05;
        }

        // Render scene
        renderer.render(scene, camera);
    }

    // Start animation loop
    animate(0);
    console.log('✅ Animation loop started (30 FPS capped)');

    // Handle Resize + Mobile Orientation Change
    window.addEventListener('resize', () => {
        // Update camera aspect
        camera.aspect = container.clientWidth / container.clientHeight;

        // ✅ Update FOV and position for mobile orientation changes
        const isNowMobile = window.innerWidth < 768;
        camera.fov = isNowMobile ? 60 : 50;
        camera.position.z = isNowMobile ? 6 : 5;

        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
};

// ------------------------------------------------------------------
// GSAP ANIMATIONS - Hero Only (Projects Disabled for Performance)
// ------------------------------------------------------------------
const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Stagger - Smooth entrance (ONLY)
    gsap.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.2
    });

    // ✅ PROJECT CARDS ANIMATIONS DISABLED FOR SMOOTH PERFORMANCE
    // Projects will appear immediately without animation
};

// ------------------------------------------------------------------
// ✅ SMOOTH SCROLL BEHAVIOR
// ------------------------------------------------------------------
const enableSmoothScroll = () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ------------------------------------------------------------------
// PROFESSIONAL INITIALIZATION SEQUENCE
// ------------------------------------------------------------------
let initialized = false;

document.addEventListener('DOMContentLoaded', () => {
    if (initialized) {
        console.warn('Already initialized, skipping...');
        return;
    }

    initialized = true;
    console.log('🚀 Initializing portfolio...');

    try {
        // 1. Initialize 3D robot (with error handling built-in)
        initThreeJS();

        // 2. Initialize smooth animations
        initAnimations();

        // 3. Enable smooth scroll
        enableSmoothScroll();

        // 4. Mobile Menu Toggle
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }

        console.log('✅ Portfolio initialized successfully');

    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// ✅ PREVENT PAGE RELOAD ON HASH CHANGES (Smoother navigation)
window.addEventListener('hashchange', (e) => {
    e.preventDefault();
}, false);