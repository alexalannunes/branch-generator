import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { LuTrash } from "react-icons/lu";
import { MdKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { isEqual } from "lodash";
import { toSlug } from "../../helpers/to-slug";
import { useFormPrefs } from "../../hooks/use-my-prefs";

interface FormField {
  fieldId?: string;
  label: string;
  key: string;
}

export interface FormFieldValues {
  fields: FormField[];
  result: string;
}

export function FormsPage() {
  const [storedForm, setStoredForm, removeStoredForm] =
    useLocalStorage<FormFieldValues>("my-form", {
      result: "",
      fields: [],
    });

  const { control, handleSubmit, register, setValue, getValues, unregister } =
    useForm<FormFieldValues>({
      defaultValues: {
        fields: storedForm.fields,
        result: storedForm.result,
      },
    });

  const navigate = useNavigate();

  const { append, fields, remove, move } = useFieldArray({
    control,
    name: "fields",
  });

  const { storeFormViewPref } = useFormPrefs();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      // initial page, should go to home
      navigate("/");
    }
  };

  const submit = (data: FormFieldValues) => {
    setStoredForm(data);
  };

  const handleOpenRemove = () => {
    onOpen();
  };

  const handleRemoveForm = () => {
    removeStoredForm();
    unregister("result");
    setValue("result", "");
    setValue("fields", []);
    storeFormViewPref("default");
    onClose();
  };

  const handleOrderFieldsWhenMove = () => {
    const result = getValues("fields")
      .map((f) => `{${f.key}}`)
      .join("-"); // Custom separator in textarea
    setValue("result", result);
  };

  const handleMoveDown = (index: number) => {
    move(index, index + 1);
    handleOrderFieldsWhenMove();
  };

  const handleMoveUp = (index: number) => {
    move(index, index - 1);
    handleOrderFieldsWhenMove();
  };

  const inputBg = useColorModeValue("white", "gray.800");

  const values = getValues();

  const hasFormChanges = !isEqual(storedForm, values);

  return (
    <Container maxW={"container.lg"}>
      <Flex my={10} justifyContent={"space-between"} alignItems={"center"}>
        <HStack>
          <IconButton
            variant={"ghost"}
            aria-label="Back to home page"
            icon={<MdKeyboardBackspace fontSize={20} />}
            onClick={handleBack}
          />
          <Heading size={"md"}>Setup your custom form</Heading>
        </HStack>
        <HStack>
          <Button
            size={"sm"}
            form="setup-form"
            type="submit"
            colorScheme="teal"
            isDisabled={!hasFormChanges}
          >
            Save
          </Button>
          {!!storedForm.fields.length && (
            <Button
              size={"sm"}
              form="setup-form"
              type="submit"
              variant={"outline"}
              colorScheme="red"
              onClick={handleOpenRemove}
            >
              Remove
            </Button>
          )}
        </HStack>
      </Flex>
      <Divider />
      <Flex
        gap={4}
        mt={10}
        as="form"
        id="setup-form"
        onSubmit={handleSubmit(submit)}
        alignItems={"flex-start"}
      >
        <Box flex={1}>
          <Stack>
            {fields.map((fieldItem, index, arr) => {
              return (
                <Card
                  shadow={"none"}
                  border={"1px"}
                  borderColor={"container.border"}
                  key={fieldItem.id}
                  p={6}
                  position={"relative"}
                  rounded={"md"}
                >
                  <CardBody>
                    <HStack
                      className="field-actions"
                      position={"absolute"}
                      right={4}
                      top={1}
                      zIndex={1}
                    >
                      {/* convert to button group */}
                      {!arr[index - 1] ? (
                        <Tooltip label="Move to down">
                          <IconButton
                            aria-label="Swap field"
                            icon={<IoMdArrowDown />}
                            shadow={"md"}
                            type="button"
                            isDisabled={arr.length === 1}
                            size={"xs"}
                            onClick={() => {
                              handleMoveDown(index);
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip label="Move to up">
                          <IconButton
                            aria-label="Swap field"
                            isDisabled={!arr[index - 1]}
                            icon={<IoMdArrowUp />}
                            shadow={"md"}
                            type="button"
                            size={"xs"}
                            onClick={() => {
                              handleMoveUp(index);
                            }}
                          />
                        </Tooltip>
                      )}

                      <IconButton
                        aria-label="Remove field"
                        icon={<LuTrash />}
                        shadow={"md"}
                        size={"xs"}
                        colorScheme="red"
                        variant="outline"
                        onClick={() => {
                          remove(index);
                          handleOrderFieldsWhenMove();
                        }}
                      />
                    </HStack>
                    <FormControl>
                      <FormLabel>Field name</FormLabel>
                      <Controller
                        name={`fields.${index}.label`}
                        control={control}
                        render={({ field }) => {
                          return (
                            <Input
                              autoComplete="off"
                              bg={inputBg}
                              {...field}
                              onChange={(e) => {
                                const fieldName = toSlug(e.target.value);
                                setValue(`fields.${index}.key`, fieldName);
                                handleOrderFieldsWhenMove();
                                field.onChange(e.target.value);
                              }}
                            />
                          );
                        }}
                      />
                    </FormControl>
                  </CardBody>
                </Card>
              );
            })}

            <Button
              gap={4}
              p={4}
              rounded={"md"}
              border={"2px"}
              borderColor={"container.border"}
              flex={1}
              borderStyle={"dashed"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => {
                append({
                  label: "",
                  key: "",
                });
              }}
            >
              Add field
            </Button>
          </Stack>
        </Box>
        <Flex flex={1}>
          <Card
            p={6}
            rounded={"md"}
            border={"1px"}
            borderColor={"container.border"}
            w={"full"}
            shadow={"none"}
          >
            <CardBody>
              <FormControl>
                <FormLabel>Setup branch name format</FormLabel>
                <Textarea
                  fontFamily={"monospace"}
                  bg={inputBg}
                  isDisabled={!fields.length}
                  {...register("result")}
                />
              </FormControl>
            </CardBody>
          </Card>
        </Flex>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete form
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleRemoveForm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
