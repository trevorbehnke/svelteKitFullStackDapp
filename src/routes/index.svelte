<script>
	// import './App.css';
	// import { useState } from 'react';
	import { ethers } from 'ethers';
	import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';
	import Token from '../artifacts/contracts/Token.sol/TrevToken.json';

	// Update with the contract address logged out to the CLI when it was deployed
	// Local
	// const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	// Ropsten
	const greeterAddress = '0x05Fc26470dA98455cc5C81A169Adc114930E4de0';
	const tokenAddress = '0x53c57e8E7d0B267209010ef385882718d4D08b26';

	// store greeting in local state
	// const [greeting, setGreetingValue] = useState();

	let greeting = '';
	let userAccount = '';
	let amount = null;

	async function requestAccount() {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	}

	async function fetchGreeting() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log({ provider });
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
			try {
				const data = await contract.greet();
				console.log('msg: ', data);
			} catch (err) {
				console.log('Error: ', err);
			}
		}
	}

	async function getBalance() {
		if (typeof window.ethereum !== 'undefined') {
			const [account] = await window.ethereum.request({
				method: 'eth_requestAccounts'
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
			const balance = await contract.balanceOf(account);
			console.log('Balance: ', balance.toString());
		}
	}

	async function setGreeting() {
		if (!greeting) return;
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log({ provider });
			const signer = provider.getSigner();
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
			const transaction = await contract.setGreeting(greeting);
			await transaction.wait();
			fetchGreeting();
		}
	}

	async function sendCoins() {
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
			const transation = await contract.transfer(userAccount, amount);
			await transation.wait();
			console.log(`${amount} Coins successfully sent to ${userAccount}`);
		}
	}
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
	<header class="">
		<h1 class="pb-4 text-6xl text-center text-blue-500">Full Stack Dapp</h1>
		<p class=" pb-4 text-5xl text-center text-blue-500">Trev Token</p>
		<p class=" pb-1 text-2xl text-center text-blue-500">Guaranteed to 10x 🥳</p>
		<p class=" pb-1 text-2xl text-center text-blue-500">Moonshot 🚀</p>
		<p class=" pb-4 text-2xl text-center text-blue-500">So much wow 🤯</p>
	</header>
	<main class=" flex items-center justify-center">
		<div class="msg flex flex-col">
			<button class="btn" on:click={fetchGreeting}>Get Message</button>
			<button class="btn" on:click={setGreeting}>Set Message</button>
			<input bind:value={greeting} placeholder="message..." />
		</div>
		<!-- <br /> -->
		<div class="tokens flex flex-col">
			<button class="btn" on:click={getBalance}> Get TVT Balance </button>
			<button class="btn" on:click={sendCoins}> Send TVT </button>
			<input bind:value={userAccount} placeholder="address..." />
			<input bind:value={amount} placeholder="amount..." />
		</div>
	</main>
	<p>Deployed to Ropsten Test Network...Just ask me for TVT and I will send you some!</p>
	<p>Output logged to console.</p>
</div>

<style>
</style>
