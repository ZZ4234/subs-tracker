"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { Service } from "@/lib/types"
import Image from "next/image"

interface ServicesListProps {
  services: Service[]
  onRemove: (id: string) => void
  onAdd: () => void
}

export default function ServicesList({ services, onRemove, onAdd }: ServicesListProps) {
  return (
    <div className="space-y-4">
      {services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No streaming services added yet</p>
          <Button onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Service
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader className="pb-2 flex flex-row items-center">
                  <div className="mr-2">
                    <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                      {service.logoUrl ? (
                        <Image
                          src={service.logoUrl || "/placeholder.svg"}
                          alt={service.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold">{service.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">${service.monthlyCost.toFixed(2)}/month</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-destructive"
                    onClick={() => onRemove(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button onClick={onAdd} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Service
          </Button>
        </>
      )}
    </div>
  )
}
