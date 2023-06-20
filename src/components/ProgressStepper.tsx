import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { useAppSelector } from "../hooks";
import { userSelector } from "../features/users/userSlice";

const steps = [
  { title: "Step 1", description: "Basic Details" },
  { title: "Step 2", description: "Address" },
  { title: "Step 3", description: "File Upload" },
  { title: "Step 4", description: "Multi File Upload" },
  { title: "Step 5", description: "Status" },
];

const ProgressStepper = () => {
  const user = useAppSelector(userSelector);

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => {
    setActiveStep(user.completedSteps);
  }, [user.completedSteps]);

  const activeStepText = steps[activeStep].description;

  return (
    <Stack>
      <Stepper index={activeStep} className="max-w-[90vw]" gap="2">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Text textAlign="center">
        Step {activeStep + 1} : <b>{activeStepText}</b>
      </Text>
    </Stack>
  );
};

export default ProgressStepper;
