"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, Sparkles, ArrowRight, Stars, Zap, Brain } from "lucide-react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }))
    setParticles(newParticles)

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${15 + mousePosition.x * 0.015}%`,
            bottom: `${20 + mousePosition.y * 0.015}%`,
            transform: "translate(50%, 50%)",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-500/25 to-orange-500/25 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${60 + mousePosition.x * 0.01}%`,
            top: `${60 + mousePosition.y * 0.01}%`,
            transform: "translate(-50%, -50%)",
            animationDelay: "2s",
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo with magical effect */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full blur-xl opacity-75 animate-pulse scale-150" />
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 p-6 rounded-full inline-block">
              <GraduationCap className="h-16 w-16 text-white animate-bounce" />
            </div>

            {/* Sparkles around logo */}
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-spin" />
            <Stars className="absolute -bottom-2 -left-2 h-5 w-5 text-blue-400 animate-pulse" />
            <Zap className="absolute top-4 -left-8 h-4 w-4 text-purple-400 animate-ping" />
            <Brain className="absolute -top-4 left-8 h-5 w-5 text-emerald-400 animate-bounce" />
          </div>

          {/* Title with magical text effect */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent animate-pulse bg-300% animate-gradient">
              StudyMate
            </span>

            {/* Glowing text shadow */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">
              StudyMate
            </span>
          </h1>

          {/* Magical description */}
          <div className="mb-12 relative">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              <span className="inline-block animate-pulse">✨</span> Votre compagnon d'études intelligent qui transforme
              l'apprentissage en une expérience magique <span className="inline-block animate-pulse">🚀</span>
            </p>

            {/* Floating words */}
            <div
              className="absolute -top-8 left-1/4 text-blue-400 text-sm animate-bounce opacity-70"
              style={{ animationDelay: "0.5s" }}
            >
              Intelligence
            </div>
            <div
              className="absolute -top-6 right-1/4 text-purple-400 text-sm animate-bounce opacity-70"
              style={{ animationDelay: "1s" }}
            >
              Innovation
            </div>
            <div
              className="absolute -bottom-8 left-1/3 text-emerald-400 text-sm animate-bounce opacity-70"
              style={{ animationDelay: "1.5s" }}
            >
              Réussite
            </div>
          </div>

          {/* Magical CTA Button */}
          <div className="relative inline-block group">
            {/* Button glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />

            <Button
              size="lg"
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white text-xl px-12 py-6 rounded-full font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
              onClick={() => (window.location.href = "/auth")}
            >
              <Sparkles className="mr-3 h-6 w-6 animate-spin" />
              Découvrir la magie
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Magical subtitle */}
          <p className="mt-8 text-gray-400 text-lg animate-pulse">Spécialement conçu pour les étudiants ENSA CP2 S4</p>
        </div>
      </div>

      {/* Bottom magical elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/50 to-transparent" />

      {/* Shooting stars */}
      <div
        className="absolute top-1/4 left-0 w-2 h-2 bg-white rounded-full animate-ping opacity-60"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-60"
        style={{ animationDelay: "4s" }}
      />
    </div>
  )
}
