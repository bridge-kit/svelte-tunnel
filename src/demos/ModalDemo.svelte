<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { tunnel } from '$lib/index.js';

	const Modal = tunnel();

	let open = $state(false);
	let name = $state('Ada Lovelace');

	function close() {
		open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={open ? onKeydown : undefined} />

<div class="shell">
	<div class="app">
		<div class="topbar">
			<span class="brand">App chrome</span>
			<span class="hint-pill">Modal.Out host</span>
		</div>

		<div class="body">
			<p>
				Open a dialog from nested UI. The overlay renders at the host outlet, not where the trigger
				lives.
			</p>

			<div class="nested">
				<span class="nested-label">Nested panel</span>
				<p class="nested-copy">Profile settings sit deep in the tree.</p>
				<button type="button" class="btn btn-primary btn-sm" onclick={() => (open = true)}>
					Edit profile
				</button>

				{#if open}
					<Modal.In>
						<div class="backdrop" transition:fade={{ duration: 160 }} role="presentation">
							<button type="button" class="scrim" aria-label="Close dialog" onclick={close}></button>
							<div
								class="dialog"
								transition:scale={{ duration: 200, start: 0.96 }}
								role="dialog"
								aria-modal="true"
								aria-labelledby="modal-title"
							>
								<h3 id="modal-title">Edit profile</h3>
								<label class="field">
									<span>Display name</span>
									<input bind:value={name} />
								</label>
								<div class="actions">
									<button type="button" class="btn btn-ghost btn-sm" onclick={close}>Cancel</button>
									<button type="button" class="btn btn-primary btn-sm" onclick={close}>Save</button>
								</div>
							</div>
						</div>
					</Modal.In>
				{/if}
			</div>
		</div>

		<div class="overlay-host" aria-hidden={!open}>
			<Modal.Out />
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

	.app {
		position: relative;
		min-height: 15rem;
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

	.hint-pill {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 500;
		opacity: 0.5;
	}

	.body {
		padding: 1rem 0.95rem 1.1rem;
	}

	.body > p {
		margin: 0 0 0.75rem;
		color: var(--ink-soft);
		font-size: 0.9rem;
	}

	.nested {
		border: 1px solid var(--line);
		border-radius: calc(var(--radius-lg) - 0.45rem);
		background: var(--paper);
		padding: 0.9rem 0.95rem 1rem;
	}

	.nested-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--ink-soft);
		margin-bottom: 0.4rem;
	}

	.nested-copy {
		margin: 0 0 0.75rem;
		font-size: 0.875rem;
		color: var(--ink);
	}

	.overlay-host {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 2;
	}

	.overlay-host :global(.backdrop) {
		pointer-events: auto;
	}

	.backdrop {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.scrim {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		margin: 0;
		cursor: pointer;
		background: #111318;
		opacity: 0.45;
	}

	.dialog {
		position: relative;
		z-index: 1;
		width: min(100%, 19rem);
		border-radius: var(--radius);
		background: var(--paper);
		border: 1px solid var(--line);
		padding: 1rem 1.05rem 1.05rem;
	}

	.dialog h3 {
		margin: 0 0 0.8rem;
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: -0.015em;
	}

	.field {
		display: grid;
		gap: 0.3rem;
		margin-bottom: 0.9rem;
		font-size: 0.8125rem;
		font-weight: 500;
	}

	.field input {
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		padding: 0.45rem 0.65rem;
		min-height: var(--btn-h);
		background: var(--paper);
		color: var(--ink);
		font: inherit;
		font-weight: 400;
		transition: border-color 120ms var(--ease-out);
	}

	.field input:focus {
		outline: none;
		border-color: var(--ink);
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.4rem;
	}
</style>
