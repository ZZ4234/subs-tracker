"use server"

import { revalidatePath } from "next/cache"
import {
  getCategories,
  createCategory,
  getServices,
  createService,
  deleteService,
  getShows,
  createShow,
  deleteShow,
} from "@/lib/db"
import type { Category, Service, Show } from "@/lib/types"

// Category actions
export async function getCategoriesAction() {
  try {
    return await getCategories()
  } catch (error) {
    console.error("Error in getCategoriesAction:", error)
    throw new Error("Failed to fetch categories")
  }
}

export async function createCategoryAction(category: Omit<Category, "id">) {
  try {
    const newCategory = await createCategory(category)
    revalidatePath("/")
    return newCategory
  } catch (error) {
    console.error("Error in createCategoryAction:", error)
    throw new Error("Failed to create category")
  }
}

// Service actions
export async function getServicesAction() {
  try {
    return await getServices()
  } catch (error) {
    console.error("Error in getServicesAction:", error)
    throw new Error("Failed to fetch services")
  }
}

export async function createServiceAction(service: Omit<Service, "id">) {
  try {
    const newService = await createService(service)
    revalidatePath("/")
    return newService
  } catch (error) {
    console.error("Error in createServiceAction:", error)
    throw new Error("Failed to create service")
  }
}

export async function deleteServiceAction(id: string) {
  try {
    await deleteService(id)
    revalidatePath("/")
  } catch (error) {
    console.error("Error in deleteServiceAction:", error)
    throw new Error("Failed to delete service")
  }
}

// Show actions
export async function getShowsAction() {
  try {
    return await getShows()
  } catch (error) {
    console.error("Error in getShowsAction:", error)
    throw new Error("Failed to fetch shows")
  }
}

export async function createShowAction(show: Omit<Show, "id">) {
  try {
    const newShow = await createShow(show)
    revalidatePath("/")
    revalidatePath("/shows")
    return newShow
  } catch (error) {
    console.error("Error in createShowAction:", error)
    throw new Error("Failed to create show")
  }
}

export async function deleteShowAction(id: string) {
  try {
    await deleteShow(id)
    revalidatePath("/")
    revalidatePath("/shows")
  } catch (error) {
    console.error("Error in deleteShowAction:", error)
    throw new Error("Failed to delete show")
  }
}
