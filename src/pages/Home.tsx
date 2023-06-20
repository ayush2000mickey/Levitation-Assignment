import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Button } from "@chakra-ui/react";
import ProgressStepper from "../components/ProgressStepper.tsx";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import UserDetails from "../components/UserDetails.tsx";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { User, userSelector, setAuthToken } from "../features/users/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");

    dispatch(setAuthToken(userInfo.authToken));

    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <Container centerContent className="max-w-[90vw] pb-12">
      <div className="bold p-8  text-3xl  text-white">User Details Form</div>
      <Box
        py={4}
        px={2}
        className="space-y-4"
        bg="white"
        borderRadius="lg"
        borderWidth="1px"
        width="100%"
      >
        <ProgressStepper />
        <UserDetails />
        {/* <Stack direction="row" justifyContent="space-between" spacing={4}>
          <div onClick={() => setCompletedSteps((prev) => prev - 1)}>
            {completedSteps > 0 && (
              <Button
                leftIcon={<ArrowBackIcon />}
                colorScheme="teal"
                variant="solid"
              >
                Prev
              </Button>
            )}
          </div>
          <div onClick={() => setCompletedSteps((prev) => prev + 1)}>
            {completedSteps < 4 && (
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            )}
          </div>
        </Stack> */}
      </Box>
    </Container>
  );
};

export default Home;
