import { saveState } from './localStorage';
import FileSaver from 'file-saver';

export const updateEditorValue = (editorValue) => {
  saveState(editorValue)
  return { type: 'EDITOR_CHANGE', editorValue }
}

// TODO: implement compatibility-detection between browsers
// have a look at console.log(window.navigator.userAgent)
export const saveMarkdown = (editorValue) => {
  const fileMd = new Blob([editorValue], { type: "text/plain;charset=utf-8" })
  return async (dispatch) => {
    try {
      dispatch({ type: 'REQUEST_EDITOR_SAVE', editorValue })
      const save = await FileSaver.saveAs(fileMd, "file.md")
      if (save) {
        dispatch({ type: 'EDITOR_SAVE_SUCCESS' })
      }
    }
    catch (err) {
      dispatch({ type: 'EDITOR_SAVE_ERROR', err })
    }
  }
}
