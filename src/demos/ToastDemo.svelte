<script lang="ts">
	import { fly } from 'svelte/transition';
	import { tunnel } from '$lib/index.js';

	const Toast = tunnel({ mode: 'multiple' });

	let nextId = $state(1);
	let toasts = $state<{ id: number; text: string }[]>([]);

	function pushToast() {
		const id = nextId++;
		toasts = [...toasts, { id, text: `Toast #${id}` }];
		setTimeout(() => {
			toasts = toasts.filter((t) => t.id !== id);
		}, 2200);
	}
</script>

<div class="shell">
	<div class="app">
		<div class="topbar">
			<span class="brand">App chrome</span>
			<div class="slot">
				<Toast.Out />
			</div>
		</div>

		<div class="body">
			<p>Fire toasts from nested UI. They render in the top bar via a tunnel.</p>
			<button type="button" class="btn btn-primary" onclick={pushToast}>Push toast</button>

			{#each toasts as toast (toast.id)}
				<Toast.In>
					<span
						class="toast"
						in:fly={{ y: -10, duration: 240, opacity: 0 }}
						out:fly={{ y: -6, duration: 180, opacity: 0 }}
					>
						{toast.text}
					</span>
				</Toast.In>
			{/each}
		</div>
	</div>
</div>

<style>
	.shell {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--paper);
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.65rem 0.9rem;
		background: var(--ink);
		color: #f7f7f8;
		min-height: 2.85rem;
	}

	.brand {
		font-family: var(--font-mono);
		font-weight: 500;
		font-size: 0.78rem;
		white-space: nowrap;
	}

	.slot {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.35rem;
		min-height: 1.6rem;
		flex: 1;
	}

	.body {
		padding: 1rem 0.95rem 1.1rem;
	}

	.body p {
		margin: 0 0 0.75rem;
		color: var(--ink-soft);
		font-size: 0.9rem;
	}

	.toast {
		display: inline-flex;
		align-items: center;
		min-height: 1.6rem;
		padding: 0.25rem 0.6rem;
		border-radius: calc(var(--radius-sm) - 0.05rem);
		background: var(--ink-hover);
		border: 1px solid #3a3f4a;
		color: #ffffff;
		font-size: 0.75rem;
		font-weight: 500;
	}
</style>
