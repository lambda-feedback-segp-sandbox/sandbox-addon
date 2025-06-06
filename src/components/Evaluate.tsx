import React, { useState } from "react";
import { Form } from "./Form";
import axios from "axios";
import { color, typography } from "storybook/internal/theming";
import { useArgs } from '@storybook/manager-api';

function parseStoredString(responseString: string): string | any[] | object {
  if (!responseString) {
    return "";
  }
  const firstChar = Array.from(responseString)[0];
  switch (firstChar) {
    case "[":
      return eval(responseString);
    case "{":
      return JSON.parse(responseString);
    case "\\":
      return responseString.substring(1);
    case "\"":
      return responseString.substring(1, responseString.length - 1);
    default:
      return responseString;
  }
}

export function Evaluate() {
  const [response, updateResponse] = useState<string>("");
  const [args, updateArgs, resetArgs] = useArgs();

  async function evaluate(url: string, params: JSON) {
    // Check if sessionStorage items exist before parsing
    const wizardInput = sessionStorage.getItem("wizard.input");
    const studentInput = sessionStorage.getItem("student.input");

    // Safely parse the wizard input if it exists, otherwise use a fallback value
    let answer: string | object = ""; // Default value for answer

    try {
      const wizardInput = sessionStorage.getItem("wizard.input");

      // Safely parse the wizard input if it exists, otherwise use a fallback value
      answer = wizardInput ? JSON.parse(wizardInput).answer : "";
    } catch (error) {}

    // Safely parse the student input if it exists, otherwise use a fallback value
    const response = studentInput ? parseStoredString(studentInput) : ""; // Fallback value if student.input is null

    console.log("remote eval");
    console.log("url", url);
    console.log("answer:", answer);
    console.log("params:", params);
    console.log("response", response);

    const request = {
      url: url,
      response: response,
      answer: answer,
      params: params,
    };

    const res = await axios.post("http://localhost:3070", request);
    console.log(res);
    updateResponse(JSON.stringify(res.data));

    const feedback = {
      isCorrect: res.data.result.is_correct,
      isError: res.data.result.is_error ?? false,
      feedback: (res.data.result.is_correct ? "Correct" : "Incorrect")
        + (res.data.result.feedback ? "\n" + res.data.result.feedback : ""),
      color: res.data.result.is_correct ? "green" : "red",
    };
    updateArgs({ feedback: feedback });
  }

  return (
    <div style={evaluateStyles.mainDiv}>
      <div style={{ width: "100%", display: "table" }}>
        <div style={{ display: "table-row" }}>
          <div style={evaluateStyles.halfDiv}>
            <Form evalFunc={evaluate}></Form>
          </div>
          <div style={evaluateStyles.halfDiv}>
            <table>
              <tr>
                <td style={evaluateStyles.labelColumn}>
                  <label>Response JSON:</label>
                </td>
                <td style={evaluateStyles.inputColumn}>
                  <p style={evaluateStyles.responseInput}>
                    {response.length ? response : "..."}
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const evaluateStyles = {
  mainDiv: {
    padding: "20px",
    fontFamily: typography.fonts.base,
  },
  headDiv: {
    padding: "10px",
  },
  halfDiv: {
    width: "50%",
    height: "100%",
    display: "table-cell",
    padding: "20px",
    verticalAlign: "top",
  },
  responseInput: {
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: color.dark,
    backgroundColor: color.darkest,
    padding: "5px",
    margin: "0px 10px 5px 15px",
    color: "white",
    fontFamily: typography.fonts.mono,
    verticalAlign: "top",
  },
  labelColumn: {
    fontFamily: "inherit",
    fontWeight: typography.weight.bold,
    whiteSpace: "nowrap",
    verticalAlign: "top",
    padding: "5px 0px",
    height: "100%",
  },
  inputColumn: {
    fontFamily: typography.fonts.mono,
    fontWeight: typography.weight.regular,
    width: "100%",
  },
};
