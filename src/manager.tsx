import React from "react";
import { addons, types } from "storybook/internal/manager-api";

import { Panel } from "./components/Panel";
import { Tab } from "./components/Tab";
import { Tool } from "./components/Tool";
import { ADDON_ID, PANEL_ID, TAB_ID, TOOL_ID } from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, (api) => {
  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "My addon",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => <Panel active={active} />,
  });
});
