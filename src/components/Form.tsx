import React, { useEffect, useState, MouseEventHandler } from "react";
import {
  color,
  typography,
  StorybookTheme,
  background,
} from "storybook/internal/theming";

type FormProps = {
  evalFunc: any;
};
export function Form(props: FormProps) {
  const [urlValue, setUrlValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [schemaValue, setSchemaValue] = useState("");
  interface ChangeEvent {
    target: {
      value: string;
    };
  }
  const handleUrlChange = (event: ChangeEvent) => {
    setUrlValue(event.target.value);
  };
  const handleSchemaChange = (event: ChangeEvent) => {
    setSchemaValue(event.target.value);
  };

  const createEvalButton = () => (
    <button
      type="button"
      style={formStyles.evalButton}
      onClick={(e) => {
        e.preventDefault();
        props.evalFunc(urlValue, JSON.parse(schemaValue));
      }}
    >
      Test Evaluation Function (with Student View input)
    </button>
  );

  const createRow = (text: string, inputElem: React.JSX.Element) => (
    <tr>
      <td style={formStyles.labelColumn}>
        <label>{text}</label>
      </td>
      <td style={formStyles.inputColumn}>{inputElem}</td>
    </tr>
  );

  window.addEventListener("storage", () => {
    setAnswer(JSON.stringify(JSON.parse(localStorage.getItem("wizard.input")).answer));
  })

  return (
    <div style={formStyles.topLevelDiv}>
      <table>
        {createRow(
          "Evaluation Function URL:",
          <input
            style={formStyles.inputArea}
            type="url"
            value={urlValue}
            onChange={handleUrlChange}
          />
        )}
        {createRow(
          "Answer:",
          <textarea
            style={formStyles.inputArea}
            value={answer}
            onChange={(_) => {}}
          />
        )}
        {createRow(
          "Parameters JSON:",
          <textarea
            style={formStyles.inputArea}
            value={schemaValue}
            onChange={handleSchemaChange}
          />
        )}
      </table>
      {createEvalButton()}
    </div>
  );
}

const formStyles = {
  topLevelDiv: {
    fontFamily: typography.fonts.base,
    fontWeight: typography.weight.bold,
  },
  inputArea: {
    width: "100%",
    padding: "5px",
    fontFamily: "inherit",
    fontWeight: typography.weight.regular,
    resize: "vertical",
    margin: "0px 10px 5px 15px",
  },
  labelColumn: {
    fontFamily: "inherit",
    fontWeight: typography.weight.bold,
    whiteSpace: "nowrap",
    width: "1%",
    verticalAlign: "top",
    padding: "5px 0px",
  },
  inputColumn: {
    fontFamily: typography.fonts.mono,
    fontWeight: typography.weight.regular,
    width: "100%",
  },
  evalButton: {
    fontFamily: "inherit",
    fontWeight: typography.weight.bold,
    width: "100%",
    margin: "10px 0px 0px 10px",
    padding: "10px",
    backgroundColor: color.primary,
    color: "white",
  },
};
