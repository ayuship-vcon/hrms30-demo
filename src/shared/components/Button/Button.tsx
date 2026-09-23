import React from "react";
import {
  Button as MuiButton,
  CircularProgress,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends Omit<
  MuiButtonProps,
  "variant" | "size" | "startIcon" | "endIcon"
> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "small" | "medium" | "large" | "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Universal Material UI Button Component
 * High-contrast disabled & loading states, 40px height, 8px radius, zero inline CSS.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled = false,
  type = "button",
  sx,
  ...props
}) => {
  const isButtonDisabled = disabled || isLoading;

  // Sizing Styles
  const sizeStyles = {
    small: {
      height: "32px",
      minHeight: "32px",
      px: 1.75,
      fontSize: "12px",
      minWidth: "70px",
      gap: "6px",
    },
    sm: {
      height: "32px",
      minHeight: "32px",
      px: 1.75,
      fontSize: "12px",
      minWidth: "70px",
      gap: "6px",
    },
    medium: {
      height: "40px",
      minHeight: "40px",
      px: 2.5,
      fontSize: "14px",
      minWidth: "90px",
      gap: "8px",
    },
    md: {
      height: "40px",
      minHeight: "40px",
      px: 2.5,
      fontSize: "14px",
      minWidth: "90px",
      gap: "8px",
    },
    large: {
      height: "44px",
      minHeight: "44px",
      px: 3,
      fontSize: "15px",
      minWidth: "100px",
      gap: "10px",
    },
    lg: {
      height: "44px",
      minHeight: "44px",
      px: 3,
      fontSize: "15px",
      minWidth: "100px",
      gap: "10px",
    },
  }[size] || {
    height: "40px",
    minHeight: "40px",
    px: 2.5,
    fontSize: "14px",
    minWidth: "90px",
    gap: "8px",
  };

  // Variant Styles (Normal Active State)
  const variantStyles = {
    primary: {
      backgroundColor: "#0b4668",
      color: "#FFFFFF",
      boxShadow: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
      "&:hover": {
        backgroundColor: "#08354f",
        boxShadow: "0 1px 3px 0 rgba(16, 24, 40, 0.10)",
      },
    },
    secondary: {
      backgroundColor: "#457b8d",
      color: "#FFFFFF",
      boxShadow: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
      "&:hover": {
        backgroundColor: "#366270",
      },
    },
    outline: {
      backgroundColor: "#FFFFFF",
      color: "#1E293B",
      border: "1px solid #CBD5E1",
      boxShadow: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
      "&:hover": {
        backgroundColor: "#F8FAFC",
        color: "#0b4668",
        borderColor: "#0b4668",
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#1E293B",
      border: "none",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#F1F5F9",
        color: "#0b4668",
      },
    },
    danger: {
      backgroundColor: "#b22b32",
      color: "#FFFFFF",
      boxShadow: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
      "&:hover": {
        backgroundColor: "#991b1b",
      },
    },
  }[variant] || {
    backgroundColor: "#0b4668",
    color: "#FFFFFF",
  };

  // Explicit High-Contrast Disabled & Loading Rules
  const getDisabledStyles = () => {
    if (isLoading) {
      // Loading State (Keep brand background with slight transparency, crisp white/navy spinner and text)
      if (variant === "outline") {
        return {
          backgroundColor: "#FFFFFF !important",
          borderColor: "#0b4668 !important",
          color: "#0b4668 !important",
          opacity: 0.85,
        };
      }
      if (variant === "ghost") {
        return {
          backgroundColor: "transparent !important",
          color: "#0b4668 !important",
          opacity: 0.85,
        };
      }
      if (variant === "danger") {
        return {
          backgroundColor: "#b22b32 !important",
          color: "#FFFFFF !important",
          opacity: 0.85,
        };
      }
      // Primary & Secondary
      return {
        backgroundColor:
          variant === "secondary" ? "#457b8d !important" : "#0b4668 !important",
        color: "#FFFFFF !important",
        opacity: 0.85,
      };
    }

    // Static Disabled State (Clear readable text & background)
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "#F8FAFC !important",
          borderColor: "#E2E8F0 !important",
          color: "#94A3B8 !important",
          boxShadow: "none",
        };
      case "ghost":
        return {
          backgroundColor: "transparent !important",
          color: "#94A3B8 !important",
          boxShadow: "none",
        };
      case "danger":
        return {
          backgroundColor: "#FECDD3 !important",
          color: "#9F1239 !important",
          boxShadow: "none",
        };
      case "secondary":
        return {
          backgroundColor: "#CBD5E1 !important",
          color: "#64748B !important",
          boxShadow: "none",
        };
      case "primary":
      default:
        return {
          backgroundColor: "#CBD5E1 !important",
          color: "#64748B !important",
          boxShadow: "none",
        };
    }
  };

  return (
    <MuiButton
      type={type}
      disabled={isButtonDisabled}
      disableElevation
      className={className}
      startIcon={
        isLoading ? (
          <CircularProgress
            size={16}
            sx={{
              color: "inherit",
              display: "inline-flex",
            }}
          />
        ) : (
          leftIcon
        )
      }
      endIcon={!isLoading ? rightIcon : undefined}
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.25,
        transition: "all 0.15s ease-in-out",
        cursor: isButtonDisabled ? "not-allowed !important" : "pointer",
        ...sizeStyles,
        ...variantStyles,
        "&.Mui-disabled": {
          cursor: "not-allowed !important",
          pointerEvents: "auto !important", // Ensures cursor shows not-allowed and child tooltips/loaders remain visible
          ...getDisabledStyles(),
        },
        "& .MuiButton-startIcon": {
          color: "inherit",
          display: "inline-flex",
          alignItems: "center",
          mr: 1,
        },
        "& .MuiButton-endIcon": {
          color: "inherit",
          display: "inline-flex",
          alignItems: "center",
          ml: 1,
        },
        ...(Array.isArray(sx) ? Object.assign({}, ...sx) : sx),
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
