import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { userSelector, setCompletedSteps } from "../features/users/userSlice";
import { useToast } from "@chakra-ui/react";

const FileForm = ({ setSelectedFile }: any) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile2] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const toast = useToast();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setSelectedFile2(event.target.files[0]);
      setIsFilePicked(true);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast({
        title: "Please Fill all the Feilds to go to next step",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setSelectedFile(selectedFile);
    dispatch(setCompletedSteps(3));
  };

  console.log(selectedFile);

  return (
    <VStack spacing="5px">
      <FormControl id="file" isRequired>
        <FormLabel>File</FormLabel>
        <Input
          placeholder="Select files"
          className="py-1"
          type="file"
          accept="image/png , .pdf"
          onChange={changeHandler}
        />
      </FormControl>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        width="100%"
        paddingTop="1rem"
      >
        <Button
          onClick={() => dispatch(setCompletedSteps(1))}
          leftIcon={<ArrowBackIcon />}
          colorScheme="teal"
          variant="solid"
        >
          Prev
        </Button>
        <Button
          onClick={handleSubmit}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
        >
          Next
        </Button>
      </Stack>
    </VStack>
  );
};

export default FileForm;
