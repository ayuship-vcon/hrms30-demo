import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";

interface ReportSearchProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  debounceDelay?: number;
  className?: string;
}

export const ReportSearch: React.FC<ReportSearchProps> = ({
  placeholder = "Search...",
  onSearch,
  debounceDelay = 500,
  className = "",
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [value, onSearch, debounceDelay]);

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`bg-white min-w-[250px] ${className}`}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default ReportSearch;
