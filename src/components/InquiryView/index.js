import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function InquiryView() {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);

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
      </div>
      <h2>Log</h2>
      <ul>
        {inquiry.log.map((entry, index) => (
          <li key={index}>
            {entry.status} - {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InquiryView;
