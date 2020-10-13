export default {
  root: {
    backgroundColor: "blue", 
    height: "100vh", 
    display: "flex", 
    alignItems: "flex-start", 
    justifyContent: "center", 
  }, 
  container: {
    width: "50%", 
    display: "flex", 
    alignItems: "flex-start", 
    flexDirection: "column", 
    flexWrap: "wrap", 
  }, 
  nav: {
    display: "flex", 
    width: "100%", 
    justifyContent: "space-between", 
    color: "white", 
    alignItems: "center", 
    "& a": {
      color: "white", 
      textDecoration: "none", 
      border: "1px solid white", 
      borderRadius: "5px", 
      padding: "0.5rem", 
    }
  }, 
  pallettes: {
    boxSizing: "border-box", 
    width: "100%", 
    display: "grid", 
    gridTemplateColumns: "repeat(3, 30%)", 
    gridGap: "5%",
  },
}; 