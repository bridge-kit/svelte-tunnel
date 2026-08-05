<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { tunnel } from '$lib/index.js';

	const Portal = tunnel();

	let message = $state('Hello from deep in the tree');
	let open = $state(true);
</script>

<div class="demo-grid">
	<section class="panel source">
		<div class="panel-label">Source / Portal.In</div>
		<label class="field">
			<span>Message</span>
			<input bind:value={message} />
		</label>
		<button type="button" class="btn btn-primary btn-sm" onclick={() => (open = !open)}>
			{open ? 'Hide In' : 'Show In'}
		</button>
		{#if open}
			<Portal.In>
				<span class="chip absolute" transition:fly={{ y: 8, duration: 200 }}>
					{message}
				</span>
			</Portal.In>
		{/if}
		<p class="hint">Content mounted here travels to the outlet below.</p>
	</section>

	<section class="panel target">
		<div class="panel-label">Outlet / Portal.Out</div>
		<div class="outlet">
			<Portal.Out />
		</div>
	</section>
</div>

<style>
	.demo-grid {
		display: grid;
		gap: var(--nest-pad);
		width: 100%;
	}

	@media (min-width: 720px) {
		.demo-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.panel {
		border: 1px solid var(--line);
		border-radius: calc(var(--radius-lg) - var(--nest-pad));
		background: var(--paper);
		padding: 1rem 1.05rem;
		min-height: 12.5rem;
	}

	.target {
		background: var(--paper);
	}

	.panel-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--ink-soft);
		margin-bottom: 0.75rem;
	}

	.field {
		display: grid;
		gap: 0.3rem;
		margin-bottom: 0.7rem;
		font-size: 0.8125rem;
		font-weight: 500;
	}

	input {
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		padding: 0.45rem 0.65rem;
		min-height: var(--btn-h);
		background: var(--paper);
		color: var(--ink);
		transition: border-color 160ms var(--ease-out);
	}

	input:focus {
		outline: none;
		border-color: var(--ink);
	}

	.hint {
		margin: 0.75rem 0 0;
		font-size: 0.78rem;
		color: var(--ink-soft);
	}

	.outlet {
		min-height: 6rem;
		height: calc(100% - 1.6rem);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed var(--line-strong);
		border-radius: calc(var(--radius-lg) - var(--nest-pad) - 0.25rem);
		background: var(--paper-2);
		padding: 1rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 1.875rem;
		padding: 0.35rem 0.75rem;
		border-radius: var(--radius-sm);
		background: var(--ink);
		color: #f7f7f8;
		font-weight: 500;
		font-size: 0.8125rem;
	}
</style>
