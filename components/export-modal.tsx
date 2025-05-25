"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, ImageIcon, Music, Link } from "lucide-react"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  song: {
    title: string
    artist: string
    duration: number
    key: string
    tempo: number
  }
  instrument: string
  tuningSettings: {
    tuning: string
    capo: number
  }
}

export function ExportModal({ isOpen, onClose, song, instrument, tuningSettings }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState("pdf")
  const [includeChords, setIncludeChords] = useState(true)
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [shareLink, setShareLink] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      // In a real app, this would trigger the actual download
      console.log("Exporting:", { format: exportFormat, includeChords, includeMetadata })
    }, 2000)
  }

  const generateShareLink = () => {
    const link = `https://strumsync.app/share/${song.title.toLowerCase().replace(/\s+/g, "-")}-${instrument}`
    setShareLink(link)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export & Share</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Song Info */}
          <Card className="p-3 bg-gray-50">
            <div className="text-sm">
              <div className="font-medium">{song.title}</div>
              <div className="text-gray-600">{song.artist}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {instrument}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {tuningSettings.tuning}
                  {tuningSettings.capo > 0 && ` +${tuningSettings.capo}`}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Export Options */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      PDF Document
                    </div>
                  </SelectItem>
                  <SelectItem value="txt">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Text File
                    </div>
                  </SelectItem>
                  <SelectItem value="png">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      PNG Image
                    </div>
                  </SelectItem>
                  <SelectItem value="midi">
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      MIDI File
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Settings */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Include</label>

              <div className="flex items-center space-x-2">
                <Checkbox id="chords" checked={includeChords} onCheckedChange={setIncludeChords} />
                <label htmlFor="chords" className="text-sm">
                  Chord progressions
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="metadata" checked={includeMetadata} onCheckedChange={setIncludeMetadata} />
                <label htmlFor="metadata" className="text-sm">
                  Song metadata (key, tempo, etc.)
                </label>
              </div>
            </div>

            {/* Export Button */}
            <Button onClick={handleExport} disabled={isExporting} className="w-full">
              {isExporting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Exporting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export {exportFormat.toUpperCase()}
                </div>
              )}
            </Button>
          </div>

          {/* Share Section */}
          <div className="border-t pt-4 space-y-3">
            <label className="text-sm font-medium">Share</label>

            {!shareLink ? (
              <Button variant="outline" onClick={generateShareLink} className="w-full">
                <Link className="h-4 w-4 mr-2" />
                Generate Share Link
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border rounded-md bg-gray-50"
                  />
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareLink)}>
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Link expires in 30 days. Recipients can view but not edit.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
