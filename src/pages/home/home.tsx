import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { DefaultForm } from "./ui/default-form";

export function HomePage() {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Box h={12} shadow={"md"} px={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} h="full">
          <Heading fontFamily={"monospace"} fontSize={"1.2rem"}>
            branch
          </Heading>
          <IconButton
            aria-label="Settings"
            variant={"ghost"}
            rounded={"full"}
            icon={<IoSettingsOutline color="black" />}
          />
        </Flex>
      </Box>
      <DefaultForm />
    </Flex>
  );
}
