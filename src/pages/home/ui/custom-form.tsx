import {
  Flex,
  FormControl,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { useReadMyForm } from "../../../hooks/use-read-my-form";
import { BranchNameResult } from "../../../components";

export function CustomForm() {
  const { register, control, getValues } = useForm<Record<string, string>>({
    defaultValues: {},
    mode: "onChange",
  });

  const storedForm = useReadMyForm();

  useWatch({ control });

  const fields = getValues();

  const hasValues = Object.entries(fields).some(([_, value]) => !!value);

  const branchName = Object.keys(fields).reduce((acc, key) => {
    acc = acc.replace(`{${key}}`, fields[key]);
    return acc;
  }, storedForm.result);

  const result = hasValues ? branchName : "";

  const inputBg = useColorModeValue("white", "gray.900");

  return (
    <Flex mt={20} alignItems={"center"} justifyContent={"center"}>
      <Stack w={"600px"} spacing={4}>
        {storedForm.fields.map((field) => {
          return (
            <FormControl key={field.key}>
              <Input
                bg={inputBg}
                placeholder={field.label}
                {...register(field.key)}
                onKeyDown={(e) => {
                  if (e.code === "Space") e.preventDefault();
                }}
              />
            </FormControl>
          );
        })}

        <BranchNameResult enableSlug={false} branch={result} />
      </Stack>
    </Flex>
  );
}
