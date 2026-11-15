<template>
  <div class="container">
    <div class="background"></div>
    
    <q-banner class="overlay-banner" dense>
      <div class="banner-container">
        <h4 class="banner-text">RIYA THOMAS</h4>

        <div id="brain-canvas" class="brain-canvas-container"></div>
        
        <div class="nav-links">
          <q-btn
            v-for="item in navItems"
            :key="item.label"
            flat
            no-caps
            rounded
            class="nav-btn"
            :to="item.to"
            router
          >
            {{ item.label }}
          </q-btn>
        </div>

        <div class="social-links">
          <q-btn
            flat
            round
            class="social-btn"
            href="mailto:riya.thomas@northwestern.edu"
            target="_blank"
          >
            <img :src="require('@/assets/imgs/email.svg')" alt="Email" style="width: 55px; height: 55px;" />
          </q-btn>
          <q-btn
            flat
            round
            class="social-btn"
            href="https://www.linkedin.com/in/riya-thomas-bb3163168/"
            target="_blank"
          >
            <img :src="require('@/assets/imgs/linkedin.svg')" alt="LinkedIn" style="width: 56px; height: 56px;" />
          </q-btn>
          <q-btn
            flat
            round
            class="social-btn"
            href="https://scholar.google.com/citations?user=4Ii8mJwAAAAJ&hl=en"
            target="_blank"
          >
            <img :src="require('@/assets/imgs/google-scholar.svg')" alt="Google Scholar" style="width: 54px; height: 54px; transform: translateX(-3px);" />
          </q-btn>
          <q-btn
            flat
            round
            class="social-btn dark-mode-toggle"
            @click="toggleDarkMode"
          >
            <div class="icon-flip-container" :class="{ flipped: isDarkMode }">
              <div class="icon-face icon-front">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="5"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="5" y2="12"/>
                  <line x1="19" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <div class="icon-face icon-back">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </div>
            </div>
          </q-btn>
        </div>
      </div>
    </q-banner>
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

