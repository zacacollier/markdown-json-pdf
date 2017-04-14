import React  from 'react';
import { connect } from 'react-redux';
import { upperFirst } from 'lodash/string'
import SimpleMDE from 'react-simplemde-editor'
import Editor from './Editor';
import * as A from './actions'
import './vendor.css';

const App = ({
  // State-to-Props
  editorAlert, editorValue,
  // Dispatch-to-Props
  handleAlert, handleChange, handleSave
}) => (
  <form
    className='container container-narrow'
    value={editorValue}
    onSubmit={(event, value) => {
      event.preventDefault();
      editorValue ? handleSave(editorValue) : handleAlert()
    }}
  >
    <SimpleMDE
      onChange={(editorValue) => handleChange(editorValue)}
      value={editorValue}
      options={{
        autofocus: true,
      }}
    />
    { editorValue ? '' : <p>{editorAlert}</p> }
    <button type="submit">
      Save as '.md'
    </button>
  </form>
);

const mapStateToProps = (state) => ({
  editorAlert: state.editor.editorAlert,
  editorValue: state.editor.editorValue,
})
const mapDispatchToProps = (dispatch) => ({
  handleAlert: (editorAlert) => dispatch({ type: 'EDITOR_ALERT', editorAlert: "We wouldn't want to save an empty file, now would we?"}),
  handleChange: (editorValue) => dispatch(A.updateEditorValue(editorValue)),
  handleSave:   (editorValue) => dispatch(A.saveMarkdown(editorValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
