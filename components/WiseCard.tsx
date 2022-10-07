"use strict";

import { memo, useMemo, ForwardedRef } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import * as CSS from "csstype";

import { CardBreakPointTextSize } from "../components/CardBreakPointTextSize";

type Props = { text: string; style?: CSS.Properties; ref?: ForwardedRef<HTMLDivElement> };

const WiseCard = memo(({ text, style, ref }: Props) => {
  const view = useMemo(() => {
    const displayString = text.replace(/\\n/g, "\n");
    return (
      <CardContent>
        <Typography
          sx={{
            whiteSpace: "pre-wrap",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardBreakPointTextSize>{displayString}</CardBreakPointTextSize>
        </Typography>
      </CardContent>
    );
  }, [text]);

  const cardStyle = {
    width: "70vw",
    padding: "5vw",
    borderRadius: "15px",
  };
  const styles = { ...cardStyle, ...style };
  return (
    <Card variant="outlined" sx={styles} ref={ref}>
      {view}
    </Card>
  );
});

if (process.env.NODE_ENV === "development") {
  WiseCard.displayName = "WiseCard";
}

export { WiseCard };
