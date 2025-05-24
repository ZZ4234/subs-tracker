"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Search } from "lucide-react"
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Service, Category, PopularService } from "@/lib/types"
import { popularServices } from "@/lib/data"
import { getCategoryIcon } from "@/lib/data"

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

interface AddSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (service: Service) => void
  categories: Category[]
  onAddCategory: () => void
}

export default function AddSubscriptionDialog({
  open,
  onOpenChange,
  onAdd,
  categories,
  onAddCategory,
}: AddSubscriptionDialogProps) {
  const [name, setName] = useState("")
  const [monthlyCost, setMonthlyCost] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [openPopover, setOpenPopover] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setName("")
      setMonthlyCost("")
      setDescription("")
      setCategoryId(categories[0]?.id || "")
      setError(null)
    }
  }, [open, categories])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name.trim()) {
      setError("Subscription name is required")
      return
    }

    const cost = Number.parseFloat(monthlyCost)
    if (isNaN(cost) || cost <= 0) {
      setError("Please enter a valid monthly cost")
      return
    }

    if (!categoryId) {
      setError("Please select a category")
      return
    }

    // Create new subscription
    const newSubscription: Service = {
      id: generateId(),
      name: name.trim(),
      monthlyCost: cost,
      categoryId,
      description: description.trim() || undefined,
    }

    onAdd(newSubscription)

    // Reset form
    setName("")
    setMonthlyCost("")
    setDescription("")
    setCategoryId("")
    setError(null)
  }

  const selectPopularService = (service: PopularService) => {
    // Create new subscription directly from popular service
    const newSubscription: Service = {
      id: generateId(),
      name: service.name,
      monthlyCost: service.monthlyCost,
      categoryId: service.categoryId,
      description: service.description || undefined,
      logoUrl: service.logoUrl,
    }

    // Add the subscription directly
    onAdd(newSubscription)

    // Close the popover and dialog
    setOpenPopover(false)

    // Reset form state
    setName("")
    setMonthlyCost("")
    setDescription("")
    setCategoryId("")
    setError(null)
  }

  // Filter popular services based on search query and selected category
  const filteredServices = popularServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryId || service.categoryId === categoryId
    return matchesSearch && matchesCategory
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>Enter the details of your subscription</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="name">Subscription Name</Label>
                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Search className="mr-1 h-3 w-3" />
                      Find Popular
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end" side="bottom" sideOffset={5}>
                    <Command>
                      <CommandInput
                        placeholder="Search subscriptions..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {filteredServices.map((service) => (
                            <CommandItem
                              key={service.name}
                              onSelect={() => selectPopularService(service)}
                              className="flex justify-between cursor-pointer"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{service.name}</span>
                                {service.description && (
                                  <span className="text-xs text-muted-foreground">{service.description}</span>
                                )}
                              </div>
                              <span className="text-muted-foreground font-medium">
                                ${service.monthlyCost.toFixed(2)}/mo
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                id="name"
                placeholder="Netflix, Spotify, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => {
                      const CategoryIcon = getCategoryIcon(category.icon)
                      return (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center">
                            <CategoryIcon className="h-4 w-4 mr-2" />
                            {category.name}
                            {category.isCustom && <span className="ml-1 text-xs text-muted-foreground">(Custom)</span>}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="icon" onClick={onAddCategory}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cost">Monthly Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="9.99"
                value={monthlyCost}
                onChange={(e) => setMonthlyCost(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Premium Plan, Family Subscription, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Subscription</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
