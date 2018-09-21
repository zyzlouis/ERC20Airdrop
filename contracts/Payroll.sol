pragma solidity ^0.4.24;
 
contract ERC20Abstract {
      function totalSupply() public view returns (uint256);
      function balanceOf(address who) public view returns (uint256);
      function transfer(address to, uint256 value) public returns (bool);
      function transferFrom(address from, address to, uint256 value) public returns (bool);

}

// 批量转账合约
contract Payroll{
    
    ERC20Abstract token;
   
 
    function transfer(address from,address caddress,address[] _tos,uint vaule)public returns (bool){
        require(_tos.length > 0);
        token = ERC20Abstract(caddress);
        for(uint i=0;i<_tos.length;i++){
         token.transferFrom(from,_tos[i],vaule);
        }
        return true;
    }
    
}