"use client";

import React, { useState, useRef } from "react";

interface ImageUploaderProps {
  onUpload: (imageData: string) => void;
  onClose?: () => void;
}

export default function ImageUploader({ onUpload, onClose }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const useImage = () => {
    if (selectedImage) {
      onUpload(selectedImage);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {!selectedImage ? (
        <div
          className={`w-full max-w-xs aspect-[3/4] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg relative ${
            isDragging
              ? "border-purple-400 bg-purple-50/30"
              : "border-purple-200 bg-white/20 hover:bg-white/30"
          }`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 hover:bg-white transition-all duration-300"
            aria-label="Close uploader"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="flex flex-col items-center gap-3 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-zinc-700 font-medium text-lg text-center">
              Click or drag an image here
            </p>
            <p className="text-zinc-500 text-sm text-center max-w-sm px-4">
              Upload a high-quality photo of your face for the best analysis results
            </p>
          </div>
        </div>
      ) : (
        <div 
          className="relative w-full max-w-xs overflow-hidden rounded-3xl bg-white/20 backdrop-blur-sm border border-purple-100 shadow-xl" 
          style={{ height: '480px' }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 hover:bg-white transition-all duration-300"
            aria-label="Close uploader"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Selected"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm flex justify-center gap-4">
              <button
                onClick={clearImage}
                className="px-4 py-3 rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 font-medium shadow-lg hover:bg-white transition-all duration-300"
              >
                Change Photo
              </button>
              <button
                onClick={useImage}
                className="px-4 py-3 rounded-full bg-purple-500/80 backdrop-blur-sm text-white font-medium shadow-lg hover:bg-purple-500 transition-all duration-300"
              >
                Use Photo
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-xs mt-4">
        <p className="text-sm text-zinc-500 text-center">
          Please upload a clear, well-lit photo of your face.
        </p>
      </div>
    </div>
  );
}