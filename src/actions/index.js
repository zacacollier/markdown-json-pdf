import { saveState } from '../constants/localStorage';
import FileSaver from 'file-saver';
import showdown from 'showdown';
const converter = new showdown.Converter()

export const blob = (value) => new Blob([value], { type: "text/plain;charset=utf-8" })

export const updateEditorValue = (editorValue) => {
  saveState(editorValue)
  return { type: 'EDITOR_CHANGE', editorValue }
}

// TODO: implement compatibility-detection between browsers
// have a look at console.log(window.navigator.userAgent)
export const saveMarkdown = (editorValue, fileType = 'md') => {
  const fileMd = blob(editorValue);
  const convertMd = blob(converter.makeHtml(editorValue));
  return async (dispatch) => {
    try {
      dispatch({ type: 'REQUEST_EDITOR_SAVE', editorValue });
      const saveMd = await FileSaver.saveAs(fileMd, `file.${fileType}`);
      const saveHtml = await FileSaver.saveAs(convertMd, 'file.html');
      if (saveMd && saveHtml) {
        dispatch({ type: 'EDITOR_SAVE_SUCCESS' });
      }
    }
    catch (err) {
      dispatch({ type: 'EDITOR_SAVE_ERROR', err });
    }
  }
}

export const saveMarkdownToHtml = (editorValue) => {
  const rawBlob = blob(editorValue);
  return async (dispatch) => {
    try {
      dispatch({ type: 'REQUEST_EDITOR_SAVE', editorValue });
      const convert = await converter.makeHtml(rawBlob);
      const saveHtml = await saveMarkdown(convert, 'html');
      if (saveHtml) {
        dispatch({ type: 'EDITOR_SAVE_SUCCESS'});
      }
    }
    catch (err) {
      dispatch({ type: 'EDITOR_SAVE_ERROR', error: `Convert Error:\n${err}` });
    }
  }
}

export const selectKeyMap = (value) => ({ type: 'EDITOR_SET_KEYMAP', value });
