<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	type Manager = 'pnpm' | 'npm' | 'bun';

	let {
		packageName = '@bridge-stack/svelte-tunnel'
	}: {
		packageName?: string;
	} = $props();

	let manager = $state<Manager>('pnpm');

	const managers: Manager[] = ['pnpm', 'npm', 'bun'];

	const command = $derived(
		manager === 'pnpm'
			? `pnpm add ${packageName}`
			: manager === 'npm'
				? `npm i ${packageName}`
				: `bun add ${packageName}`
	);
</script>

<div class="install">
	<div class="tabs" role="tablist" aria-label="Package manager">
		{#each managers as item (item)}
			<button
				type="button"
				role="tab"
				class="tab"
				class:active={manager === item}
				aria-selected={manager === item}
				onclick={() => (manager = item)}
			>
				{item}
			</button>
		{/each}
	</div>
	<CodeBlock code={command} language="shell" label="Install" tone="dark" />
</div>

<style>
	.install {
		display: grid;
		gap: 0.75rem;
	}

	.tabs {
		--tab-pad: 0.2rem;
		display: inline-flex;
		width: fit-content;
		gap: 0.2rem;
		padding: var(--tab-pad);
		border-radius: var(--radius-sm);
		background: var(--paper-2);
		border: 1px solid var(--line);
	}

	.tab {
		border: 0;
		/* Concentric: inner = outer − pad */
		border-radius: calc(var(--radius-sm) - var(--tab-pad));
		min-height: 2rem;
		padding: 0.4rem 0.75rem;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1;
		color: var(--ink-soft);
		background: transparent;
		cursor: pointer;
		transition:
			transform 160ms var(--ease-out),
			background-color 200ms var(--ease-out),
			color 200ms var(--ease-out);
	}

	.tab:hover {
		color: var(--ink);
	}

	.tab.active {
		background: var(--paper);
		color: var(--ink);
	}

	.tab:active {
		transform: scale(0.98);
	}
</style>
