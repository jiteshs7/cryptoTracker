import { createTheme } from "@material-ui/core";

export const numberWithCommas = (val) => {
  if (val === null) return 0;
  return parseFloat(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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