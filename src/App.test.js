import { render } from '@testing-library/react';
import WrappedAppContainer from './App';

test('renders without crashing', () => {
    render(<WrappedAppContainer />);
});
