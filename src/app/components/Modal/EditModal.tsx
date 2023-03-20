import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import ModalComponent from './index';
import { useModalSlice } from './slice';
import {
  selectEditModalData,
  selectEditModalOpen,
  selectEditModalSelectedMessageIdx,
} from './slice/selectors';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { languages } from '@codemirror/language-data';
import { selectThemeKey } from 'styles/theme/slice/selectors';
import MarkdownPreview from '@uiw/react-markdown-preview';
import ModalActions from './ModalActions';
import debounce from 'lodash/debounce';
import { useChatOptionsSlice } from 'app/pages/Chat/slice';
import { getMessages } from 'app/pages/Chat/slice/selectors';

function EditModal() {
  const [showPreview, setShowPreview] = React.useState<boolean>(false);
  const { actions } = useModalSlice();
  const chatOptions = useChatOptionsSlice();
  const isOpen = useSelector(selectEditModalOpen);
  const data = useSelector(selectEditModalData);
  const currentMessageIdx = useSelector(selectEditModalSelectedMessageIdx);
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();
  const theme = useSelector(selectThemeKey);

  const saveData = debounce((value: string) => {
    dispatch(actions.setEditModalData(value));
  }, 1000);

  const onClose = () => {
    dispatch(actions.closeEditModal());
    dispatch(
      chatOptions.actions.setMessages(
        messages.map((message, idx) => {
          if (idx === currentMessageIdx) {
            return {
              ...message,
              content: data,
            };
          }
          return message;
        }),
      ),
    );
  };

  const extensions = [
    javascript({ jsx: true }),
    markdown({ base: markdownLanguage, codeLanguages: languages }),
    python(),
    css(),
    html(),
    json(),
    java(),
    EditorView.lineWrapping,
  ];

  const onSelect = (value: number) => {
    if (value === 1) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  };

  // Made this use lodash debounce for saving
  const onChange = React.useCallback(value => {
    saveData(value);
  }, []);

  return (
    <ModalComponent
      isOpen={isOpen}
      modalProps={{ size: 'xl' }}
      open={() => dispatch(actions.openEditModal())}
      close={() => onClose()}
      title="Edit"
      children={
        <Wrapper>
          <ModalActions onSelect={onSelect} />
          {showPreview ? (
            <MarkdownPreview source={data} />
          ) : (
            <ReactCodeMirror
              value={data}
              onChange={onChange}
              className="code-mirror-wrapper"
              extensions={extensions}
              theme={theme === 'dark' ? dracula : 'light'}
              basicSetup={{
                lineNumbers: false,
                autocompletion: false,
              }}
            />
          )}
        </Wrapper>
      }
    />
  );
}

export default EditModal;

const Wrapper = styled.div`
  min-height: 500px;
  overflow: hidden;
  max-width: 80vw;

  .CodeMirror-wrap pre {
    word-break: break-word;
  }

  .wmde-markdown {
    padding: 20px 25px;
  }
`;
