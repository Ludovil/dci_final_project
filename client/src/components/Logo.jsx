function Logo() {
  return (
    // <a href="/" style={{ marginLeft: "50px" }}>
    //   <img
    //     src="../../public/logo-transparent.jpg"
    //     height="70vh"
    //     width="100vh"
    //     alt=""
    //     box-shadow="3px 3px 5px 6px #ccc"
    //   />
    // </a>
    <a href="/">
      <img
        src="../../public/logo-transparent.png"
        alt=""
        style={{
          width: "100px",
          height: "auto",
          marginLeft: "50px",
        }}
      />
    </a>
  );
}

export default Logo;
