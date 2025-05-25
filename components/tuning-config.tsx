"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TuningConfigProps {
  instrument: string
  settings: {
    tuning: string
    capo: number
  }
  onSettingsChange: (settings: { tuning: string; capo: number }) => void
}

const tuningPresets = {
  guitar: [
    { id: "standard", name: "Standard (E-A-D-G-B-E)", notes: ["E", "A", "D", "G", "B", "E"] },
    { id: "drop-d", name: "Drop D (D-A-D-G-B-E)", notes: ["D", "A", "D", "G", "B", "E"] },
    { id: "open-g", name: "Open G (D-G-D-G-B-D)", notes: ["D", "G", "D", "G", "B", "D"] },
    { id: "dadgad", name: "DADGAD (D-A-D-G-A-D)", notes: ["D", "A", "D", "G", "A", "D"] },
  ],
  piano: [{ id: "standard", name: "Standard Tuning", notes: ["C", "D", "E", "F", "G", "A", "B"] }],
  bass: [
    { id: "standard", name: "Standard (E-A-D-G)", notes: ["E", "A", "D", "G"] },
    { id: "drop-d", name: "Drop D (D-A-D-G)", notes: ["D", "A", "D", "G"] },
  ],
}

export function TuningConfig({ instrument, settings, onSettingsChange }: TuningConfigProps) {
  const presets = tuningPresets[instrument as keyof typeof tuningPresets] || tuningPresets.guitar
  const currentPreset = presets.find((p) => p.id === settings.tuning) || presets[0]

  const handleTuningChange = (tuning: string) => {
    onSettingsChange({ ...settings, tuning })
  }

  const handleCapoChange = (capo: number[]) => {
    onSettingsChange({ ...settings, capo: capo[0] })
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-gray-700">Tuning & Configuration</h4>

      {/* Tuning Selection */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Tuning</label>
        <Select value={settings.tuning} onValueChange={handleTuningChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {presets.map((preset) => (
              <SelectItem key={preset.id} value={preset.id}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Current tuning display */}
        <div className="flex gap-1 flex-wrap">
          {currentPreset.notes.map((note, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {note}
            </Badge>
          ))}
        </div>
      </div>

      {/* Capo Position (for guitar/bass) */}
      {(instrument === "guitar" || instrument === "bass") && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-600">Capo Position</label>
            <span className="text-xs text-gray-500">Fret {settings.capo}</span>
          </div>
          <Slider value={[settings.capo]} max={12} step={1} onValueChange={handleCapoChange} className="w-full" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span>12</span>
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Quick Presets</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSettingsChange({ tuning: "standard", capo: 0 })}
            className="text-xs"
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSettingsChange({ tuning: "standard", capo: 2 })}
            className="text-xs"
          >
            Capo 2nd
          </Button>
        </div>
      </div>

      {/* Tuning Info */}
      <Card className="p-3 bg-blue-50">
        <div className="text-xs text-blue-700">
          <div className="font-medium mb-1">Current Setup:</div>
          <div>{currentPreset.name}</div>
          {settings.capo > 0 && <div>Capo on fret {settings.capo}</div>}
        </div>
      </Card>
    </div>
  )
}
