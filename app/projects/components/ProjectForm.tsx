import { CreateProjectInput, GetProjectQuery } from "../../../gql/graphql";
import { DefaultValidationMessage } from "../../../common/message/validation/DefaultValidation.message";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { FormErrorText } from "../../../common/components/FormErrorText";
import { PROJECT_MESSAGE } from "../../../common/message/Project.message";
import { useEffect, useState } from "react";
import { mclsx } from "../../../utils/mclsx";
import { useIsDark } from "../../../common/hook/useIsDark";

type Props = {
  initialValues?: GetProjectQuery["project"];
  onSubmit: (values: CreateProjectInput) => void;
};

export default function ProjectForm({ onSubmit, initialValues }: Props) {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CreateProjectInput>();

  const lengthMessage = DefaultValidationMessage.LENGTH.replace(
    "${min}",
    "1"
  ).replace("${max}", "255");

  const onSubmitForm = (data: CreateProjectInput) => {
    const message = initialValues
      ? DEFAULT_MESSAGE_KR.alert.confirm.update
      : DEFAULT_MESSAGE_KR.alert.confirm.create;
    if (!confirm(message)) {
      return;
    }

    onSubmit(data);
  };

  useEffect(() => {
    if (!initialValues) return;

    setValue("title", initialValues.title);
    setValue("description", initialValues.description);
  }, [initialValues, setValue]);

  const [isFocused, setIsFocused] = useState(false);
  const isDark = useIsDark();

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <label
        className={mclsx(
          "text-default-500 text-sm pb-2 block",
          isFocused ? (isDark ? "text-white" : "text-black") : ""
        )}
      >
        {PROJECT_MESSAGE.project.title}
      </label>
      <Input
        {...register("title", {
          required: {
            value: true,
            message: DefaultValidationMessage.REQUIRED,
          },
        })}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {errors.title && <FormErrorText>{errors.title.message}</FormErrorText>}
      <Textarea
        label={PROJECT_MESSAGE.project.description}
        labelPlacement="outside"
        minRows={10}
        {...register("description", {
          required: {
            value: true,
            message: DefaultValidationMessage.REQUIRED,
          },
          minLength: {
            value: 1,
            message: lengthMessage,
          },
          maxLength: {
            value: 255,
            message: lengthMessage,
          },
        })}
        className="my-4"
      />
      {errors.description && (
        <FormErrorText>{errors.description.message}</FormErrorText>
      )}
      <Button fullWidth type="submit">
        {initialValues
          ? DEFAULT_MESSAGE_KR.button.update
          : DEFAULT_MESSAGE_KR.button.create}
      </Button>
    </form>
  );
}
