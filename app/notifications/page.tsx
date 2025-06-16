"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Bell,
  Clock,
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Settings,
  Trash2,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
} from "lucide-react"

interface Notification {
  id: number
  type: "reminder" | "deadline" | "book" | "study" | "motivation" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  urgent: boolean
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "reminder",
      title: "Cours dans 30 minutes",
      message: "Cours d'Algèbre 4 en Amphi A à 10:00",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      urgent: true,
    },
    {
      id: 2,
      type: "book",
      title: "Livre disponible",
      message: "Le livre 'Structures de Données en C' est maintenant disponible à la bibliothèque",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      urgent: false,
      actionUrl: "/library",
    },
    {
      id: 3,
      type: "deadline",
      title: "Examen dans 3 jours",
      message: "Examen de Système d'Exploitation le 18 janvier 2024",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      urgent: true,
    },
    {
      id: 4,
      type: "study",
      title: "Session d'étude recommandée",
      message: "Basé sur votre planning, c'est le moment idéal pour réviser les Probabilités",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      urgent: false,
    },
    {
      id: 5,
      type: "motivation",
      title: "Félicitations ! 🎉",
      message: "Vous avez atteint votre objectif d'étude de la semaine !",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      urgent: false,
    },
  ])

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    studyReminders: true,
    deadlineAlerts: true,
    bookAlerts: true,
    motivationMessages: true,
    systemUpdates: false,
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "deadline":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "book":
        return <BookOpen className="h-5 w-5 text-green-600" />
      case "study":
        return <Calendar className="h-5 w-5 text-purple-600" />
      case "motivation":
        return <CheckCircle className="h-5 w-5 text-yellow-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    return `Il y a ${days} jour${days > 1 ? "s" : ""}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => (window.location.href = "/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-full relative">
                  <Bell className="h-6 w-6 text-white" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                  <p className="text-sm text-gray-600">
                    {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : "Toutes lues"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Tout marquer comme lu
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-600" />
              Paramètres de notification
            </CardTitle>
            <CardDescription>Personnalisez vos préférences de notification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Canaux de notification</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      <Label htmlFor="push">Notifications push</Label>
                    </div>
                    <Switch
                      id="push"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <Switch
                      id="email"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                      <Label htmlFor="sms">SMS</Label>
                    </div>
                    <Switch
                      id="sms"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {settings.soundEnabled ? (
                        <Volume2 className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <VolumeX className="h-4 w-4 text-gray-400" />
                      )}
                      <Label htmlFor="sound">Son</Label>
                    </div>
                    <Switch
                      id="sound"
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Types de notification</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="study-reminders">Rappels d'étude</Label>
                    <Switch
                      id="study-reminders"
                      checked={settings.studyReminders}
                      onCheckedChange={(checked) => setSettings({ ...settings, studyReminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="deadline-alerts">Alertes d'échéance</Label>
                    <Switch
                      id="deadline-alerts"
                      checked={settings.deadlineAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, deadlineAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="book-alerts">Disponibilité livres</Label>
                    <Switch
                      id="book-alerts"
                      checked={settings.bookAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, bookAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="motivation">Messages de motivation</Label>
                    <Switch
                      id="motivation"
                      checked={settings.motivationMessages}
                      onCheckedChange={(checked) => setSettings({ ...settings, motivationMessages: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications récentes</CardTitle>
            <CardDescription>Vos dernières notifications StudyMate</CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune notification</h3>
                <p className="text-gray-600">Vous êtes à jour !</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${
                      notification.read
                        ? "bg-gray-50 border-gray-300"
                        : notification.urgent
                          ? "bg-red-50 border-red-500"
                          : "bg-blue-50 border-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                              {notification.title}
                            </h4>
                            {notification.urgent && <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>}
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                          </div>
                          <p className={`text-sm ${!notification.read ? "text-gray-700" : "text-gray-600"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">{formatTimestamp(notification.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {notification.actionUrl && (
                          <Button size="sm" variant="outline">
                            Voir
                          </Button>
                        )}
                        {!notification.read && (
                          <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
