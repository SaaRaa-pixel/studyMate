"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Brain,
  Target,
  Clock,
  Heart,
  Zap,
  BookOpen,
  Coffee,
  Moon,
  Sun,
  Users,
  Home,
  Lightbulb,
  TrendingUp,
} from "lucide-react"

interface FormData {
  // Informations de base
  studentId: string
  phone: string
  semester: string

  // Style d'apprentissage
  learningStyle: string
  studyEnvironment: string
  concentrationTime: number[]

  // Préférences temporelles
  studyTimePreference: string
  sleepSchedule: string
  energyPeak: string

  // Modules et difficultés
  modulesDifficulty: Record<string, number>
  priorityModules: string[]
  targetGrades: Record<string, string>

  // Méthodes d'étude
  studyMethods: string[]
  revisionStyle: string
  groupStudy: string

  // Objectifs et motivation
  careerGoal: string
  motivation: string
  stressLevel: number[]

  // Habitudes et lifestyle
  exerciseFrequency: string
  socialTime: number[]
  workPartTime: string

  // Notifications et support
  notificationTypes: string[]
  supportNeeded: string[]
}

export default function StudentFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  const [formData, setFormData] = useState<FormData>({
    studentId: "",
    phone: "",
    semester: "",
    learningStyle: "",
    studyEnvironment: "",
    concentrationTime: [45],
    studyTimePreference: "",
    sleepSchedule: "",
    energyPeak: "",
    modulesDifficulty: {},
    priorityModules: [],
    targetGrades: {},
    studyMethods: [],
    revisionStyle: "",
    groupStudy: "",
    careerGoal: "",
    motivation: "",
    stressLevel: [5],
    exerciseFrequency: "",
    socialTime: [2],
    workPartTime: "",
    notificationTypes: [],
    supportNeeded: [],
  })

  const modules = [
    "Algèbre 4",
    "Probabilité et Statistiques",
    "Structures de Données en C",
    "Système d'Exploitation",
    "Analogique",
    "Numérique",
    "Espagnol",
    "Anglais",
    "Droit",
    "Éducation Environnementale",
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Complete form data:", formData)
    // Redirection vers le dashboard avec les données du profil
    window.location.href = "/dashboard"
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full w-fit mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Informations de base</h2>
              <p className="text-gray-600">Commençons par vous connaître</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="flex items-center text-sm font-semibold">
                  <Target className="h-4 w-4 mr-2 text-blue-600" />
                  Numéro étudiant
                </Label>
                <Input
                  id="studentId"
                  placeholder="Ex: CP2024001"
                  value={formData.studentId}
                  onChange={(e) => updateFormData("studentId", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center text-sm font-semibold">
                  <Zap className="h-4 w-4 mr-2 text-green-600" />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  placeholder="06 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center text-sm font-semibold">
                <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                Quel est votre niveau actuel en CP2 S4 ?
              </Label>
              <RadioGroup
                value={formData.semester}
                onValueChange={(value) => updateFormData("semester", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                  <RadioGroupItem value="first-time" id="first-time" />
                  <Label htmlFor="first-time">Première fois en S4</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                  <RadioGroupItem value="repeat" id="repeat" />
                  <Label htmlFor="repeat">Redoublement S4</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Style d'apprentissage</h2>
              <p className="text-gray-600">Comment apprenez-vous le mieux ?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                  Quel est votre style d'apprentissage principal ?
                </Label>
                <RadioGroup
                  value={formData.learningStyle}
                  onValueChange={(value) => updateFormData("learningStyle", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                    <RadioGroupItem value="visual" id="visual" />
                    <div>
                      <Label htmlFor="visual" className="font-medium">
                        Visuel
                      </Label>
                      <p className="text-sm text-gray-600">Schémas, diagrammes, couleurs, mind maps</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                    <RadioGroupItem value="auditory" id="auditory" />
                    <div>
                      <Label htmlFor="auditory" className="font-medium">
                        Auditif
                      </Label>
                      <p className="text-sm text-gray-600">Écouter, répéter, discussions, musique</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                    <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                    <div>
                      <Label htmlFor="kinesthetic" className="font-medium">
                        Kinesthésique
                      </Label>
                      <p className="text-sm text-gray-600">Pratique, manipulation, mouvement</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Home className="h-4 w-4 mr-2 text-blue-600" />
                  Environnement d'étude idéal
                </Label>
                <Select onValueChange={(value) => updateFormData("studyEnvironment", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choisissez votre environnement préféré" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiet-home">Maison - Silence total</SelectItem>
                    <SelectItem value="music-home">Maison - Avec musique douce</SelectItem>
                    <SelectItem value="library">Bibliothèque - Ambiance studieuse</SelectItem>
                    <SelectItem value="cafe">Café - Bruit de fond</SelectItem>
                    <SelectItem value="group-study">Salle d'étude en groupe</SelectItem>
                    <SelectItem value="outdoor">Extérieur - Parc/Jardin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  Durée de concentration optimale : {formData.concentrationTime[0]} minutes
                </Label>
                <Slider
                  value={formData.concentrationTime}
                  onValueChange={(value) => updateFormData("concentrationTime", value)}
                  max={120}
                  min={15}
                  step={15}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>15 min</span>
                  <span>60 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Rythme et horaires</h2>
              <p className="text-gray-600">Quand êtes-vous le plus productif ?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Sun className="h-4 w-4 mr-2 text-yellow-600" />À quel moment êtes-vous le plus énergique ?
                </Label>
                <RadioGroup
                  value={formData.energyPeak}
                  onValueChange={(value) => updateFormData("energyPeak", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="early-morning" id="early-morning" />
                    <Label htmlFor="early-morning">Tôt le matin (5h-8h)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning">Matin (8h-12h)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon">Après-midi (12h-17h)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="evening" id="evening" />
                    <Label htmlFor="evening">Soir (17h-22h)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Moon className="h-4 w-4 mr-2 text-indigo-600" />
                  Vos habitudes de sommeil
                </Label>
                <Select onValueChange={(value) => updateFormData("sleepSchedule", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Décrivez votre rythme de sommeil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-bird">Couche-tôt, lève-tôt (22h-6h)</SelectItem>
                    <SelectItem value="normal">Rythme normal (23h-7h)</SelectItem>
                    <SelectItem value="night-owl">Couche-tard, lève-tard (1h-9h)</SelectItem>
                    <SelectItem value="irregular">Horaires irréguliers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Coffee className="h-4 w-4 mr-2 text-brown-600" />
                  Temps social quotidien souhaité : {formData.socialTime[0]} heures
                </Label>
                <Slider
                  value={formData.socialTime}
                  onValueChange={(value) => updateFormData("socialTime", value)}
                  max={8}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0h (Isolé)</span>
                  <span>4h (Équilibré)</span>
                  <span>8h (Très social)</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Modules et objectifs</h2>
              <p className="text-gray-600">Évaluez vos modules et fixez vos objectifs</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-semibold">
                  Évaluez la difficulté de chaque module (1 = Très facile, 5 = Très difficile)
                </Label>
                {modules.map((module) => (
                  <div key={module} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">{module}</Label>
                      <span className="text-sm font-medium text-blue-600">
                        {formData.modulesDifficulty[module] || 3}/5
                      </span>
                    </div>
                    <Slider
                      value={[formData.modulesDifficulty[module] || 3]}
                      onValueChange={(value) =>
                        updateFormData("modulesDifficulty", {
                          ...formData.modulesDifficulty,
                          [module]: value[0],
                        })
                      }
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Sélectionnez vos 3 modules prioritaires (les plus importants pour vous)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {modules.map((module) => (
                    <div key={module} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${module}`}
                        checked={formData.priorityModules.includes(module)}
                        onCheckedChange={(checked) => {
                          if (checked && formData.priorityModules.length < 3) {
                            updateFormData("priorityModules", [...formData.priorityModules, module])
                          } else if (!checked) {
                            updateFormData(
                              "priorityModules",
                              formData.priorityModules.filter((m) => m !== module),
                            )
                          }
                        }}
                        disabled={!formData.priorityModules.includes(module) && formData.priorityModules.length >= 3}
                      />
                      <Label htmlFor={`priority-${module}`} className="text-sm">
                        {module}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">{formData.priorityModules.length}/3 modules sélectionnés</p>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Bien-être et motivation</h2>
              <p className="text-gray-600">Parlons de votre équilibre de vie</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Target className="h-4 w-4 mr-2 text-blue-600" />
                  Quel est votre objectif de carrière après l'ENSA ?
                </Label>
                <Select onValueChange={(value) => updateFormData("careerGoal", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choisissez votre objectif principal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software-engineer">Ingénieur logiciel</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="cybersecurity">Cybersécurité</SelectItem>
                    <SelectItem value="ai-ml">Intelligence Artificielle</SelectItem>
                    <SelectItem value="network-admin">Administration réseau</SelectItem>
                    <SelectItem value="project-manager">Chef de projet IT</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur tech</SelectItem>
                    <SelectItem value="researcher">Recherche académique</SelectItem>
                    <SelectItem value="undecided">Pas encore décidé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                  Qu'est-ce qui vous motive le plus dans vos études ?
                </Label>
                <RadioGroup
                  value={formData.motivation}
                  onValueChange={(value) => updateFormData("motivation", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="grades" id="grades" />
                    <Label htmlFor="grades">Obtenir d'excellentes notes</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="knowledge" id="knowledge" />
                    <Label htmlFor="knowledge">Acquérir des connaissances</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="career" id="career" />
                    <Label htmlFor="career">Préparer ma carrière</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-yellow-50">
                    <RadioGroupItem value="family" id="family" />
                    <Label htmlFor="family">Rendre ma famille fière</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold">
                  <Heart className="h-4 w-4 mr-2 text-red-600" />
                  Niveau de stress actuel : {formData.stressLevel[0]}/10
                </Label>
                <Slider
                  value={formData.stressLevel}
                  onValueChange={(value) => updateFormData("stressLevel", value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Très détendu</span>
                  <span>Modéré</span>
                  <span>Très stressé</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Fréquence d'exercice physique</Label>
                <Select onValueChange={(value) => updateFormData("exerciseFrequency", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="À quelle fréquence faites-vous du sport ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidiennement</SelectItem>
                    <SelectItem value="3-4-times">3-4 fois par semaine</SelectItem>
                    <SelectItem value="1-2-times">1-2 fois par semaine</SelectItem>
                    <SelectItem value="rarely">Rarement</SelectItem>
                    <SelectItem value="never">Jamais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Support et notifications</h2>
              <p className="text-gray-600">Comment pouvons-nous mieux vous accompagner ?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Types de notifications que vous souhaitez recevoir</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Rappels d'étude",
                    "Deadlines d'examens",
                    "Conseils d'apprentissage",
                    "Motivation quotidienne",
                    "Disponibilité livres",
                    "Événements ENSA",
                    "Groupes d'étude",
                    "Pause recommandée",
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.notificationTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("notificationTypes", [...formData.notificationTypes, type])
                          } else {
                            updateFormData(
                              "notificationTypes",
                              formData.notificationTypes.filter((t) => t !== type),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={type} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Dans quels domaines avez-vous besoin de plus de support ?
                </Label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Gestion du temps",
                    "Techniques de mémorisation",
                    "Gestion du stress",
                    "Motivation et discipline",
                    "Préparation aux examens",
                    "Travail en groupe",
                    "Prise de notes efficace",
                    "Équilibre vie-études",
                  ].map((support) => (
                    <div key={support} className="flex items-center space-x-2">
                      <Checkbox
                        id={support}
                        checked={formData.supportNeeded.includes(support)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("supportNeeded", [...formData.supportNeeded, support])
                          } else {
                            updateFormData(
                              "supportNeeded",
                              formData.supportNeeded.filter((s) => s !== support),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={support} className="text-sm">
                        {support}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Travaillez-vous à temps partiel ?</Label>
                <RadioGroup
                  value={formData.workPartTime}
                  onValueChange={(value) => updateFormData("workPartTime", value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no-work" />
                    <Label htmlFor="no-work">Non, je me concentre uniquement sur mes études</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekend" id="weekend-work" />
                    <Label htmlFor="weekend-work">Oui, weekends seulement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="part-time" id="part-time-work" />
                    <Label htmlFor="part-time-work">Oui, quelques heures par semaine</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full-time" id="full-time-work" />
                    <Label htmlFor="full-time-work">Oui, travail régulier</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Button
        variant="ghost"
        className="mb-4 text-gray-600 hover:text-gray-900"
        onClick={() => (window.location.href = "/auth")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>

      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}% complété
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        <Card className="shadow-xl bg-white/95 backdrop-blur-sm border-0">
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex items-center"
                >
                  Créer mon profil StudyMate
                  <Target className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center"
                >
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
