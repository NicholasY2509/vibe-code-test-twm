import type { ReactNode } from 'react';
import { Button } from './Button';

interface DialogProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function Dialog({ isOpen, title, children, onConfirm, onCancel, confirmText = '確認', cancelText = '取消' }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h3>{title}</h3>
        <div className="dialog-body">{children}</div>
        <div className="dialog-actions">
          <Button className="btn-secondary" onClick={onCancel}>{cancelText}</Button>
          <Button className="btn-primary" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
}
