import React, { useEffect, useState, useCallback } from 'react';
import MessageBoxService from '../services/MessageBoxService';

// MessageBoxContext for global access
const MessageBoxContext = React.createContext();

export function MessageBoxProvider({ children }) {
  const [options, setOptions] = useState(MessageBoxService.options);

  useEffect(() => {
    const unsubscribe = MessageBoxService.subscribe(setOptions);
    return unsubscribe;
  }, []);

  return (
    <MessageBoxContext.Provider value={MessageBoxService}>
      {children}
      {options.show && (
        <>
          <div className="modal fade show" style={{ display: 'block', zIndex: 2000 }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className={`modal-header bg-${options.type} text-white`}>
                  <h5 className="modal-title">{options.type === 'danger' ? 'Oops!' : 'Success'}</h5>
                </div>
                <div className="modal-body">
                  <p>{options.message}</p>
                </div>
                <div className="modal-footer">
                  {options.onConfirm ? (
                    <>
                      <button className={`btn btn-${options.type}`} onClick={() => MessageBoxService.confirm()}>{options.confirmText}</button>
                      <button className="btn btn-secondary" onClick={() => MessageBoxService.close()}>{options.cancelText || 'Cancel'}</button>
                    </>
                  ) : (
                    <button className={`btn btn-${options.type}`} onClick={() => MessageBoxService.close()}>{options.confirmText}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ zIndex: 1999 }}></div>
        </>
      )}
    </MessageBoxContext.Provider>
  );
}

export default MessageBoxContext;
