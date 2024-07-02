import { REGEX_HELPER } from "./regex";

export const toSlug = (value: string, separator = "-") => {
  // Convert the string to normalized NFD form (Unicode)
  const normalizedValue = (value || "").normalize("NFD");

  // Remove accents through the unicode character range
  const withoutAccents = normalizedValue.replace(/[\u0300-\u036f]/g, "");

  // Convert to lowercase
  const lowercased = withoutAccents.toLowerCase();

  // Remove extra spaces, transforming more than one space into a single space
  const trimmed = lowercased.trim().replace(/[\s\t\n]+/gm, " ");

  // Replace slashes with underscores to avoid collision
  // const withoutSlashes = trimmed.replace(/\//, "_");

  // Remove non-alphanumeric characters and underscores
  const alphanumericOnly = trimmed.replace(
    REGEX_HELPER.NON_ALPHANUMERIC_UNDERSCORE,
    ""
  );

  // Replace spaces with a specific separator (default is '-')
  const result = alphanumericOnly.replace(/\s/g, separator);

  return result;
};
