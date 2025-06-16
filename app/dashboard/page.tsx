"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  BookOpen,
  MessageCircle,
  Bell,
  Library,
  Target,
  TrendingUp,
  Settings,
  AlertCircle,
  Star,
  Brain,
  Zap,
  Coffee,
  Moon,
} from "lucide-react"

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notifications, setNotifications] = useState([
    { id: 1, type: "reminder", message: "Cours d'Algèbre 4 dans 30 minutes", time: "09:30", urgent: true },
    { id: 2, type: "book", message: "Livre 'Structures de Données' disponible", time: "09:15", urgent: false },
    { id: 3, type: "study", message: "Session d'étude recommandée: Probabilités", time: "09:00", urgent: false },
  ])

  // Données simulées basées sur le formulaire
  const studentProfile = {
    name: "Ahmed Benali",
    studentId: "CP2024001",
    energyPeak: "morning",
    concentrationTime: 45,
    stressLevel: 6,
    priorityModules: ["Algèbre 4", "Structures de Données en C", "Système d'Exploitation"],
  }

  const todaySchedule = [
    { time: "08:00", subject: "Algèbre 4", type: "cours", location: "Amphi A", status: "upcoming" },
    { time: "10:00", subject: "Pause recommandée", type: "break", location: "Cafétéria", status: "upcoming" },
    { time: "10:30", subject: "Structures de Données", type: "td", location: "Salle 12", status: "upcoming" },
    { time: "12:00", subject: "Déjeuner", type: "break", location: "Restaurant", status: "upcoming" },
    { time: "14:00", subject: "Système d'Exploitation", type: "cours", location: "Amphi B", status: "upcoming" },
    {
      time: "16:00",
      subject: "Session d'étude - Probabilités",
      type: "study",
      location: "Bibliothèque",
      status: "recommended",
    },
  ]

  const weeklyProgress = {
    "Algèbre 4": { completed: 75, total: 100, difficulty: 4 },
    "Probabilité et Statistiques": { completed: 60, total: 100, difficulty: 3 },
    "Structures de Données en C": { completed: 80, total: 100, difficulty: 5 },
    "Système d'Exploitation": { completed: 45, total: 100, difficulty: 4 },
    Analogique: { completed: 70, total: 100, difficulty: 3 },
    Numérique: { completed: 55, total: 100, difficulty: 3 },
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Bonjour"
    if (hour < 18) return "Bon après-midi"
    return "Bonsoir"
  }

  const getMotivationalMessage = () => {
    const messages = [
      "Votre pic d'énergie est maintenant ! C'est le moment idéal pour étudier.",
      "Vous progressez bien dans vos modules prioritaires !",
      "N'oubliez pas de prendre des pauses toutes les 45 minutes.",
      "Votre niveau de stress semble élevé, pensez à vous détendre.",
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">StudyMate</h1>
                <p className="text-sm text-gray-600">Dashboard Personnel</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/chat")}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat IA
              </Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/library")}>
                <Library className="h-4 w-4 mr-2" />
                Bibliothèque
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white text-xs">{notifications.length}</Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-2">
                {getGreeting()}, {studentProfile.name} ! 👋
              </h2>
              <p className="text-blue-100 mb-4">{getMotivationalMessage()}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {currentTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {currentTime.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Emploi du temps d'aujourd'hui
                </CardTitle>
                <CardDescription>Votre planning personnalisé basé sur vos préférences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-lg border-l-4 ${
                        item.status === "upcoming"
                          ? "border-blue-500 bg-blue-50"
                          : item.status === "recommended"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <div className="flex-shrink-0 w-16 text-sm font-medium text-gray-600">{item.time}</div>
                      <div className="flex-1 ml-4">
                        <h4 className="font-medium text-gray-900">{item.subject}</h4>
                        <p className="text-sm text-gray-600">{item.location}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge
                          variant={item.type === "cours" ? "default" : item.type === "study" ? "secondary" : "outline"}
                        >
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Progression hebdomadaire
                </CardTitle>
                <CardDescription>Votre avancement dans chaque module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(weeklyProgress).map(([module, progress]) => (
                    <div key={module}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{module}</h4>
                          {studentProfile.priorityModules.includes(module) && (
                            <Star className="h-4 w-4 ml-2 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{progress.completed}%</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mr-1 ${
                                  i < progress.difficulty ? "bg-red-400" : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Progress value={progress.completed} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">Objectifs atteints</span>
                  </div>
                  <span className="font-semibold">12/15</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">Heures d'étude</span>
                  </div>
                  <span className="font-semibold">28h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="text-sm">Livres lus</span>
                  </div>
                  <span className="font-semibold">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                    <span className="text-sm">Niveau d'énergie</span>
                  </div>
                  <span className="font-semibold">Élevé</span>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-orange-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        notification.urgent ? "border-red-500 bg-red-50" : "border-blue-500 bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
                        </div>
                        {notification.urgent && <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => (window.location.href = "/chat")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Poser une question à l'IA
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => (window.location.href = "/library")}
                >
                  <Library className="h-4 w-4 mr-2" />
                  Réserver un livre
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Coffee className="h-4 w-4 mr-2" />
                  Prendre une pause
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Moon className="h-4 w-4 mr-2" />
                  Mode concentration
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
