import { useEffect, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import type {
  LocationFormValues,
  LocationModuleConfig,
  LocationRecord,
  LocationSelectOptions,
} from "../core/types";

import { mapRecordToFormValues } from "../core/utils/location.utils";

import { validateLocationForm, type LocationFormErrors } from "../validations";

interface LocationConfigFormProps {
  config: LocationModuleConfig;

  selectedRecord?: LocationRecord | null;

  selectOptions?: LocationSelectOptions;

  onSave: (values: LocationFormValues) => void;

  onCancel: () => void;
}

export const LocationConfigForm = ({
  config,
  selectedRecord,
  selectOptions = {},
  onSave,
  onCancel,
}: LocationConfigFormProps) => {
  const Icon = config.icon;

  const [values, setValues] = useState<LocationFormValues>(
    mapRecordToFormValues(),
  );

  const [errors, setErrors] = useState<LocationFormErrors>({});

  useEffect(() => {
    setValues(mapRecordToFormValues(selectedRecord));

    setErrors({});
  }, [selectedRecord, config.key]);

  const handleChange = <K extends keyof LocationFormValues>(
    field: K,
    value: LocationFormValues[K],
  ) => {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleSubmit = () => {
    const validationErrors = validateLocationForm(values, config);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(values);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: 570,
        height: "100%",

        display: "flex",
        flexDirection: "column",

        overflow: "hidden",

        borderRadius: 4,
        border: "1px solid #E6EDF7",

        bgcolor: "#FFFFFF",

        boxShadow: "0px 8px 32px rgba(24, 73, 125, 0.06)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,

          borderBottom: "1px solid #EDF1F7",

          background: "linear-gradient(135deg, #FFFFFF 0%, #F1F7FF 100%)",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 50,
              height: 50,

              borderRadius: 3,

              display: "grid",
              placeItems: "center",

              bgcolor: "#E7F0FF",
              color: "#1261C9",
            }}
          >
            <Icon />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={700} color="#102044">
              {selectedRecord ? config.editTitle : config.addTitle}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {config.formDescription}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Body */}
      {/* Body */}
      <Box
        sx={{
          flex: 1,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl:
                config.fields.length > 1 ? "repeat(2, minmax(0, 1fr))" : "1fr",
            },
            gap: 2.5,
          }}
        >
          {config.fields.map((field) => {
            const fieldValue = values[field.name];

            if (field.type === "select") {
              const options = selectOptions[field.name] ?? [];

              return (
                <Box key={field.name}>
                  <Typography
                    component="label"
                    variant="body2"
                    sx={{
                      display: "block",
                      mb: 0.75,
                      fontWeight: 600,
                      color: "#45464D",
                    }}
                  >
                    {field.label}

                    {field.required && (
                      <Box
                        component="span"
                        sx={{
                          ml: 0.5,
                          color: "#B22B32",
                        }}
                      >
                        *
                      </Box>
                    )}
                  </Typography>

                  <FormControl fullWidth error={Boolean(errors[field.name])}>
                    <Select
                      displayEmpty
                      value={fieldValue}
                      onChange={(event) =>
                        handleChange(field.name, event.target.value)
                      }
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <Typography
                              component="span"
                              sx={{
                                fontSize: 14,
                                color: "#6B7280",
                              }}
                            >
                              {field.placeholder}
                            </Typography>
                          );
                        }

                        const selectedOption = options.find(
                          (option) => option.value === selected,
                        );

                        return selectedOption?.label ?? selected;
                      }}
                      sx={{
                        height: 44,
                        borderRadius: "6px",
                        backgroundColor: "#FFFFFF",

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E2E8F0",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#94A3B8",
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#0B4668",
                          borderWidth: "1px",
                        },

                        "& .MuiSelect-select": {
                          py: 0,
                          px: 1.75,
                          fontSize: 14,
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>

                    {errors[field.name] && (
                      <FormHelperText
                        sx={{
                          mx: 0,
                          mt: 0.75,
                        }}
                      >
                        {errors[field.name]}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              );
            }

            return (
              <Box key={field.name}>
                <Typography
                  component="label"
                  variant="body2"
                  sx={{
                    display: "block",
                    mb: 0.75,
                    fontWeight: 600,
                    color: "#45464D",
                  }}
                >
                  {field.label}

                  {field.required && (
                    <Box
                      component="span"
                      sx={{
                        ml: 0.5,
                        color: "#B22B32",
                      }}
                    >
                      *
                    </Box>
                  )}
                </Typography>

                <TextField
                  fullWidth
                  placeholder={field.placeholder}
                  value={fieldValue}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]}
                  onChange={(event) =>
                    handleChange(field.name, event.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 44,
                      borderRadius: "6px",
                      backgroundColor: "#FFFFFF",

                      "& fieldset": {
                        borderColor: "#E2E8F0",
                      },

                      "&:hover fieldset": {
                        borderColor: "#94A3B8",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#0B4668",
                        borderWidth: "1px",
                      },
                    },

                    "& .MuiInputBase-input": {
                      px: 1.75,
                      py: 0,
                      height: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                      lineHeight: 1.4,
                      color: "#45464D",

                      "&::placeholder": {
                        color: "#6B7280",
                        opacity: 1,
                      },
                    },

                    "& .MuiFormHelperText-root": {
                      mx: 0,
                      mt: 0.75,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Active */}
        <Box
          sx={{
            mt: 3,
            px: 2.5,
            py: 2,
            borderRadius: 3,
            bgcolor: "#F6F9FD",
            border: "1px solid #EDF2F7",
          }}
        >
          <FormControlLabel
            sx={{ m: 0 }}
            control={
              <Switch
                checked={values.active}
                onChange={(event) =>
                  handleChange("active", event.target.checked)
                }
              />
            }
            label={
              <Box sx={{ ml: 1 }}>
                <Typography variant="body2" fontWeight={700} color="#102044">
                  Active
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Enable this {config.label.toLowerCase()} to make it available
                  in the system.
                </Typography>
              </Box>
            }
          />
        </Box>
      </Box>

      {/* Footer */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1.5}
        sx={{
          p: 2.5,

          borderTop: "1px solid #EDF1F7",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<CloseOutlinedIcon />}
          onClick={onCancel}
          sx={{
            borderRadius: 2.5,
            textTransform: "none",
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveOutlinedIcon />}
          onClick={handleSubmit}
          sx={{
            borderRadius: 2.5,
            textTransform: "none",
            px: 3.5,
            boxShadow: "none",
          }}
        >
          Save
        </Button>
      </Stack>
    </Paper>
  );
};
