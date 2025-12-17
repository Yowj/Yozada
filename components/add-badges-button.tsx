"use client"

import * as React from "react"
import { Badge as BadgeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateProductBadges } from "@/lib/actions/update-product-badges"

export function AddBadgesButton() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function handleClick() {
    setIsLoading(true)
    setMessage(null)

    const result = await updateProductBadges()

    if (result.success) {
      setMessage({ type: 'success', text: result.message || 'Badges added successfully!' })
      // No need for window.location.reload()!
      // revalidatePath() in server action already refreshed the data
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to add badges' })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex items-center gap-3">
      {message && (
        <span className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-destructive'}`}>
          {message.text}
        </span>
      )}
      <Button
        onClick={handleClick}
        disabled={isLoading}
        variant="outline"
      >
        <BadgeIcon className="h-4 w-4" />
        {isLoading ? 'Adding Badges...' : 'Add Sample Badges'}
      </Button>
    </div>
  )
}
