"use client"

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class HydrationErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Check if this is a hydration error
    if (error.message.includes('hydration') || error.message.includes('kantu')) {
      console.warn('Hydration error suppressed:', error.message)
      return { hasError: false } // Don't show error for hydration issues
    }
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log hydration errors but don't crash the app
    if (error.message.includes('hydration') || error.message.includes('kantu')) {
      console.warn('Hydration error caught but suppressed:', error.message)
      return
    }
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-red-600">
          <p>Something went wrong. Please refresh the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}
