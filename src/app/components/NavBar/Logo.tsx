import * as React from 'react';
import styled from 'styled-components/macro';
import ConfettiExplosion from 'react-confetti-explosion';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export function Logo() {
  const [isHovering, setIsHovering] = React.useState(false);

  // This will make a confetti explosion when the word explosion is hovered
  React.useEffect(() => {
    if (isHovering) {
      setTimeout(() => setIsHovering(false), 3000);
    }
  }, [isHovering]);

  return (
    <Wrapper>
      <Title>🧨 TurboGPT</Title>
      <Description>
        chatgpt but{' '}
        <span onMouseEnter={() => setIsHovering(true)}>explosive</span>
      </Description>
      {isHovering && (
        <ConfettiExplosion
          colors={['#ff0000']}
          duration={3000}
          particleSize={8}
          width={150}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
`;
