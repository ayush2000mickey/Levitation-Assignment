import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Stack,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  userSelector,
  setUserAddressDetails,
  setCompletedSteps,
} from "../features/users/userSlice";

const AddressForm = () => {
  const [address_1, setAddressLine1] = useState("");
  const [address_2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState<number>();
  const [country, setCountry] = useState("");

  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const toast = useToast();

  useEffect(() => {
    setAddressLine1(user.address_1);
    setAddressLine2(user.address_2);
    setCity(user.city);
    setState(user.state);
    setPincode(user.pincode);
    setCountry(user.country);
  }, []);

  const handleSubmit = () => {
    if (!address_1 || !address_2 || !city || !state || !pincode || !country) {
      toast({
        title: "Please Fill all the Feilds to go to next step",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    dispatch(
      setUserAddressDetails({
        address_1,
        address_2,
        city,
        state,
        pincode,
        country,
      })
    );

    dispatch(setCompletedSteps(2));
  };

  return (
    <VStack spacing="5px">
      <FormControl id="address_1" isRequired>
        <FormLabel>Address line one</FormLabel>
        <Input
          value={address_1}
          placeholder="Enter Address Line 1"
          onChange={(e) => setAddressLine1(e.target.value)}
        />
      </FormControl>
      <FormControl id="address_2" isRequired>
        <FormLabel>Address line two</FormLabel>
        <Input
          value={address_2}
          placeholder="Enter Address Line 2"
          onChange={(e) => setAddressLine2(e.target.value)}
        />
      </FormControl>
      <FormControl id="city" isRequired>
        <FormLabel>City</FormLabel>
        <Input
          value={city}
          placeholder="Enter Your City"
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>
      <FormControl id="state" isRequired>
        <FormLabel>State</FormLabel>
        <Input
          value={state}
          placeholder="Enter Your State"
          onChange={(e) => setState(e.target.value)}
        />
      </FormControl>
      <FormControl id="pincode" isRequired>
        <FormLabel>PinCode</FormLabel>
        <NumberInput>
          <NumberInputField
            value={pincode}
            placeholder="Enter Your PinCode"
            onChange={(e) => setPincode(+e.target.value)}
          />
        </NumberInput>
      </FormControl>
      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Input
          value={country}
          placeholder="Enter Your Country"
          onChange={(e) => setCountry(e.target.value)}
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
          onClick={() => dispatch(setCompletedSteps(0))}
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

export default AddressForm;
