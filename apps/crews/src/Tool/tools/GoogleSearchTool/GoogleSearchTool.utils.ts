type InputObject = { [key: string]: any };

export const formatObject = (obj: InputObject, keys: string[] = []): string => {
  if (!obj || Object.keys(obj).length === 0) {
    return "";
  }

  const formatValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.map((instance) => formatValue(instance)).join(",");
    } else if (typeof value === "object" && value !== null) {
      return formatObject(value);
    } else {
      return (value ?? "").toString();
    }
  };

  let formattedString = "";
  const keysToFormat = keys.length > 0 ? keys : Object.keys(obj);

  keysToFormat.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      formattedString += `${key}: ${formatValue(obj[key])}\n`;
    }
  });

  return formattedString.trim();
};
