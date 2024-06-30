import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";

export function HomePage() {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      {/* header */}
      <Box h={12} shadow={"sm"} px={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} h="full">
          <Avatar name="Icon" size={"sm"} />
          <Heading fontSize={"1.2rem"}>branch</Heading>
          <Avatar name="Settings" size={"sm"} />
        </Flex>
      </Box>
      <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
        <Stack w={"600px"} alignItems={"center"}>
          <Input w="full" />
          <Button w={"fit-content"}>Copy</Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
