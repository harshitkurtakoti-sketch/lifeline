"use client";

import React, { useState } from "react";
import Header from "@/components/shell/Header";
import Navigation from "@/components/shell/Navigation";
import MobileFrame from "@/components/shell/MobileFrame";
import LandingScreen from "@/components/landing/LandingScreen";
import LiveDashboard from "@/components/dashboard/LiveDashboard";
import EmergencySimulationModal from "@/components/emergency-flow/EmergencySimulationModal";
import ConfirmationScreen from "@/components/emergency-flow/ConfirmationScreen";
import SituationAnalysis from "@/components/emergency-flow/SituationAnalysis";
import EmergencyResponseScreen from "@/components/emergency-flow/EmergencyResponseScreen";
import SafetyHistory from "@/components/history/SafetyHistory";
import PrivacyPanel from "@/components/privacy/PrivacyPanel";
import PipelineFlow from "@/components/architecture/PipelineFlow";
import McpInspector from "@/components/developer/McpInspector";
import JudgeDemoTour, { DEMO_STEPS } from "@/components/demo/JudgeDemoTour";
import { ActiveScreen, SystemSafetyStatus } from "@/lib/types";
import { sensorStream } from "@/lib/simulation/sensorStream";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>("landing");
  const [safetyStatus, setSafetyStatus] = useState<SystemSafetyStatus>("PROTECTED");
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  // Trigger emergency simulation flow
  const handleStartEmergencySimulation = () => {
    setSafetyStatus("ANALYZING");
    setIsSimulationModalOpen(true);
  };

  // Called when 4-step cinematic simulation modal completes
  const handleSimulationComplete = () => {
    setIsSimulationModalOpen(false);
    setSafetyStatus("POSSIBLE_EMERGENCY");
    setCurrentScreen("confirmation");
  };

  // User presses "I'M SAFE"
  const handleUserConfirmedSafe = () => {
    sensorStream.resetToNormal();
    setSafetyStatus("PROTECTED");
    setCurrentScreen("dashboard");
  };

  // User presses "GET HELP"
  const handleUserGetHelp = () => {
    setSafetyStatus("EMERGENCY_ACTIVE");
    setCurrentScreen("response");
  };

  // Cancel emergency back to safe
  const handleCancelEmergency = () => {
    sensorStream.resetToNormal();
    setSafetyStatus("PROTECTED");
    setCurrentScreen("dashboard");
  };

  // Demo tour step navigation
  const handleSelectDemoStep = (stepIdx: number) => {
    setDemoStepIndex(stepIdx);
    const target = DEMO_STEPS[stepIdx];
    if (!target) return;

    if (target.screen === "simulation") {
      setCurrentScreen("dashboard");
      setIsSimulationModalOpen(true);
    } else {
      setIsSimulationModalOpen(false);
      setCurrentScreen(target.screen as ActiveScreen);
      if (target.screen === "confirmation") {
        setSafetyStatus("POSSIBLE_EMERGENCY");
      } else if (target.screen === "response") {
        setSafetyStatus("EMERGENCY_ACTIVE");
      } else {
        setSafetyStatus("PROTECTED");
      }
    }
  };

  const handleResetDemo = () => {
    sensorStream.resetToNormal();
    setIsSimulationModalOpen(false);
    setSafetyStatus("PROTECTED");
    setCurrentScreen("landing");
    setDemoStepIndex(0);
  };

  return (
    <MobileFrame enabled={isDeviceFrame}>
      <div className="min-h-full flex flex-col justify-between relative bg-[#06070a] text-slate-100 selection:bg-[#ff2d55]/30">
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          onOpenDemoTour={() => setIsDemoTourOpen(true)}
          isDeviceFrame={isDeviceFrame}
          onToggleDeviceFrame={() => setIsDeviceFrame(!isDeviceFrame)}
          onGoHome={() => setCurrentScreen("dashboard")}
        />

        {/* Main View Area */}
        <main className="flex-1 flex flex-col justify-start">
          {currentScreen === "landing" && (
            <LandingScreen
              onStartSafetyMode={() => setCurrentScreen("dashboard")}
              onSeeHowItWorks={() => setCurrentScreen("architecture")}
              onOpenDemo={() => {
                setIsDemoTourOpen(true);
                handleSelectDemoStep(0);
              }}
            />
          )}

          {currentScreen === "dashboard" && (
            <LiveDashboard
              safetyStatus={safetyStatus}
              onSimulateEmergency={handleStartEmergencySimulation}
              onOpenDemoTour={() => {
                setIsDemoTourOpen(true);
                handleSelectDemoStep(1);
              }}
            />
          )}

          {currentScreen === "confirmation" && (
            <ConfirmationScreen
              onSafe={handleUserConfirmedSafe}
              onGetHelp={handleUserGetHelp}
              onViewAnalysis={() => setCurrentScreen("analysis")}
            />
          )}

          {currentScreen === "analysis" && (
            <SituationAnalysis
              onContinueToResponse={() => setCurrentScreen("response")}
              onBackToConfirmation={() => setCurrentScreen("confirmation")}
            />
          )}

          {currentScreen === "response" && (
            <EmergencyResponseScreen
              onCancelEmergency={handleCancelEmergency}
              onReturnToDashboard={handleUserConfirmedSafe}
            />
          )}

          {currentScreen === "history" && <SafetyHistory />}

          {currentScreen === "privacy" && <PrivacyPanel />}

          {currentScreen === "architecture" && <PipelineFlow />}

          {currentScreen === "developer" && <McpInspector />}
        </main>

        {/* Cinematic 4-Step Emergency Modal */}
        <EmergencySimulationModal
          isOpen={isSimulationModalOpen}
          onComplete={handleSimulationComplete}
          onCancel={() => {
            setIsSimulationModalOpen(false);
            sensorStream.resetToNormal();
            setSafetyStatus("PROTECTED");
          }}
        />

        {/* 60s Guided Demo Mode Overlay for Hackathon Judges */}
        {isDemoTourOpen && (
          <JudgeDemoTour
            currentStepIndex={demoStepIndex}
            onSelectStep={handleSelectDemoStep}
            onClose={() => setIsDemoTourOpen(false)}
            onReset={handleResetDemo}
          />
        )}

        {/* Persistent Bottom Navigation Dock (shown on interior screens) */}
        {currentScreen !== "landing" &&
          currentScreen !== "confirmation" &&
          currentScreen !== "response" && (
            <Navigation
              currentScreen={currentScreen}
              onSelectScreen={(screen) => setCurrentScreen(screen)}
              onTriggerEmergency={handleStartEmergencySimulation}
            />
          )}
      </div>
    </MobileFrame>
  );
}
