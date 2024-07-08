import {
  Flex,
  FlexProps,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BranchNameResult } from "../../../../components";
import { useReadMyForm } from "../../../../hooks/use-read-my-form";
interface DefaultFormValues {
  branch: string;
}

export function DefaultForm() {
  const { register, watch } = useForm<DefaultFormValues>({
    defaultValues: {
      branch: "",
    },
  });

  const storedForm = useReadMyForm();

  const hasCustomForm = !!storedForm.fields.length;

  // when has a custom form, we should add a space to separate from form switcher view
  // otherwise when has no custom form, we should center default form
  const containerProps: FlexProps = hasCustomForm ? { mt: 20 } : { flex: 1 };

  const branch = watch("branch");

  const inputBg = useColorModeValue("white", "gray.900");

  return (
    <Flex {...containerProps} alignItems={"center"} justifyContent={"center"}>
      <Stack w={"600px"} alignItems={"center"} spacing={4}>
        <Input
          {...register("branch")}
          w="full"
          placeholder="Past or write your Branch name here"
          bg={inputBg}
        />
        <BranchNameResult branch={branch} />
      </Stack>
    </Flex>
  );
}
