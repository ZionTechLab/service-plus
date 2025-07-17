import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogActivity from '../LogActivity';

function InquiryView() {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [showLogActivity, setShowLogActivity] = useState(false);

  useEffect(() => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const currentInquiry = inquiries.find((i) => i.id === parseInt(id));
    setInquiry(currentInquiry);
  }, [id]);

  const handleStatusChange = (newStatus) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const updatedInquiries = inquiries.map((i) => {
      if (i.id === parseInt(id)) {
        const newLogEntry = { status: newStatus, timestamp: new Date() };
        return {
          ...i,
          status: newStatus,
          log: [...i.log, newLogEntry],
        };
      }
      return i;
    });
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    setInquiry(updatedInquiries.find((i) => i.id === parseInt(id)));
  };

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

  if (!inquiry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Inquiry Details</h1>
      <p>
        <strong>Status:</strong> {inquiry.status}
      </p>
      <div>
        <button onClick={() => handleStatusChange('in_progress')}>
          In Progress
        </button>
        <button onClick={() => handleStatusChange('resolved')}>
          Resolved
        </button>
        <button onClick={() => handleStatusChange('closed')}>Closed</button>
        <button onClick={() => setShowLogActivity(!showLogActivity)}>
          Add Log
        </button>
      </div>
      {showLogActivity && (
        <LogActivity
          inquiryId={id}
          onLogActivitySubmit={handleLogActivitySubmit}
        />
      )}
      <h2>Log</h2>
      <ul>
        {inquiry.log.map((entry, index) => (
          <li key={index}>
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
