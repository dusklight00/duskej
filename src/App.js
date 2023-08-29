import React, { useState } from "react";
import "./App.css";
import TagView from "./TagView";

const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" },
      ],
    },
    { name: "child2", data: "c2 World" },
  ],
};

function App() {
  const [tree, setTree] = useState(initialTree);

  const recursiveFindTag = (tree, name) => {
    if (tree.hasOwnProperty("name") && tree.name === name) {
      return tree;
    }
    if (tree.hasOwnProperty("children")) {
      for (const child of tree.children) {
        const foundTag = recursiveFindTag(child, name);
        if (foundTag != null) {
          return foundTag;
        }
      }
    }
    return null;
  };

  const recursiveUpdateData = (tree, name, data) => {
    const tag = recursiveFindTag(tree, name);
    if (tag != null) {
      tag.data = data;
      return true;
    }
  };

  const recursiveAddChild = (tree, name) => {
    const tag = recursiveFindTag(tree, name);
    const children = tag.children ? tag.children : null;
    const numChildren = children != null ? children.length : 0;
    const dummyData =
      `${name}-child${numChildren + 1}`.replaceAll("child", "c") + " Hello";
    if (tag != null) {
      if (children == null) {
        tag.children = [];
      }
      tag.children.push({
        name: `${name}-child${numChildren + 1}`,
        data: dummyData,
      });
      return true;
    }
  };

  const recursiveUpdateTagName = (tree, name, newName) => {
    const updatedTree = JSON.parse(JSON.stringify(tree)); // Deep clone
    const tag = recursiveFindTag(updatedTree, name);
    if (tag != null) {
      tag.name = newName;
      setTree(updatedTree);
      setTimeout(() => {
        console.log(updatedTree);
      }, 1000);
      return true;
    }
    return false;
  };

  const updateTag = (tag, newData) => {
    const updatedTree = JSON.parse(JSON.stringify(tree)); // Deep clone
    recursiveUpdateData(updatedTree, tag.name, newData);
    setTree(updatedTree);
  };

  const addChildTag = (parentTagName) => {
    const updatedTree = JSON.parse(JSON.stringify(tree)); // Deep clone
    recursiveAddChild(updatedTree, parentTagName);
    setTree(updatedTree);
  };

  const updateTagName = (tag, newName) => {
    const updatedTree = JSON.parse(JSON.stringify(tree)); // Deep clone
    recursiveUpdateTagName(updatedTree, tag.name, newName);
    setTree(updatedTree);
  };

  return (
    <div className="App">
      <TagView
        tag={tree}
        onUpdate={updateTag}
        onAddChild={addChildTag}
        onUpdateTagName={updateTagName}
      />
      <button onClick={() => console.log(JSON.stringify(tree))}>Export</button>
    </div>
  );
}

export default App;
