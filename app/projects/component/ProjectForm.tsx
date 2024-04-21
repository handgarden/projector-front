import { CreateProjectInput, GetProjectQuery } from "../../../gql/graphql";
import { DefaultValidationMessage } from "../../../common/message/validation/DefaultValidation.message";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";

type Props = {
  initialValues?: GetProjectQuery["project"];
  onSubmit: (values: CreateProjectInput) => void;
};

export default function PresentationForm({ onSubmit, initialValues }: Props) {
  // useEffect(() => {
  //   form.setFieldsValue({
  //     title: initialValues?.title,
  //     description: initialValues?.description,
  //   });
  // }, [form, initialValues]);

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
    if (!confirm(DEFAULT_MESSAGE_KR.alert.confirm)) {
      return;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        defaultValue={initialValues?.title}
        {...register("title", {
          required: {
            value: true,
            message: DefaultValidationMessage.REQUIRED,
          },
        })}
      />
      <Textarea
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
      />
      <Button type="submit">{initialValues ? "Update" : "Create"}</Button>
    </form>
  );
}
