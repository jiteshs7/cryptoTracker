import React, { FC } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

interface CustomBtnProp {
  selected: boolean;
  onClick: () => void;
  children?: JSX.Element | string;
}

const CustomBtn: FC<CustomBtnProp> = ({ children, onClick, selected }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      btn: {
        border: "1px solid gold",
        borderRadius: 5,
        cursor: "pointer",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "#000" : "",
        fontWeight: selected ? "bold" : "lighter",
        "&:hover": {
          backgroundColor: "gold",
          color: "#000",
        },
        width: "22%",
      },
    })
  );

  const classes = useStyles();

  return (
    <span className={classes.btn} onClick={onClick}>
      {children}
    </span>
  );
};

export default CustomBtn;
