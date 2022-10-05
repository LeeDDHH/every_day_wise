"use strict";

import Link from "next/link";
import Image from "next/image";
import { useState, memo } from "react";
import { Tooltip, IconButton, Menu, MenuItem, Typography, Box } from "@mui/material";

import { headerLinkNameList } from "../lib/Const";
import LightBulb from "../public/light_bulb.svg";

const IconWithMenu = memo(() => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = headerLinkNameList.map((link) => (
    <Link key={`link-${link.name}`} href={link.path}>
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography textAlign="center">{link.name}</Typography>
      </MenuItem>
    </Link>
  ));

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Link">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Image width="30px" height="30px" src={LightBulb} alt="open list" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItems}
      </Menu>
    </Box>
  );
});

IconWithMenu.displayName = "IconWithMenu";

export { IconWithMenu };
