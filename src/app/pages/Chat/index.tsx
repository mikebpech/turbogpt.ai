import * as React from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { Textbox } from './Textbox';
import { LeftSidebar } from './components/LeftSidebar';
import { useMediaQuery } from 'react-responsive';

export function ChatPage() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <>
      <Helmet>
        <title>Chat</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      <Body>
        {!isTabletOrMobile && <LeftSidebar />}
        <Wrapper isMobile={isTabletOrMobile}>
          <Title>🧨 TurboGPT</Title>
          <Textbox />
        </Wrapper>
      </Body>
      <div
        data-tf-popover="An6RHMdE"
        data-tf-opacity="100"
        data-tf-iframe-props="title=TurboGPT Feedback"
        data-tf-auto-close
        data-tf-transitive-search-params
        data-tf-button-color="#AF0407"
        data-tf-notification-days="7"
        data-tf-medium="snippet"
        style={{ all: 'unset' }}
      ></div>
      <script src="//embed.typeform.com/next/embed.js"></script>
    </>
  );
}

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div<any>`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 320px;
  padding: 25px 0;
  padding-top: ${props => props.isMobile && '0'};
  position: relative;
  width: ${props => props.isMobile && '100%'};
`;

const Title = styled.div`
  position: absolute;
  top: 35vh;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  font-weight: bold;
  color: ${p => p.theme.text};
  opacity: 0.2;
  font-size: 2.375rem;
  user-select: none;

  span {
    font-size: 2.125rem;
  }
`;
