import { useReadLocalStorage } from "usehooks-ts";
import { FormFieldValues } from "../pages/forms/forms";

export function useReadMyForm() {
  const initialStoredFields = {
    result: "",
    fields: [],
  };

  // move to hook
  const storedForm =
    useReadLocalStorage<FormFieldValues>("my-form") || initialStoredFields;

  return storedForm;
}
