"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Button from "@/app/Components/Buttons/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture?: (imageData: string) => void;
}

interface DetectedRect {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAligned, setIsAligned] = useState(false);
  const [detectedRect, setDetectedRect] = useState<DetectedRect | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
      setIsAligned(false);
      setDetectedRect(null);
    }

    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isStreaming && videoRef.current && detectionCanvasRef.current && !capturedImage) {
      startDetection();
    } else {
      stopDetection();
    }

    return () => {
      stopDetection();
    };
  }, [isStreaming, capturedImage]);

  const startCamera = async () => {
    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsStreaming(false);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    stopDetection();
  };

  // ID Card detection functions - Improved to focus on rectangular ID cards
  const detectIDCard = (ctx: CanvasRenderingContext2D, width: number, height: number): DetectedRect | null => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Convert to grayscale
    const grayscale: number[] = [];
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = (r * 0.299 + g * 0.587 + b * 0.114);
      grayscale.push(gray);
    }

    // Enhanced edge detection using Sobel operator with higher threshold
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    const edgeMap: number[] = new Array(grayscale.length).fill(0);
    const edgeThreshold = 80; // Higher threshold to reduce false positives

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = (y + ky) * width + (x + kx);
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            gx += grayscale[idx] * sobelX[kernelIdx];
            gy += grayscale[idx] * sobelY[kernelIdx];
          }
        }
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        edgeMap[y * width + x] = magnitude > edgeThreshold ? magnitude : 0;
      }
    }

    // Target ID card aspect ratio: ~0.64:1 (width:height) for portrait orientation
    const targetAspectRatio = 0.64;
    const aspectTolerance = 0.12; // Stricter tolerance
    
    // Focus detection on center area where ID should be placed
    const centerX = width / 2;
    const centerY = height / 2;
    const scanRadius = Math.min(width, height) * 0.4;
    
    const candidates: DetectedRect[] = [];
    
    // Look for rectangular shapes with strong edges (ID cards have clear borders)
    for (let y = centerY - scanRadius; y < centerY + scanRadius; y += 8) {
      for (let x = centerX - scanRadius; x < centerX + scanRadius; x += 8) {
        if (x < 0 || y < 0 || x >= width || y >= height) continue;
        
        const edgeStrength = edgeMap[Math.floor(y) * width + Math.floor(x)];
        
        // Look for strong edge points (potential corners)
        if (edgeStrength > 150) {
          // Try to find a rectangle starting from this point
          let rectWidth = 0, rectHeight = 0;
          let hasStrongEdges = true;
          
          // Check for horizontal edges (top and bottom of rectangle)
          const checkWidth = Math.min(300, width - x);
          const checkHeight = Math.min(450, height - y);
          
          // Find right edge (strong vertical edge)
          for (let wx = x + 80; wx < x + checkWidth; wx += 3) {
            const topEdge = edgeMap[Math.floor(y) * width + Math.floor(wx)];
            const bottomY = Math.floor(y + checkHeight * 0.6);
            const bottomEdge = bottomY < height ? edgeMap[bottomY * width + Math.floor(wx)] : 0;
            
            if (topEdge > 120 && bottomEdge > 120) {
              rectWidth = wx - x;
              break;
            }
          }
          
          // Find bottom edge (strong horizontal edge)
          if (rectWidth > 80) {
            for (let hy = y + 100; hy < y + checkHeight; hy += 3) {
              const leftEdge = edgeMap[Math.floor(hy) * width + Math.floor(x)];
              const rightX = Math.floor(x + rectWidth);
              const rightEdge = rightX < width ? edgeMap[Math.floor(hy) * width + rightX] : 0;
              
              if (leftEdge > 120 && rightEdge > 120) {
                rectHeight = hy - y;
                break;
              }
            }
          }
          
          // Validate rectangle
          if (rectWidth > 80 && rectHeight > 120 && rectWidth < width * 0.6 && rectHeight < height * 0.7) {
            const aspectRatio = rectWidth / rectHeight;
            
            // Check if aspect ratio matches ID card
            if (Math.abs(aspectRatio - targetAspectRatio) < aspectTolerance) {
              // Verify all four corners have strong edges (rectangular shape)
              const corners = [
                edgeMap[Math.floor(y) * width + Math.floor(x)], // top-left
                edgeMap[Math.floor(y) * width + Math.floor(x + rectWidth)], // top-right
                edgeMap[Math.floor(y + rectHeight) * width + Math.floor(x)], // bottom-left
                edgeMap[Math.floor(y + rectHeight) * width + Math.floor(x + rectWidth)], // bottom-right
              ];
              
              const avgCornerStrength = corners.reduce((a, b) => a + b, 0) / corners.length;
              
              // Require strong edges at corners (ID cards have clear borders)
              if (avgCornerStrength > 100) {
                // Calculate overall confidence
                let totalEdgeStrength = 0;
                let edgeCount = 0;
                
                // Sample edges along the perimeter
                const samplePoints = 30;
                for (let i = 0; i < samplePoints; i++) {
                  const t = i / samplePoints;
                  // Top edge
                  const topX = x + rectWidth * t;
                  if (topX < width) totalEdgeStrength += edgeMap[Math.floor(y) * width + Math.floor(topX)];
                  // Bottom edge
                  const bottomX = x + rectWidth * t;
                  if (bottomX < width) totalEdgeStrength += edgeMap[Math.floor(y + rectHeight) * width + Math.floor(bottomX)];
                  // Left edge
                  const leftY = y + rectHeight * t;
                  if (leftY < height) totalEdgeStrength += edgeMap[Math.floor(leftY) * width + Math.floor(x)];
                  // Right edge
                  const rightY = y + rectHeight * t;
                  if (rightY < height) totalEdgeStrength += edgeMap[Math.floor(rightY) * width + Math.floor(x + rectWidth)];
                  edgeCount += 4;
                }
                
                const confidence = Math.min((totalEdgeStrength / edgeCount) / 255, 1);
                
                // Higher confidence threshold to avoid detecting faces
                if (confidence > 0.4) {
                  candidates.push({
                    x: Math.floor(x),
                    y: Math.floor(y),
                    width: Math.floor(rectWidth),
                    height: Math.floor(rectHeight),
                    confidence,
                  });
                }
              }
            }
          }
        }
      }
    }

    // Return the best candidate (highest confidence, closest to center)
    if (candidates.length > 0) {
      candidates.sort((a, b) => {
        // Prioritize by confidence and proximity to center
        const aDist = Math.sqrt(Math.pow(a.x + a.width/2 - centerX, 2) + Math.pow(a.y + a.height/2 - centerY, 2));
        const bDist = Math.sqrt(Math.pow(b.x + b.width/2 - centerX, 2) + Math.pow(b.y + b.height/2 - centerY, 2));
        return (b.confidence * 0.7 - aDist * 0.0001) - (a.confidence * 0.7 - bDist * 0.0001);
      });
      return candidates[0];
    }

    return null;
  };

  const checkAlignment = (detected: DetectedRect, frameX: number, frameY: number, frameW: number, frameH: number): boolean => {
    const tolerance = 30; // pixels
    const centerX = detected.x + detected.width / 2;
    const centerY = detected.y + detected.height / 2;
    const frameCenterX = frameX + frameW / 2;
    const frameCenterY = frameY + frameH / 2;
    
    const xDiff = Math.abs(centerX - frameCenterX);
    const yDiff = Math.abs(centerY - frameCenterY);
    const sizeDiff = Math.abs(detected.width - frameW);
    const heightDiff = Math.abs(detected.height - frameH);
    
    return xDiff < tolerance && yDiff < tolerance && sizeDiff < tolerance && heightDiff < tolerance;
  };

  const startDetection = () => {
    const detect = () => {
      if (!videoRef.current || !detectionCanvasRef.current || capturedImage) return;

      const video = videoRef.current;
      const canvas = detectionCanvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get video container dimensions for frame overlay
        const videoElement = videoRef.current;
        const containerRect = videoElement.getBoundingClientRect();
        const videoAspect = video.videoWidth / video.videoHeight;
        const containerAspect = containerRect.width / containerRect.height;

        let displayWidth = containerRect.width;
        let displayHeight = containerRect.height;
        let offsetX = 0;
        let offsetY = 0;

        if (videoAspect > containerAspect) {
          displayHeight = containerRect.width / videoAspect;
          offsetY = (containerRect.height - displayHeight) / 2;
        } else {
          displayWidth = containerRect.height * videoAspect;
          offsetX = (containerRect.width - displayWidth) / 2;
        }

        // Frame dimensions in video coordinates
        const frameW = 256; // w-64 = 256px
        const frameH = 320; // h-80 = 320px
        const frameX = (displayWidth - frameW) / 2 + offsetX;
        const frameY = (displayHeight - frameH) / 2 + offsetY;

        // Scale frame coordinates to video coordinates
        const scaleX = video.videoWidth / displayWidth;
        const scaleY = video.videoHeight / displayHeight;
        const videoFrameX = frameX * scaleX;
        const videoFrameY = frameY * scaleY;
        const videoFrameW = frameW * scaleX;
        const videoFrameH = frameH * scaleY;

        const detected = detectIDCard(ctx, canvas.width, canvas.height);
        
        if (detected) {
          setDetectedRect(detected);
          const aligned = checkAlignment(detected, videoFrameX, videoFrameY, videoFrameW, videoFrameH);
          setIsAligned(aligned);
        } else {
          setDetectedRect(null);
          setIsAligned(false);
        }
      }

      animationFrameRef.current = requestAnimationFrame(detect);
    };

    detect();
  };

  const stopDetection = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setDetectedRect(null);
    setIsAligned(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
        onCapture?.(imageData);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsAligned(false);
    setDetectedRect(null);
    
    // Ensure video is playing and stream is active
    if (videoRef.current) {
      if (streamRef.current) {
        // Stream exists, just restart video playback
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.play().catch((err) => {
          console.error("Error playing video:", err);
          // If play fails, restart camera
          startCamera();
        });
      } else {
        // Stream doesn't exist, restart camera
        startCamera();
      }
    } else {
      // Video ref doesn't exist, restart camera
      startCamera();
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Camera"
      icon={<CameraAltIcon className="w-6 h-6" />}
    >
      <div className="space-y-4">
        {/* Camera Display */}
        <div className="relative bg-zinc-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                  <p>Starting camera...</p>
                </div>
              )}
              {/* ID Card Frame Overlay - Portrait */}
              {isStreaming && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className={`relative w-64 h-80 border-4 rounded-lg shadow-lg transition-all duration-300 ${
                    isAligned 
                      ? "border-green-500 shadow-green-500/50" 
                      : "border-white"
                  }`}>
                    {/* Corner indicators */}
                    <div className={`absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 transition-colors ${
                      isAligned ? "border-green-500" : "border-white"
                    }`}></div>
                    <div className={`absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 transition-colors ${
                      isAligned ? "border-green-500" : "border-white"
                    }`}></div>
                    <div className={`absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 transition-colors ${
                      isAligned ? "border-green-500" : "border-white"
                    }`}></div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 transition-colors ${
                      isAligned ? "border-green-500" : "border-white"
                    }`}></div>
                    {/* Insert ID Label - Inside the frame */}
                    {!isAligned && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/30">
                          <p className="text-sm font-semibold text-center">Insert ID Here</p>
                        </div>
                      </div>
                    )}
                    {/* Alignment indicator */}
                    {isAligned && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>ID Aligned</span>
                      </div>
                    )}
                  </div>
                  {/* Instruction text - positioned outside the frame */}
                  <div className={`mt-4 text-sm font-medium whitespace-nowrap drop-shadow-lg transition-colors ${
                    isAligned ? "text-green-400" : "text-white"
                  }`}>
                    {isAligned ? "ID card detected and aligned!" : "Align ID card here"}
                  </div>
                  {/* Confidence Score Display */}
                  {detectedRect && (
                    <div className="mt-2 flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      <span>Detection Confidence:</span>
                      <span className={`font-bold ${
                        detectedRect.confidence > 0.7 ? "text-green-400" :
                        detectedRect.confidence > 0.4 ? "text-yellow-400" :
                        "text-red-400"
                      }`}>
                        {Math.round(detectedRect.confidence * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* Detected ID overlay - always show when detected */}
              {detectedRect && videoRef.current && (
                <div
                  className="absolute border-2 border-yellow-400 rounded-lg pointer-events-none z-10"
                  style={{
                    left: `${(detectedRect.x / videoRef.current.videoWidth) * 100}%`,
                    top: `${(detectedRect.y / videoRef.current.videoHeight) * 100}%`,
                    width: `${(detectedRect.width / videoRef.current.videoWidth) * 100}%`,
                    height: `${(detectedRect.height / videoRef.current.videoHeight) * 100}%`,
                    boxShadow: "0 0 10px rgba(250, 204, 21, 0.5)",
                  }}
                >
                  <div className="absolute -top-7 left-0 text-yellow-400 text-xs font-semibold bg-yellow-400/20 backdrop-blur-sm px-2 py-1 rounded border border-yellow-400/50 whitespace-nowrap">
                    ID Detected: {Math.round(detectedRect.confidence * 100)}%
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />
        {/* Hidden canvas for detection */}
        <canvas ref={detectionCanvasRef} className="hidden" />

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          {!capturedImage ? (
            <Button
              variant="primary"
              onClick={captureImage}
              className="flex items-center gap-2"
              disabled={!isStreaming}
            >
              <PhotoCameraIcon className="w-5 h-5" />
              {isAligned ? "Capture (Aligned)" : "Capture"}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleRetake}
              >
                Retake
              </Button>
              <Button
                variant="primary"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <PhotoCameraIcon className="w-5 h-5" />
                Display
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

