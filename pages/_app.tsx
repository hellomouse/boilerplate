import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';

import { wrapper } from '../store';
// import global styles
import './index.scss';

class OverriddenApp extends App<AppInitialProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(OverriddenApp);
