"use strict";

import Image from "next/image";
import { IconButton, Box, Typography } from "@mui/material";

import { makeTwitterWebIntentUrl } from "../lib/twitterWebIntent";

import { allElementCenterStyle } from "../lib/muiStyle";

import TwitterWhite from "../public/twitter_white.svg";

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent

type TwitterIntentTweetProps = {
  text?: string;
  url?: string;
  hashtags?: string[];
  via?: string;
  related?: string[];
  in_reply_to?: string;
};

const TwitterShareButton = ({
  text,
  url,
  hashtags,
  via,
  related,
  in_reply_to,
}: TwitterIntentTweetProps) => {
  const _url = makeTwitterWebIntentUrl({ text, url, hashtags, via, related, in_reply_to });

  const twitterShareClickHandler = () => {
    window.open(_url);
  };

  return (
    <IconButton onClick={twitterShareClickHandler}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "140px",
          height: "40px",
          backgroundColor: "#1E8DEE",
          borderRadius: "5px",
        }}
      >
        <Box sx={allElementCenterStyle}>
          <Image src={TwitterWhite} alt="twitter share button icon" width="20px" height="20px" />
        </Box>
        <Box sx={{ ...allElementCenterStyle, color: "#FFFFFF" }}>
          <Typography display="inline-block">シェアする</Typography>
        </Box>
      </Box>
    </IconButton>
  );
};

if (process.env.NODE_ENV === "development") {
  TwitterShareButton.displayName = "TwitterShareButton";
}

export { TwitterShareButton };
