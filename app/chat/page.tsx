"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Calculator,
  Code,
  Globe,
  Lightbulb,
  MessageCircle,
  Zap,
} from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Salut ! Je suis votre assistant IA StudyMate 🤖 Je peux vous aider avec tous vos cours CP2 S4, répondre à vos questions, vous donner des conseils d'étude et bien plus ! Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      category: "greeting",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    { text: "Expliquer les pointeurs en C", icon: Code, category: "programming" },
    { text: "Résoudre une équation du 2nd degré", icon: Calculator, category: "math" },
    { text: "Qu'est-ce qu'un processus ?", icon: Zap, category: "system" },
    { text: "Conjugaison en espagnol", icon: Globe, category: "language" },
    { text: "Conseils pour gérer le stress", icon: Lightbulb, category: "wellness" },
    { text: "Techniques de mémorisation", icon: BookOpen, category: "study" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateAIResponse = (userMessage: string): string => {
    const responses = {
      pointeurs: `Les pointeurs en C sont des variables qui stockent l'adresse mémoire d'une autre variable. Voici les concepts clés :

**Déclaration :**
\`\`\`c
int *ptr;  // ptr est un pointeur vers un entier
\`\`\`

**Utilisation :**
\`\`\`c
int x = 10;
int *ptr = &x;  // ptr pointe vers l'adresse de x
printf("%d", *ptr);  // Affiche 10 (déréférencement)
\`\`\`

**Points importants :**
• & : opérateur d'adresse
• * : opérateur de déréférencement
• Attention aux pointeurs non initialisés !

Voulez-vous que je vous explique les pointeurs sur pointeurs ou l'allocation dynamique ?`,

      processus: `Un processus est un programme en cours d'exécution. Voici les concepts essentiels :

**Définition :**
• Instance d'un programme chargé en mémoire
• Possède son propre espace d'adressage
• Géré par le système d'exploitation

**États d'un processus :**
1. **Nouveau** : En cours de création
2. **Prêt** : Attend le processeur
3. **En exécution** : Utilise le processeur
4. **En attente** : Attend une ressource
5. **Terminé** : Exécution finie

**PCB (Process Control Block) :**
• ID du processus
• État du processus
• Compteur de programme
• Registres CPU
• Informations de planification

Souhaitez-vous en savoir plus sur la communication inter-processus ou la planification ?`,

      stress: `Voici mes meilleurs conseils pour gérer le stress pendant vos études :

**Techniques immédiates :**
🧘 **Respiration profonde** : 4 secondes inspiration, 4 secondes rétention, 4 secondes expiration
⏰ **Technique Pomodoro** : 25 min travail + 5 min pause
🚶 **Pause active** : Marchez 5 minutes toutes les heures

**Organisation :**
📝 **To-do lists** : Divisez les gros projets en petites tâches
🎯 **Priorités** : Matrice urgent/important
📅 **Planning réaliste** : Ne surchargez pas votre emploi du temps

**Bien-être :**
😴 **Sommeil** : 7-8h par nuit minimum
🥗 **Alimentation** : Évitez trop de caféine
🏃 **Exercice** : 30 min d'activité physique par jour

**Mindset :**
• Les erreurs sont des opportunités d'apprentissage
• Célébrez vos petites victoires
• Demandez de l'aide quand nécessaire

Quel aspect vous pose le plus de difficultés ?`,

      default: `Je comprends votre question ! En tant qu'assistant IA spécialisé pour les étudiants ENSA CP2 S4, je peux vous aider avec :

📚 **Tous vos modules :**
• Algèbre 4 & Probabilités
• Structures de données en C
• Système d'exploitation
• Électronique (Analogique/Numérique)
• Langues (Espagnol/Anglais)
• Droit & Environnement

🎯 **Support académique :**
• Explications de concepts
• Résolution d'exercices
• Conseils méthodologiques
• Préparation aux examens

💡 **Conseils personnalisés :**
• Techniques d'étude
• Gestion du temps
• Motivation et bien-être

Pouvez-vous reformuler votre question ou choisir un sujet spécifique ? Je suis là pour vous aider ! 😊`,
    }

    const message = userMessage.toLowerCase()
    if (message.includes("pointeur") || message.includes("pointer")) return responses.pointeurs
    if (message.includes("processus") || message.includes("process")) return responses.processus
    if (message.includes("stress") || message.includes("anxiété")) return responses.stress
    return responses.default
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: simulateAIResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Assistant IA StudyMate</h1>
                  <p className="text-sm text-gray-600">Disponible 24/7 • Accès illimité</p>
                </div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              En ligne
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Quick Questions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
              Questions rapides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => handleQuickQuestion(question.text)}
                >
                  <question.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{question.text}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === "bot" && <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-blue-600" />}
                      {message.type === "user" && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question... (Appuyez sur Entrée pour envoyer)"
                className="flex-1 h-12"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" />
              Assistant IA avec accès illimité • Spécialisé ENSA CP2 S4
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
