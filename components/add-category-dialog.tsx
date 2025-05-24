"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/lib/types"
import { getCategoryIcon } from "@/lib/data"

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

// Available icons for custom categories
const availableIcons = [
  "Tag",
  "Tv",
  "Dumbbell",
  "Music",
  "ShoppingBag",
  "Smartphone",
  "Cloud",
  "Newspaper",
  "Coffee",
  "Utensils",
  "BookOpen",
]

// Available colors for custom categories
const availableColors = [
  { name: "Purple", value: "bg-purple-500" },
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Yellow", value: "bg-yellow-500" },
  { name: "Gray", value: "bg-gray-500" },
]

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (category: Category) => void
}

export default function AddCategoryDialog({ open, onOpenChange, onAdd }: AddCategoryDialogProps) {
  const [name, setName] = useState("")
  const [icon, setIcon] = useState("Tag")
  const [color, setColor] = useState("bg-purple-500")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name.trim()) {
      setError("Category name is required")
      return
    }

    // Create new category
    const newCategory: Category = {
      id: generateId(),
      name: name.trim(),
      icon,
      color,
      isCustom: true,
    }

    onAdd(newCategory)

    // Reset form
    setName("")
    setIcon("Tag")
    setColor("bg-purple-500")
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Custom Category</DialogTitle>
          <DialogDescription>Create a new category for your subscriptions</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="Gaming, Health, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map((iconName) => {
                    const IconComponent = getCategoryIcon(iconName)
                    return (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 mr-2" />
                          {iconName}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map((colorOption) => (
                    <SelectItem key={colorOption.value} value={colorOption.value}>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${colorOption.value}`}></div>
                        {colorOption.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
