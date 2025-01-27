import React from "react";
import './draw.css';

export default function Draw() {
  return (
    <main>
      <div className="container">
        <canvas id="drawingCanvas" width="800" height="600"></canvas>

        <div className="controls">
          <label htmlFor="brushSize">Brush Size:</label>
          <input type="range" id="brushSize" name="brushSize" min="1" max="10" defaultValue="5" />

          <label htmlFor="eraserSize">Eraser Size:</label>
          <input type="range" id="eraserSize" min="1" max="10" defaultValue="5" />

          <input type="color" id="Color" name="Color" defaultValue="black" />
        </div>

        <div className="action-buttons">
          <button id="clearCanvas">Clear</button>
          <button id="saveDrawing">Save</button>
        </div>
      </div>
    </main>
  );
}
