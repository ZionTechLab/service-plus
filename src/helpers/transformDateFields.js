// Normalizes date fields in a plain object using the `fields` descriptor.
// For each key in `fields` with type === 'date', the function will
// replace the value with a YYYY-MM-DD string (taking the part before 'T')
// or an empty string when falsy.
export default function transformDateFields(formData = {}, fields = {}) {
  // shallow clone so we don't mutate the original
  const result = { ...formData };

  Object.keys(fields || {}).forEach((key) => {
    try {
      const meta = fields[key];
      if (meta && meta.type === "date" && Object.prototype.hasOwnProperty.call(formData, key)) {
        const val = formData[key];
        if (!val && val !== 0) {
          result[key] = "";
        } else if (typeof val === "string") {
          // keep simple rule: take substring before 'T' if present
          result[key] = val.includes("T") ? val.split("T")[0] : val;
        } else if (val instanceof Date) {
          result[key] = val.toISOString().split("T")[0];
        } else {
          // fallback: coerce to string and try the same rule
          const s = String(val);
          result[key] = s.includes("T") ? s.split("T")[0] : s;
        }
      }
      else if(meta && meta.type === "switch" && Object.prototype.hasOwnProperty.call(formData, key)) {
        const val = formData[key];
        result[key] = Boolean(val);
      }
    } catch (e) {
      // on any unexpected error, leave the original value
      // (fail-safe: do not throw)
    }
  });

  return result;
}
