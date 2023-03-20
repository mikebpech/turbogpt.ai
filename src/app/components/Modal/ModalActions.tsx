import React from 'react';
import { Button } from '@mantine/core';

function ModalActions({ onSelect }) {
  return (
    <Button.Group mb="md">
      <Button onClick={() => onSelect(0)} variant="default">
        Editor
      </Button>
      <Button onClick={() => onSelect(1)} variant="default">
        Preview
      </Button>
    </Button.Group>
  );
}

export default ModalActions;
