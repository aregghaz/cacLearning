import React from 'react';
import { mount, configure } from 'enzyme';

import Checkbox from './checkbox';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
let updateOne = false;

describe('Checkbox Component', () => {
    const component = mount(
        <Checkbox name="a" label="Checkbox" checked={jest.fn()} onChange={updateOne} />,
    );
    it('Should render', () => {
        expect(component.length).toEqual(1);
    });
});
