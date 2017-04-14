import React  from 'react';
import { connect } from 'react-redux';
import { upperFirst } from 'lodash/string'
import SimpleMDE from 'react-simplemde-editor'
// import Editor from './Editor';
import * as A from './actions'
import './vendor.css';

const App = ({
  // State-to-Props
  editorValue, keyMap, keyMapOptions,
  // Dispatch-to-Props
  handleChange, handleSave, handleSelectKeyMap
}) => (
  <form
    className='container container-narrow'
    value={editorValue}
    onSubmit={(event, value) => {
      event.preventDefault();
      handleSave(editorValue);
    }}
  >
    <select
      name="keyMap"
      defaultValue={keyMap}
      onChange={(e) => handleSelectKeyMap(e.target.value)}
    >
      {
        keyMapOptions.map(o => (
          <option
            key={keyMapOptions.indexOf(o)}
            value={o}
          >
            {upperFirst(o)}
          </option>
        ))
      }
    </select>
    <SimpleMDE
      onChange={(editorValue) => handleChange(editorValue)}
      value={editorValue}
      options={{
        autofocus: true,
        keyMap: keyMap
      }}
    />
    <button type="submit">
      Save as '.md'
    </button>
  </form>
);

const mapStateToProps = (state) => ({
  editorValue: state.editor.editorValue,
  keyMap: state.editor.keyMap,
  keyMapOptions: state.editor.keyMapOptions,
})
const mapDispatchToProps = (dispatch) => ({
  handleChange: (editorValue) => dispatch(A.updateEditorValue(editorValue)),
  handleSave:   (editorValue) => dispatch(A.saveMarkdown(editorValue)),
  handleSelectKeyMap: (value) => dispatch(A.selectKeyMap(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
