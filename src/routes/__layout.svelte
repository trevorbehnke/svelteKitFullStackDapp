<script>
	import '../app.css';
	// import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div
	class="flex flex-col w-full min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"
>
	<!-- <Header /> -->
	<main class="flex flex-col flex-grow ">
		<slot />
	</main>

	<Footer />
</div>
