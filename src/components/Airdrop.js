import React, { Component } from 'react'
import { Form, InputNumber, Button ,Input,message,Card, Col, Row} from 'antd';



const FormItem = Form.Item;

class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.queryERC20Info = this.queryERC20Info.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.state = {};
    
  }

  handleFiles = (ev) => {
    ev.preventDefault();
    var files = this.fileInput.files[0]; 

    var reader = new FileReader();
    var tosArray;
    reader.onload = (function (theFile) {
        return function (e) {
            tosArray = e.target.result.split('\n');
            this.setState({tosArray: tosArray});
             alert(
              `Selected file content - ${
                this.state.tosArray
              }`
              );
        }.bind(this);
    }.bind(this))(files);
    
    reader.readAsText(files);
    

  }
	
  handleSubmit = (ev) => {
		  ev.preventDefault();
			const { payroll, account} = this.props;
			var { fund, contractAddress,tosArray } = this.state;
			

			console.log("length : "+ tosArray.length);

				payroll.transfer(account, contractAddress, tosArray, fund, {
					from: account,
					gas: 1000000
				}).catch((err) => {
					message.error('执行程序出现错误' + err);
				});
		}

	
  queryERC20Info = (e) => {
		   // 获取合约地址合约地址
		const contractAddress = e.target.value;
    const { payroll, account,web3} = this.props;

    var contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

    // 定义合约
    const contract = require('truffle-contract')
    var myContract = contract({abi: contractAbi});
	
		myContract.setProvider(web3.currentProvider);

		var decimal;
    this.setState({contractAddress});
    this.setState({myContract});
		myContract.at(contractAddress).then(function(instance){
			// 获取实例调用获取代币小数点方法
			return instance.decimals( {
				from:account
			});
		}).then(function(result){
			decimal = result.toNumber();
			console.log(result.toNumber());
		}).catch(function(err){
			console.log(err);
		});

					
		myContract.at(contractAddress).then(function(instance){
			// 获取实例调用获取代币符号方法
			return instance.symbol( {
				from:account
			});
		}).then(result =>{	
			this.setState({symbol:result});
			console.log("1:"+this.state.symbol);
		}).catch(function(err){
			console.log(err);
		});
		
		

		var balanceCurrAccount;
		myContract.at(contractAddress).then(function(instance){
			// 获取当前账户代币余额
			return instance.balanceOf(account, {
				from:account
			});
		}).then(balance =>{	
      balanceCurrAccount = balance.toNumber()/(10 ** decimal);
			this.setState({balanceCurrAccount});
			console.log("2 :"+balanceCurrAccount)
		}).catch(function(err){
			console.log(err);
		});

		
	

		var totalSupply;
		myContract.at(contractAddress).then(function(instance){
			// 获取实例调用获取代币总量方法
			return instance.totalSupply( {
				from:account
			});
		}).then((result) => {
      totalSupply = result.toNumber() /(10 ** decimal);
      this.setState({totalSupply: totalSupply});
			console.log("totalSupply : "+totalSupply)
		}).catch(function(err){
			console.log(err);
		});
  }
  
  //合约授信
  approve = (ev) => {
    ev.preventDefault();
    const { payroll, account} = this.props;
    const { myContract, contractAddress,amount} = this.state;

		myContract.at(contractAddress).then(function(instance){
			// 获取实例调用获取代币授权方法  _spender,_value,
			return instance.approve(payroll.contract.address,amount, {
				from:account
			});
		}).then((result) => {
      
      
			console.log("approve: "+result)
		}).catch(function(err){
			console.log(err);
		});
  }

  //查看授信额度
  allowance = (ev) => {
    const { payroll, account} = this.props;
    const { myContract, contractAddress} = this.state;
		myContract.at(contractAddress).then(function(instance){
			// 获取实例调用allowance方法: _owner,_spender
			return instance.allowance(account,payroll.contract.address, {
				from:account
			});
		}).then((result) => {     
      console.log("allowance: "+result);
      alert("授信额度剩余：" + result);
		}).catch(function(err){
			console.log(err);
		});
  }

  render() {
		const { account, payroll, web3 } = this.props;
		var { contractAddress,balanceCurrAccount, symbol, totalSupply } = this.state;
    return (
      <div>
            
				<div>
					<h2>Token信息</h2>
					<Row gutter={16}>
						<Col span={9}>
							<Card title="代币合约地址">{contractAddress} </Card>
						</Col>
						<Col span={3}>
							<Card title="代币名称">{symbol}</Card>
						</Col>
						<Col span={6}>
							<Card title="总发行量">{totalSupply}</Card>
						</Col>
						<Col span={6}>
							<Card title="当前账户持有量">{balanceCurrAccount}</Card>
						</Col>
					</Row>
				</div>


        <Form layout="horizontal" onSubmit={this.handleSubmit}>
					<FormItem label="代币合约地址">
            <Input
              onChange={this.queryERC20Info}
            />
          </FormItem>


          <FormItem label="空投授信额度">
            <InputNumber
              min={1}        
              onChange={amount => this.setState({amount})}    
            />
            <Button
              type="primary"
							onClick={this.approve}
            >
              授信
            </Button>
            <Button
              type="primary"
							onClick={this.allowance}
            >
              查看额度
            </Button>
       
          </FormItem>

          
          <FormItem label="空投数量">
            <InputNumber
              min={1}
              onChange={fund => this.setState({fund})}
            />
          </FormItem>

          <FormItem label="空投账号组">
            <input name="加载空投账号"
              type="file" 
              ref={ input => {
                this.fileInput = input;
              }} 
              onChange={this.handleFiles}
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
							disabled={!this.state.fund}
            >
          
              开始空投
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Airdrop