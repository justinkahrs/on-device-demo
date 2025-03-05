"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import AppleIcon from "@mui/icons-material/Apple";

type ApplePayButtonProps = {
  label: string;
  onPay?: () => void;
};

export const ApplePayButton = ({ label, onPay }: ApplePayButtonProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDrawerOpen(true);
  };

  const handlePayNow = () => {
    if (onPay) {
      onPay();
    }
    setIsDrawerOpen(false);
  };

  const drawerContent = (
    <div
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
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "420px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          padding: "16px",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.2)",
          transform: "translateY(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <h3 style={{ margin: 0, marginBottom: "8px", textAlign: "center" }}>
          Apple Pay
        </h3>
        <p
          style={{
            margin: 0,
            marginBottom: "16px",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          Double Click Side Button to Pay
        </p>
        <button
          style={{
            background: "black",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
          }}
          type="button"
          onClick={handlePayNow}
        >
          Confirm
        </button>
      </div>
    </div>
  );

  const portalContainer =
    typeof document !== "undefined" && document.getElementById("phone-portal");

  return (
    <>
      <button
        style={{
          background: "black",
          color: "white",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          padding: "8px 16px",
          borderRadius: "4px",
        }}
        type="button"
        onClick={handleButtonClick}
      >
        <AppleIcon style={{ marginRight: "6px" }} />
        {label}
      </button>
      {isDrawerOpen && portalContainer
        ? ReactDOM.createPortal(drawerContent, portalContainer)
        : null}
    </>
  );
};
