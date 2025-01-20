import React, { Fragment, memo, useCallback, useState } from "react";
import { Result } from "src/types";
import { AddonPanel } from "storybook/internal/components";
import { Button, Placeholder, TabsState } from "storybook/internal/components";
import { useChannel } from "storybook/internal/manager-api";
import { styled, useTheme } from "storybook/internal/theming";

import { EVENTS } from "../constants";
import { Local } from "./Local";
import { Remote } from "./Remote";

interface PanelProps {
  active: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props) {
  const theme = useTheme();

  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [{ divs, styled }, setState] = useState<Result>({
    divs: [],
    styled: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      setState(newResults);
    },
  });

  const fetchData = useCallback(() => {
    emit(EVENTS.REQUEST);
  }, [emit]);

  return (
    <AddonPanel {...props}>
      <TabsState
        initial="remote"
        backgroundColor={theme.background.hoverable}
      >
        <div id="remote" title="Remote" color={theme.color.positive}>
          <Remote />
        </div>
        <div
          id="local"
          title={`Local`}
          color={theme.color.negative}
        >
          <Local />
        </div>
      </TabsState>
    </AddonPanel>
  );
});
