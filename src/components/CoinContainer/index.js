import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Coin from "../Coin";
import useTotalTicker from "../../hooks/useTotalTicker";
import AddTickerModal from "../AddTickerModal";
import useAddress from "../../hooks/useAddress";

const CoinContainer = () => {
  const { tickers } = useTotalTicker();
  const { isOwner, isConnected } = useAddress();
  // console.log(Math.round(Number(tickers)), "totalTicker");
  return (
    <>
      {isConnected ? (
        <Typography
          variant="body1"
          color="white"
          component="div"
          sx={{ margin: "25px" }}
        >
          What do you think where these tokens are going up or down?
        </Typography>
      ) : (
        <Typography
          variant="body1"
          color="white"
          component="div"
          sx={{ margin: "25px" }}
        >
          Connect Wallet to Continue
        </Typography>
      )}
      {isOwner ? <AddTickerModal /> : null}
      <Grid container spacing={0}>
        {Array(Math.round(Number(tickers)))
          ?.fill(0)
          ?.map((ticker, i) => (
            <Coin key={i} id={i} />
          ))}
      </Grid>
    </>
  );
};

export default CoinContainer;
