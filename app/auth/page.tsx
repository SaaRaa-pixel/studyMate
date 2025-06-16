"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Sparkles, Shield } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    window.location.href = "/student-form"
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${30 + mousePosition.x * 0.02}%`,
            top: `${20 + mousePosition.y * 0.02}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${25 + mousePosition.x * 0.015}%`,
            bottom: `${30 + mousePosition.y * 0.015}%`,
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Retour à l'accueil */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm"
        onClick={() => (window.location.href = "/")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl bg-white/95 backdrop-blur-xl border-0 overflow-hidden">
          {/* Header avec effet de lueur */}
          <CardHeader className="text-center space-y-4 bg-gradient-to-r from-blue-50 to-purple-50 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 rounded-full w-fit mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-50 animate-pulse" />
                <GraduationCap className="h-10 w-10 text-white relative z-10" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-spin" />
              </div>
            </div>

            <div className="relative">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {isLogin ? "Bienvenue !" : "Rejoignez-nous !"}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {isLogin
                  ? "Connectez-vous à votre univers d'apprentissage"
                  : "Créez votre compte StudyMate personnalisé"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    Nom complet
                  </Label>
                  <div className="relative group">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                      required={!isLogin}
                    />
                    <User className="absolute left-4 top-4 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  Email ENSA
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre.nom@ensa.ac.ma"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                    required
                  />
                  <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-blue-600" />
                  Mot de passe
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-12 pr-12 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                    required
                  />
                  <Lock className="absolute left-4 top-4 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative group">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-12 pr-12 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                      required={!isLogin}
                    />
                    <Shield className="absolute left-4 top-4 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                <Button
                  type="submit"
                  className="relative w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                  {isLogin ? "Se connecter" : "Créer mon compte"}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    {isLogin ? "Nouveau sur StudyMate ?" : "Déjà membre ?"}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold transition-all duration-300"
              >
                {isLogin ? "Créer un compte gratuitement" : "Se connecter à mon compte"}
              </Button>

              {isLogin && (
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Mot de passe oublié ?
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
