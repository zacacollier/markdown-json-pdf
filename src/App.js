import React  from 'react';
import { connect } from 'react-redux';

import Editor from './Editor';
import * as A from './actions'
import './vendor.css';

const App = ({ editorValue, handleChange, handleSave }) => (
  <form
    className='container container-narrow'
    value={editorValue}
    onSubmit={(event, value) => {
      event.preventDefault();
      console.log(editorValue);
      handleSave(editorValue);
    }}
  >
    <Editor
      onChange={(editorValue) => handleChange(editorValue)}
      value={editorValue}
    />
    <button type="submit">
      Save as '.md'
    </button>
  </form>
);

const mapStateToProps = (state) => ({
  editorValue: state.editor.editorValue
})
const mapDispatchToProps = (dispatch) => ({
  handleChange: (editorValue) => dispatch(A.updateEditorValue(editorValue)),
  handleSave:   (editorValue) => dispatch(A.saveMarkdown(editorValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
