'use client'

import { Button } from '@/components/ui/button'

export default function TestErrorPage() {
  const throwError = () => {
    // This will trigger the error boundary
    throw new Error('Test error - checking if error boundary works!')
  }

  const causeNullError = () => {
    // Simulate a common error (null reference)
    const data: any = null
    console.log(data.price.toFixed(2)) // This will crash!
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Test Error Boundary</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Click any button below to trigger an error and see the error boundary in action!
        </p>

        <div className="space-y-3">
          <Button
            onClick={throwError}
            variant="destructive"
            className="w-full"
          >
            🔥 Throw Simple Error
          </Button>

          <Button
            onClick={causeNullError}
            variant="destructive"
            className="w-full"
          >
            💥 Cause Null Reference Error
          </Button>

          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            🏠 Go Back Home
          </Button>
        </div>
      </div>
    </div>
  )
}
