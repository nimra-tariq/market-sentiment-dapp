import { Box, Button, Grid, Typography } from "@mui/material";
import useTicker from "../../hooks/useTicker";
import React, { useEffect, useState } from "react";
import useGetVote from "../../hooks/useGetVote";
import useVote from "../../hooks/useVote";
import InfoModal from "../InfoModal/index";

const Coin = ({ id }) => {
  const { ticker } = useTicker(id);
  const { _up, _down } = useGetVote(ticker);
  const [percentage, setPercentage] = useState(0);
  const [color, setcolor] = useState("blue");
  const [modalShow, setModalShow] = useState(false);
  const { vote, error } = useVote(ticker, true);

  // console.log(_up, _down, ticker, "ticker");
  // console.log(error, "error message");

  useEffect(() => {
    setPercentage(Math.round((_up / (_up + _down)) * 100) || 0);
    percentage > 70
      ? setcolor("blue")
      : percentage >= 50
      ? setcolor("green")
      : setcolor("red");
  }, [_up, _down, percentage]);

  return (
    <>
      <Grid item lg={4} md={6} xs={12}>
        <Box
          elevation={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
            component="div"
            color="white"
            fontWeight="bold"
            variant="h4"
            sx={{ margin: "20px" }}
          >
            {ticker}
          </Typography>
          <Box
            sx={{
              border: "4px solid black",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "Black",
              boxShadow: `0 0 20px ${color}`,
            }}
          >
            <Box
              sx={{
                position: "relative",
                right: "30%",
                width: "160%",
                height: "160%",
                marginTop: `${100 - percentage}%`,
                boxShadow: `0 0 20px ${color}`,
                backgroundColor: color,
                transformOrigin: "50% 50%",
                borderRadius: "78% 56%",
                animation: "spin 5s infinite linear",
                // backgroundColor: "Black",
                "@keyframes spin": {
                  "100%": {
                    transform: "rotate(360deg)",
                  },
                },
              }}
            ></Box>
            <Typography
              variant="h4"
              component="div"
              sx={{
                position: "absolute",
                color: "white",
                textAlign: "center",
                top: "75px",
                width: "100%",
              }}
            >
              {`${percentage}%`}
            </Typography>
          </Box>
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ margin: "25px" }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => vote(true)}
            >
              Up
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => vote(false)}
            >
              down
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setModalShow(true)}
            >
              Token Info
            </Button>
            <InfoModal
              ticker={ticker}
              show={modalShow}
              _down={_down}
              _up={_up}
              onHide={() => setModalShow(false)}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Coin;
