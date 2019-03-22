import React, { Component } from 'react';

import BaseComponent from './BaseComponent';
import { Overlay } from 'teaset';

export default class BaseDialog extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  show() {
    let overlayView = (
      <Overlay.PullView
        side="bottom"
        modal={false}
        ref={v => (this.overlayPopView = v)}
      >
        {this.renderContent()}
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  close() {
    this.overlayPopView && this.overlayPopView.close();
  }

  dismiss(cb) {
    this.overlayPopView && this.overlayPopView.close();
    cb && cb();
  }

  render() {
    return null;
  }
}
