require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: '0.8.4',
	paths: {
		artifacts: './src/artifacts'
	},
	networks: {
		hardhat: {
			chainId: 1337
		},
		ropsten: {
			url: 'https://ropsten.infura.io/v3/1a5c32346987441bb5546d185b54665a',
			accounts: ['0x0873e3f23183e996442755f7b07401565fd35783b7395debf9261913b0df15bd']
		}
	}
};