export default {
  name: 'HomeView',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      navItems: [
        { label: 'ABOUT', to: '/about' },
        { label: 'PUBLICATIONS', to: '/publications' },
        { label: 'PRESENTATIONS', to: '/presentations' },
        { label: 'CV', to: '/cv' },
        { label: 'RESOURCES', to: '/resources' }
      ],
      isDragging: false,
      previousMousePosition: { x: 0, y: 0 },
    };
  },
  mounted() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.brain = null;
    this.brainMesh = null;
    
    this.initThreeJS();
    this.loadBrainModel();
    this.animate();
    this.setupMouseControls();
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    this.isUnmounted = true;
    cancelAnimationFrame(this.animationId);
    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((m) => m.dispose());
        }
        if (obj.isInstancedMesh) obj.dispose();
      });
      this.scene.clear();
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer.domElement.remove();
    }
  },
  methods: {
    initThreeJS() {
      const container = document.getElementById('brain-canvas');
      
      this.scene = new THREE.Scene();
      
      this.camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.z = 5;
      
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
      });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor(0x000000, 0);
      container.appendChild(this.renderer.domElement);
      
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      pointLight.position.set(5, 5, 5);
      this.scene.add(pointLight);
      
      const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
      pointLight2.position.set(-5, -5, -5);
      this.scene.add(pointLight2);
    },
    
    loadBrainModel() {
      this.brain = new THREE.Group();
      
      const loader = new GLTFLoader();
      
      loader.load(
        '/models/brain.glb',
        (gltf) => {
          if (this.isUnmounted) return;
          this.brainMesh = gltf.scene;
          
          this.brainMesh.traverse((child) => {
            if (child.isMesh) {
              if (child.geometry) {
                const originalGeometry = child.geometry;
                const positions = originalGeometry.attributes.position;
                
                if (positions) {
                  const simplifiedPositions = [];
                  const step = 1;
                  
                  for (let i = 0; i < positions.count; i += step) {
                    simplifiedPositions.push(
                      positions.getX(i),
                      positions.getY(i),
                      positions.getZ(i)
                    );
                  }
                  
                  const simplifiedGeometry = new THREE.BufferGeometry();
                  simplifiedGeometry.setAttribute(
                    'position',
                    new THREE.Float32BufferAttribute(simplifiedPositions, 3)
                  );
                  
                  child.geometry = simplifiedGeometry;
                }
              }
              
              const wireframeMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
                wireframe: true,
                transparent: true,
                opacity: 0.0
              });
              child.material = wireframeMaterial;
              child.visible = false;
            }
          });
          
          this.brain.scale.set(3, 3, 3);
          this.brain.add(this.brainMesh);
          this.brain.rotation.set(0, Math.PI / 2, 0);
          
          this.addNodesFromMesh();
          
          this.scene.add(this.brain);
        },
        undefined,
        (error) => {
          console.error('Error loading brain model:', error);
          if (this.isUnmounted) return;
          this.createProceduralBrain();
        }
      );
    },
    
    addNodesFromMesh() {
      if (!this.brainMesh) return;

      const nodes = [];
      const nodeCount = 700;

      this.brainMesh.traverse((child) => {
        if (!child.isMesh) return;

        const sampler = new MeshSurfaceSampler(child).build();

        const tempPosition = new THREE.Vector3();
        const tempNormal = new THREE.Vector3();

        for (let i = 0; i < nodeCount; i++) {
          sampler.sample(tempPosition, tempNormal);

          const outwardOffset = 0.003 + Math.random() * 0.0005;
          tempPosition.addScaledVector(tempNormal, outwardOffset);

          child.localToWorld(tempPosition);
          this.brain.worldToLocal(tempPosition);

          nodes.push(tempPosition.clone());
        }
      });

      this.brain.add(this.createNodeInstances(nodes, 0.004, 0x111111));
      this.connectNodes(nodes);
    },

    // One InstancedMesh (1 draw call) instead of one Mesh per node
    createNodeInstances(positions, radius, emissive) {
      const geometry = new THREE.SphereGeometry(radius, 8, 8);
      const material = new THREE.MeshPhongMaterial({ color: 0x000000, emissive });
      const instances = new THREE.InstancedMesh(geometry, material, positions.length);

      const matrix = new THREE.Matrix4();
      positions.forEach((p, i) => {
        matrix.makeTranslation(p.x, p.y, p.z);
        instances.setMatrixAt(i, matrix);
      });
      instances.instanceMatrix.needsUpdate = true;

      return instances;
    },

    createLineSegments(coords) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
      const material = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.25
      });
      return new THREE.LineSegments(geometry, material);
    },

    connectNodes(nodes) {
      const maxDistance = 0.2;
      const maxConnections = 3;
      const coords = [];

      for (let i = 0; i < nodes.length; i++) {
        let connections = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          if (connections >= maxConnections) break;

          const distance = nodes[i].distanceTo(nodes[j]);

          if (distance < maxDistance && Math.abs(nodes[i].z - nodes[j].z) < 0.15) {
            coords.push(
              nodes[i].x, nodes[i].y, nodes[i].z,
              nodes[j].x, nodes[j].y, nodes[j].z
            );
            connections++;
          }
        }
      }

      this.brain.add(this.createLineSegments(coords));
    },

    createProceduralBrain() {
      this.brain = new THREE.Group();
      
      const nodes = [];
      const nodeCount = 300;
      
      for (let i = 0; i < nodeCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const u = Math.random();
        const phi = Math.acos(2 * u - 1);
        
        const radiusX = 1.5;
        const radiusY = 1.2;
        const radiusZ = 1.8;
        
        const x = radiusX * Math.sin(phi) * Math.cos(theta);
        const y = radiusY * Math.sin(phi) * Math.sin(theta);
        const z = radiusZ * Math.cos(phi);
        
        nodes.push(new THREE.Vector3(x, y, z));
      }

      this.brain.add(this.createNodeInstances(nodes, 0.02, 0x000000));

      const coords = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].distanceTo(nodes[j]);

          if (distance < 0.8) {
            coords.push(
              nodes[i].x, nodes[i].y, nodes[i].z,
              nodes[j].x, nodes[j].y, nodes[j].z
            );
          }
        }
      }
      this.brain.add(this.createLineSegments(coords));

      this.scene.add(this.brain);
    },
    
    setupMouseControls() {
      const container = document.getElementById('brain-canvas');
      
      container.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      });
      
      container.addEventListener('mousemove', (e) => {
        if (this.isDragging) {
          const deltaX = e.clientX - this.previousMousePosition.x;
          const deltaY = e.clientY - this.previousMousePosition.y;
          
          this.brain.rotation.y += deltaX * 0.01;
          this.brain.rotation.x += deltaY * 0.01;
          
          this.previousMousePosition = { x: e.clientX, y: e.clientY };
        }
      });
      
      container.addEventListener('mouseup', () => {
        this.isDragging = false;
      });
      
      container.addEventListener('mouseleave', () => {
        this.isDragging = false;
      });
      
      container.addEventListener('touchstart', (e) => {
        this.isDragging = true;
        this.previousMousePosition = { 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        };
      });
      
      container.addEventListener('touchmove', (e) => {
        if (this.isDragging) {
          const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
          const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
          
          this.brain.rotation.y += deltaX * 0.01;
          this.brain.rotation.x += deltaY * 0.01;
          
          this.previousMousePosition = { 
            x: e.touches[0].clientX, 
            y: e.touches[0].clientY 
          };
        }
      });
      
      container.addEventListener('touchend', () => {
        this.isDragging = false;
      });
    },
    
    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      
      if (!this.isDragging && this.brain) {
        this.brain.rotation.y += 0.002;
      }
      
      this.renderer.render(this.scene, this.camera);
    },
    
    onWindowResize() {
      const container = document.getElementById('brain-canvas');
      if (container && this.camera && this.renderer) {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
      }
    },

    toggleDarkMode() {
      this.$emit('toggle-dark-mode')
    },
  }
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: white;
}

