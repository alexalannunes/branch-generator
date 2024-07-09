import {
  Box,
  IconButton,
  Text,
  Tooltip,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdContentCopy, MdOutlineCheck } from "react-icons/md";
import { toSlug } from "../../helpers/to-slug";

interface BranchNameResultProps {
  branch: string;
  enableSlug?: boolean;
}

export function BranchNameResult({
  branch,
  enableSlug = true,
}: BranchNameResultProps) {
  const result = branch ? (enableSlug ? toSlug(branch) : branch) : ":)";

  const copyText = `git checkout -b ${result}`;

  const { hasCopied, onCopy } = useClipboard(copyText, 1200);

  const handleClipboardCopy = () => {
    onCopy();
  };

  const successButtonBackground = useColorModeValue("green.500", "green.200");
  const successButtonColor = useColorModeValue("white", "green.900");

  const copyButtonIcon = hasCopied ? <MdOutlineCheck /> : <MdContentCopy />;
  const copyButtonBackground = hasCopied ? successButtonBackground : "white";
  const copyButtonColor = hasCopied ? successButtonColor : "black";
  const copyButtonTooltip = hasCopied ? "Copied" : "Copy to clipboard";

  return (
    <Box
      bg={"container.background"}
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
