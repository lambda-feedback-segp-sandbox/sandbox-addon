import React, { memo, useCallback, useEffect } from "react";
import { useGlobals, type API } from "storybook/internal/manager-api";
import { IconButton } from "storybook/internal/components";
import { ADDON_ID, KEY, TOOL_ID } from "../constants";
import { LightningIcon } from "@storybook/icons";

export const AnswerButton = memo(function MyAddonSelector() {
  const [globals, updateGlobals, storyGlobals] = useGlobals();

  const isLocked = KEY in storyGlobals;
  const isActive = !!globals[KEY];

  function saveAnswer() {
    // window.dispatchEvent(new Event("storage"));
  }

  return (
    <IconButton key={TOOL_ID} title="Save Answer" onClick={saveAnswer}>
      <LightningIcon />
    </IconButton>
  );
});
