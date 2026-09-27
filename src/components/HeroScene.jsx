import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function HeroScene({ containerRef }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const ambientLight = new THREE.AmbientLight(0x0a2a4a)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0x00cfff, 2)
    dirLight.position.set(2, 3, 4)
    scene.add(dirLight)
    const dirLight2 = new THREE.DirectionalLight(0x00ff41, 1)
    dirLight2.position.set(-3, -1, 2)
    scene.add(dirLight2)

    const shieldGroup = new THREE.Group()
    const shieldGeo = new THREE.OctahedronGeometry(1.4, 0)
    const shieldMat = new THREE.MeshPhongMaterial({
      color: 0x00cfff,
      emissive: 0x002a4d,
      emissiveIntensity: 0.3,
      shininess: 60,
    })
    const shield = new THREE.Mesh(shieldGeo, shieldMat)
    shieldGroup.add(shield)

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00ff41,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const wireframe = new THREE.Mesh(shieldGeo.clone(), wireframeMat)
    wireframe.scale.set(1.15, 1.15, 1.15)
    shieldGroup.add(wireframe)

    const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 12, 32)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.35 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    shieldGroup.add(ring)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2, 0.02, 8, 32), ringMat.clone())
    ring2.material.color.setHex(0x00ff41)
    ring2.rotation.z = Math.PI / 3
    ring2.rotation.x = Math.PI / 3
    shieldGroup.add(ring2)
    scene.add(shieldGroup)

    const particlesGeo = new THREE.BufferGeometry()
    const pc = 600
    const pos = new Float32Array(pc * 3)
    for (let i = 0; i < pc * 3; i++) pos[i] = (Math.random() - 0.5) * 30
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const particles = new THREE.Points(
      particlesGeo,
      new THREE.PointsMaterial({ color: 0x00cfff, size: 0.04, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
    )
    scene.add(particles)

    const floats = []
    for (let i = 0; i < 12; i++) {
      const s = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.12, 0.12),
        new THREE.MeshBasicMaterial({ color: 0x00ff41, wireframe: true, transparent: true, opacity: 0.15 + Math.random() * 0.2 })
      )
      s.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6 - 3)
      s.userData = { speed: 0.2 + Math.random() * 0.3, rotSpeed: 0.005 + Math.random() * 0.015 }
      scene.add(s)
      floats.push(s)
    }

    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      shieldGroup.rotation.y = t * 0.3 + mouseRef.current.x * 0.3
      shieldGroup.rotation.x = Math.sin(t * 0.2) * 0.15 + mouseRef.current.y * 0.2
      shieldGroup.rotation.z = Math.sin(t * 0.15) * 0.1
      ring.rotation.z = t * 0.4
      ring2.rotation.y = t * 0.5
      particles.rotation.y = t * 0.02
      floats.forEach((s, i) => {
        s.position.x += Math.sin(t * s.userData.speed + i) * 0.002
        s.position.y += Math.cos(t * s.userData.speed * 0.7 + i * 2) * 0.002
        s.rotation.x += s.userData.rotSpeed
        s.rotation.y += s.userData.rotSpeed * 1.3
      })
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
    }
    const onMouse = (e) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5
    }
    window.addEventListener('resize', onResize)
    container.addEventListener('mousemove', onMouse)

    return () => {
      window.removeEventListener('resize', onResize)
      container.removeEventListener('mousemove', onMouse)
      renderer.dispose()
    }
  }, [containerRef])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
