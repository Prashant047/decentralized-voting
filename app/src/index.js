import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import * as Web3 from 'web3';
import * as ABI from './Voting.json';

let web3;
let Voting;
let default_account;
async function act(){
	if(window.web3){
		console.log("Web3 provider detected");
		web3 = new Web3(window.web3.currentProvider);
	}
	else {
		console.log("NO web3 Provider detected");
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	default_account = (await web3.eth.getAccounts())[0];
	Voting = new web3.eth.Contract(ABI.abi, '0x7F55cCa38aD4751e356Dc154b3482463C621E6AF');
	ReactDOM.render(<App Voting={Voting} web3={web3} da={default_account}/>, document.getElementById('root'));
}
act();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
