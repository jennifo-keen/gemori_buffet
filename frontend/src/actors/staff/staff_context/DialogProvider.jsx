import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import ErrorMess from '../staff_components/ErrorMess';
import SuccessNofi from '../staff_components/SuccessNofi';
import Nofi from '../staff_components/Nofi';
import { DialogContext } from "../staff_context/DialogContext"

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);
  // dialog = { type, title, subtitle, badges, confirmText, cancelText, onConfirm, onCancel }

  const closeDialog = () => setDialog(null);

  // Hiện lỗi — chỉ có nút Tiếp tục
  const showError = ({ title, subtitle, confirmText, onConfirm }) => {
    setDialog({
      type: 'error',
      title,
      subtitle,
      confirmText,
      onConfirm: () => { onConfirm?.(); closeDialog(); },
    });
  };

  // Hiện thành công — chỉ có nút Tiếp tục
  const showSuccess = ({ title, subtitle, confirmText, onConfirm }) => {
    setDialog({
      type: 'success',
      title,
      subtitle,
      confirmText,
      onConfirm: () => { onConfirm?.(); closeDialog(); },
    });
  };

  // Hiện xác nhận — có Hủy + Tiếp tục + badges + input lý do
  const showConfirm = ({ title, subtitle, badges, confirmText, cancelText, onConfirm, onCancel }) => {
    setDialog({
      type: 'confirm',
      title,
      subtitle,
      badges,
      confirmText,
      cancelText,
      onConfirm: () => { onConfirm?.(); closeDialog(); },
      onCancel:  () => { onCancel?.();  closeDialog(); },
    });
  };

  return (
    <DialogContext.Provider value={{ showError, showSuccess, showConfirm, closeDialog }}>
      {children}

      {/* Render dialog ở đây — dùng chung toàn app */}
      <Dialog
        open={!!dialog}
        onClose={closeDialog}
        PaperProps={{ sx: { borderRadius: 3, boxShadow: 'none', bgcolor: 'transparent' } }}
      >
        {dialog?.type === 'error' && (
          <ErrorMess
            title={dialog.title}
            subtitle={dialog.subtitle}
            confirmText={dialog.confirmText}
            onConfirm={dialog.onConfirm}
          />
        )}
        {dialog?.type === 'success' && (
          <SuccessNofi
            title={dialog.title}
            subtitle={dialog.subtitle}
            confirmText={dialog.confirmText}
            onConfirm={dialog.onConfirm}
          />
        )}
        {dialog?.type === 'confirm' && (
          <Nofi
            title={dialog.title}
            subtitle={dialog.subtitle}
            badges={dialog.badges}
            confirmText={dialog.confirmText}
            cancelText={dialog.cancelText}
            onConfirm={dialog.onConfirm}
            onCancel={dialog.onCancel}
          />
        )}
      </Dialog>
    </DialogContext.Provider>
  );
};
