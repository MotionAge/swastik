"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Trash2 } from "lucide-react"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      })
      fetchMessages()
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await fetch(`/api/admin/messages/${id}`, { method: "DELETE" })
        fetchMessages()
      } catch (error) {
        console.error("Error deleting message:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Messages</h2>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={!message.read ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{message.subject}</h3>
                    {!message.read && <Badge variant="secondary">New</Badge>}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    From: <strong>{message.name}</strong> ({message.email})
                  </div>
                  <div className="text-sm text-gray-500 mb-3">{new Date(message.date).toLocaleString()}</div>
                  <p className="text-gray-800">{message.message}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  {!message.read && (
                    <Button size="sm" variant="outline" onClick={() => markAsRead(message.id)}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => deleteMessage(message.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && <div className="text-center py-8 text-gray-500">No messages yet.</div>}
      </div>
    </div>
  )
}
