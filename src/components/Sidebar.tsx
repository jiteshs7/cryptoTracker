import React, { FC } from "react";
import { Avatar, Button, Drawer } from "@material-ui/core";

import { CryptoState } from "../helper/CryptoContext";
import { createStyles, makeStyles } from "@material-ui/styles";
import { signOut } from "firebase/auth";
import { auth, db } from "../helper/firebase";
import { numberWithCommas } from "../helper/constants";
import { doc, setDoc } from "firebase/firestore";
import DeleteIcon from "../assets/DeleteIcon";
import { CoinProps } from "../helper/Interfaces";

type SidebarProp = {
  right: boolean;
};

const Sidebar: FC = () => {
  const useStyles = makeStyles(() =>
    createStyles({
      container: {
        width: 380,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Montserrat",
      },
      btn: {
        backgroundColor: "#EEBC1D",
        color: "#000",
        fontWeight: "bold",
        fontSize: 14,
        "&:hover": {
          backgroundColor: "gold",
          fontWeight: "600",
        },
      },
      avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
      },
      dataContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        height: "90%",
        paddingBottom: 10,
      },
      profilePic: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
      },
      name: {
        width: "100%",
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bolder",
        wordWrap: "break-word",
      },
      watchList: {
        flex: 1,
        width: "100%",
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
        overflow: "scroll",
      },
      coin: {
        display: "flex",
        background: "#EEBC1D",
        color: "#000",
        alignItems: "center",
        justifyContent: "space-between",
        wordWrap: "break-word",
        padding: 10,
        boxShadow: "0 0 3px #000",
        width: "100%",
        "&:hover": {
          backgroundColor: "#EEBC1D",
          fontWeight: "600",
        },
      },
      noCoins: {
        color: "darkgray",
        fontSize: 14,
      },
    })
  );

  const [state, setState] = React.useState<SidebarProp>({
    right: false,
  });

  const { user, setAlert, watchList, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const classes = useStyles();

  const handleLogout = () => {
    signOut(auth);

    setAlert({
      open: true,
      message: "Signed out!",
      type: "success",
    });

    toggleDrawer("right", false);
  };

  const removeFromWatchList = async (coin: CoinProps) => {
    if (!user) return;
    const coinRef = doc(db, "watchList", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((list: string) => list !== coin?.id),
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} removed from the watch list!`,
        type: "warning",
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const watchListUI =
    watchList.length > 0 ? (
      coins.map((coin: CoinProps) => {
        if (watchList.includes(coin?.id)) {
          return (
            <div key={coin?.id} className={classes.coin}>
              <span>{coin.name}</span>

              <span>
                {symbol}
                {numberWithCommas(coin?.current_price.toFixed(2))}
              </span>
              <DeleteIcon
                style={{ cursor: "pointer" }}
                data-testid={`delete${coin.name}`}
                onClick={() => removeFromWatchList(coin)}
              />
            </div>
          );
        }
        return null;
      })
    ) : (
      <span className={classes.noCoins}>No coins added in watch list</span>
    );

  if (!user || !Object.keys(user).length) return <div>Loading...</div>;

  return (
    <div>
      <Avatar
        alt={user?.displayName || user?.email!}
        onClick={toggleDrawer("right", true)}
        src={user?.photoURL ? user.photoURL : ""}
        data-testid="avatar"
        className={classes.avatar}
      />
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <div className={classes.container}>
          <div className={classes.dataContainer}>
            <Avatar
              onClick={toggleDrawer("right", true)}
              src={user?.photoURL ? user.photoURL : ""}
              alt={user?.displayName || user?.email!}
              className={classes.profilePic}
            />
            <span className={classes.name}>
              {user?.displayName || user?.email}
            </span>

            <div className={classes.watchList}>
              <span style={{ fontSize: 15, textShadow: "0 0 5px #000" }}>
                Watchlist
              </span>
              {watchListUI}
            </div>
          </div>

          <Button
            variant="contained"
            size="large"
            className={classes.btn}
            // style={{ backgroundColor: "#EEBC1D" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
export default Sidebar;
