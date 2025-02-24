import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React, { useState } from "react";

import { MyResponseAreaTub } from "../components/Matrix";
import { wrapInput } from "./input-wrapper";
import { IModularResponseSchema } from "@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema";

const initialiseMatrix = (args: any): React.FC<any> => {
  return () => {
    const [response, _] = useState<IModularResponseSchema | null>(() => {
      const storedResponse = sessionStorage.getItem("wizard.input");
      if (storedResponse) {
        try {
          const parsedResponse: IModularResponseSchema = JSON.parse(storedResponse);
          return parsedResponse && parsedResponse.config
            ? parsedResponse
            : null;
        } catch {
          return null; // Return null if JSON parsing fails
        }
      }
      return null;
    });

    const matrix = new MyResponseAreaTub();
    if (response && response.config) {
      // @ts-ignore
      matrix.config = response.config;
    } else {
      matrix.initWithDefault();
    }

    return matrix.InputComponent({
      ...args,
      handleChange: (val: IModularResponseSchema) => {
        sessionStorage.setItem("student.input", JSON.stringify(val));
      }
    });
  };
};

const InputMeta = {
  title: "Input",
  parameters: {
    layout: "centered",
  },
  args: {
    handleChange: (val: IModularResponseSchema) => {
      sessionStorage.setItem("student.input", JSON.stringify(val));
    },
    handleSubmit: fn(),
  },
} satisfies Meta;

const WrappedInput: React.FC<any> = wrapInput(initialiseMatrix(InputMeta.args));

export default {
  ...InputMeta,
  component: WrappedInput,
  render: (args: any) => <WrappedInput {...args} />,
};

type Story = StoryObj<typeof WrappedInput>;
export const Default: Story = {};
