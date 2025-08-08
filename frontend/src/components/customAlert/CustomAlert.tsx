'use client';

import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomAlertProps {
  open: boolean;
  onClose: () => void;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  className?: string;
}

export default function CustomAlert({
  open,
  onClose,
  severity,
  message,
  className = '',
}: CustomAlertProps) {
  return (
    <Collapse in={open}>
      <Alert
        className={className}
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
