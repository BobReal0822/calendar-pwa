import React from 'react';
import { DatePicker, List, Modal, InputItem, Icon } from 'antd-mobile';
import moment from 'moment';

import "./style/dashboard.less";
import Input from 'antd-mobile/lib/input-item/Input';

export interface ToDoInfo {
  title: string;
  date: string;
  desc?: string;
}

export interface DashboardPropsInfo {
}

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

    this.setState({
      event: {
        title: '',
        date: new Date()
      },
      toDoList: nextToDoList
    }, () => {
      this.switchModal(false);
    });
  }

  handleEventData = (key: string, value: string) => {
    const { event } = this.state;

    event[key] = value;
    this.setState({
      event
    });
  }

  render() {
    const { isModalVisible, toDoList, event } = this.state;

    console.log('dashboard state in render: ', this.state);
    return (
      <div className='calendar-dashboard'>
        <div className='dashboard-header'>
          <h3>Calendar PWA</h3>
          <div className='add-box' onClick={ this.switchModal.bind(this, true) }>
            <Icon type='plus' />
          </div>
        </div>
        <div className='dashboard-content'>
          <List>
          {
            toDoList.map((item, index) =><List.Item>
                <label>
                  <span className='title-index'>{ ++index }</span>
                  <span className='title-name'>{ item.title }</span>
                </label>
                <div className='item-content' key={ String(item) }>
                  <span className='content-date'>{ moment(item.date).format('MM/DD HH:mm') }</span>
                  <Icon className='content-icon' type='cross' size='sm' />
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
