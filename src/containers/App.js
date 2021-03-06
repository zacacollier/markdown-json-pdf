import React  from 'react';
import { connect } from 'react-redux';
import Editor from './Editor';
import * as A from '../actions'
import '../styles/vendor.css';

const App = ({
  editorAlert, editorValue,
  handleAlert, handleChange, handleSave, handleConvert
}) => (
  <form
    className='container container-narrow'
    value={editorValue}
    onSubmit={(event, value) => {
      event.preventDefault();
      editorValue ? handleSave(editorValue) : handleAlert()
    }}
  >
    <Editor />
    { editorValue ? '' : <p>{editorAlert}</p> }
    <button type="submit">
      Save '.md' and '.html'
    </button>
  </form>
);

const mapStateToProps = (state) => ({
  editorAlert: state.editor.editorAlert,
  editorValue: state.editor.editorValue,
})
const mapDispatchToProps = (dispatch) => ({
  handleAlert: (editorAlert) => dispatch({ type: 'EDITOR_ALERT', editorAlert: "We wouldn't want to save an empty file, now would we?"}),
  handleConvert: (editorValue) => dispatch(A.saveMarkdownToHtml),
  handleChange: (editorValue) => dispatch(A.updateEditorValue(editorValue)),
  handleSave:   (editorValue) => dispatch(A.saveMarkdown(editorValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
