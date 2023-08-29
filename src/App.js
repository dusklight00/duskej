import React, { useState } from 'react'
import './App.css'
import TagView from './TagView'

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
}

function App() {
  const [tree, setTree] = useState(initialTree)

  const updateTag = (tagName, newName, newData) => {
    const updatedTree = JSON.parse(JSON.stringify(tree)) // Deep clone
    // Update the tag name or data
    // ...

    setTree(updatedTree)
  }

  const addChildTag = (parentTagName) => {
    const updatedTree = JSON.parse(JSON.stringify(tree)) // Deep clone
    // Add a new child tag
    // ...

    setTree(updatedTree)
  }

  return (
    <div className="App">
      <TagView tag={tree} onUpdate={updateTag} onAddChild={addChildTag} />
      <button onClick={() => console.log(JSON.stringify(tree))}>Export</button>
    </div>
  )
}

export default App
