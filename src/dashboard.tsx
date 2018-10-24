import * as React from 'react';

import "./style/dashboard.less";

interface DashboardPropsInfo {
}

interface DashboardStateInfo {
}

export class Dashboard extends React.Component<DashboardPropsInfo, DashboardStateInfo> {
  constructor(props: DashboardPropsInfo) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {

    return (
      <div className='calendar-dashboard'>
        page dashboard.
      </div>
    );
  }
}
