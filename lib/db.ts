import type { Service, Show, Category } from "./types"

// Check if we're in a Vercel environment with database
const hasDatabase = () => {
  return typeof process !== "undefined" && process.env.POSTGRES_URL
}

// Database initialization - only run if database is available
export async function initializeDatabase() {
  if (!hasDatabase()) {
    console.log("Database not available, using localStorage fallback")
    return
  }

  try {
    const { sql } = await import("@vercel/postgres")

    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        is_custom BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create services table
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        monthly_cost DECIMAL(10,2) NOT NULL,
        logo_url TEXT,
        category_id TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `

    // Create shows table
    await sql`
      CREATE TABLE IF NOT EXISTS shows (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        service_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
      )
    `

    // Insert default categories if they don't exist
    const { rows: existingCategories } = await sql`SELECT COUNT(*) as count FROM categories`

    if (existingCategories[0].count === "0") {
      const defaultCategories = [
        { id: "streaming", name: "Streaming", icon: "Tv", color: "bg-purple-500" },
        { id: "fitness", name: "Fitness", icon: "Dumbbell", color: "bg-green-500" },
        { id: "music", name: "Music", icon: "Music", color: "bg-pink-500" },
        { id: "shopping", name: "Shopping", icon: "ShoppingBag", color: "bg-blue-500" },
        { id: "apps", name: "Apps", icon: "Smartphone", color: "bg-orange-500" },
        { id: "cloud", name: "Cloud Storage", icon: "Cloud", color: "bg-sky-500" },
        { id: "news", name: "News", icon: "Newspaper", color: "bg-red-500" },
        { id: "food", name: "Food & Drink", icon: "Coffee", color: "bg-amber-500" },
        { id: "dining", name: "Dining", icon: "Utensils", color: "bg-emerald-500" },
        { id: "education", name: "Education", icon: "BookOpen", color: "bg-indigo-500" },
        { id: "other", name: "Other", icon: "Tag", color: "bg-gray-500" },
      ]

      for (const category of defaultCategories) {
        await sql`
          INSERT INTO categories (id, name, icon, color, is_custom)
          VALUES (${category.id}, ${category.name}, ${category.icon}, ${category.color}, false)
        `
      }
    }

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  }
}

// Category operations
export async function getCategories(): Promise<Category[]> {
  if (!hasDatabase()) {
    // Fallback to default categories
    return [
      { id: "streaming", name: "Streaming", icon: "Tv", color: "bg-purple-500" },
      { id: "fitness", name: "Fitness", icon: "Dumbbell", color: "bg-green-500" },
      { id: "music", name: "Music", icon: "Music", color: "bg-pink-500" },
      { id: "shopping", name: "Shopping", icon: "ShoppingBag", color: "bg-blue-500" },
      { id: "apps", name: "Apps", icon: "Smartphone", color: "bg-orange-500" },
      { id: "cloud", name: "Cloud Storage", icon: "Cloud", color: "bg-sky-500" },
      { id: "news", name: "News", icon: "Newspaper", color: "bg-red-500" },
      { id: "food", name: "Food & Drink", icon: "Coffee", color: "bg-amber-500" },
      { id: "dining", name: "Dining", icon: "Utensils", color: "bg-emerald-500" },
      { id: "education", name: "Education", icon: "BookOpen", color: "bg-indigo-500" },
      { id: "other", name: "Other", icon: "Tag", color: "bg-gray-500" },
    ]
  }

  try {
    const { sql } = await import("@vercel/postgres")
    const { rows } = await sql`
      SELECT id, name, icon, color, is_custom as "isCustom"
      FROM categories
      ORDER BY is_custom ASC, name ASC
    `
    return rows as Category[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

export async function createCategory(category: Omit<Category, "id">): Promise<Category> {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  if (!hasDatabase()) {
    // Return the category with generated ID for localStorage fallback
    return { id, ...category }
  }

  try {
    const { sql } = await import("@vercel/postgres")
    await sql`
      INSERT INTO categories (id, name, icon, color, is_custom)
      VALUES (${id}, ${category.name}, ${category.icon}, ${category.color}, ${category.isCustom || false})
    `

    return { id, ...category }
  } catch (error) {
    console.error("Error creating category:", error)
    throw error
  }
}

// Service operations
export async function getServices(): Promise<Service[]> {
  if (!hasDatabase()) {
    // Return empty array for localStorage fallback
    return []
  }

  try {
    const { sql } = await import("@vercel/postgres")
    const { rows } = await sql`
      SELECT id, name, monthly_cost as "monthlyCost", logo_url as "logoUrl", 
             category_id as "categoryId", description
      FROM services
      ORDER BY created_at DESC
    `
    return rows as Service[]
  } catch (error) {
    console.error("Error fetching services:", error)
    throw error
  }
}

export async function createService(service: Omit<Service, "id">): Promise<Service> {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  if (!hasDatabase()) {
    // Return the service with generated ID for localStorage fallback
    return { id, ...service }
  }

  try {
    const { sql } = await import("@vercel/postgres")
    await sql`
      INSERT INTO services (id, name, monthly_cost, logo_url, category_id, description)
      VALUES (${id}, ${service.name}, ${service.monthlyCost}, ${service.logoUrl || null}, 
              ${service.categoryId}, ${service.description || null})
    `

    return { id, ...service }
  } catch (error) {
    console.error("Error creating service:", error)
    throw error
  }
}

export async function deleteService(id: string): Promise<void> {
  if (!hasDatabase()) {
    // For localStorage fallback, this will be handled in the component
    return
  }

  try {
    const { sql } = await import("@vercel/postgres")
    await sql`DELETE FROM services WHERE id = ${id}`
  } catch (error) {
    console.error("Error deleting service:", error)
    throw error
  }
}

// Show operations
export async function getShows(): Promise<Show[]> {
  if (!hasDatabase()) {
    // Return empty array for localStorage fallback
    return []
  }

  try {
    const { sql } = await import("@vercel/postgres")
    const { rows } = await sql`
      SELECT id, title, service_id as "serviceId"
      FROM shows
      ORDER BY created_at DESC
    `
    return rows as Show[]
  } catch (error) {
    console.error("Error fetching shows:", error)
    throw error
  }
}

export async function createShow(show: Omit<Show, "id">): Promise<Show> {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  if (!hasDatabase()) {
    // Return the show with generated ID for localStorage fallback
    return { id, ...show }
  }

  try {
    const { sql } = await import("@vercel/postgres")
    await sql`
      INSERT INTO shows (id, title, service_id)
      VALUES (${id}, ${show.title}, ${show.serviceId})
    `

    return { id, ...show }
  } catch (error) {
    console.error("Error creating show:", error)
    throw error
  }
}

export async function deleteShow(id: string): Promise<void> {
  if (!hasDatabase()) {
    // For localStorage fallback, this will be handled in the component
    return
  }

  try {
    const { sql } = await import("@vercel/postgres")
    await sql`DELETE FROM shows WHERE id = ${id}`
  } catch (error) {
    console.error("Error deleting show:", error)
    throw error
  }
}
