import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "black"}}>
          <Typography variant="h5" textAlign="start" component="div" sx={{ flexGrow: 1 }}>
            MarketSentiment
          </Typography>
          <ConnectButton accountStatus="address"></ConnectButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
