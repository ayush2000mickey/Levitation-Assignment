import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../hooks";
import { setCompletedSteps } from "../features/users/userSlice";
import { useGeolocated } from "react-geolocated";
import { useToast } from "@chakra-ui/react";

const MAX_COUNT = 5;

const MultipleFileAndGeoLocationForm = ({ setMultiFile }: any) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const [uploadedFiles, setUploadedFiles] = useState<Array<any>>([]);

  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleUploadFiles = (files: any[]) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);

        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          limitExceeded = true;
          return true;
        }
      }
    }
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleSubmit = () => {
    if (!uploadedFiles.length) {
      toast({
        title: "Please Fill all the Feilds to go to next step",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const multi_file: Array<any> = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      multi_file.push(uploadedFiles[i]);
    }

    setMultiFile(uploadedFiles);

    localStorage.setItem("multi_file", JSON.stringify(multi_file));

    console.log(coords);

    localStorage.setItem(
      "geolocation",
      JSON.stringify({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      })
    );

    dispatch(setCompletedSteps(4));
  };
  console.log("multi file", uploadedFiles);

  return (
    <VStack spacing="5px">
      <FormControl id="multipleFiles" isRequired>
        <FormLabel>Select Multiple Files (upto 5)</FormLabel>
        <Input
          placeholder="Select files"
          className="py-1"
          type="file"
          accept="image/png , .pdf"
          multiple
          onChange={handleFileEvent}
        />
        <div className="flex justify-end p-2">
          {uploadedFiles?.length > 0 && (
            <Button colorScheme="blue" onClick={() => setUploadedFiles([])}>
              Remove Selected Files
            </Button>
          )}
        </div>
      </FormControl>

      <div className="space-x-4 ">
        {uploadedFiles.map((file) => (
          <span key={file.name}>{file.name}</span>
        ))}
      </div>

      <FormControl id="multipleFiles" isRequired>
        <FormLabel>Geolocation</FormLabel>
        <div className="border rounded-lg border-gray-200 px-4 py-2 w-full">
          {!isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
          ) : !isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
          ) : coords ? (
            <div className="flex gap-2">
              <div>
                <span className="font-bold">lat :</span> {coords.latitude},
              </div>
              <div>
                <span className="font-bold">long :</span> {coords.longitude}
              </div>
            </div>
          ) : (
            <div>Getting the location data&hellip; </div>
          )}
        </div>
      </FormControl>

      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        width="100%"
        paddingTop="1rem"
      >
        <Button
          onClick={() => dispatch(setCompletedSteps(2))}
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

export default MultipleFileAndGeoLocationForm;
