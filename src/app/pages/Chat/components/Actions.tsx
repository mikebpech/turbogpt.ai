import React from 'react';
import { ActionIcon, Button, CopyButton, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy, IconEdit } from '@tabler/icons-react';
import styled from 'styled-components/macro';
import { useModalSlice } from 'app/components/Modal/slice';
import { useDispatch, useSelector } from 'react-redux';

export function Actions({
  copyValue,
  messageIdx = null,
  showButtons = false,
}: {
  copyValue: string;
  messageIdx?: number | null;
  showButtons?: boolean;
}) {
  const dispatch = useDispatch();
  const { actions } = useModalSlice();

  const handleOpenModal = () => {
    if (messageIdx !== null || messageIdx !== undefined) {
      dispatch(actions.setEditModalData(copyValue));
      dispatch(actions.setEditModalSelectedMessageIdx(messageIdx));
      dispatch(actions.openEditModal());
    }
  };

  return (
    <Wrapper show={showButtons}>
      {messageIdx !== null && (
        <ButtonWrap>
          <Tooltip label="Edit" withArrow position="right">
            <ActionIcon
              size="xs"
              onClick={handleOpenModal}
              variant="subtle"
              color="gray"
            >
              <IconEdit size="1rem" />
            </ActionIcon>
          </Tooltip>
        </ButtonWrap>
      )}
      <ButtonWrap>
        <CopyButton value={copyValue} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? 'Copied' : 'Copy'}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? 'teal' : 'gray'}
                variant="subtle"
                onClick={copy}
                size="xs"
              >
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </ButtonWrap>
    </Wrapper>
  );
}

const Wrapper = styled.div<any>`
  display: flex;
  flex-direction: column;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

const ButtonWrap = styled.div`
  padding: 3px 0;
`;
