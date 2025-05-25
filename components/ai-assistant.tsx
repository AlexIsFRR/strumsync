"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react"

interface AiAssistantProps {
  songKey: string
  instrument: string
  onSuggestion: (settings: { tuning: string; capo: number }) => void
}

export function AiAssistant({ songKey, instrument, onSuggestion }: AiAssistantProps) {
  const [suggestion, setSuggestion] = useState<{
    tuning: string
    capo: number
    reason: string
    confidence: number
  } | null>(null)

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const generateSuggestion = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const suggestions = {
        "F#m": {
          tuning: "standard",
          capo: 2,
          reason: "Capo 2nd fret makes F#m easier to play as Em shape",
          confidence: 92,
        },
        G: { tuning: "standard", capo: 0, reason: "Standard tuning works perfectly for G major", confidence: 95 },
        C: {
          tuning: "standard",
          capo: 0,
          reason: "Standard tuning optimal for C major chord progressions",
          confidence: 98,
        },
      }

      const defaultSuggestion = {
        tuning: "standard",
        capo: 0,
        reason: "Standard tuning recommended for this key",
        confidence: 85,
      }

      setSuggestion(suggestions[songKey as keyof typeof suggestions] || defaultSuggestion)
      setIsAnalyzing(false)
    }, 2000)
  }

  const applySuggestion = () => {
    if (suggestion) {
      onSuggestion({ tuning: suggestion.tuning, capo: suggestion.capo })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-purple-600" />
        <h4 className="font-medium text-sm text-gray-700">AI Assistant</h4>
      </div>

      {!suggestion && !isAnalyzing && (
        <div className="text-center space-y-3">
          <p className="text-xs text-gray-600">
            Get AI-powered tuning and capo suggestions based on the song key and your instrument.
          </p>
          <Button onClick={generateSuggestion} size="sm" className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Analyze Song
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <Card className="p-3 bg-purple-50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-purple-700">Analyzing song structure...</span>
          </div>
        </Card>
      )}

      {suggestion && (
        <Card className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Recommendation</span>
            <Badge variant="secondary" className="text-xs">
              {suggestion.confidence}% confident
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Suggested Setup:</span>
              <div className="text-xs text-gray-600 mt-1">
                {suggestion.tuning === "standard" ? "Standard tuning" : suggestion.tuning}
                {suggestion.capo > 0 && ` with capo on fret ${suggestion.capo}`}
              </div>
            </div>

            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">💡 {suggestion.reason}</div>
          </div>

          <div className="flex gap-2">
            <Button onClick={applySuggestion} size="sm" className="flex-1">
              Apply
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
        </Card>
      )}

      <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
        🧠 AI learns from your preferences and feedback to improve suggestions.
      </div>
    </div>
  )
}
