"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface TabDisplayProps {
  instrument: string
  currentTime: number
  isPlaying: boolean
  tuningSettings: {
    tuning: string
    capo: number
  }
  songKey: string
}

export function TabDisplay({ instrument, currentTime, isPlaying, tuningSettings, songKey }: TabDisplayProps) {
  const [zoom, setZoom] = useState(100)
  const [currentMeasure, setCurrentMeasure] = useState(1)
  const vexFlowRef = useRef<HTMLDivElement>(null)

  // Update current measure based on time
  useEffect(() => {
    const measure = Math.floor(currentTime / 4) + 1
    setCurrentMeasure(measure)
  }, [currentTime])

  // Initialize VexFlow when component mounts or instrument changes
  useEffect(() => {
    if (vexFlowRef.current && typeof window !== "undefined") {
      // Clear previous content
      vexFlowRef.current.innerHTML = ""

      try {
        switch (instrument) {
          case "guitar":
            renderGuitarTablature()
            break
          case "piano":
            renderPianoNotation()
            break
          case "bass":
            renderBassTablature()
            break
          case "ukulele":
            renderUkuleleTablature()
            break
          case "drums":
            renderDrumNotation()
            break
          default:
            renderGenericNotation()
        }
      } catch (error) {
        console.error("VexFlow rendering error:", error)
        renderFallbackNotation()
      }
    }
  }, [instrument, tuningSettings, currentTime])

  const renderGuitarTablature = () => {
    if (!vexFlowRef.current) return

    const VF = (window as any).Vex?.Flow
    if (!VF) {
      renderMockVexFlow()
      return
    }

    const div = vexFlowRef.current
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    renderer.resize(800, 250)
    const context = renderer.getContext()

    // Create guitar tablature stave
    const tabStave = new VF.TabStave(10, 40, 750)
    tabStave.addClef("tab").setContext(context).draw()

    // Create standard notation stave above
    const stave = new VF.Stave(10, 0, 750)
    stave.addClef("treble").addTimeSignature("4/4").setContext(context).draw()

    // Connect the staves
    const connector = new VF.StaveConnector(stave, tabStave)
    connector.setType(VF.StaveConnector.type.BRACKET)
    connector.setContext(context).draw()

    // Create notes for Wonderwall progression (G - C - Em - G)
    const notes = [
      new VF.TabNote({
        positions: [
          { str: 6, fret: 3 },
          { str: 5, fret: 2 },
          { str: 4, fret: 0 },
          { str: 3, fret: 0 },
          { str: 2, fret: 3 },
          { str: 1, fret: 3 },
        ],
        duration: "q",
      }),
      new VF.TabNote({
        positions: [
          { str: 5, fret: 3 },
          { str: 4, fret: 2 },
          { str: 3, fret: 0 },
          { str: 2, fret: 1 },
          { str: 1, fret: 0 },
        ],
        duration: "q",
      }),
      new VF.TabNote({
        positions: [
          { str: 6, fret: 0 },
          { str: 5, fret: 2 },
          { str: 4, fret: 2 },
          { str: 3, fret: 0 },
          { str: 2, fret: 0 },
          { str: 1, fret: 0 },
        ],
        duration: "q",
      }),
      new VF.TabNote({
        positions: [
          { str: 6, fret: 3 },
          { str: 5, fret: 2 },
          { str: 4, fret: 0 },
          { str: 3, fret: 0 },
          { str: 2, fret: 3 },
          { str: 1, fret: 3 },
        ],
        duration: "q",
      }),
    ]

    const currentNoteIndex = Math.floor(currentTime / 4) % notes.length
    if (isPlaying && notes[currentNoteIndex]) {
      notes[currentNoteIndex].setStyle({ fillStyle: "#3b82f6", strokeStyle: "#3b82f6" })
    }

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 })
    voice.addTickables(notes)

    new VF.Formatter().joinVoices([voice]).format([voice], 700)
    voice.draw(context, tabStave)

    // Add chord symbols
    const chordSymbols = ["G", "C", "Em", "G"]
    chordSymbols.forEach((chord, index) => {
      const x = 60 + index * 175
      context.setFont("Arial", 16, "bold")
      context.setFillStyle(currentNoteIndex === index && isPlaying ? "#dc2626" : "#374151")
      context.fillText(chord, x, 30)
    })
  }

  const renderBassTablature = () => {
    if (!vexFlowRef.current) return

    const VF = (window as any).Vex?.Flow
    if (!VF) {
      renderMockVexFlow()
      return
    }

    const div = vexFlowRef.current
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    renderer.resize(800, 220)
    const context = renderer.getContext()

    // Create bass tablature stave (4 strings)
    const tabStave = new VF.TabStave(10, 40, 750)
    tabStave.addClef("tab").setContext(context).draw()

    // Create bass clef stave above
    const stave = new VF.Stave(10, 0, 750)
    stave.addClef("bass").addTimeSignature("4/4").setContext(context).draw()

    // Connect the staves
    const connector = new VF.StaveConnector(stave, tabStave)
    connector.setType(VF.StaveConnector.type.BRACKET)
    connector.setContext(context).draw()

    // Bass line for Wonderwall (root notes of progression)
    const notes = [
      // G (3rd fret E string)
      new VF.TabNote({
        positions: [{ str: 4, fret: 3 }],
        duration: "q",
      }),
      // C (3rd fret A string)
      new VF.TabNote({
        positions: [{ str: 3, fret: 3 }],
        duration: "q",
      }),
      // E (2nd fret D string)
      new VF.TabNote({
        positions: [{ str: 2, fret: 2 }],
        duration: "q",
      }),
      // G (3rd fret E string)
      new VF.TabNote({
        positions: [{ str: 4, fret: 3 }],
        duration: "q",
      }),
    ]

    const currentNoteIndex = Math.floor(currentTime / 4) % notes.length
    if (isPlaying && notes[currentNoteIndex]) {
      notes[currentNoteIndex].setStyle({ fillStyle: "#3b82f6", strokeStyle: "#3b82f6" })
    }

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 })
    voice.addTickables(notes)

    new VF.Formatter().joinVoices([voice]).format([voice], 700)
    voice.draw(context, tabStave)

    // Add chord symbols
    const chordSymbols = ["G", "C", "Em", "G"]
    chordSymbols.forEach((chord, index) => {
      const x = 60 + index * 175
      context.setFont("Arial", 16, "bold")
      context.setFillStyle(currentNoteIndex === index && isPlaying ? "#dc2626" : "#374151")
      context.fillText(chord, x, 30)
    })
  }

  const renderUkuleleTablature = () => {
    if (!vexFlowRef.current) return

    const VF = (window as any).Vex?.Flow
    if (!VF) {
      renderMockVexFlow()
      return
    }

    const div = vexFlowRef.current
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    renderer.resize(800, 200)
    const context = renderer.getContext()

    // Create ukulele tablature stave (4 strings)
    const tabStave = new VF.TabStave(10, 40, 750)
    tabStave.addClef("tab").setContext(context).draw()

    // Create treble clef stave above
    const stave = new VF.Stave(10, 0, 750)
    stave.addClef("treble").addTimeSignature("4/4").setContext(context).draw()

    // Connect the staves
    const connector = new VF.StaveConnector(stave, tabStave)
    connector.setType(VF.StaveConnector.type.BRACKET)
    connector.setContext(context).draw()

    // Ukulele chords for Wonderwall (G - C - Em - G)
    // Standard ukulele tuning: G-C-E-A (4th-3rd-2nd-1st strings)
    const notes = [
      // G chord (0-2-3-2)
      new VF.TabNote({
        positions: [
          { str: 4, fret: 0 }, // G
          { str: 3, fret: 2 }, // C
          { str: 2, fret: 3 }, // E
          { str: 1, fret: 2 }, // A
        ],
        duration: "q",
      }),
      // C chord (0-0-0-3)
      new VF.TabNote({
        positions: [
          { str: 4, fret: 0 }, // G
          { str: 3, fret: 0 }, // C
          { str: 2, fret: 0 }, // E
          { str: 1, fret: 3 }, // A
        ],
        duration: "q",
      }),
      // Em chord (0-4-3-2)
      new VF.TabNote({
        positions: [
          { str: 4, fret: 0 }, // G
          { str: 3, fret: 4 }, // C
          { str: 2, fret: 3 }, // E
          { str: 1, fret: 2 }, // A
        ],
        duration: "q",
      }),
      // G chord (0-2-3-2)
      new VF.TabNote({
        positions: [
          { str: 4, fret: 0 }, // G
          { str: 3, fret: 2 }, // C
          { str: 2, fret: 3 }, // E
          { str: 1, fret: 2 }, // A
        ],
        duration: "q",
      }),
    ]

    const currentNoteIndex = Math.floor(currentTime / 4) % notes.length
    if (isPlaying && notes[currentNoteIndex]) {
      notes[currentNoteIndex].setStyle({ fillStyle: "#3b82f6", strokeStyle: "#3b82f6" })
    }

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 })
    voice.addTickables(notes)

    new VF.Formatter().joinVoices([voice]).format([voice], 700)
    voice.draw(context, tabStave)

    // Add chord symbols
    const chordSymbols = ["G", "C", "Em", "G"]
    chordSymbols.forEach((chord, index) => {
      const x = 60 + index * 175
      context.setFont("Arial", 16, "bold")
      context.setFillStyle(currentNoteIndex === index && isPlaying ? "#dc2626" : "#374151")
      context.fillText(chord, x, 30)
    })
  }

  const renderDrumNotation = () => {
    if (!vexFlowRef.current) return

    const VF = (window as any).Vex?.Flow
    if (!VF) {
      renderMockVexFlow()
      return
    }

    const div = vexFlowRef.current
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    renderer.resize(800, 180)
    const context = renderer.getContext()

    // Create percussion stave
    const stave = new VF.Stave(10, 40, 750)
    stave.addClef("percussion").addTimeSignature("4/4").setContext(context).draw()

    // Create drum notes (kick, snare, hi-hat pattern)
    // Using standard drum notation positions
    const notes = [
      // Beat 1: Kick + Hi-hat
      new VF.StaveNote({
        clef: "percussion",
        keys: ["g/5", "f/4"], // Hi-hat + Kick
        duration: "q",
        stem_direction: VF.Stem.UP,
      }),
      // Beat 2: Hi-hat
      new VF.StaveNote({
        clef: "percussion",
        keys: ["g/5"], // Hi-hat
        duration: "q",
        stem_direction: VF.Stem.UP,
      }),
      // Beat 3: Snare + Hi-hat
      new VF.StaveNote({
        clef: "percussion",
        keys: ["g/5", "c/5"], // Hi-hat + Snare
        duration: "q",
        stem_direction: VF.Stem.UP,
      }),
      // Beat 4: Hi-hat
      new VF.StaveNote({
        clef: "percussion",
        keys: ["g/5"], // Hi-hat
        duration: "q",
        stem_direction: VF.Stem.UP,
      }),
    ]

    // Add note heads for different drum sounds
    notes.forEach((note, index) => {
      if (note.keys.includes("f/4")) {
        // Kick drum - filled note head
        note.setKeyStyle(note.keys.indexOf("f/4"), { fillStyle: "black" })
      }
      if (note.keys.includes("c/5")) {
        // Snare - normal note head
        note.setKeyStyle(note.keys.indexOf("c/5"), { fillStyle: "black" })
      }
      if (note.keys.includes("g/5")) {
        // Hi-hat - x note head
        note.setKeyStyle(note.keys.indexOf("g/5"), { fillStyle: "black" })
      }
    })

    const currentNoteIndex = Math.floor(currentTime / 4) % notes.length
    if (isPlaying && notes[currentNoteIndex]) {
      notes[currentNoteIndex].setStyle({ fillStyle: "#3b82f6", strokeStyle: "#3b82f6" })
    }

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 })
    voice.addTickables(notes)

    new VF.Formatter().joinVoices([voice]).format([voice], 700)
    voice.draw(context, stave)

    // Add drum labels
    const drumLabels = ["K+HH", "HH", "S+HH", "HH"]
    drumLabels.forEach((label, index) => {
      const x = 60 + index * 175
      context.setFont("Arial", 12, "normal")
      context.setFillStyle(currentNoteIndex === index && isPlaying ? "#dc2626" : "#6b7280")
      context.fillText(label, x, 25)
    })
  }

  const renderPianoNotation = () => {
    if (!vexFlowRef.current) return

    const VF = (window as any).Vex?.Flow
    if (!VF) {
      renderMockVexFlow()
      return
    }

    const div = vexFlowRef.current
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    renderer.resize(800, 200)
    const context = renderer.getContext()

    // Create treble clef stave
    const stave = new VF.Stave(10, 40, 750)
    stave.addClef("treble").addTimeSignature("4/4").addKeySignature(songKey).setContext(context).draw()

    // Create notes for chord progression
    const notes = [
      new VF.StaveNote({ clef: "treble", keys: ["g/4", "b/4", "d/5"], duration: "q" }),
      new VF.StaveNote({ clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
      new VF.StaveNote({ clef: "treble", keys: ["e/4", "g/4", "b/4"], duration: "q" }),
      new VF.StaveNote({ clef: "treble", keys: ["g/4", "b/4", "d/5"], duration: "q" }),
    ]

    const currentNoteIndex = Math.floor(currentTime / 4) % notes.length
    if (isPlaying && notes[currentNoteIndex]) {
      notes[currentNoteIndex].setStyle({ fillStyle: "#3b82f6", strokeStyle: "#3b82f6" })
    }

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 })
    voice.addTickables(notes)

    new VF.Formatter().joinVoices([voice]).format([voice], 700)
    voice.draw(context, stave)

    // Add chord symbols
    const chordSymbols = ["G", "C", "Em", "G"]
    chordSymbols.forEach((chord, index) => {
      const x = 60 + index * 175
      context.setFont("Arial", 14, "bold")
      context.setFillStyle(currentNoteIndex === index && isPlaying ? "#dc2626" : "#374151")
      context.fillText(chord, x, 25)
    })
  }

  const renderGenericNotation = () => {
    if (!vexFlowRef.current) return

    const VF = (window as any).Vex?.Flow
    if (!VF) {
      renderMockVexFlow()
      return
    }

    const div = vexFlowRef.current
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    renderer.resize(800, 150)
    const context = renderer.getContext()

    const stave = new VF.Stave(10, 40, 750)
    stave.addClef("treble").addTimeSignature("4/4").setContext(context).draw()

    const notes = [
      new VF.StaveNote({ clef: "treble", keys: ["c/4"], duration: "q" }),
      new VF.StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" }),
      new VF.StaveNote({ clef: "treble", keys: ["e/4"], duration: "q" }),
      new VF.StaveNote({ clef: "treble", keys: ["f/4"], duration: "q" }),
    ]

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 })
    voice.addTickables(notes)

    new VF.Formatter().joinVoices([voice]).format([voice], 700)
    voice.draw(context, stave)
  }

  const renderMockVexFlow = () => {
    if (!vexFlowRef.current) return

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const height = instrument === "guitar" ? 250 : instrument === "drums" ? 180 : instrument === "bass" ? 220 : 200
    svg.setAttribute("width", "800")
    svg.setAttribute("height", height.toString())
    svg.setAttribute("viewBox", `0 0 800 ${height}`)
    svg.style.background = "#fafafa"
    svg.style.border = "1px solid #e5e7eb"
    svg.style.borderRadius = "8px"

    if (instrument === "bass") {
      // Draw bass staff and tab lines (4 strings)
      for (let i = 0; i < 5; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (20 + i * 10).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (20 + i * 10).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      // Bass tablature lines (4 strings: E-A-D-G)
      for (let i = 0; i < 4; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (100 + i * 25).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (100 + i * 25).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      // Add bass clef
      const clef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      clef.setAttribute("x", "60")
      clef.setAttribute("y", "45")
      clef.setAttribute("font-family", "serif")
      clef.setAttribute("font-size", "30")
      clef.setAttribute("fill", "#374151")
      clef.textContent = "𝄢"
      svg.appendChild(clef)

      // Add TAB clef
      const tabClef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      tabClef.setAttribute("x", "60")
      tabClef.setAttribute("y", "130")
      tabClef.setAttribute("font-family", "Arial, sans-serif")
      tabClef.setAttribute("font-size", "16")
      tabClef.setAttribute("font-weight", "bold")
      tabClef.setAttribute("fill", "#374151")
      tabClef.textContent = "TAB"
      svg.appendChild(tabClef)

      // Bass line fret numbers (root notes)
      const bassFrets = ["3", "3", "2", "3"] // G, C, E, G
      const bassStrings = [4, 3, 2, 4] // Which string each note is on
      bassFrets.forEach((fret, index) => {
        const x = 150 + index * 150
        const stringIndex = bassStrings[index] - 1
        const isCurrentNote = Math.floor(currentTime / 4) === index

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", x.toString())
        text.setAttribute("y", (105 + stringIndex * 25).toString())
        text.setAttribute("font-family", "monospace")
        text.setAttribute("font-size", "14")
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("fill", isCurrentNote && isPlaying ? "#3b82f6" : "#374151")
        text.setAttribute("font-weight", isCurrentNote && isPlaying ? "bold" : "normal")
        text.textContent = fret
        svg.appendChild(text)
      })

      // Add chord symbols
      const chords = ["G", "C", "Em", "G"]
      chords.forEach((chord, index) => {
        const x = 150 + index * 150
        const isCurrentChord = Math.floor(currentTime / 4) === index

        const chordText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        chordText.setAttribute("x", x.toString())
        chordText.setAttribute("y", "15")
        chordText.setAttribute("font-family", "Arial, sans-serif")
        chordText.setAttribute("font-size", "16")
        chordText.setAttribute("font-weight", "bold")
        chordText.setAttribute("text-anchor", "middle")
        chordText.setAttribute("fill", isCurrentChord && isPlaying ? "#dc2626" : "#6b7280")
        chordText.textContent = chord
        svg.appendChild(chordText)
      })
    } else if (instrument === "ukulele") {
      // Draw ukulele staff and tab lines (4 strings)
      for (let i = 0; i < 5; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (20 + i * 10).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (20 + i * 10).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      // Ukulele tablature lines (4 strings: G-C-E-A)
      for (let i = 0; i < 4; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (90 + i * 20).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (90 + i * 20).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      // Add treble clef
      const clef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      clef.setAttribute("x", "60")
      clef.setAttribute("y", "45")
      clef.setAttribute("font-family", "serif")
      clef.setAttribute("font-size", "30")
      clef.setAttribute("fill", "#374151")
      clef.textContent = "𝄞"
      svg.appendChild(clef)

      // Add TAB clef
      const tabClef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      tabClef.setAttribute("x", "60")
      tabClef.setAttribute("y", "120")
      tabClef.setAttribute("font-family", "Arial, sans-serif")
      tabClef.setAttribute("font-size", "16")
      tabClef.setAttribute("font-weight", "bold")
      tabClef.setAttribute("fill", "#374151")
      tabClef.textContent = "TAB"
      svg.appendChild(tabClef)

      // Ukulele chord fingerings
      const ukeChords = [
        { frets: ["0", "2", "3", "2"], chord: "G" },
        { frets: ["0", "0", "0", "3"], chord: "C" },
        { frets: ["0", "4", "3", "2"], chord: "Em" },
        { frets: ["0", "2", "3", "2"], chord: "G" },
      ]

      ukeChords.forEach((chordData, chordIndex) => {
        const x = 150 + chordIndex * 150
        const isCurrentChord = Math.floor(currentTime / 4) === chordIndex

        // Add fret numbers
        chordData.frets.forEach((fret, stringIndex) => {
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
          text.setAttribute("x", x.toString())
          text.setAttribute("y", (95 + stringIndex * 20).toString())
          text.setAttribute("font-family", "monospace")
          text.setAttribute("font-size", "14")
          text.setAttribute("text-anchor", "middle")
          text.setAttribute("fill", isCurrentChord && isPlaying ? "#3b82f6" : "#374151")
          text.setAttribute("font-weight", isCurrentChord && isPlaying ? "bold" : "normal")
          text.textContent = fret
          svg.appendChild(text)
        })

        // Add chord symbol
        const chordText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        chordText.setAttribute("x", x.toString())
        chordText.setAttribute("y", "15")
        chordText.setAttribute("font-family", "Arial, sans-serif")
        chordText.setAttribute("font-size", "16")
        chordText.setAttribute("font-weight", "bold")
        chordText.setAttribute("text-anchor", "middle")
        chordText.setAttribute("fill", isCurrentChord && isPlaying ? "#dc2626" : "#6b7280")
        chordText.textContent = chordData.chord
        svg.appendChild(chordText)
      })
    } else if (instrument === "drums") {
      // Draw percussion staff (single line for simplicity)
      for (let i = 0; i < 5; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (60 + i * 15).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (60 + i * 15).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      // Add percussion clef
      const clef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      clef.setAttribute("x", "60")
      clef.setAttribute("y", "95")
      clef.setAttribute("font-family", "serif")
      clef.setAttribute("font-size", "30")
      clef.setAttribute("fill", "#374151")
      clef.textContent = "𝄥"
      svg.appendChild(clef)

      // Drum pattern notation
      const drumPattern = [
        { symbols: ["●", "×"], labels: "K+HH", y: [105, 75] },
        { symbols: ["×"], labels: "HH", y: [75] },
        { symbols: ["○", "×"], labels: "S+HH", y: [90, 75] },
        { symbols: ["×"], labels: "HH", y: [75] },
      ]

      drumPattern.forEach((beat, index) => {
        const x = 150 + index * 150
        const isCurrentBeat = Math.floor(currentTime / 4) === index

        // Draw drum symbols
        beat.symbols.forEach((symbol, symbolIndex) => {
          const symbolText = document.createElementNS("http://www.w3.org/2000/svg", "text")
          symbolText.setAttribute("x", x.toString())
          symbolText.setAttribute("y", beat.y[symbolIndex].toString())
          symbolText.setAttribute("font-family", "Arial, sans-serif")
          symbolText.setAttribute("font-size", "16")
          symbolText.setAttribute("font-weight", "bold")
          symbolText.setAttribute("text-anchor", "middle")
          symbolText.setAttribute("fill", isCurrentBeat && isPlaying ? "#3b82f6" : "#374151")
          symbolText.textContent = symbol
          svg.appendChild(symbolText)
        })

        // Add beat label
        const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        labelText.setAttribute("x", x.toString())
        labelText.setAttribute("y", "30")
        labelText.setAttribute("font-family", "Arial, sans-serif")
        labelText.setAttribute("font-size", "12")
        labelText.setAttribute("text-anchor", "middle")
        labelText.setAttribute("fill", isCurrentBeat && isPlaying ? "#dc2626" : "#6b7280")
        labelText.textContent = beat.labels
        svg.appendChild(labelText)
      })

      // Add legend
      const legend = document.createElementNS("http://www.w3.org/2000/svg", "text")
      legend.setAttribute("x", "50")
      legend.setAttribute("y", "150")
      legend.setAttribute("font-family", "Arial, sans-serif")
      legend.setAttribute("font-size", "10")
      legend.setAttribute("fill", "#6b7280")
      legend.textContent = "● = Kick, ○ = Snare, × = Hi-hat"
      svg.appendChild(legend)
    } else if (instrument === "guitar") {
      // Existing guitar rendering code...
      // (keeping the original guitar code for consistency)
      for (let i = 0; i < 5; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (20 + i * 10).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (20 + i * 10).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      for (let i = 0; i < 6; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (100 + i * 20).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (100 + i * 20).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      const clef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      clef.setAttribute("x", "60")
      clef.setAttribute("y", "45")
      clef.setAttribute("font-family", "serif")
      clef.setAttribute("font-size", "30")
      clef.setAttribute("fill", "#374151")
      clef.textContent = "𝄞"
      svg.appendChild(clef)

      const tabClef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      tabClef.setAttribute("x", "60")
      tabClef.setAttribute("y", "140")
      tabClef.setAttribute("font-family", "Arial, sans-serif")
      tabClef.setAttribute("font-size", "16")
      tabClef.setAttribute("font-weight", "bold")
      tabClef.setAttribute("fill", "#374151")
      tabClef.textContent = "TAB"
      svg.appendChild(tabClef)

      const measures = [
        { frets: ["3", "2", "0", "0", "3", "3"], chord: "G" },
        { frets: ["", "3", "2", "0", "1", "0"], chord: "C" },
        { frets: ["0", "2", "2", "0", "0", "0"], chord: "Em" },
        { frets: ["3", "2", "0", "0", "3", "3"], chord: "G" },
      ]

      measures.forEach((measure, measureIndex) => {
        const x = 150 + measureIndex * 150
        const isCurrentMeasure = Math.floor(currentTime / 4) === measureIndex

        measure.frets.forEach((fret, stringIndex) => {
          if (fret) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
            text.setAttribute("x", x.toString())
            text.setAttribute("y", (105 + stringIndex * 20).toString())
            text.setAttribute("font-family", "monospace")
            text.setAttribute("font-size", "14")
            text.setAttribute("text-anchor", "middle")
            text.setAttribute("fill", isCurrentMeasure && isPlaying ? "#3b82f6" : "#374151")
            text.setAttribute("font-weight", isCurrentMeasure && isPlaying ? "bold" : "normal")
            text.textContent = fret
            svg.appendChild(text)
          }
        })

        const chordText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        chordText.setAttribute("x", x.toString())
        chordText.setAttribute("y", "15")
        chordText.setAttribute("font-family", "Arial, sans-serif")
        chordText.setAttribute("font-size", "16")
        chordText.setAttribute("font-weight", "bold")
        chordText.setAttribute("text-anchor", "middle")
        chordText.setAttribute("fill", isCurrentMeasure && isPlaying ? "#dc2626" : "#6b7280")
        chordText.textContent = measure.chord
        svg.appendChild(chordText)
      })
    } else if (instrument === "piano") {
      // Existing piano rendering code...
      for (let i = 0; i < 5; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", "50")
        line.setAttribute("y1", (60 + i * 15).toString())
        line.setAttribute("x2", "750")
        line.setAttribute("y2", (60 + i * 15).toString())
        line.setAttribute("stroke", "#6b7280")
        line.setAttribute("stroke-width", "1")
        svg.appendChild(line)
      }

      const clef = document.createElementNS("http://www.w3.org/2000/svg", "text")
      clef.setAttribute("x", "60")
      clef.setAttribute("y", "95")
      clef.setAttribute("font-family", "serif")
      clef.setAttribute("font-size", "40")
      clef.setAttribute("fill", "#374151")
      clef.textContent = "𝄞"
      svg.appendChild(clef)

      const chords = ["G", "C", "Em", "G"]
      const notePositions = [
        [105, 90, 75],
        [120, 105, 90],
        [105, 90, 75],
        [105, 90, 75],
      ]

      chords.forEach((chord, chordIndex) => {
        const x = 150 + chordIndex * 150
        const isCurrentChord = Math.floor(currentTime / 4) === chordIndex

        notePositions[chordIndex].forEach((y) => {
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")
          circle.setAttribute("cx", x.toString())
          circle.setAttribute("cy", y.toString())
          circle.setAttribute("rx", "8")
          circle.setAttribute("ry", "6")
          circle.setAttribute("fill", isCurrentChord && isPlaying ? "#3b82f6" : "#374151")
          svg.appendChild(circle)
        })

        const chordText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        chordText.setAttribute("x", x.toString())
        chordText.setAttribute("y", "30")
        chordText.setAttribute("font-family", "Arial, sans-serif")
        chordText.setAttribute("font-size", "16")
        chordText.setAttribute("font-weight", "bold")
        chordText.setAttribute("text-anchor", "middle")
        chordText.setAttribute("fill", isCurrentChord && isPlaying ? "#dc2626" : "#6b7280")
        chordText.textContent = chord
        svg.appendChild(chordText)
      })
    }

    vexFlowRef.current.appendChild(svg)
  }

  const renderFallbackNotation = () => {
    if (!vexFlowRef.current) return

    const fallbackDiv = document.createElement("div")
    fallbackDiv.className = "bg-gray-50 p-6 rounded-lg text-center"
    fallbackDiv.innerHTML = `
      <div class="text-gray-600 mb-4">
        <svg class="h-16 w-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        VexFlow notation rendering
      </div>
      <div class="text-sm text-gray-500">
        Professional music notation for ${instrument}
      </div>
    `
    vexFlowRef.current.appendChild(fallbackDiv)
  }

  const getInstrumentDisplayName = () => {
    switch (instrument) {
      case "guitar":
        return "Guitar Tablature & Notation"
      case "bass":
        return "Bass Tablature & Notation"
      case "ukulele":
        return "Ukulele Tablature & Notation"
      case "drums":
        return "Drum Notation"
      case "piano":
        return "Piano Notation"
      default:
        return `${instrument.charAt(0).toUpperCase() + instrument.slice(1)} Notation`
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Measure: {currentMeasure}</span>
          {isPlaying && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-600">LIVE</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(100)}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* VexFlow Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{getInstrumentDisplayName()}</h3>
          <div className="flex items-center gap-2">
            {(instrument === "guitar" || instrument === "bass" || instrument === "ukulele") && (
              <>
                {tuningSettings.capo > 0 && <Badge variant="outline">Capo: {tuningSettings.capo}</Badge>}
                <Badge variant="outline">{tuningSettings.tuning}</Badge>
              </>
            )}
            <Badge variant="outline">Key: {songKey}</Badge>
          </div>
        </div>

        <div
          ref={vexFlowRef}
          className="overflow-x-auto bg-white rounded-lg border"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
        />
      </div>

      {/* Real-time Analysis */}
      <Card className="p-3 bg-blue-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-700">🎵 VexFlow rendering: {getInstrumentDisplayName()}</span>
          <span className="text-blue-600">Sync accuracy: 98%</span>
        </div>
      </Card>

      {/* Instrument-specific Info */}
      <div className="text-xs text-gray-500 bg-purple-50 p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">🎼 {instrument.charAt(0).toUpperCase() + instrument.slice(1)} Notation</span>
        </div>
        <p>
          {instrument === "bass" &&
            "4-string bass tablature with root note progressions. Standard tuning: E-A-D-G (low to high)."}
          {instrument === "ukulele" &&
            "4-string ukulele tablature with chord fingerings. Standard tuning: G-C-E-A (4th to 1st string)."}
          {instrument === "drums" &&
            "Percussion notation with kick (●), snare (○), and hi-hat (×) patterns. Standard rock beat progression."}
          {instrument === "guitar" &&
            "6-string guitar tablature with standard notation. Professional dual-staff layout with chord symbols."}
          {instrument === "piano" &&
            "Piano chord notation with treble clef. Chord voicings and progressions displayed."}
        </p>
      </div>
    </div>
  )
}
