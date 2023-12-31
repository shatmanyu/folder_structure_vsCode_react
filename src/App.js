import "./App.css";
import React from "react";
import { useState } from "react";
import explorer from "./data/data.js";
import Folder from "./components/Folder.js";
export default function App() {
  const [data, setData] = useState(explorer);
  console.log({ data });
  return (
    <div className="App">
      <Folder data={data} setData={setData} />
    </div>
  );
}
