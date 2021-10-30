<script>
	import { ethers } from 'ethers';
	import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';
	import Token from '../artifacts/contracts/Token.sol/TrevToken.json';

	// Local
	const greeterAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
	const tokenAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

	// Ropsten
	// const greeterAddress = '0x05Fc26470dA98455cc5C81A169Adc114930E4de0';
	// const tokenAddress = '0x53c57e8E7d0B267209010ef385882718d4D08b26';

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
				return data;
			} catch (err) {
				console.log('Error: ', err);
			}
		}
	}

	let msgPromise = fetchGreeting();

	function handleFetchGreeting() {
		msgpromise = fetchGreeting();
	}

	async function getBalance() {
		if (typeof window.ethereum !== 'undefined') {
			const [account] = await window.ethereum.request({
				method: 'eth_requestAccounts'
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
			const balance = await contract.balanceOf(account);
			return balance.toString();
			// console.log('Balance: ', balance.toString());
		}
	}

	let balPromise = getBalance();

	function handleGetBalance() {
		balPromise = getBalance();
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
			greeting = '';
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
			// console.log(`${amount} Coins successfully sent to ${userAccount}`);
			amount = null;
			userAccount = '';
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	<p class="text-center">Token address:</p>
	<p class="text-center">0x53c57e8E7d0B267209010ef385882718d4D08b26</p>
	<br />
	<main class=" flex items-center justify-center">
		<div class="msg flex flex-col">
			<button class="btn" on:click={setGreeting}>Set Message</button>
			<input bind:value={greeting} placeholder="message..." />
			<button class="btn" on:click={handleFetchGreeting}>Get Message</button>
		</div>

		<div class="tokens flex flex-col">
			<button class="btn" on:click={handleGetBalance}> Get TVC Balance </button>
			<button class="btn" on:click={sendCoins}> Send TVC </button>
			<input bind:value={userAccount} placeholder="address..." />
			<input bind:value={amount} placeholder="amount..." />
		</div>
	</main>
	<br />
	<div id="message">
		{#await msgPromise}
			<p>...waiting</p>
		{:then message}
			{#if message === undefined}
				<p>No message!</p>
			{:else}
				<p>Message: {message}</p>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>

	<div id="amount">
		{#await balPromise}
			<p>...waiting</p>
		{:then balance}
			{#if balance === undefined}
				<p>No balance here! Token address:</p>
				<p>0x53c57e8E7d0B267209010ef385882718d4D08b26</p>
			{:else}
				<p>TVT Balance: {balance}</p>
			{/if}
		{:catch error}
			<p class="text-center">No balance!</p>
			<br />
		{/await}
	</div>
	<br />
	<p class="pt-8 text-sm text-center">
		Deployed to Ropsten Test Network...Just ask me for TVT and I will send you some!
	</p>
	<p class=" text-center">Faucet construction in progress...🚧👷‍♂️🏗</p>
</div>
