import { useState } from "react"
import type { BoardImage } from "../types"
import { getBoardImageProps } from "../utils"

function Pcb2D() {
  const holes = [
    [22, 22],
    [178, 22],
    [22, 118],
    [178, 118],
  ]
  const pads = [
    [40, 40],
    [80, 60],
    [130, 60],
    [160, 80],
    [50, 100],
    [120, 75],
    [40, 70],
    [70, 70],
  ]

  return (
    <svg
      className="od-pcb-2d-svg"
      viewBox="0 0 200 140"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PCB preview"
    >
      <defs>
        <linearGradient id="od-board-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="180"
        height="120"
        rx="4"
        fill="url(#od-board-grad)"
        stroke="#052e16"
        strokeWidth="0.6"
      />
      {holes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="4" fill="#0a3d1a" />
          <circle cx={x} cy={y} r="2" fill="#fafafa" />
        </g>
      ))}
      <path
        d="M 40 40 L 80 40 L 80 60 L 130 60 L 130 80 L 160 80"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 50 100 L 90 100 L 90 75 L 120 75"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        opacity="0.75"
      />
      <path d="M 40 70 L 70 70" stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.75" />
      {pads.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="2.2"
          fill="#fbbf24"
          stroke="#92400e"
          strokeWidth="0.4"
        />
      ))}
      <rect
        x="95"
        y="35"
        width="22"
        height="14"
        rx="1"
        fill="#1c1917"
        stroke="#000"
        strokeWidth="0.4"
      />
      <circle cx="98" cy="38" r="0.8" fill="#71717a" />
      <text x="20" y="135" fontSize="4" fill="#ffffff" opacity="0.6" fontFamily="monospace">
        tscircuit · my-blinker-v3
      </text>
    </svg>
  )
}

function Pcb3D() {
  return (
    <div className="od-pcb-3d-wrap" aria-label="PCB 3D preview">
      <div className="od-pcb-3d">
        <div className="od-pcb-3d-board" />
      </div>
    </div>
  )
}

interface PcbPreviewProps {
  boardImage?: BoardImage
  dimensions?: string
}

export function PcbPreview({ boardImage, dimensions }: PcbPreviewProps) {
  const [view, setView] = useState<"2d" | "3d">("2d")
  const boardImageProps = getBoardImageProps(boardImage)

  return (
    <div className="od-preview-frame">
      {boardImageProps.src ? null : (
        <div className="od-preview-toolbar">
          <button className={view === "2d" ? "active" : ""} onClick={() => setView("2d")} type="button">
            2D
          </button>
          <button className={view === "3d" ? "active" : ""} onClick={() => setView("3d")} type="button">
            3D
          </button>
        </div>
      )}
      <div className="od-preview-content">
        {boardImageProps.src ? (
          <img className="od-board-image" src={boardImageProps.src} alt={boardImageProps.alt} />
        ) : view === "2d" ? (
          <Pcb2D />
        ) : (
          <Pcb3D />
        )}
      </div>
      <div className="od-preview-dim-label">{dimensions}</div>
    </div>
  )
}
