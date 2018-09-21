var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "topic foster find abandon famous have bonus month remain middle planet smart";
module.exports = { 
  migrations_directory: "./migrations",
  networks: { 
    ropsten: { 
      provider: function() {
       return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/503fc5af65d64cdaa090d2873201bc5a") 
      }, 
      network_id: 3 
    } 
  } 
};