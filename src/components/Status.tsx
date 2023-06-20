import { useState, useEffect } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { userSelector, setCompletedSteps } from "../features/users/userSlice";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

interface StatusProps {
  selectedFile: any;
  multiFile: any;
}

const Status = ({ selectedFile, multiFile }: StatusProps) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(selectedFile);
    console.log("m f", multiFile);
  }, [selectedFile]);

  const handleSubmit = async () => {
    setLoading(true);
    const name = user.name;
    const email = user.email;
    const phone_number = user.phoneNumber;
    const address_1 = user.address_1;
    const address_2 = user.address_2;
    const city = user.city;
    const state = user.state;
    const pincode = user.pincode;
    const country = user.country;
    const geolocation = localStorage.getItem("geolocation");
    const single_file = selectedFile;
    const multi_ups1 = multiFile[0];

    const formBody = {
      name,
      email,
      phone_number,
      address_1,
      address_2,
      city,
      state,
      pincode,
      country,
      geolocation,
      single_file,
      multi_ups1,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form`,
        formBody,
        config
      );

      console.log(data);

      toast({
        title: "Form Submitted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
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
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        width="100%"
        paddingTop="1rem"
      >
        <Button
          onClick={() => dispatch(setCompletedSteps(3))}
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
          isLoading={loading}
        >
          Submit Form
        </Button>
      </Stack>
    </div>
  );
};

export default Status;
