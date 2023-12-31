import React from "react";
import { useState } from "react";
function Folder({ data, setData }) {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const handleAdd = (e, folder) => {
    setShow(true);
    setShowInput({ visible: true, isFolder: folder });
  };
  function addByTree(data, folderId, isFolder, name) {
    if (data.id == folderId && data.isFolder) {
      data.items.unshift({
        id: new Date().getTime(),
        name: name,
        isFolder: isFolder,
        items: [],
      });
      return;
    }
    data.items.map((item) => {
      return addByTree(item, folderId, isFolder, name);
    });
  }

  const onAdd = (e) => {
    if (e.key === "Enter" && e.target.value) {
      // folder id = data.id
      // name = e.target.value
      // isFolder = showinput.isFolder
      e.preventDefault();
      e.target.blur();
      console.log(e, data.id, showInput.isFolder);
      addByTree(data, data.id, showInput.isFolder, e.target.value);
    }
  };
  if (data.isFolder) {
    return (
      <div>
        <div id={data.id} className="root-folder">
          <span className="folder" onClick={() => setShow(!show)}>
            📁{data.name}
          </span>
          <div>
            <button onClick={(e) => handleAdd(e, true)}>Folder+</button>
            <button onClick={(e) => handleAdd(e, false)}>File+</button>
          </div>
        </div>
        {showInput.visible && (
          <div className="input-container">
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              className="input-container__input"
              autoFocus
              onKeyDown={(e) => onAdd(e)}
              onBlur={() => setShowInput({ ...showInput, visible: false })}
            />
          </div>
        )}
        {show && (
          <div className="nested-folder">
            {data.items.map((exp) => {
              return <Folder data={exp} setData={setData} key={exp.id} />;
            })}
          </div>
        )}
      </div>
    );
  } else {
    return <span id={data.id}>📄{data.name}</span>;
  }
}
export default Folder;
