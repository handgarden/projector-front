import Title from "antd/es/typography/Title";
import FlexBox from "../../../../common/component/FlexBox";
import PresentationForm from "../../component/PresentationForm";
import { graphql } from "../../../../gql";
import { useMutation } from "@apollo/client";
import { CreateProjectInput } from "../../../../gql/graphql";
import { useNavigate } from "react-router-dom";
import useGqlValidationErrorParser from "../../../../common/hook/useGqlValidationErrorParser";
import { ResponseErrorMessage } from "../../../../common/message/ResponseError.message";
import { PROJECT_PATH } from "../../../../router/ProjectRouter";
import useParamPath from "../../../../common/hook/useParamPath";
import { Flex } from "antd";
import LinkButton from "../../../../common/component/LinkButton";

const createProject = graphql(`
  mutation createProject($input: CreateProjectInput!) {
    createProject(project: $input) {
      id
    }
  }
`);

export default function CreatePresentationPage() {
  const navigate = useNavigate();

  const { parse } = useGqlValidationErrorParser();
  const { replaceParamPath } = useParamPath();
  const [create] = useMutation(createProject, {
    onCompleted: (data) => {
      navigate(
        replaceParamPath(PROJECT_PATH.details, {
          projectId: data.createProject.id,
        })
      );
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
    <FlexBox layout="vertical" style={{ padding: "1rem" }}>
      <Flex>
        <Title level={2}>Presentation 생성</Title>
      </Flex>
      <PresentationForm
        onSubmit={(data: CreateProjectInput) => {
          create({ variables: { input: data } });
        }}
      />
      <div style={{ width: "100%" }}>
        <LinkButton
          to={PROJECT_PATH.create}
          type="primary"
          style={{ width: "100%" }}
        >
          Cancel
        </LinkButton>
      </div>
    </FlexBox>
  );
}

