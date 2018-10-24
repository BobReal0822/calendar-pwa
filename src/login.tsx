import * as React from 'react';

import "./style/login.less";

interface LoginPropsInfo {
}

interface LoginStateInfo {
}

export class Login extends React.Component<LoginPropsInfo, LoginStateInfo> {
  constructor(props: LoginPropsInfo) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {

    return (
      <div className='calendar-login'>
        page login.
      </div>
    );
  }
}
