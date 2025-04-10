"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Ripple } from "@/components/ui/Ripple";
import { Progress } from "@/components/ui/progress";

export default function IntroductionPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    const savedData = localStorage.getItem("skinstricUserData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    return () => clearTimeout(timer);
  }, []);

  const validateField = (name: string, value: string) => {
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return `${name === "name" ? "Name" : "Location"} can only contain letters and spaces`;
    }
    if (value.trim() === "") {
      return `${name === "name" ? "Name" : "Location"} is required`;
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step === 1 && formData.name.trim() && !errors.name) {
        setStep(2);
      } else if (step === 2 && formData.location.trim() && !errors.location) {
        handleSubmit();
      }
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const nameError = validateField("name", formData.name);
      setErrors((prev) => ({
        ...prev,
        name: nameError,
      }));

      if (!nameError) {
        setStep(2);
      }
    } else if (step === 2) {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    const locationError = validateField("location", formData.location);
    setErrors((prev) => ({
      ...prev,
      location: locationError,
    }));

    if (locationError) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      localStorage.setItem("skinstricUserData", JSON.stringify(formData));

      // Store the data locally and redirect (for development)
      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = "/upload-photo";
      }, 1500);

      // The API call is still made but we don't wait for it to complete (for development)
      fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log("API response status:", response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("API response data:", data);
        })
        .catch((error) => {
          console.error("API error (non-blocking):", error);
        });
    } catch (error) {
      console.error("Error in form submission:", error);
      setSubmitError(
        "There was an error processing your information. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen relative bg-neutral-50 overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Ripple
            size={600}
            opacity={0.8}
            count={6}
            spacing={50}
            breathingDelay={0.25}
            className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        <div
          className={`flex flex-col items-center justify-center z-10 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          {submitSuccess ? (
            <div className="text-center text-zinc-900">
              <h2 className="text-4xl mb-4">Thank You!</h2>
              <p>Your information has been submitted successfully.</p>
              <p>Redirecting you shortly...</p>
            </div>
          ) : (
            <div className="w-[400px] relative">
              <p className="text-[20px] text-zinc-400 mb-8 text-center uppercase tracking-widest">
                CLICK TO TYPE
              </p>
              <input
                type="text"
                name={step === 1 ? "name" : "location"}
                value={step === 1 ? formData.name : formData.location}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={
                  step === 1 ? "Introduce Yourself" : "Where Are You From?"
                }
                className="w-full bg-transparent border-b border-zinc-900 py-1 px-0 text-zinc-900 placeholder-zinc-800 focus:outline-none focus:border-black text-center text-5xl font-normal"
                autoFocus
              />
              {errors[step === 1 ? "name" : "location"] && (
                <p className="text-rose-500 text-sm mt-2 text-center">
                  {errors[step === 1 ? "name" : "location"]}
                </p>
              )}
              {submitError && (
                <p className="text-rose-500 text-sm mt-2 text-center">
                  {submitError}
                </p>
              )}

              <div className="flex justify-center mt-8">
                <button
                  onClick={nextStep}
                  disabled={
                    isSubmitting ||
                    (step === 1
                      ? !formData.name.trim() || !!errors.name
                      : !formData.location.trim() || !!errors.location)
                  }
                  className="px-8 py-2 bg-zinc-900 text-white uppercase text-sm font-semibold tracking-wide hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : step === 1
                      ? "Continue"
                      : "Submit"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`absolute top-[86px] left-[32px] transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"} w-56`}
        >
          <div className="flex flex-col gap-2">
            <div className="text-zinc-900 text-sm font-semibold uppercase leading-normal">
              {step === 1
                ? "Step 1 of 2: Your Name"
                : "Step 2 of 2: Your Location"}
            </div>
            <Progress
              value={step === 1 ? 50 : 100}
              className="h-1.5 rounded-sm"
            />
          </div>
        </div>

        <div
          className={`absolute bottom-[80px] left-[32px] inline-flex items-center gap-4 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Link
            href={step === 1 ? "/" : "#"}
            onClick={
              step === 1
                ? undefined
                : (e) => {
                    e.preventDefault();
                    prevStep();
                  }
            }
          >
            <div className="flex items-center gap-3 transition-transform hover:scale-105">
              <Image
                src="/assets/images/back-button.svg"
                alt="Back"
                width={24}
                height={24}
                className="transition-opacity hover:opacity-80"
              />
              <span className="text-zinc-900 text-sm font-semibold uppercase leading-none">
                {step === 1 ? "back" : "previous"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
