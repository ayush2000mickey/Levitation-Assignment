import { useState } from "react";
import BasicDetailsForm from "./BasicDetailsForm";
import AddressForm from "./AddressForm";
import FileForm from "./FileForm";
import MultipleFileAndGeoLocationForm from "./MultipleFileAndGeoLocationForm";
import Status from "./Status";

import { useAppSelector } from "../hooks";
import { userSelector } from "../features/users/userSlice";

const UserDetailsForm = () => {
  const user = useAppSelector(userSelector);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [multiFile, setMultiFile] = useState<Array<any>>();

  const selectForm = (completedSteps: number) => {
    switch (completedSteps) {
      case 0:
        return <BasicDetailsForm />;
      case 1:
        return <AddressForm />;
      case 2:
        return <FileForm setSelectedFile={setSelectedFile} />;
      case 3:
        return <MultipleFileAndGeoLocationForm setMultiFile={setMultiFile} />;
      case 4:
        return <Status selectedFile={selectedFile} multiFile={multiFile} />;

      default:
        break;
    }
  };
  return <div>{selectForm(user.completedSteps)}</div>;
};

export default UserDetailsForm;
