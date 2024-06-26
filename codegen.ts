import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../projector/schema.gql",
  documents: "app/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
