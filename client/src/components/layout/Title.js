const Title = () => {
  const styles = getStyles();
  return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>;
};

const getStyles = () => ({
  title: {
    fontSize: "20px",
    padding: "15px",
    paddingBottom: "30px",
    marginBottom: "50px",
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",    
    textAlign: "center", 
    borderBottom: "1px solid #ccc",
    width: "100%",
  },
});

export default Title;
