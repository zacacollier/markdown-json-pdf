import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

const Editor = ({ onChange, value }) => (
  <div>
    <SimpleMDE
      onChange={onChange}
      value={value}
    />
  </div>
);


export default Editor;
