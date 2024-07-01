import { Box, IconButton, Text, Tooltip, useBoolean } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdContentCopy, MdOutlineCheck } from "react-icons/md";
import { copyToClipboard } from "../../helpers/to-clipboard";
import { toSlug } from "../../helpers/to-slug";

interface BranchNameResultProps {
  branch: string;
}

export function BranchNameResult({ branch }: BranchNameResultProps) {
  const [copied, setFlag] = useBoolean(false);

  const result = branch ? toSlug(branch) : ":)";

  const handleClipboardCopy = () => {
    setFlag.on();
    copyToClipboard(result);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (copied) {
      timeoutId = setTimeout(() => {
        setFlag.off();
      }, 1200);
    }

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [copied]);

  const copyButtonIcon = copied ? <MdOutlineCheck /> : <MdContentCopy />;
  const copyButtonBackground = copied ? "green.400" : "white";
  const copyButtonColor = copied ? "white" : "black";
  const copyButtonTooltip = copied ? "Copied" : "Copy to clipboard";

  return (
    <Box
      p={6}
      pr={20}
      rounded={"md"}
      bg="gray.100"
      w={"full"}
      position={"relative"}
    >
      <Text fontFamily={"monospace"} fontSize={"1rem"}>
        {result}
      </Text>
      <Tooltip label={copyButtonTooltip}>
        <IconButton
          icon={copyButtonIcon}
          aria-label="Copy"
          rounded={"full"}
          position={"absolute"}
          shadow={"md"}
          bg={copyButtonBackground}
          _hover={{ bg: copyButtonBackground }}
          color={copyButtonColor}
          right={6}
          top={"50%"}
          transform={"auto"}
          translateY={"-50%"}
          onClick={handleClipboardCopy}
          _active={{ scale: 0.9 }}
        />
      </Tooltip>
    </Box>
  );
}
