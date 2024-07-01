import { Flex, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BranchNameResult } from "../../../components/branch-result/branch-result";

interface DefaultFormValues {
  branch: string;
}

export function DefaultForm() {
  const { register, watch } = useForm<DefaultFormValues>({
    defaultValues: {
      branch: "",
    },
  });

  const branch = watch("branch");

  return (
    <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
      <Stack w={"600px"} alignItems={"center"} spacing={4}>
        <Input
          {...register("branch")}
          w="full"
          placeholder="Branch name here"
        />
        <BranchNameResult branch={branch} />
      </Stack>
    </Flex>
  );
}