.background {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.95;
}

.overlay-banner {
  background: transparent !important;
  position: relative;
  z-index: 2;
  border: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.overlay-banner .q-banner__content {
  padding: 0 !important;
}

.q-banner {
  box-shadow: none !important;
}

.banner-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.5rem;
  position: relative;
}

.banner-text {
  font-size: 3.2rem;
  font-family: Avenir, "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif;
  letter-spacing: 0.27em;
  word-spacing: 1rem;
  color: #000;
  margin: 0 0 1.8rem 0;
  font-weight: 300;
}

.nav-links {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
}

.nav-btn {
  font-family: Avenir, "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1rem !important;
  letter-spacing: 0.12em;
  color: #000;
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;
  border: none;
  border-radius: 30px;
  padding: 0.9rem 2.5rem !important;
  min-width: 220px !important;
  min-height: 50px !important;
  justify-content: flex-start;
  position: relative;
  background: white;
}

.nav-btn .q-btn__content {
  font-size: 1.1rem !important;
}

.nav-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 30px;
  padding: 1.5px;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.3) 0%, 
    rgba(0, 0, 0, 0.5) 25%,
    rgba(0, 0, 0, 0.65) 50%,
    rgba(0, 0, 0, 0.8) 75%,
    rgba(0, 0, 0, 0.95) 100%
  );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.nav-btn:hover {
  opacity: 1;
  transform: translateX(5px);
  background-color: rgba(0, 0, 0, 0.03);
}

.social-links {
  position: absolute;
  bottom: 10%;
  right: 10%;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-btn {
  width: 75px !important;
  height: 75px !important;
  border-radius: 50%;
  color: #000;
  transition: all 0.2s ease;
}

.social-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.9);
  transform: translateY(-3px);
}

.brain-canvas-container {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  cursor: grab;
  z-index: 1;
}

.brain-canvas-container:active {
  cursor: grabbing;
}

.dark-mode-toggle {
  perspective: 600px;
  overflow: visible !important;
}

.icon-flip-container {
  width: 42px;
  height: 42px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-flip-container.flipped {
  transform: rotateY(180deg);
}

.icon-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.icon-back {
  transform: rotateY(180deg);
}

body.dark-mode {
  background-color: #0f0f0f !important;
}

body.dark-mode .container {
  background: #0f0f0f !important;
}

body.dark-mode .banner-text,
body.dark-mode .nav-btn,
body.dark-mode .social-btn {
  color: #e8e8e8 !important;
}

body.dark-mode .nav-btn {
  background: #1a1a1a !important;
}

body.dark-mode .nav-btn::before {
  background: linear-gradient(135deg,
    rgba(255,255,255,0.1) 0%,
    rgba(255,255,255,0.3) 50%,
    rgba(255,255,255,0.5) 100%
  );
}

body.dark-mode .social-btn {
  border-color: rgba(255,255,255,0.4) !important;
}

body.dark-mode .social-btn:hover {
  background-color: rgba(255,255,255,0.07) !important;
  border-color: rgba(255,255,255,0.8) !important;
}

body.dark-mode .social-btn svg {
  stroke: #e8e8e8;
}

.social-btn svg {
  stroke: #000;
  transition: stroke 0.3s ease;
}

body.dark-mode .brain-canvas-container canvas {
  filter: invert(1);
}

body.dark-mode .social-btn img {
  filter: invert(1);
}
</style>
