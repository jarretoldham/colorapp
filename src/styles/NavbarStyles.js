import sizes from './sizes'; 

export default { 
  Navbar: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "flex-start", 
    height: "6vh",
  }, 
  logo: { 
    marginRight: "15px", 
    padding: "0 13px", 
    fontSize: "22px", 
    backgroundColor: "#eceff1",
    fontFamily: "Roboto, sans-serif", 
    height: "100%",
    display: "flex", 
    alignItems: "center",
    "& a": { 
      color: "black", 
      textDecoration: "none", 
    }, 
    [sizes.down('xs')]: {
      display: 'none', 
    }, 
  }, 
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem",
  }, 
  slider: { 
    width: "350px",
    margin: "0 10px", 
    display: "inline-block",
    "& .rc-slider-rail": {
      height: "8px", 
    }, 
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    }, 
    "& .rc-slider-handle, .rc-slider-handle:focus, .rc-slider-handle:active, .rc-slider-handle:hover": 
    {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      outline: "none", 
      border: "2px solid rgba(0, 0, 0, 0.7)",
      boxShadow: "none",
      width: "13px", 
      height: "13px", 
      marginLeft: "-5px",
      marginTop: "-3px",
    }, 
    [sizes.down('sm')]: {
      width: '150px', 
    }, 
  }
}; 