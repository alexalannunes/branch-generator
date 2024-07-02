import { Flex, FormControl, Input, Stack } from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { useReadLocalStorage } from "usehooks-ts";
import { BranchNameResult } from "../../components";
import { FormFieldValues } from "../forms/forms";
import { DefaultForm } from "./ui/default-form";

function CustomForm() {
  // Add a fallback is no values found
  // Guarded by page bellow
  const initialStoredFields = {
    result: "",
    fields: [],
  };

  // move to hook
  const storedForm =
    useReadLocalStorage<FormFieldValues>("my-form") || initialStoredFields;

  const { register, control, getValues } = useForm<Record<string, string>>({
    defaultValues: {},
    mode: "onChange",
  });

  useWatch({ control });

  const fields = getValues();

  const hasValues = Object.entries(fields).some(([_, value]) => !!value);

  const branchName = Object.keys(fields).reduce((acc, key) => {
    acc = acc.replace(`{${key}}`, fields[key]);
    return acc;
  }, storedForm.result);

  const result = hasValues ? branchName : "";

  return (
    <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
      <Stack w={"600px"} spacing={4}>
        {storedForm.fields.map((field) => {
          return (
            <FormControl key={field.key}>
              <Input placeholder={field.label} {...register(field.key)} />
            </FormControl>
          );
        })}

        <BranchNameResult enableSlug={false} branch={result} />
      </Stack>
    </Flex>
  );
}

export function HomePage() {
  // Guarded by page bellow
  const initialStoredFields = {
    result: "",
    fields: [],
  };

  // move to hook
  const storedForm =
    useReadLocalStorage<FormFieldValues>("my-form") || initialStoredFields;

  /* Custom forms can appears here
    add tabs
  */

  // BranchNameResult can be placed here with composition (future)
  // so it can receive a slugged branch name

  // Great feature: use IA to generate branch without many fields
  return (
    <Flex flex={1}>
      {storedForm.fields.length ? <CustomForm /> : <DefaultForm />}
    </Flex>
  );
}
