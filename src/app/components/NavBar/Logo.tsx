import * as React from 'react';
import styled from 'styled-components/macro';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import { useSelector } from 'react-redux';
import { getModel } from 'app/pages/Chat/slice/selectors';

export function Logo() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const model = useSelector(getModel);

  return (
    <Wrapper>
      <Title>
        <LogoIcon
          width={25}
          height={25}
          style={{ marginBottom: '5px', imageRendering: 'crisp-edges' }}
        />{' '}
        TurboGPT
      </Title>
      {!isTabletOrMobile && (
        <Description>
          model:{' '}
          <span>{model === 'gpt-4' ? 'gpt-4' : 'gpt-4-turbo-preview'}</span>
        </Description>
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
  white-space: nowrap;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;

  span {
    font-weight: bold;
  }
`;
