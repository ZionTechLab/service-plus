import React, { useState, useCallback } from 'react';
import PopupMessage from '../components/PopupMessage';

const useConfirm = () => {
  const [confirmState, setConfirmState] = useState(null);

  const isConfirming = !!confirmState;

  const confirm = useCallback((message, options = {}) => {
    return new Promise((resolve) => {
      setConfirmState({
        message,
        options,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    if (confirmState) {
      confirmState.resolve(true);
      setConfirmState(null);
    }
  };

  const handleClose = () => {
    if (confirmState) {
      confirmState.resolve(false);
      setConfirmState(null);
    }
  };

  const ConfirmationDialog = useCallback(() => (
    isConfirming ? (
      <PopupMessage
        show={isConfirming}
        message={confirmState.message}
        onClose={handleClose}
        onConfirm={handleConfirm}
        confirmText={confirmState.options.confirmText || 'Okay'}
        cancelText={confirmState.options.cancelText || 'Cancel'}
        type={confirmState.options.type || 'success'}
      />
    ) : null
  ), [isConfirming, confirmState]);

  return [ConfirmationDialog, confirm];
};

export default useConfirm;