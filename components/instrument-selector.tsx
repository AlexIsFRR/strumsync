"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InstrumentSelectorProps {
  selected: string
  onSelect: (instrument: string) => void
}

const instruments = [
  {
    id: "guitar",
    name: "Guitar",
    icon: "🎸",
    description: "6-string tablature",
    difficulty: "Beginner",
  },
  {
    id: "piano",
    name: "Piano",
    icon: "🎹",
    description: "Chord notation",
    difficulty: "Intermediate",
  },
  {
    id: "bass",
    name: "Bass",
    icon: "🎸",
    description: "4-string tablature",
    difficulty: "Beginner",
  },
  {
    id: "ukulele",
    name: "Ukulele",
    icon: "🪕",
    description: "4-string tablature",
    difficulty: "Beginner",
  },
  {
    id: "drums",
    name: "Drums",
    icon: "🥁",
    description: "Rhythm notation",
    difficulty: "Advanced",
  },
]

export function InstrumentSelector({ selected, onSelect }: InstrumentSelectorProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm text-gray-700">Select Instrument</h4>

      <div className="space-y-2">
        {instruments.map((instrument) => (
          <Card
            key={instrument.id}
            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
              selected === instrument.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
            }`}
            onClick={() => onSelect(instrument.id)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{instrument.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{instrument.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {instrument.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{instrument.description}</p>
              </div>
              {selected === instrument.id && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
        💡 More instruments coming soon! Request your favorite in feedback.
      </div>
    </div>
  )
}
