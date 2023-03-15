import * as React from 'react';
import { render } from '@testing-library/react';

import { Chat } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<Chat  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Chat />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
