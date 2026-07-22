"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function AssociateRegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    company_name: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone_number,
          user_type: "associate",
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Registration failed")
      }

      toast.success("Welcome to Land2Land!", {
        description: "Your associate account has been created successfully.",
      })
      router.push("/associate/login?success=registered")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast.error("Registration failed", {
        description: err instanceof Error ? err.message : "Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label htmlFor="company_name" className="text-xs font-medium text-foreground">
          Company / Individual Name
        </label>
        <Input
          id="company_name"
          name="company_name"
          type="text"
          placeholder="Your company or name"
          value={formData.company_name}
          onChange={handleChange}
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="username" className="text-xs font-medium text-foreground">
          Full Name
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Your full name"
          value={formData.username}
          onChange={handleChange}
          required
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-xs font-medium text-foreground">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="text-xs font-medium text-foreground">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone_number"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone_number}
          onChange={handleChange}
          required
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-xs font-medium text-foreground">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Min. 8 characters"
          value={formData.password}
          onChange={handleChange}
          required
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="text-xs font-medium text-foreground">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Repeat password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="h-8 text-xs"
        />
      </div>

      {error && <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full h-8 text-xs">
        {loading ? "Creating account..." : "Create Associate Account"}
      </Button>
    </form>
  )
}
