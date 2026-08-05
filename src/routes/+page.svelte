<script lang="ts">
	import { resolve } from '$app/paths';
	import BasicDemo from '../demos/BasicDemo.svelte';
	import CodeBlock from '../site/CodeBlock.svelte';
	import InstallBlock from '../site/InstallBlock.svelte';

	const usage = `import { tunnel } from '@bridge-stack/svelte-tunnel';

const Portal = tunnel();

<Portal.Out />
<Portal.In>Hello</Portal.In>`;

	const features = [
		{
			title: 'Paired portals',
			body: 'Each tunnel() call returns a matched In / Out pair scoped to that instance.'
		},
		{
			title: 'Single or multiple',
			body: 'Last-wins for menus and tabs, or stack every In for toasts and trays.'
		},
		{
			title: 'Svelte 5 native',
			body: 'Built with runes, snippets, and mount / unmount. No extra runtime.'
		}
	];
</script>

<section class="mx-auto max-w-5xl px-5 pt-16 pb-16 sm:px-8 lg:pt-24 lg:pb-20">
	<div class="mx-auto max-w-xl text-center">
		<p class="mb-3 font-mono text-[0.75rem] text-[var(--ink-soft)]">
			<a
				href="https://github.com/bridge-kit"
				class="hover:text-[var(--ink)] hover:underline hover:underline-offset-4"
				target="_blank"
				rel="noreferrer"
			>
				bridge-kit
			</a>
		</p>
		<h1
			class="font-display text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl"
		>
			svelte-tunnel
		</h1>
		<p class="mx-auto mt-5 max-w-[40ch] text-[0.975rem] leading-relaxed text-[var(--ink-soft)]">
			Render markup from deep in your tree into a distant outlet. No prop drilling. No global DOM
			hacks.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
			<a href={resolve('/examples/')} class="btn btn-primary">View examples</a>
			<a
				href="https://github.com/bridge-kit/svelte-tunnel"
				class="btn-link text-sm font-medium"
				target="_blank"
				rel="noreferrer"
			>
				Source on GitHub
			</a>
		</div>
	</div>

	<div class="mt-14 w-full lg:mt-16">
		<h2 class="mb-3 font-display text-base font-semibold tracking-tight">Live tunnel</h2>
		<div class="surface nest w-full overflow-hidden">
			<BasicDemo />
		</div>
	</div>
</section>

<section class="mx-auto max-w-5xl px-5 pb-16 sm:px-8 lg:pb-20">
	<div class="grid gap-4 lg:grid-cols-2">
		<article class="surface rounded-[var(--radius-lg)] p-4 sm:p-5">
			<h2 class="font-display text-base font-semibold tracking-tight">Install</h2>
			<div class="mt-3">
				<InstallBlock />
			</div>
		</article>
		<article class="surface rounded-[var(--radius-lg)] p-4 sm:p-5">
			<h2 class="font-display text-base font-semibold tracking-tight">Usage</h2>
			<div class="mt-3">
				<CodeBlock code={usage} language="svelte" label="Svelte" tone="dark" />
			</div>
		</article>
	</div>
</section>

<section class="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
	<div class="max-w-xl border-t border-[var(--line)] pt-10">
		<h2 class="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">Why a tunnel?</h2>
		<p class="mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
			Keep content next to the logic that owns it, while rendering into headers, toast trays, drawers,
			or any shared chrome.
		</p>
	</div>

	<ul class="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
		{#each features as item (item.title)}
			<li class="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-6">
				<h3 class="font-display text-[0.95rem] font-semibold tracking-tight">{item.title}</h3>
				<p class="max-w-[48ch] text-[0.925rem] leading-relaxed text-[var(--ink-soft)]">
					{item.body}
				</p>
			</li>
		{/each}
	</ul>
</section>
