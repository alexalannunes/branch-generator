import { Box, IconButton, Text, Tooltip, useBoolean } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdContentCopy, MdOutlineCheck } from "react-icons/md";
import { copyToClipboard } from "../../helpers/to-clipboard";
import { toSlug } from "../../helpers/to-slug";

interface BranchNameResultProps {
  branch: string;
  enableSlug?: boolean;
}

export function BranchNameResult({
  branch,
  enableSlug = true,
}: BranchNameResultProps) {
  const [copied, setFlag] = useBoolean(false);

  const result = branch ? (enableSlug ? toSlug(branch) : branch) : ":)";

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
      bg="gray.100"
      p={6}
      position={"relative"}
      pr={20}
      rounded={"md"}
      w={"full"}
    >
      <Text fontFamily={"monospace"} fontSize={"1rem"}>
        {result}
      </Text>
      <Tooltip label={copyButtonTooltip}>
        <IconButton
          _active={{ scale: 0.9 }}
          _hover={{ bg: copyButtonBackground }}
          aria-label="Copy"
          bg={copyButtonBackground}
          color={copyButtonColor}
          icon={copyButtonIcon}
          onClick={handleClipboardCopy}
          position={"absolute"}
          right={6}
          rounded={"full"}
          shadow={"md"}
          top={"50%"}
          transform={"auto"}
          translateY={"-50%"}
        />
      </Tooltip>
    </Box>
  );
}
