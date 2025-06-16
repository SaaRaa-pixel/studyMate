"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, BookOpen, Clock, User, Star, Calendar, CheckCircle, Filter, Heart } from "lucide-react"

interface Book {
  id: number
  title: string
  author: string
  category: string
  available: boolean
  rating: number
  description: string
  dueDate?: string
  reservedBy?: string
  location: string
  isbn: string
}

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [reservations, setReservations] = useState<number[]>([])

  const books: Book[] = [
    {
      id: 1,
      title: "Structures de Données et Algorithmes en C",
      author: "Robert Sedgewick",
      category: "Informatique",
      available: true,
      rating: 4.8,
      description: "Guide complet sur les structures de données et algorithmes avec implémentation en C.",
      location: "Section Informatique - Étagère A3",
      isbn: "978-2-7440-7389-4",
    },
    {
      id: 2,
      title: "Systèmes d'Exploitation Modernes",
      author: "Andrew Tanenbaum",
      category: "Informatique",
      available: false,
      rating: 4.9,
      description: "Référence incontournable sur les systèmes d'exploitation.",
      dueDate: "2024-01-15",
      reservedBy: "Sarah M.",
      location: "Section Informatique - Étagère B1",
      isbn: "978-2-7440-7390-0",
    },
    {
      id: 3,
      title: "Algèbre Linéaire et Applications",
      author: "Gilbert Strang",
      category: "Mathématiques",
      available: true,
      rating: 4.7,
      description: "Approche moderne de l'algèbre linéaire avec applications pratiques.",
      location: "Section Mathématiques - Étagère M2",
      isbn: "978-2-7440-7391-7",
    },
    {
      id: 4,
      title: "Probabilités et Statistiques",
      author: "Sheldon Ross",
      category: "Mathématiques",
      available: true,
      rating: 4.6,
      description: "Introduction complète aux probabilités et statistiques.",
      location: "Section Mathématiques - Étagère M4",
      isbn: "978-2-7440-7392-4",
    },
    {
      id: 5,
      title: "Électronique Analogique",
      author: "Paul Horowitz",
      category: "Électronique",
      available: false,
      rating: 4.8,
      description: "Manuel de référence en électronique analogique.",
      dueDate: "2024-01-20",
      reservedBy: "Ahmed K.",
      location: "Section Électronique - Étagère E1",
      isbn: "978-2-7440-7393-1",
    },
    {
      id: 6,
      title: "Grammaire Espagnole Complète",
      author: "María González",
      category: "Langues",
      available: true,
      rating: 4.4,
      description: "Guide complet de la grammaire espagnole avec exercices.",
      location: "Section Langues - Étagère L3",
      isbn: "978-2-7440-7394-8",
    },
  ]

  const categories = ["all", "Informatique", "Mathématiques", "Électronique", "Langues"]

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleReservation = (bookId: number) => {
    setReservations([...reservations, bookId])
    // Ici on ajouterait la logique de réservation réelle
    alert("Livre réservé avec succès ! Vous recevrez une notification quand il sera disponible.")
  }

  const myReservations = books.filter((book) => reservations.includes(book.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => (window.location.href = "/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Bibliothèque Connectée</h1>
                  <p className="text-sm text-gray-600">Réservation en temps réel</p>
                </div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {books.filter((b) => b.available).length} livres disponibles
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="catalog">Catalogue</TabsTrigger>
            <TabsTrigger value="reservations">Mes Réservations ({myReservations.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher par titre ou auteur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === "all" ? "Toutes les catégories" : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Books Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant={book.available ? "default" : "secondary"}>
                        {book.available ? "Disponible" : "Emprunté"}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm ml-1">{book.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>par {book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{book.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{book.category}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-green-600" />
                        <span>{book.location}</span>
                      </div>
                    </div>

                    {!book.available && book.dueDate && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center text-orange-800">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            Retour prévu le {new Date(book.dueDate).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                        <p className="text-xs text-orange-600 mt-1">Emprunté par {book.reservedBy}</p>
                      </div>
                    )}

                    <div className="pt-4">
                      {book.available ? (
                        <Button
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          onClick={() => handleReservation(book.id)}
                          disabled={reservations.includes(book.id)}
                        >
                          {reservations.includes(book.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Réservé
                            </>
                          ) : (
                            <>
                              <Calendar className="h-4 w-4 mr-2" />
                              Réserver maintenant
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleReservation(book.id)}
                          disabled={reservations.includes(book.id)}
                        >
                          {reservations.includes(book.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              En attente
                            </>
                          ) : (
                            <>
                              <Heart className="h-4 w-4 mr-2" />
                              Mettre en attente
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-6">
            {myReservations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune réservation</h3>
                  <p className="text-gray-600 mb-6">Vous n'avez pas encore réservé de livres.</p>
                  <Button onClick={() => document.querySelector('[value="catalog"]')?.click()}>
                    Parcourir le catalogue
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {myReservations.map((book) => (
                  <Card key={book.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{book.title}</h3>
                          <p className="text-gray-600">par {book.author}</p>
                          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                            <span>{book.category}</span>
                            <span>•</span>
                            <span>{book.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 mb-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Réservé
                          </Badge>
                          <p className="text-xs text-gray-500">Vous serez notifié quand le livre sera disponible</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
