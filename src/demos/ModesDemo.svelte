<script lang="ts">
	import { tunnel } from '$lib/index.js';

	const Single = tunnel({ mode: 'single' });
	const Multi = tunnel({ mode: 'multiple' });

	let active = $state(1);
	let showA = $state(true);
	let showB = $state(true);
	let showC = $state(true);
</script>

<div class="modes">
	<section class="card">
		<header>
			<h3>single</h3>
			<p>Only the last mounted <code>In</code> appears.</p>
		</header>

		<div class="controls">
			{#each [1, 2, 3] as n (n)}
				<button
					type="button"
					class="btn btn-ghost btn-sm"
					class:btn-active={active === n}
					aria-pressed={active === n}
					onclick={() => (active = n)}
				>
					In {n}
				</button>
			{/each}
		</div>

		<div class="stage">
			<div class="hidden-ins">
				{#if active === 1}
					<Single.In><span class="pill one">Alpha</span></Single.In>
				{/if}
				{#if active === 2}
					<Single.In><span class="pill two">Beta</span></Single.In>
				{/if}
				{#if active === 3}
					<Single.In><span class="pill three">Gamma</span></Single.In>
				{/if}
			</div>
			<div class="out">
				<Single.Out />
			</div>
		</div>
	</section>

	<section class="card">
		<header>
			<h3>multiple</h3>
			<p>Every mounted <code>In</code> appears at the outlet.</p>
		</header>

		<div class="controls">
			<label class="check"><input type="checkbox" bind:checked={showA} /> A</label>
			<label class="check"><input type="checkbox" bind:checked={showB} /> B</label>
			<label class="check"><input type="checkbox" bind:checked={showC} /> C</label>
		</div>

		<div class="stage">
			<div class="hidden-ins">
				{#if showA}
					<Multi.In><span class="pill one">A</span></Multi.In>
				{/if}
				{#if showB}
					<Multi.In><span class="pill two">B</span></Multi.In>
				{/if}
				{#if showC}
					<Multi.In><span class="pill three">C</span></Multi.In>
				{/if}
			</div>
			<div class="out stack">
				<Multi.Out />
			</div>
		</div>
	</section>
</div>

<style>
	.modes {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 800px) {
		.modes {
			grid-template-columns: 1fr 1fr;
		}
	}

	.card {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		background: var(--paper);
		padding: 1rem 1.05rem 1.1rem;
	}

	header h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
	}

	header p {
		margin: 0.3rem 0 0.85rem;
		color: var(--ink-soft);
		font-size: 0.85rem;
	}

	code {
		font-size: 0.85em;
		background: var(--paper-2);
		padding: 0.1rem 0.35rem;
		border-radius: calc(var(--radius-sm) - 0.05rem);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: 0.75rem;
	}

	.check {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		min-height: 1.875rem;
		font-size: 0.8125rem;
		font-weight: 500;
		padding: 0.3rem 0.7rem;
		border-radius: var(--radius-sm);
		background: var(--paper);
		border: 1px solid var(--line);
		cursor: pointer;
		transition:
			background-color 160ms var(--ease-out),
			border-color 160ms var(--ease-out);
	}

	.check:hover {
		background: var(--paper-2);
	}

	.stage {
		display: grid;
		gap: 0.65rem;
	}

	.hidden-ins {
		display: none;
	}

	.out {
		min-height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		border-radius: calc(var(--radius-lg) - 0.5rem);
		border: 1px dashed var(--line-strong);
		background: var(--paper-2);
		padding: 0.75rem;
	}

	.stack {
		flex-wrap: wrap;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 3.25rem;
		min-height: 1.875rem;
		padding: 0.3rem 0.7rem;
		border-radius: var(--radius-sm);
		font-weight: 500;
		font-size: 0.8125rem;
	}

	.one {
		background: var(--ink);
		color: #ffffff;
	}
	.two {
		background: var(--ink-hover);
		color: #ffffff;
	}
	.three {
		background: var(--paper);
		color: var(--ink);
		border: 1px solid var(--line);
	}
</style>
