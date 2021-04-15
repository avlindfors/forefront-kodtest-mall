import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AddShoeSize from "./AddShoeSize";

ReactDOM.render(
  <React.StrictMode>
    <AddShoeSize
      sizes={[
        { size: "XS", name: "extra small", country: "SE" },
        { size: "SM", name: "small", country: "US_CHILD", from: "SWEDEN" },
        { size: "LG", name: "large", country: "SE", from: "SWEDEN" },
      ]}
      people={[
        {
          name: "Linda",
          lastName: "Person",
          country: "SWEDEN",
          shoeSize: "sm",
        },
        { name: "Peter", lastName: "Svensson", country: "SWEDEN" },
      ]}
      email={"shoes@sizes.com"}
      maxNumberOfPeople={1}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
