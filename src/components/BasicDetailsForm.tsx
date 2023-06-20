import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Stack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useToast } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  userSelector,
  setUserBasicDetails,
  setCompletedSteps,
} from "../features/users/userSlice";

const BasicDetailsForm = () => {
  const user = useAppSelector(userSelector);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>();

  const dispatch = useAppDispatch();

  const toast = useToast();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
  }, []);

  const handleSubmit = () => {
    if (!name || !email || !phoneNumber) {
      toast({
        title: "Please Fill all the Feilds to go to next step",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email is Invalid",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    dispatch(setUserBasicDetails({ name, email, phoneNumber }));
    dispatch(setCompletedSteps(1));
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <div className="border rounded-lg border-gray-200 px-4 py-2">
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="IN"
            value={phoneNumber}
            onChange={setPhoneNumber}
            focusInputOnCountrySelection={false}
            className="focus:outline-0"
          />
        </div>
      </FormControl>
      <Stack
        direction="row"
        textAlign="end"
        justifyContent="flex-end"
        spacing={4}
        width="100%"
        paddingTop="1rem"
      >
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={handleSubmit}
        >
          Next
        </Button>
      </Stack>
    </VStack>
  );
};

export default BasicDetailsForm;
