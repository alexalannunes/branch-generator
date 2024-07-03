import { useLocalStorage } from "usehooks-ts";
import { FormView } from "../pages/home/home";
import { useReadMyForm } from "./use-read-my-form";

export function useFormPrefs() {
  const [prefs, setPrefs] = useLocalStorage<FormView>("my-prefs", "default");
  const storedForm = useReadMyForm();

  const storeFormViewPref = (view: FormView) => {
    setPrefs(view);
  };

  // when custom is stored but no custom form exist
  const prefs_ = storedForm.result.length ? prefs : "default";

  return { storeFormViewPref, prefs: prefs_ };
}
