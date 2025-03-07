"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AppleIcon from "@mui/icons-material/Apple";
import { useChat } from "@/context/ChatContext";
import { CommonButton } from "@/components/CommonButton/CommonButton";

type AppleButtonProps = {
  copy?: string;
  label: string;
  type?: string;
};

export const AppleButton = ({
  copy = "Double Click Side Button to Pay",
  label,
  type = "pay",
}: AppleButtonProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { resume } = useChat();

  const handleButtonClick = () => {
    setIsDrawerOpen(true);
  };

  const handlePayNow = () => {
    setIsDrawerOpen(false);
    setAnimate(false);
    resume();
  };

  useEffect(() => {
    if (isDrawerOpen) {
      // Delay to allow the drawer to mount before starting the animation
      setTimeout(() => {
        setAnimate(true);
      }, 10);
    } else {
      setAnimate(false);
    }
  }, [isDrawerOpen]);

  const drawerContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: "auto",
        zIndex: 999,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "420px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          padding: "16px",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.2)",
          transform: animate ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: 0, marginBottom: "8px", textAlign: "center" }}>
          Apple {`${type === "wallet" ? "Wallet" : "Pay"}`}
        </h3>
        <p
          style={{
            margin: 0,
            marginBottom: "16px",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          {copy}
        </p>
        <CommonButton
          rippleColor="rgba(255,255,255,0.4)"
          styleOverride={{
            background: "black",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
            justifyContent: "center",
          }}
          type="button"
          onClick={handlePayNow}
        >
          Confirm
        </CommonButton>
      </div>
    </div>
  );

  const portalContainer =
    typeof document !== "undefined" && document.getElementById("phone-portal");

  return (
    <>
      <CommonButton
        rippleColor="rgba(255,255,255,0.4)"
        styleOverride={{
          background: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          padding: "8px 20px",
          marginTop: "6px",
          borderRadius: "20px",
        }}
        type="button"
        onClick={handleButtonClick}
      >
        <AppleIcon style={{ marginRight: "6px" }} />
        {label}
      </CommonButton>
      {isDrawerOpen && portalContainer
        ? ReactDOM.createPortal(drawerContent, portalContainer)
        : null}
    </>
  );
};
