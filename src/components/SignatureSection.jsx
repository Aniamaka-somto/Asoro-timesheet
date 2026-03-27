import React, { useRef, useEffect, useState } from "react";

const SignatureSection = ({ onSubmit }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to match its display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const source = e.touches ? e.touches[0] : e;
    return {
      x: source.clientX - rect.left,
      y: source.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    isDrawing.current = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    const signatureDataUrl = canvas.toDataURL("image/png"); // base64 image
    onSubmit(signatureDataUrl);
  };

  return (
    <div className="signature-section">
      <div className="signature-area">
        <label>Signature</label>
        <div className="signature-box">
          <canvas
            ref={canvasRef}
            className="signature-canvas"
            style={{
              width: "100%",
              height: "150px",
              border: "1px solid #ccc",
              cursor: "crosshair",
            }}
            // Mouse events
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            // Touch events (mobile)
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <button
            type="button"
            className="clear-signature"
            onClick={clearSignature}
          >
            Clear
          </button>
        </div>
      </div>

      <p className="signature-note">Sign above to confirm your timesheet</p>

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={!hasSignature}
      >
        Submit Timesheet
      </button>
    </div>
  );
};

export default SignatureSection;
