import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  FormHelperText,
  Fade,
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../Button/Button';
import type { BaseFieldProps } from './form.types';

export interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  error?: string;
}

export interface FileUploadProps extends BaseFieldProps {
  variant?: 'dropzone' | 'button';
  value?: File[] | UploadedFileItem[];
  onChange?: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
  placeholder?: string;
  description?: string;
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getFileIcon(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return <PictureAsPdfOutlinedIcon sx={{ color: '#dc2626', fontSize: 20 }} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'webp':
    case 'gif':
    case 'svg':
      return <ImageOutlinedIcon sx={{ color: '#0284c7', fontSize: 20 }} />;
    case 'csv':
    case 'xlsx':
    case 'xls':
      return <TableChartOutlinedIcon sx={{ color: '#16a34a', fontSize: 20 }} />;
    case 'doc':
    case 'docx':
    case 'txt':
      return <DescriptionOutlinedIcon sx={{ color: '#2563eb', fontSize: 20 }} />;
    default:
      return <InsertDriveFileOutlinedIcon sx={{ color: '#64748b', fontSize: 20 }} />;
  }
}

/**
 * Enterprise File Upload Component with Drag & Drop, Browser Button, File Size & Type Validation
 * 100% Pure Material UI, 8px radius, Deep Navy styling, zero inline CSS.
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  error,
  isSuccess,
  helperText,
  required,
  disabled = false,
  variant = 'dropzone',
  value = [],
  onChange,
  multiple = true,
  maxFiles = 5,
  maxSizeInMB = 10,
  acceptedFileTypes = ['.pdf', '.png', '.jpg', '.jpeg', '.docx', '.csv', '.xlsx'],
  placeholder = 'Click or drag files to upload',
  description,
  className = '',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Normalize files array
  const files: File[] = React.useMemo(() => {
    if (!Array.isArray(value)) return [];
    return value.map((v) => (v instanceof File ? v : (v as UploadedFileItem).file)).filter(Boolean);
  }, [value]);

  const validateFiles = useCallback(
    (newFiles: File[], currentCount: number): { valid: File[]; error?: string } => {
      const maxSizeBytes = maxSizeInMB * 1024 * 1024;
      const valid: File[] = [];

      // Check max files limit
      if (!multiple && (currentCount > 0 || newFiles.length > 1)) {
        if (newFiles.length > 0) {
          const first = newFiles[0];
          if (first.size > maxSizeBytes) {
            return { valid: [], error: `File "${first.name}" exceeds maximum allowed size of ${maxSizeInMB}MB.` };
          }
          return { valid: [first] };
        }
      }

      if (multiple && currentCount + newFiles.length > maxFiles) {
        return {
          valid: [],
          error: `You can upload a maximum of ${maxFiles} files. (Current: ${currentCount}, Attempted: ${newFiles.length})`,
        };
      }

      for (const file of newFiles) {
        // Size validation
        if (file.size > maxSizeBytes) {
          return {
            valid: [],
            error: `File "${file.name}" (${formatBytes(file.size)}) exceeds the maximum allowed size of ${maxSizeInMB}MB.`,
          };
        }

        // Type / Extension validation
        if (acceptedFileTypes.length > 0) {
          const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
          const isAccepted = acceptedFileTypes.some((t) => t.toLowerCase() === ext || file.type.match(new RegExp(t.replace('*', '.*'))));
          if (!isAccepted) {
            return {
              valid: [],
              error: `File "${file.name}" has an unsupported format. Allowed formats: ${acceptedFileTypes.join(', ')}`,
            };
          }
        }

        valid.push(file);
      }

      return { valid };
    },
    [maxSizeInMB, multiple, maxFiles, acceptedFileTypes]
  );

  const handleFilesAdded = useCallback(
    (incomingFiles: FileList | null) => {
      if (!incomingFiles || incomingFiles.length === 0 || disabled) return;
      setInternalError(null);

      const incomingArr = Array.from(incomingFiles);
      const validation = validateFiles(incomingArr, files.length);

      if (validation.error) {
        setInternalError(validation.error);
        return;
      }

      const updated = multiple ? [...files, ...validation.valid] : validation.valid;
      onChange?.(updated);
    },
    [disabled, validateFiles, files, multiple, onChange]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      if (disabled) return;
      setInternalError(null);
      const updated = files.filter((_, i) => i !== index);
      onChange?.(updated);
    },
    [disabled, files, onChange]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (!disabled && e.dataTransfer.files) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const openBrowseDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const activeError = error || internalError;
  const hasError = Boolean(activeError);

  const acceptString = acceptedFileTypes.join(',');

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between">
          <Typography
            variant="caption"
            sx={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: hasError ? '#b22b32' : '#1E293B',
            }}
          >
            {label}
            {required && <span style={{ color: '#b22b32', marginLeft: 4 }}>*</span>}
          </Typography>
          {multiple && (
            <Typography variant="caption" sx={{ fontSize: '11px', color: '#64748B' }}>
              {files.length}/{maxFiles} Files uploaded
            </Typography>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptString}
        disabled={disabled}
        onChange={(e) => {
          handleFilesAdded(e.target.files);
          e.target.value = ''; // Reset input to allow selecting same file again if deleted
        }}
        style={{ display: 'none' }}
      />

      {/* 1. Dropzone Mode */}
      {variant === 'dropzone' ? (
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openBrowseDialog}
          sx={{
            border: '1.5px dashed',
            borderColor: hasError
              ? '#b22b32'
              : isDragOver
              ? '#0b4668'
              : isSuccess
              ? '#4edea3'
              : '#CBD5E1',
            backgroundColor: isDragOver
              ? '#eef7fc'
              : disabled
              ? '#F8FAFC'
              : '#FFFFFF',
            borderRadius: '8px',
            p: 3,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: disabled ? '#CBD5E1' : '#0b4668',
              backgroundColor: disabled ? '#F8FAFC' : '#f8fafc',
            },
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: isDragOver ? '#0b4668' : '#eef7fc',
                color: isDragOver ? '#ffffff' : '#0b4668',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 24 }} />
            </Box>

            <Typography variant="body2" sx={{ fontSize: '13.5px', fontWeight: 600, color: '#1E293B' }}>
              {placeholder}
            </Typography>

            <Typography variant="caption" sx={{ fontSize: '11.5px', color: '#64748B' }}>
              {description ||
                `Supported files: ${acceptedFileTypes.join(', ')} • Max size: ${maxSizeInMB}MB each`}
            </Typography>
          </Box>
        </Box>
      ) : (
        /* 2. Button / Compact Mode */
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          p={1.5}
          sx={{
            border: '1px solid',
            borderColor: hasError ? '#b22b32' : '#CBD5E1',
            borderRadius: '8px',
            backgroundColor: disabled ? '#F8FAFC' : '#FFFFFF',
          }}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            leftIcon={<CloudUploadOutlinedIcon fontSize="small" />}
            onClick={openBrowseDialog}
          >
            Browse Files
          </Button>
          <Typography variant="caption" sx={{ fontSize: '12px', color: '#64748B', flex: 1 }}>
            {files.length === 0
              ? `No file chosen (Max ${maxSizeInMB}MB)`
              : `${files.length} file${files.length > 1 ? 's' : ''} selected`}
          </Typography>
        </Box>
      )}

      {/* File List Previews */}
      {files.length > 0 && (
        <Box display="flex" flexDirection="column" gap={1} mt={0.5}>
          {files.map((file, index) => (
            <Fade in key={`${file.name}-${index}`} timeout={200}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={1.5}
                py={1}
                sx={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                }}
              >
                <Box display="flex" alignItems="center" gap={1.25} minWidth={0} flex={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>{getFileIcon(file.name)}</Box>
                  <Box minWidth={0} flex={1}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: '#1E293B',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={file.name}
                    >
                      {file.name}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '11px', color: '#64748B' }}>
                      {formatBytes(file.size)}
                    </Typography>
                  </Box>
                </Box>

                {!disabled && (
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFile(index)}
                    sx={{
                      color: '#64748B',
                      p: 0.5,
                      '&:hover': { color: '#b22b32', backgroundColor: '#fee2e2' },
                    }}
                    title="Remove file"
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Box>
            </Fade>
          ))}
        </Box>
      )}

      {/* Helper / Error Text */}
      {(activeError || helperText) && (
        <FormHelperText
          sx={{
            fontSize: '11.5px',
            color: hasError ? '#b22b32' : '#64748B',
            ml: 0.5,
            mt: 0.25,
          }}
        >
          {activeError || helperText}
        </FormHelperText>
      )}
    </div>
  );
};
