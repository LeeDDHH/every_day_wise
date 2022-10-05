"use strict";

import { memo, useMemo } from "react";
import { Card, CardContent, Typography } from "@mui/material";

import { CardBreakPointTextSize } from "../components/CardBreakPointTextSize";

type Props = { text: string };

const WiseCard = memo(({ text }: Props) => {
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
  return (
    <Card
      variant="outlined"
      sx={{
        width: "70vw",
        padding: "5vw",
        borderRadius: "15px",
      }}
    >
      {view}
    </Card>
  );
});

WiseCard.displayName = "WiseCard";

export { WiseCard };
