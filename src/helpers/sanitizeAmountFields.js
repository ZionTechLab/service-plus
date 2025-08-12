// Helper to sanitize amount fields in an array of items based on column definitions
function sanitizeAmountFields(items, columns) {
  const amountFields = columns.filter(col => col.type === 'amount').map(col => col.field);
  return items.map(item => {
    const sanitized = { ...item };
    amountFields.forEach(field => {
      if (typeof sanitized[field] === 'string') {
        sanitized[field] = sanitized[field].replace(/,/g, '');
      }
    });
    return sanitized;
  });
}

export default sanitizeAmountFields;
