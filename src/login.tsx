import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DatePicker, List, Modal, InputItem, Icon, Toast, Button } from 'antd-mobile';

import "./style/login.less";

type LoginPropsInfo = RouteComponentProps<{
}>;

interface LoginStateInfo {
  data: {
    name: string;
    password: string;
    [key: string]: string;
  }
}

export class Login extends React.Component<LoginPropsInfo, LoginStateInfo> {
  constructor(props: LoginPropsInfo) {
    super(props);

    this.state = {
      data: {
        name: '',
        password: ''
      }
    };
  }

  handleData = (key: string, value: string) => {
    const { data } = this.state;
    const nextData = { ...data, ...{
      [key]: value
    }};

    this.setState({
      data: nextData
    });
  }

  login = () => {
    const { data } = this.state;
    
    if (!data.name) {
      Toast.fail('请输入手机号！');
    } else if (!data.password) {
      Toast.fail('请输入密码！');
    } else {
      Toast.success('登陆成功！', 2, () => {
        this.props.history.push('/');
      });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <div className='calendar-login'>
        <h3>Login Demo</h3>
        <div className='input-group'>
          <List className='input-list'>
            <InputItem
              clear
              placeholder='手机号'
              value={ data.name }
              type='phone'
              onChange={ this.handleData.bind(this, 'name') }
            />
            <InputItem
              clear
              placeholder='密码'
              value={ data.password }
              type='password'
              onChange={ this.handleData.bind(this, 'password') }
            />
          </List>
          <Button onClick={ this.login }>登陆</Button>
        </div>
      </div>
    );
  }
}
