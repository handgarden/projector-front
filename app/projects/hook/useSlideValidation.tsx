import { useState } from "react";
import { SlideFormType } from "../../../types/core/project/SlideForm.type";
import { DefaultValidationMessage } from "../../../common/message/validation/DefaultValidation.message";

export default function useSlideValidation() {
  const [validationMessage, setValidationMessage] = useState({
    title: "",
    description: "",
    images: "",
  });

  const validate = (slide: SlideFormType) => {
    const isTitleValid = slide.title.length > 0 && slide.title.length <= 254;
    if (!isTitleValid) {
      setValidationMessage((prev) => ({
        ...prev,
        // eslint-disable-next-line no-template-curly-in-string
        title: DefaultValidationMessage.LENGTH.replace("${min}", "1").replace(
          // eslint-disable-next-line no-template-curly-in-string
          "${max}",
          "254"
        ),
      }));
    }

    const isDescriptionValid = slide.description.length > 0;
    if (!isDescriptionValid) {
      setValidationMessage((prev) => ({
        ...prev,
        description: DefaultValidationMessage.REQUIRED,
      }));
    }

    if (!isTitleValid || !isDescriptionValid) {
      return false;
    }

    return true;
  };

  const clearMessage = (key: keyof typeof validationMessage) => {
    setValidationMessage((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return {
    validationMessage,
    validate,
    clearMessage,
  };
}
