import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

export function Layout() {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Box h={12} shadow={"md"} px={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} h="full">
          <Heading fontFamily={"monospace"} fontSize={"1.2rem"}>
            branch
          </Heading>
          <IconButton
            aria-label="Settings"
            as={Link}
            icon={<IoSettingsOutline color="black" />}
            rounded={"full"}
            to={"/setup"}
            variant={"ghost"}
          />
        </Flex>
      </Box>
      <Flex flex={1}>
        <Outlet />
      </Flex>
    </Flex>
  );
}
