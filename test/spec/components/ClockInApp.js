'use strict';

describe('ClockInApp', () => {
  let React = require('react/addons');
  let ClockInApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ClockInApp = require('components/ClockInApp.js');
    component = React.createElement(ClockInApp);
  });

  it('should create a new instance of ClockInApp', () => {
    expect(component).toBeDefined();
  });
});
