import { Button, ButtonGroup } from "@chakra-ui/react";
import { useFormPrefs } from "../../../hooks/use-my-prefs";
import { FormView } from "../home";
import { useReadMyForm } from "../../../hooks/use-read-my-form";

interface ButtonFormSwitcherProps {
  formView: FormView;
  onChange: (view: FormView) => void;
}

export function ButtonFormSwitcher({
  formView,
  onChange,
}: ButtonFormSwitcherProps) {
  const { storeFormViewPref } = useFormPrefs();
  const storedForm = useReadMyForm();

  const isDefault = formView === "default";
  const isCustom = formView === "custom";

  const handleChange = (view: FormView) => {
    storeFormViewPref(view);
    onChange(view);
  };

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button onClick={() => handleChange("default")} isActive={isDefault}>
        Default
      </Button>
      {!!storedForm.fields.length && (
        <Button onClick={() => handleChange("custom")} isActive={isCustom}>
          Custom form
        </Button>
      )}
    </ButtonGroup>
  );
}
