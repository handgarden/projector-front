import { CreateProjectInput, GetProjectQuery } from "../../../gql/graphql";
import { DefaultValidationMessage } from "../../../common/message/validation/DefaultValidation.message";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { FormErrorText } from "../../../common/components/FormErrorText";

type Props = {
  initialValues?: GetProjectQuery["project"];
  onSubmit: (values: CreateProjectInput) => void;
};

export default function ProjectForm({ onSubmit, initialValues }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateProjectInput>();

  const lengthMessage = DefaultValidationMessage.LENGTH.replace(
    "${min}",
    "1"
  ).replace("${max}", "255");

  const onSubmitForm = (data: CreateProjectInput) => {
    if (!confirm(DEFAULT_MESSAGE_KR.alert.confirm.create)) {
      return;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        label="Title"
        defaultValue={initialValues?.title}
        {...register("title", {
          required: {
            value: true,
            message: DefaultValidationMessage.REQUIRED,
          },
        })}
      />
      {errors.title && <FormErrorText>{errors.title.message}</FormErrorText>}
      <Textarea
        label="Description"
        defaultValue={initialValues?.description}
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
        {initialValues ? "Update" : "Create"}
      </Button>
    </form>
  );
}
