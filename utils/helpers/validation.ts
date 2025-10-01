function sanitizeInput(input: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return input.replace(reg, (match) => map[match]);
}

// Helper function to safely handle form data
export function getFormValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || value === undefined) return null;
  const stringValue = String(value).trim();
  if (stringValue === "") return null;
  return sanitizeInput(stringValue);
}

// Helper function to handle date values specifically - FIXED
export function getDateValue(formData: FormData, key: string): string | null {
  const value = getFormValue(formData, key);
  if (!value) return null;

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    throw new Error(`Invalid date format for ${key}: ${value}`);
  }

  return value;
}

//  Extract and validate a number value, with optional default
export function getNumberValue(
  formData: FormData,
  key: string,
  defaultValue = 0
): number {
  const value = getFormValue(formData, key);
  if (!value) return defaultValue;

  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Invalid number for ${key}: ${value}`);
  }

  return num;
}
