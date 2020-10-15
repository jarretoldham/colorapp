import sizes from './sizes'; 
import background from './background.svg'; 

export default {
  root: {
    /* background by svgbackgrounds.com */ 
    backgroundColor: "#fffffff",
    backgroundImage: `url(${background})`,  
    height: "100vh", 
    display: "flex", 
    alignItems: "flex-start", 
    justifyContent: "center", 
    overflow: 'scroll', 
  }, 
  container: {
    width: "50%", 
    display: "flex", 
    alignItems: "flex-start", 
    flexDirection: "column", 
    flexWrap: "wrap", 
    [sizes.down('xl')]: {
      width: '80%', 
    }, 
    [sizes.down('lg')]: {
      width: '70%', 
    }, 
    [sizes.down('md')]: {
      width: '75%', 
    }, 
    [sizes.down('xs')]: {
      width: '70%', 
    }, 
  }, 
  nav: {
    display: "flex", 
    width: "95%", 
    justifyContent: "space-between", 
    color: "black", 
    alignItems: "center", 
    "& a": {
      color: "black", 
      backgroundColor: "#ffffff", 
      textDecoration: "none", 
      border: "1px solid black", 
      borderRadius: "5px", 
      padding: "0.5rem", 
      transition: "all 70ms ease-in-out", 
    }, 
    "& a:hover": {
      transform: "scale(1.01)", 
    }
  }, 
  palettes: {
    boxSizing: "border-box", 
    width: "100%", 
    display: "grid", 
    gridTemplateColumns: "repeat(3, 30%)", 
    gridGap: "1.5rem",
    [sizes.down('md')]: {
      gridTemplateColumns: "repeat(2, 50%)", 
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: "repeat(1, 100%)", 
      gridGap: "1rem", 
    }, 
  },
  "@global": {
    ".fade-exit": {
      opacity: '1', 
    }, 
    ".fade-exit-active": {
      opacity: '0', 
      transition: 'opacity 300ms ease-out', 
    }, 
  }, 
}; 