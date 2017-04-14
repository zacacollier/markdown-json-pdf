import React from 'react'

const Editor = ({ onChange, value, keyMap }) => (
  <div>
    <SimpleMDE
      onChange={onChange}
      value={value}
      keyMap={keyMap}
    />
  </div>
);


export default Editor;
