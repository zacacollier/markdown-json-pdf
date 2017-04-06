import React  from 'react';
import { connect } from 'react-redux';

import { saveMD } from './saveMD'
import ButtonGroup from './ButtonGroup';
import Editor from './Editor';
import './vendor.css';

const App = ({ value, handleChange, handleSave }) => (
  <div className='container container-narrow'>
    <Editor
      onChange={(editorValue) => handleChange(editorValue)}
      value={value}
    />
    <ButtonGroup
      onClick={(value) => handleSave(value)}
    />
  </div>
);

const mapStateToProps = (state) => ({
  value: state.editor.value
})
const mapDispatchToProps = (dispatch) => ({
  handleChange: (editorValue) => dispatch({ type: 'EDITOR_CHANGE', editorValue }),
  handleSave: (value) => saveMD(value)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
