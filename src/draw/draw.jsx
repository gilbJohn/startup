import React, { useRef, useState, useEffect } from "react";
import './draw.css';

export default function Draw() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [eraserSize, setEraserSize] = useState(20);
  const [color, setColor] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round"; // Smooth edges
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const handleBrushSizeChange = (e) => {
    const size = e.target.value;
    setBrushSize(size);
    ctxRef.current.lineWidth = size;
  };

  const handleEraserSizeChange = (e) => {
    const size = e.target.value;
    setEraserSize(size);
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    ctxRef.current.strokeStyle = selectedColor;
  };

  const enableEraser = () => {
    ctxRef.current.strokeStyle = "white";
    ctxRef.current.lineWidth = eraserSize;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveToGallery = () => {
    const canvas = document.getElementById("drawingCanvas");
    const imageData = canvas.toDataURL("image/png"); // Convert canvas to an image
  
    // Get existing images from local storage or create a new array
    const savedDrawings = JSON.parse(localStorage.getItem("galleryImages")) || [];
    savedDrawings.push(imageData); // Add new image to the array
  
    localStorage.setItem("galleryImages", JSON.stringify(savedDrawings)); // Save to local storage
    alert("Drawing saved to gallery!");
  };
  

  return (
    <main>
      <div className="container">
        <canvas
          id="drawingCanvas"
          ref={canvasRef}
          width="800"
          height="600"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>

        <div className="controls">
          <label htmlFor="brushSize">Brush Size:</label>
          <input type="range" id="brushSize" min="1" max="20" value={brushSize} onChange={handleBrushSizeChange} />

          <label htmlFor="eraserSize">Eraser Size:</label>
          <input type="range" id="eraserSize" min="1" max="50" value={eraserSize} onChange={handleEraserSizeChange} />

          <input type="color" id="color" value={color} onChange={handleColorChange} />
        </div>

        <div className="action-buttons">
          <button onClick={clearCanvas}>Clear</button>
          <button id="saveDrawing" onClick={saveToGallery}>Save</button>
          <button onClick={enableEraser}>Eraser</button>
        </div>
      </div>
    </main>
  );
}
