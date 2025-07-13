import React, { useState, useEffect } from 'react';
import './InquiryList.css';

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    setInquiries(storedInquiries);
  }, []);

  return (
    <div className="InquiryList">
      <h1>Inquiries</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service Type</th>
            <th>Priority</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index}>
              <td>{inquiry.firstName}</td>
              <td>{inquiry.lastName}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.phone}</td>
              <td>{inquiry.serviceType}</td>
              <td>{inquiry.priority}</td>
              <td>{inquiry.subject}</td>
              <td>{inquiry.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InquiryList;
