import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { IoMoon, IoSettingsOutline, IoSunny } from "react-icons/io5";

export function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const renderIcon = isDark ? <IoSunny /> : <IoMoon />;
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Box h={12} shadow={"md"} px={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} h="full">
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontFamily={"monospace"}
            fontSize={"1.2rem"}
            fontWeight="extrabold"
          >
            branch
          </Text>
          <HStack>
            <Tooltip label="Toggle theme">
              <IconButton
                aria-label="Toggle theme"
                icon={renderIcon}
                rounded={"full"}
                variant={"ghost"}
                onClick={toggleColorMode}
              />
            </Tooltip>
            <Tooltip label="Setup custom form">
              <IconButton
                aria-label="Settings"
                as={Link}
                icon={<IoSettingsOutline />}
                rounded={"full"}
                to={"/setup"}
                variant={"ghost"}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Box>
      <Flex flex={1}>
        <Outlet />
      </Flex>
    </Flex>
  );
}
