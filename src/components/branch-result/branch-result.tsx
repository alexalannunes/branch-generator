import { Box, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import { toSlug } from "../../helpers/to-slug";
import { copyToClipboard } from "../../helpers/to-clipboard";

interface BranchNameResultProps {
  branch: string;
}

export function BranchNameResult({ branch }: BranchNameResultProps) {
  const result = branch ? toSlug(branch) : ":)";

  const handleClipboardCopy = () => {
    copyToClipboard(result);
  };

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
      <Tooltip label="Copy to clipboard">
        <IconButton
          icon={<MdContentCopy />}
          aria-label="Copy"
          rounded={"full"}
          position={"absolute"}
          shadow={"md"}
          bg={"white"}
          right={6}
          top={"50%"}
          transform={"auto"}
          translateY={"-50%"}
          onClick={handleClipboardCopy}
        />
      </Tooltip>
    </Box>
  );
}
