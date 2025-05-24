"use client"

import type React from "react"

import { useState } from "react"
// Generate a random ID since we don't have uuid package
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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
import type { Service } from "@/lib/types"
import { getServiceLogoUrl } from "@/lib/utils"

interface AddServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (service: Service) => void
}

export default function AddServiceDialog({ open, onOpenChange, onAdd }: AddServiceDialogProps) {
  const [name, setName] = useState("")
  const [monthlyCost, setMonthlyCost] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name.trim()) {
      setError("Service name is required")
      return
    }

    const cost = Number.parseFloat(monthlyCost)
    if (isNaN(cost) || cost <= 0) {
      setError("Please enter a valid monthly cost")
      return
    }

    // Create new service
    const newService: Service = {
      id: generateId(),
      name: name.trim(),
      monthlyCost: cost,
      logoUrl: getServiceLogoUrl(name.trim()),
    }

    onAdd(newService)

    // Reset form
    setName("")
    setMonthlyCost("")
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Streaming Service</DialogTitle>
          <DialogDescription>Enter the details of your streaming subscription</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                placeholder="Netflix, Disney+, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Service</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
