import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    const count = 500
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color: 0x19c8d6,
      size: 0.045,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      points.rotation.y = clock.getElapsedTime() * 0.005
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}
