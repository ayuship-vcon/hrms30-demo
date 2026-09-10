import {
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface ReportSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ReportSearch({
  value,
  onChange,
  placeholder = "Search...",
}: ReportSearchProps) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      size="small"
      sx={{
        width: 360,

        "& .MuiOutlinedInput-root": {
          height: 42,
          borderRadius: "8px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon
              sx={{
                fontSize: 20,
                color: "#64748B",
              }}
            />
          </InputAdornment>
        ),

        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => onChange("")}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}
