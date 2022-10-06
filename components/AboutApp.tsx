"use strict";

import Link from "next/link";
import { memo } from "react";
import { Box, Typography } from "@mui/material";

const AboutApp = memo(() => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" gutterBottom>
          アプリについて
        </Typography>
        <Typography variant="h5">毎日名言・格言を1つ表示します</Typography>
        <Typography gutterBottom>※日付が変わったら、他の名言・格言を表示します</Typography>
        <Typography variant="h5" gutterBottom>
          全体の名言・格言が見たい場合は<Link href="/wiseList">こちら</Link>から見れます
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "5vh" }}>
          アプリに関するお問い合わせは<a href="https://twitter.com/camomile_cafe">Twitter</a>
          もしくは、<a href="mailto:niche3600@gmail.com">メール</a>で お願いします
        </Typography>
        <Typography variant="h2" gutterBottom>
          作った人について
        </Typography>
        <Typography variant="h5" gutterBottom>
          都内でエンジニアをしています
        </Typography>
        <Link href="https://github.com/LeeDDHH">Github</Link>
        <Link href="https://twitter.com/camomile_cafe">Twitter</Link>
      </Box>
    </Box>
  );
});

if (process.env.NODE_ENV === "development") {
  AboutApp.displayName = "AboutApp";
}

export { AboutApp };
