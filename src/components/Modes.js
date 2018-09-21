import React, { Component } from 'react'
import { Layout, Menu, Alert } from 'antd';

import Airdrop from './Airdrop';

const { Content, Sider } = Layout;

class Modes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'info'
    };
  }



  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    });
  }

  renderContent = () => {
    const { account, payroll, web3 } = this.props;
    const { mode, owner } = this.state;


    switch(mode) {
      case 'info':
        return <Airdrop account={account} payroll={payroll} web3={web3} />
     
    }
  }

  render() {
    return (
      <Layout style={{ padding: '24px 0', background: '#fff'}}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['info']}
            style={{ height: '100%' }}
            onSelect={this.onSelectTab}
          >
            <Menu.Item key="info">合约信息</Menu.Item>

          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default Modes