'use strict';


import 'babel-polyfill';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { initializeRouting } from './history';
import Root from './containers/root';


Date.prototype.toJSON = function (): string
{
    let timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    let sign: string = timezoneOffsetInHours >= 0 ? '+' : '-';
    let leadingZero = (timezoneOffsetInHours < 10) ? '0' : '';

    //It's a bit unfortunate that we need to construct a new Date instance
    //(we don't want _this_ Date instance to be modified)
    let correctedDate: Date = new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate(),
        this.getHours(),
        this.getMinutes(),
        this.getSeconds(),
        this.getMilliseconds());
    correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
    let iso: string = correctedDate.toISOString().replace('Z', '');

    return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ':00';
}


let store = configureStore();
initializeRouting(store);
render(
  <Provider store={ store }>
      <Root/>
  </Provider>,
  document.getElementById('application-content')
);
