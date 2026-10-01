import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

export type ButtonVariant = 'primary' | 'ink' | 'ghost' | 'quiet';

export type ButtonSize = 'md' | 'lg';

export type ModalVariant = 'sheet' | 'full';

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}

export interface ButtonContentProps {
  children: ReactNode;
  arrow?: string;
}

export interface ButtonProps
  extends
    ButtonStyleProps,
    ButtonContentProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {}

export interface ButtonLinkProps
  extends
    ButtonStyleProps,
    ButtonContentProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  href: string;
}

export interface FieldControlProps {
  id: string;
  className: string;
  'aria-invalid': boolean;
  'aria-describedby'?: string;
}

export interface FieldProps {
  label: string;
  optionalLabel?: string;
  hint?: string;
  error?: string;
  length?: number;
  maxLength?: number;
  className?: string;
  children: (control: FieldControlProps) => ReactNode;
}

export interface HoldButtonProps {
  label: string;
  holdingLabel: string;
  hint: string;
  onComplete: () => void;
  duration?: number;
  className?: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  variant?: ModalVariant;
  children: ReactNode;
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ToastMessage {
  id: number;
  text: string;
}

export interface ToastProps {
  toast: ToastMessage | null;
}

export interface StepIndicatorProps {
  current: number;
  total: number;
  label: string;
}

export interface GlyphBurstProps {
  active: boolean;
  count?: number;
  className?: string;
}

export type TicketTag = 'div' | 'span';

export interface TicketProps {
  as?: TicketTag;
  stub: ReactNode;
  children: ReactNode;
  className?: string;
  stubClassName?: string;
  bodyClassName?: string;
}

export interface DatePickerLabels {
  label: string;
  optional?: string;
  placeholder: string;
  previousMonth: string;
  nextMonth: string;
  clear: string;
}

export interface DatePickerProps {
  value: string;
  className?: string;
  min: string;
  labels: DatePickerLabels;
  onChange: (value: string) => void;
}

export interface CalendarPanelProps {
  selected: Date | null;
  min: Date;
  labels: DatePickerLabels;
  onSelect: (date: Date) => void;
  onClose: () => void;
}
