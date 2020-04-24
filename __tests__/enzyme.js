/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Alert } from 'antd';

import Header from '../client/components/Header';
import LogoBar from '../client/components/LogoBar';
import LoadServer from '../client/components/LoadServer';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('Header', () => {
    let wrapper;
    const props = {
      endpointError: null,
    };
    beforeAll(() => {
      wrapper = shallow(<Header {...props}/>);
    });
    it('Renders LogoBar and LoadServer', () => {
      expect(wrapper.find(<LogoBar />)).toBeDefined();
      expect(wrapper.find(<LoadServer />)).toBeDefined();
    });
  });

  describe('Header Conditional Alerts', () => {
    it('Renders Success Alert if endpointError is false', () => {
        const props = {
            endpointError: false,
        };
        wrapper = shallow(<Header {...props}/>
        expect(wrapper.contains(<Alert message="Server successfully connected" type="success" showIcon />)).toBeTruthy();
    });
    it('Renders Error Alert if endpointError is true', () => {
        const props = {
            endpointError: true,
        };
        wrapper = shallow(<Header {...props}/>
        expect(wrapper.contains(<Alert message="Server cannot be reached" type="error" showIcon />)).toBeTruthy();
    });
  })
});
