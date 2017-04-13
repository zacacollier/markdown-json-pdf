import { saveState } from './localStorage';
import FileSaver from 'file-saver';

export const updateEditorValue = (editorValue) => {
  saveState(editorValue)
  return { type: 'EDITOR_CHANGE', editorValue }
}

// TODO: implement compatibility-detection between browsers
// have a look at console.log(window.navigator.userAgent)
export const saveMarkdown = (editorValue) => {
  const fileMd = new Blob(
    [editorValue],
    { type: "text/plain;charset=utf-8" }
  )
  return (dispatch) => {
    FileSaver.saveAs(fileMd, "file.md")
    dispatch({ type: 'REQUEST_EDITOR_SAVE', editorValue })
  }
}
