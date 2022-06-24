import React, { FC } from "react";
import { Container, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
// import BGBanner from "../../assets/banner.webp";
import Carousel from "./Carousel";

const BGBanner = require("../../assets/banner.webp");

const useStyles = makeStyles(() =>
  createStyles({
    banner: {
      backgroundImage: `url(${BGBanner})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100wh",
    },
    bannerContent: {
      height: 300,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
    },
  })
);

const Banner: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "600",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>

          <Typography
            variant="h6"
            style={{
              color: "darkgray",
              textTransform: "capitalize",
              fontWeight: "300",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Track all cryptos in one go!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
