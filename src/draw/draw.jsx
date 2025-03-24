import React, { useRef, useState, useEffect } from "react";
import './draw.css';

export default function Draw() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [eraserSize, setEraserSize] = useState(20);
  const [color, setColor] = useState("black");
  const socketRef = useRef(null);
  const [drawingStatus, setDrawingStatus] = useState("No one is drawing");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round"; // Smooth edges
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // Initialize WebSocket connection only once
    socketRef.current = new WebSocket("ws://localhost:4000"); // Change this to your WebSocket server

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "drawing") {
        setDrawingStatus("Someone is drawing...");
      } else if (data.type === "stopped") {
        setDrawingStatus("No one is drawing");
      }
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      // Cleanup WebSocket connection when the component unmounts
      socketRef.current.close();
    };
  }, []);

  const sendWebSocketMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    sendWebSocketMessage({ type: "drawing" });
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

    sendWebSocketMessage({ type: "stopped" });
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

  const saveToGallery = async () => {
    const canvas = document.getElementById("drawingCanvas");
    const imageData = canvas.toDataURL("image/png"); // Convert canvas to Base64
  
    try {
      const response = await fetch("api/save-drawing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });
  
      if (response.ok) {
        alert("Drawing saved successfully!");
      } else {
        alert("Failed to save drawing.");
      }
    } catch (error) {
      console.error("Error saving drawing:", error);
      alert("An error occurred while saving the drawing.");
    }
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

        <div className="websocket">
            <p>{drawingStatus}</p>
          </div>
      </div>
    </main>
  );
}
