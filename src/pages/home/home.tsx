import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useFormPrefs } from "../../hooks/use-my-prefs";
import { ButtonFormSwitcher } from "./ui/button-form-switcher";
import { CustomForm } from "./ui/custom-form";
import { DefaultForm } from "./ui/default-form";
import { useReadMyForm } from "../../hooks/use-read-my-form";

// move to types file
export type FormView = "default" | "custom";

export function HomePage() {
  const { prefs } = useFormPrefs();
  const storedForm = useReadMyForm();

  const [view, setView] = useState<FormView>(() => {
    return prefs;
  });

  const isCustomView = view === "custom";

  const hasCustomForm = !!storedForm.fields.length;

  // Great feature: use IA to generate branch without many fields
  return (
    <Flex flex={1} flexDirection={"column"}>
      {hasCustomForm && (
        <Flex mx={"auto"} w="600px" h={"100px"} alignItems={"flex-end"}>
          <ButtonFormSwitcher formView={view} onChange={(v) => setView(v)} />
        </Flex>
      )}

      {isCustomView ? <CustomForm /> : <DefaultForm />}
    </Flex>
  );
}
