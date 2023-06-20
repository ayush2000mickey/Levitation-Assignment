import { useState } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!email) {
      toast({
        title: "Please Fill Your Email ID",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      setTimeout(() => {
        toast({
          title: "Request Sent Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        setEmail("");
      }, 2000);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Container
      maxW="xl"
      centerContent
      className=""
      display="flex"
      justifyContent="center"
    >
      <Box p={4} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
        <Heading textAlign="center" className="pb-6 px-4">
          Levitation
        </Heading>
        <VStack spacing="5px">
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Send request to change Password
          </Button>
          <Text
            fontSize="sm"
            className=" text-blue-800 underline cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/")}
          >
            Go Back to Login Page
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
