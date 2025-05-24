"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import type { Service, Show } from "@/lib/types"

interface AddShowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (show: Omit<Show, "id">) => void
  services: Service[]
}

export default function AddShowDialog({ open, onOpenChange, onAdd, services }: AddShowDialogProps) {
  const [title, setTitle] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setTitle("")
      setServiceId("")
      setError(null)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title.trim()) {
      setError("Show title is required")
      return
    }

    if (!serviceId) {
      setError("Please select a streaming service")
      return
    }

    // Create new show
    const newShow: Omit<Show, "id"> = {
      title: title.trim(),
      serviceId,
    }

    onAdd(newShow)

    // Reset form
    setTitle("")
    setServiceId("")
    setError(null)
  }

  // Filter services to only show streaming services
  const streamingServices = services.filter((service) => service.categoryId === "streaming")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Show</DialogTitle>
          <DialogDescription>What are you watching and where?</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Show Title</Label>
              <Input
                id="title"
                placeholder="Stranger Things, The Mandalorian, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service">Streaming Service</Label>
              <Select value={serviceId} onValueChange={setServiceId}>
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {streamingServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
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
            <Button type="submit">Add Show</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
