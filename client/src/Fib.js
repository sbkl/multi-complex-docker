import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  async function fetchValues() {
    const { data: fetchedValues } = await axios.get("/api/values/current");
    setValues(fetchedValues);
  }

  async function fetchIndexes() {
    const { data: fetchedSeenIndexes } = await axios.get("/api/values/all");
    setSeenIndexes(fetchedSeenIndexes);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("/api/values", {
      index,
    });

    setIndex("");
  }

  const renderSeendIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(",");
  };

  const renderCalculatedValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen</h3>
      {renderSeendIndexes()}
      <h3>Calculated values:</h3>
      {renderCalculatedValues()}
    </div>
  );
};

export default Fib;
