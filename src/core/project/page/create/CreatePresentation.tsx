import Title from "antd/es/typography/Title";
import FlexBox from "../../../../common/component/FlexBox";
import PresentationForm from "../../component/PresentationForm";
import { graphql } from "../../../../gql";
import { useMutation } from "@apollo/client";
import { CreateProjectInput } from "../../../../gql/graphql";
import { useNavigate } from "react-router-dom";
import useGqlValidationErrorParser from "../../../../common/hook/useGqlValidationErrorParser";
import { ResponseErrorMessage } from "../../../../common/message/ResponseError.message";

const createProject = graphql(`
  mutation createProject($input: CreateProjectInput!) {
    createProject(project: $input) {
      id
    }
  }
`);

export default function CreatePresentation() {
  const navigate = useNavigate();

  const { parse } = useGqlValidationErrorParser();
  const [create] = useMutation(createProject, {
    onCompleted: (data) => {
      navigate(`/project/${data.createProject.id}/edit`);
    },
    onError: (error) => {
      const validationMessage = parse(error);
      if (validationMessage) {
        alert(validationMessage);
        return;
      }

      alert(ResponseErrorMessage.INTERNAL_SERVER_ERROR);
    },
  });

  return (
    <FlexBox layout="vertical">
      <Title level={2} style={{ width: "100%", padding: "0 1.5rem" }}>
        Presentation 생성
      </Title>
      <PresentationForm
        onSubmit={(data: CreateProjectInput) => {
          create({ variables: { input: data } });
        }}
      />
    </FlexBox>
  );
}
