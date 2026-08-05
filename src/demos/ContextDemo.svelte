<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { tunnel } from '$lib/index.js';
	import { setDemoProfile } from './context-demo.js';
	import ContextConsumer from './ContextConsumer.svelte';

	const ContextTunnel = tunnel();

	let profile = $state({
		name: 'Ada Lovelace',
		theme: 'Paper'
	});

	setDemoProfile(profile);
</script>

<div class="demo-grid">
	<section class="panel source">
		<div class="panel-label">Context above ContextTunnel.In</div>
		<label class="field">
			<span>User name</span>
			<input bind:value={profile.name} />
		</label>
		<label class="field">
			<span>Theme name</span>
			<input bind:value={profile.theme} />
		</label>
		<div transition:fade={{ duration: 160 }}>
			<ContextTunnel.In>
				<div transition:fly={{ y: 8, duration: 200 }}>
					<ContextConsumer />
				</div>
			</ContextTunnel.In>
		</div>
		<p class="hint">
			Context is set on the parent of <code>In</code>. The consumer reads it from inside the tunnel
			content.
		</p>
	</section>

	<section class="panel target">
		<div class="panel-label">Outlet / ContextTunnel.Out</div>
		<div class="outlet">
			<ContextTunnel.Out />
		</div>
		<p class="hint">Teleported content still sees the context from above <code>In</code>.</p>
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
		line-height: 1.45;
	}

	.hint code {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		padding: 0.05rem 0.3rem;
		border-radius: var(--radius-sm);
		background: var(--paper-2);
	}

	.outlet {
		min-height: 6rem;
		height: calc(100% - 3.2rem);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed var(--line-strong);
		border-radius: calc(var(--radius-lg) - var(--nest-pad) - 0.25rem);
		background: var(--paper-2);
		padding: 1rem;
	}
</style>
