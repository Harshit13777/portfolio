'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type SectionType = 
  | 'hero' 
  | 'skills' 
  | 'projects' 
  | 'services' 
  | 'experience' 
  | 'feedback' 
  | 'cta';

interface Props {
  activeSection: SectionType;
  scrollVelocity?: number;
}

// Section color themes
const THEME_COLORS: Record<SectionType, number> = {
  hero: 0x10b981,        // Emerald
  skills: 0x8b5cf6,      // Violet/Purple
  projects: 0x38bdf8,    // Cyan/Sky
  services: 0xf59e0b,    // Amber
  experience: 0x3b82f6,  // Ice Blue
  feedback: 0xeab308,    // Warm Gold
  cta: 0xec4899,         // Pink/Aurora
};

export function ThreeAvatarCanvas({ activeSection }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 160;
    const height = container.clientHeight || 180;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 4.2);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(THEME_COLORS[activeSection] || 0x10b981, 2.8, 6);
    pointLight.position.set(0, 0.2, 0.9);
    scene.add(pointLight);

    // 3. Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.85,
    });

    const whiteArmorMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      metalness: 0.35,
    });

    const goldJointMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.2,
      metalness: 0.9,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.05,
      metalness: 0.95,
    });

    const glowColor = new THREE.Color(THEME_COLORS[activeSection]);
    const glowMat = new THREE.MeshBasicMaterial({
      color: glowColor,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      wireframe: true,
    });

    // 4. Hierarchical Robot Model
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    // Torso Group
    const torsoGroup = new THREE.Group();
    robotRoot.add(torsoGroup);

    // Chest Body
    const chestGeo = new THREE.CylinderGeometry(0.35, 0.22, 0.7, 16);
    const chestMesh = new THREE.Mesh(chestGeo, whiteArmorMat);
    torsoGroup.add(chestMesh);

    // Dark Neck Collar
    const collarGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.12, 16);
    const collarMesh = new THREE.Mesh(collarGeo, chassisMat);
    collarMesh.position.y = 0.4;
    torsoGroup.add(collarMesh);

    // Glowing Core Arc Reactor
    const coreGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const coreMesh = new THREE.Mesh(coreGeo, glowMat);
    coreMesh.position.set(0, 0.05, 0.24);
    torsoGroup.add(coreMesh);

    // Core Ring
    const coreRingGeo = new THREE.TorusGeometry(0.15, 0.02, 8, 24);
    const coreRingMesh = new THREE.Mesh(coreRingGeo, goldJointMat);
    coreRingMesh.position.set(0, 0.05, 0.24);
    torsoGroup.add(coreRingMesh);

    // Thruster Base Ring
    const thrusterGeo = new THREE.TorusGeometry(0.25, 0.05, 12, 24);
    const thrusterMesh = new THREE.Mesh(thrusterGeo, chassisMat);
    thrusterMesh.rotation.x = Math.PI / 2;
    thrusterMesh.position.y = -0.4;
    torsoGroup.add(thrusterMesh);

    const thrusterGlowGeo = new THREE.CylinderGeometry(0.18, 0.02, 0.35, 16);
    const thrusterGlowMesh = new THREE.Mesh(thrusterGlowGeo, glowMat);
    thrusterGlowMesh.position.y = -0.55;
    torsoGroup.add(thrusterGlowMesh);

    // Head Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.65, 0);
    robotRoot.add(headGroup);

    // Helmet
    const helmetGeo = new THREE.SphereGeometry(0.36, 24, 24);
    helmetGeo.scale(1, 0.95, 1.05);
    const helmetMesh = new THREE.Mesh(helmetGeo, whiteArmorMat);
    headGroup.add(helmetMesh);

    // Visor Shield
    const visorGeo = new THREE.SphereGeometry(0.32, 24, 16, 0, Math.PI, 0, Math.PI * 0.55);
    visorGeo.rotateX(Math.PI / 4);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.1);
    headGroup.add(visorMesh);

    // Glowing Eye Line / Pupils
    const leftEyeGeo = new THREE.CapsuleGeometry(0.04, 0.08, 8, 12);
    leftEyeGeo.rotateZ(Math.PI / 2);
    const leftEyeMesh = new THREE.Mesh(leftEyeGeo, glowMat);
    leftEyeMesh.position.set(-0.11, 0.04, 0.34);
    headGroup.add(leftEyeMesh);

    const rightEyeGeo = new THREE.CapsuleGeometry(0.04, 0.08, 8, 12);
    rightEyeGeo.rotateZ(Math.PI / 2);
    const rightEyeMesh = new THREE.Mesh(rightEyeGeo, glowMat);
    rightEyeMesh.position.set(0.11, 0.04, 0.34);
    headGroup.add(rightEyeMesh);

    // Antenna
    const antennaStemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8);
    const antennaStem = new THREE.Mesh(antennaStemGeo, chassisMat);
    antennaStem.position.set(0, 0.42, -0.05);
    headGroup.add(antennaStem);

    const antennaTipGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const antennaTip = new THREE.Mesh(antennaTipGeo, glowMat);
    antennaTip.position.set(0, 0.54, -0.05);
    headGroup.add(antennaTip);

    // Ear Pods
    const earGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
    earGeo.rotateZ(Math.PI / 2);
    const leftEar = new THREE.Mesh(earGeo, goldJointMat);
    leftEar.position.set(-0.36, 0.02, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, goldJointMat);
    rightEar.position.set(0.36, 0.02, 0);
    headGroup.add(rightEar);

    // ARMS HIERARCHY
    // Left Arm
    const leftShoulderGroup = new THREE.Group();
    leftShoulderGroup.position.set(-0.42, 0.25, 0);
    robotRoot.add(leftShoulderGroup);

    const shoulderJointL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), goldJointMat);
    leftShoulderGroup.add(shoulderJointL);

    const upperArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.28, 12), chassisMat);
    upperArmL.position.y = -0.14;
    leftShoulderGroup.add(upperArmL);

    const leftElbowGroup = new THREE.Group();
    leftElbowGroup.position.y = -0.28;
    leftShoulderGroup.add(leftElbowGroup);

    const forearmL = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.28, 12), whiteArmorMat);
    forearmL.position.y = -0.14;
    leftElbowGroup.add(forearmL);

    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), goldJointMat);
    handL.position.y = -0.3;
    leftElbowGroup.add(handL);

    // Right Arm
    const rightShoulderGroup = new THREE.Group();
    rightShoulderGroup.position.set(0.42, 0.25, 0);
    robotRoot.add(rightShoulderGroup);

    const shoulderJointR = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), goldJointMat);
    rightShoulderGroup.add(shoulderJointR);

    const upperArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.28, 12), chassisMat);
    upperArmR.position.y = -0.14;
    rightShoulderGroup.add(upperArmR);

    const rightElbowGroup = new THREE.Group();
    rightElbowGroup.position.y = -0.28;
    rightShoulderGroup.add(rightElbowGroup);

    const forearmR = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.28, 12), whiteArmorMat);
    forearmR.position.y = -0.14;
    rightElbowGroup.add(forearmR);

    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), goldJointMat);
    handR.position.y = -0.3;
    rightElbowGroup.add(handR);

    // Interactive Props
    // Holographic Tech Orb (for Skills section)
    const techOrbGeo = new THREE.IcosahedronGeometry(0.2, 1);
    const techOrbMesh = new THREE.Mesh(techOrbGeo, wireMat);
    techOrbMesh.position.set(0, 0.15, 0.55);
    techOrbMesh.visible = false;
    robotRoot.add(techOrbMesh);

    // Blueprint Tablet (for Services section)
    const tabletGeo = new THREE.BoxGeometry(0.35, 0.03, 0.45);
    const tabletMesh = new THREE.Mesh(tabletGeo, chassisMat);
    const tabletScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4), glowMat);
    tabletScreen.rotation.x = -Math.PI / 2;
    tabletScreen.position.y = 0.016;
    tabletMesh.add(tabletScreen);
    tabletMesh.position.set(-0.25, -0.05, 0.35);
    tabletMesh.rotation.set(0.4, 0.2, -0.3);
    tabletMesh.visible = false;
    robotRoot.add(tabletMesh);

    // 5. Mouse Interaction Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouse.targetX = (e.clientX - centerX) / (window.innerWidth / 2);
      mouse.targetY = (e.clientY - centerY) / (window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 160;
      const h = container.clientHeight || 180;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop with Pose State Interpolations
    let animationFrameId: number;
    let clock = new THREE.Clock();

    let targetRot = {
      headX: 0,
      headY: 0,
      rightShoulderZ: 0,
      rightShoulderX: 0,
      rightElbowX: 0,
      leftShoulderZ: 0,
      leftShoulderX: 0,
      leftElbowX: 0,
      torsoPitchX: 0,
      robotRotY: 0,
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Hover levitation
      robotRoot.position.y = Math.sin(elapsedTime * 2.5) * 0.06;

      // Thruster pulse
      const pulse = (Math.sin(elapsedTime * 10) + 1) * 0.5;
      thrusterGlowMesh.scale.set(1 + pulse * 0.2, 1 + pulse * 0.4, 1 + pulse * 0.2);

      // Section-Specific Pose Targets
      switch (activeSection) {
        case 'hero': // Friendly Waving Arm
          techOrbMesh.visible = false;
          tabletMesh.visible = false;
          targetRot.rightShoulderZ = -Math.PI * 0.75;
          targetRot.rightShoulderX = 0.2;
          targetRot.rightElbowX = -0.5 + Math.sin(elapsedTime * 8) * 0.35; // wave motion
          targetRot.leftShoulderZ = 0.2;
          targetRot.leftShoulderX = 0;
          targetRot.leftElbowX = -0.15;
          targetRot.torsoPitchX = 0;
          targetRot.robotRotY = -0.15;
          break;

        case 'skills': // Conjuring Tech Orb
          techOrbMesh.visible = true;
          tabletMesh.visible = false;
          techOrbMesh.rotation.x += 0.02;
          techOrbMesh.rotation.y += 0.03;
          targetRot.rightShoulderZ = -0.4;
          targetRot.rightShoulderX = -0.6;
          targetRot.rightElbowX = -0.8;
          targetRot.leftShoulderZ = 0.4;
          targetRot.leftShoulderX = -0.6;
          targetRot.leftElbowX = -0.8;
          targetRot.torsoPitchX = 0.05;
          targetRot.robotRotY = 0;
          break;

        case 'projects': // Laser Pointer Target Forward
          techOrbMesh.visible = false;
          tabletMesh.visible = false;
          targetRot.rightShoulderZ = -0.1;
          targetRot.rightShoulderX = -Math.PI * 0.52; // Point forward
          targetRot.rightElbowX = 0;
          targetRot.leftShoulderZ = 0.3;
          targetRot.leftShoulderX = 0.1;
          targetRot.leftElbowX = -0.3;
          targetRot.torsoPitchX = 0.08;
          targetRot.robotRotY = 0.2;
          break;

        case 'services': // Inspecting Blueprint Tablet
          techOrbMesh.visible = false;
          tabletMesh.visible = true;
          targetRot.leftShoulderZ = 0.3;
          targetRot.leftShoulderX = -0.7;
          targetRot.leftElbowX = -0.9;
          targetRot.rightShoulderZ = -0.2;
          targetRot.rightShoulderX = -0.5;
          targetRot.rightElbowX = -0.8;
          targetRot.torsoPitchX = 0.2;
          targetRot.robotRotY = -0.2;
          break;

        case 'experience': // Jetpack Flight Pitch 45 deg
          techOrbMesh.visible = false;
          tabletMesh.visible = false;
          targetRot.rightShoulderZ = 0.2;
          targetRot.rightShoulderX = 0.6;
          targetRot.rightElbowX = -0.1;
          targetRot.leftShoulderZ = -0.2;
          targetRot.leftShoulderX = 0.6;
          targetRot.leftElbowX = -0.1;
          targetRot.torsoPitchX = 0.4;
          targetRot.robotRotY = 0;
          break;

        case 'feedback': // Double Victory Arms Up
          techOrbMesh.visible = false;
          tabletMesh.visible = false;
          targetRot.rightShoulderZ = -Math.PI * 0.7;
          targetRot.rightShoulderX = 0;
          targetRot.rightElbowX = -0.6;
          targetRot.leftShoulderZ = Math.PI * 0.7;
          targetRot.leftShoulderX = 0;
          targetRot.leftElbowX = -0.6;
          targetRot.torsoPitchX = -0.05;
          targetRot.robotRotY = Math.sin(elapsedTime * 2) * 0.1;
          break;

        case 'cta': // Welcoming Handshake Gesture
        default:
          techOrbMesh.visible = false;
          tabletMesh.visible = false;
          targetRot.rightShoulderZ = -0.2;
          targetRot.rightShoulderX = -Math.PI * 0.4;
          targetRot.rightElbowX = -0.4;
          targetRot.leftShoulderZ = 0.25;
          targetRot.leftShoulderX = 0;
          targetRot.leftElbowX = -0.2;
          targetRot.torsoPitchX = 0;
          targetRot.robotRotY = -0.1;
          break;
      }

      // Smooth Joint Lerping
      rightShoulderGroup.rotation.z = THREE.MathUtils.lerp(rightShoulderGroup.rotation.z, targetRot.rightShoulderZ, 0.1);
      rightShoulderGroup.rotation.x = THREE.MathUtils.lerp(rightShoulderGroup.rotation.x, targetRot.rightShoulderX, 0.1);
      rightElbowGroup.rotation.x = THREE.MathUtils.lerp(rightElbowGroup.rotation.x, targetRot.rightElbowX, 0.1);

      leftShoulderGroup.rotation.z = THREE.MathUtils.lerp(leftShoulderGroup.rotation.z, targetRot.leftShoulderZ, 0.1);
      leftShoulderGroup.rotation.x = THREE.MathUtils.lerp(leftShoulderGroup.rotation.x, targetRot.leftShoulderX, 0.1);
      leftElbowGroup.rotation.x = THREE.MathUtils.lerp(leftElbowGroup.rotation.x, targetRot.leftElbowX, 0.1);

      torsoGroup.rotation.x = THREE.MathUtils.lerp(torsoGroup.rotation.x, targetRot.torsoPitchX, 0.08);
      robotRoot.rotation.y = THREE.MathUtils.lerp(robotRoot.rotation.y, targetRot.robotRotY + mouse.x * 0.4, 0.08);

      // Head Mouse Tracking
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mouse.x * 0.6, 0.1);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, mouse.y * 0.4, 0.1);

      // Dynamic Color Theme Shift
      const targetColor = new THREE.Color(THEME_COLORS[activeSection] || 0x10b981);
      glowMat.color.lerp(targetColor, 0.08);
      wireMat.color.lerp(targetColor, 0.08);
      pointLight.color.lerp(targetColor, 0.08);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeSection]);

  return (
    <div 
      ref={mountRef} 
      className="w-36 h-44 sm:w-40 sm:h-48 select-none" 
      style={{ touchAction: 'none' }}
    />
  );
}
