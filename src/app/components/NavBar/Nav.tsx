import * as React from 'react';
import { IconHeartFilled } from '@tabler/icons-react';
import { ThemeSwitch } from 'app/pages/HomePage/Features/ThemeSwitch';
import styled from 'styled-components/macro';
import { ReactComponent as TwitterIcon } from './assets/twitter.svg';

export function Nav() {
  return (
    <Wrapper>
      <ThemeSwitch />
      <Item
        href="https://ko-fi.com/mikepechousek"
        target="_blank"
        title="Buy me a coffee"
      >
        Buy me a coffee{' '}
        <IconHeartFilled style={{ marginLeft: 5, color: 'red' }} size={16} />
      </Item>
      <Item
        href="https://twitter.com/mikepechousek"
        target="_blank"
        title="Twitter Page"
        rel="noopener noreferrer"
      >
        <TwitterIcon width={18} style={{ marginRight: 5 }} />
        Twitter
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
  align-items: center;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
