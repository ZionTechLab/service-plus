import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogActivity from './LogActivity';

function InquiryView() {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [showLogActivity, setShowLogActivity] = useState(false);

  useEffect(() => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const currentInquiry = inquiries.find((i) => i.id === parseInt(id));
    setInquiry(currentInquiry);
  }, [id]);

  if (!inquiry) {
    return <div>...</div>;
  }
  // const handleStatusChange = (newStatus) => {
  //   const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
  //   const updatedInquiries = inquiries.map((i) => {
  //     if (i.id === parseInt(id)) {
  //       const newLogEntry = { status: newStatus, timestamp: new Date() };
  //       return {
  //         ...i,
  //         status: newStatus,
  //         log: [...i.log, newLogEntry],
  //       };
  //     }
  //     return i;
  //   });
  //   localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
  //   setInquiry(updatedInquiries.find((i) => i.id === parseInt(id)));
  // };

  const handleLogActivitySubmit = (values) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const updatedInquiries = inquiries.map((i) => {
      if (i.id === parseInt(id)) {
        const newLogEntry = { ...values, timestamp: new Date() };
        return {
          ...i,
          log: [...i.log, newLogEntry],
        };
      }
      return i;
    });
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    setInquiry(updatedInquiries.find((i) => i.id === parseInt(id)));
    setShowLogActivity(false);
  };
  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">Log</span>
      </h4>
      <button className='w-100 btn btn-primary btn-lg mb-3' onClick={() => setShowLogActivity(!showLogActivity)}>
        Add Log
      </button>
            {showLogActivity && (
        <LogActivity
          inquiryId={id}
          onLogActivitySubmit={handleLogActivitySubmit}
        />
      )}
      <ul className="list-group mb-3">
        {inquiry.log.map((entry, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
            {entry.status ? (
              <>
                {entry.status} - {new Date(entry.timestamp).toLocaleString()}
              </>
            ) : (
              <>
                {entry.assignee} - {entry.comment} -{' '}
                {new Date(entry.datetime).toLocaleString()}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InquiryView;
