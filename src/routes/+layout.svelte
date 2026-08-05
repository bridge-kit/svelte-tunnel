<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import GithubLogoIcon from 'phosphor-svelte/lib/GithubLogoIcon';
	import './layout.css';

	const { children } = $props();

	const links = [
		{ href: resolve('/'), label: 'Home', routeId: '/' },
		{ href: resolve('/examples/'), label: 'Examples', routeId: '/examples' }
	];

	function isActive(routeId: string) {
		return page.route.id === routeId;
	}
</script>

<svelte:head>
	<title>svelte-tunnel</title>
	<meta
		name="description"
		content="Portal content across your Svelte component tree with paired In/Out tunnels."
	/>
</svelte:head>

<div class="min-h-dvh">
	<a
		href="#main"
		class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[var(--radius-sm)] focus:bg-[var(--ink)] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
	>
		Skip to content
	</a>

	<header class="relative z-40 border-b border-[var(--line)] bg-[var(--paper)]">
		<div class="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
			<a
				href={resolve('/')}
				class="font-mono text-[0.8125rem] font-medium tracking-tight text-[var(--ink)]"
			>
				svelte-tunnel
			</a>
			<nav class="flex items-center gap-1 text-sm font-medium">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class={[
							'btn btn-sm',
							isActive(link.routeId) ? 'btn-primary' : 'btn-quiet'
						]}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="https://github.com/bridge-kit/svelte-tunnel"
					class="btn btn-quiet btn-sm !px-2"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub repository"
				>
					<GithubLogoIcon size={18} weight="regular" />
				</a>
			</nav>
		</div>
	</header>

	<main id="main">
		{@render children()}
	</main>

	<footer
		class="mx-auto flex max-w-5xl flex-col gap-2 border-t border-[var(--line)] px-5 py-10 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-8"
	>
		<p>MIT License. Built for Svelte 5.</p>
		<a
			href="https://www.npmjs.com/package/@bridge-stack/svelte-tunnel"
			class="font-mono text-[0.8125rem] text-[var(--ink)] underline-offset-4 hover:underline"
			target="_blank"
			rel="noreferrer"
		>
			@bridge-stack/svelte-tunnel
		</a>
	</footer>
</div>
