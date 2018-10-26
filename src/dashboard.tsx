import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DatePicker, List, Modal, InputItem, Icon, Toast } from 'antd-mobile';
import moment from 'moment';

import "./style/dashboard.less";
import Input from 'antd-mobile/lib/input-item/Input';

export interface ToDoInfo {
  title: string;
  date: string;
  desc?: string;
}

export type DashboardPropsInfo = RouteComponentProps<{
}>;

export interface DashboardStateInfo {
  toDoList: ToDoInfo[];
  isModalVisible: boolean;
  event: {
    [key: string]: string | Date;
    title: string;
    date: Date;
  };
}

const defaultToDoList: ToDoInfo[] = [{
  title: '明天去香山秋游',
  date: Date()
}];

export class Dashboard extends React.Component<DashboardPropsInfo, DashboardStateInfo> {
  constructor(props: DashboardPropsInfo) {
    super(props);

    this.state = {
      toDoList: [ ...defaultToDoList ],
      isModalVisible: false,
      event: {
        title: '',
        date: new Date()
      }
    };
  }

  componentDidMount() {
    const { toDoList } = this.state;
    const nextToDoList = localStorage.toDoList ? JSON.parse(localStorage.toDoList) : toDoList;

    this.setState({
      toDoList: nextToDoList
    });
  }

  onCalendarConfirm = (startDate: Date, endDate: Date) => {
    console.log('start and end date in onCalendarConfirm: ', startDate, endDate);
  }

  switchModal = (show: boolean) => {
    this.setState({
      isModalVisible: show
    });
  }

  addEvent = () => {
    const { event, toDoList } = this.state;
    const toDo: any = { ...event };
    const nextToDoList = [ toDo, ...toDoList];

    if (!event.title) {
      Toast.fail('请输入标题！');
    } else {
      this.setState({
        event: {
          title: '',
          date: new Date()
        },
        toDoList: nextToDoList
      }, () => {
        this.switchModal(false);
        localStorage.toDoList = JSON.stringify(nextToDoList);
      });
    }

  }

  handleEventData = (key: string, value: string) => {
    const { event } = this.state;

    event[key] = value;
    this.setState({
      event
    });
  }

  deleteItem = (item: ToDoInfo, index: number) => {
    const { toDoList } = this.state;
    const nextToDoList = toDoList.filter((listItem, listIndex) => !(index === listIndex && item.title === listItem.title));

    console.log('item, index, nextToDoList: ', item, index, nextToDoList);
    this.setState({
      toDoList: nextToDoList
    }, () => {
      localStorage.toDoList = JSON.stringify(nextToDoList);
    });
  }

  goLogin = () => {
    this.props.history.push('/login');
  }

  render() {
    const { isModalVisible, toDoList, event } = this.state;

    console.log('dashboard state in render: ', this.state);
    return (
      <div className='calendar-dashboard'>
        <div className='dashboard-header'>
          <h3>PWA Demo</h3>
          <div className='add-box'>
            <i className='iconfont icon-add' onClick={ this.switchModal.bind(this, true) } />
            <i className='iconfont icon-login' onClick={ this.goLogin } />
          </div>
        </div>
        <div className='dashboard-content'>
          <List>
          {
            toDoList.map((item, index) =><List.Item key={ String(item.title + item.date) }>
                <label>
                  <span className='title-index'>{ index + 1 }.</span>
                  <span className='title-name'>{ item.title }</span>
                </label>
                <div className='item-content' key={ String(item) }>
                  <span className='content-date'>{ moment(item.date).format('MM/DD HH:mm') }</span>
                  <Icon className='content-icon' type='cross' size='sm' onClick={ this.deleteItem.bind(this, item, index) } />
                </div>
              </List.Item>)
          }
          </List>
        </div>

        <Modal
          title={ <h3>添加事件</h3> }
          visible={ isModalVisible }
          maskClosable={ false }
          transparent
          onClose={ this.switchModal.bind(this, false) }
          footer={ [{
            text: '提交',
            onPress: this.addEvent
          }] }
        >
          <div className='event-form'>
            <List className=''>
              <InputItem
                clear
                placeholder='请输入标题'
                value={ event.title }
                onChange={ this.handleEventData.bind(this, 'title') }
              >标题</InputItem>
              <DatePicker value={ event.date } onChange={ this.handleEventData.bind(this, 'date') }>
                <List.Item arrow='horizontal'>日期</List.Item>
              </DatePicker>
            </List>
          </div>
        </Modal>
      </div>
    );
  }
}
