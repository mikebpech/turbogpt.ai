import * as React from 'react';
import { render } from '@testing-library/react';

import { Chat } from '..';

describe('<Chat  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Chat />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
