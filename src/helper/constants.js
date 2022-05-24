import { createTheme } from "@material-ui/core";

export const numberWithCommas = (val) => {
    return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,",")
}

export const darkTheme = createTheme({
    palette: {
      primary:{
        main:'#fff',
      },
      type:'dark'
    },
  });

  export const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];