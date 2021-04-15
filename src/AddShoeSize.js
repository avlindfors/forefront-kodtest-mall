import { useState } from "react";
import "./styles.css";

const SIZES = {
  xs: "extra small",
  sm: "small",
  md: "medium",
  lg: "large",
};

// A component that shows shoe sizes
export default function AddShoeSize(props) {
  const styleobject = {
    fontSize: "18px",
    marginBottom: "12px",
  };

  let [hideEmail, setHideEmail] = useState(false);
  var [newPeople, setPeople] = useState(props.people);

  var sizes = props.sizes != undefined ? props.sizes : [];
  var people = props.people != undefined ? props.people : [];
  props.people.splice(props.maxNumberOfPeople);

  // Keep track of the number of people in state
  var [numberOfAddPersonClicks, setNumberOfAddPersonClicks] = useState(
    people.length
  );
  var [updateSizes, setUpdateSizes] = useState(sizes);
  var randomShoeSize;

  function alertEmail(email) {
    email.preventDefault();

    let sendEmail = new Promise((resolve) => {
      alert("Sending to: " + props.email);

      resolve("Thank you for getting in touch with us");
    });

    sendEmail.then((data) => {
      setUpdateSizes([
        ...sizes,
        { size: "XL", name: "EXTRA LARGE", origin: "SWEDEN" },
      ]);
      setHideEmail(true);
    });
  }

  const getPerson = async () => {
    // Get random person data from randomuser api
    const data = await fetch("https://randomuser.me/api")
      .then((data) => data.json())
      .then((data) => {
        return data.results[0];
      });
    randomShoeSize = getRandomShoeSize(); // Get a random shoesize

    setPeople([
      ...newPeople,
      {
        name: data.name.first,
        url: data.picture.medium,
        shoeSize: SIZES[randomShoeSize],
        country: data.location.country,
      },
    ]);
  };

  function getRandomShoeSize() {
    const sizes = Object.keys(SIZES);
    console.log(sizes);
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  }

  return (
    <div className="container">
      <main
        className="header"
        id="bigShoeSizesId"
        style={{ fontWeight: "bold" }}
      >
        Shoesizes and people
      </main>
      <section>
        <div style={{ color: "blue", ...styleobject }}>Sizes</div>
        <div>
          {updateSizes.map((item) => {
            let name = item.name;
            return (
              <div className="personListItem">
                <p
                  className="personListItem"
                  style={{ marginBottom: 2 }}
                  key={(Math.random() + 1) * 100}
                >
                  Size: <b>{name}</b>  Country:{" "}
                  {item.from
                    ? item.from
                    : item.origin != null
                    ? item.origin
                    : "unknown"}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <main>
        <div
          className="redHeader"
          style={{ color: "red", ...styleobject, marginBottom: 12 }}
        >
          Some people
        </div>
        <p>There are {numberOfAddPersonClicks} people</p>
        <button
          onClick={() => {
            setNumberOfAddPersonClicks(numberOfAddPersonClicks + 1);
            getPerson(true);
          }}
        >
          Add person
        </button>

        <div style={{ marginTop: "9px" }}>
          {newPeople.map((item) => {
            let name = item.name;
            var key = item.name;
            return (
              <li
                key={key}
                className="personListItem"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <p>{name}</p>
                <p>Size: {item.shoeSize}</p>
                <p>Country: {item.country}</p>
                <Image image={item.url} personName={name} />
              </li>
            );
          })}
        </div>
      </main>
      <aside style={{ display: hideEmail ? "none" : "block" }}>
        <p style={{ color: "green", "font-size": 18, marginBottom: 12 }}>
          Email
        </p>
        <nav>
          <p>Send us an email</p>
          <a href={"mailto:" + props.email} onClick={alertEmail}>
            {props.email}
          </a>
        </nav>
      </aside>
    </div>
  );
}

function Image({ image, personName: alt }) {
  return <img src={image} id="image" alt={`Image of ${alt}`} />;
}
