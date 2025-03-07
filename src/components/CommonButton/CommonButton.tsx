import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  styleOverride?: React.CSSProperties;
  rippleColor: string;
}

export function CommonButton({
  children,
  rippleColor,
  styleOverride,
  ...props
}: CommonButtonProps) {
  const [ripple, setRipple] = useState(false);

  const triggerRipple = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    setRipple(true);
    // Clear ripple after animation duration (0.5s)
    setTimeout(() => {
      setRipple(false);
    }, 500);
  };

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: "8px 20px",
    marginTop: "6px",
    textAlign: "center",
    borderRadius: "20px",
    border: "none",
    WebkitAppearance: "none",
    width: "100%",
    overflow: "hidden",
    cursor: "pointer",
  };

  return (
    <motion.button
      style={{ ...baseStyle, ...styleOverride }}
      {...props}
      onMouseDown={(e) => {
        triggerRipple(e);
      }}
      onTouchStart={(e) => {
        triggerRipple(e);
      }}
    >
      {children}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key="ripple"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 0, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle farthest-corner, ${rippleColor} 0%, transparent 100%)`,
              pointerEvents: "none",
              borderRadius: "inherit",
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
