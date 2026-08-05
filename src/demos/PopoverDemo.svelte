<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { tunnel } from '$lib/index.js';

	const Popover = tunnel();

	let open = $state(false);

	function close() {
		open = false;
	}

	function toggle() {
		open = !open;
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
			<span class="hint-pill">Popover.Out host</span>
		</div>

		<div class="body">
			<p>
				Open a menu from a clipped, low-z panel. The popover teleports to the host outlet so it isn't
				cut off by <code>overflow: hidden</code>.
			</p>

			<div class="clip-zone">
				<span class="nested-label">overflow: hidden · z-index: 0</span>
				<p class="nested-copy">Without a tunnel, a local popover would be clipped here.</p>

				<button type="button" class="btn btn-primary btn-sm" onclick={toggle} aria-expanded={open}>
					{open ? 'Close menu' : 'Open menu'}
				</button>

				{#if open}
					<Popover.In>
						<div class="popover-layer" transition:fade={{ duration: 140 }} role="presentation">
							<button
								type="button"
								class="scrim"
								aria-label="Dismiss menu"
								onclick={close}
							></button>
							<div
								class="popover"
								transition:fly={{ y: 6, duration: 180 }}
								role="menu"
								aria-label="Account menu"
							>
								<button type="button" class="item" role="menuitem" onclick={close}>Profile</button>
								<button type="button" class="item" role="menuitem" onclick={close}>Settings</button>
								<button type="button" class="item danger" role="menuitem" onclick={close}>
									Sign out
								</button>
							</div>
						</div>
					</Popover.In>
				{/if}

				<div class="filler" aria-hidden="true">
					<span>Clipped region continues…</span>
					<span>Extra content sits under overflow</span>
				</div>
			</div>
		</div>

		<div class="overlay-host" aria-hidden={!open}>
			<Popover.Out />
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
		min-height: 16.5rem;
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
		line-height: 1.45;
	}

	.body > p code {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		padding: 0.05rem 0.3rem;
		border-radius: var(--radius-sm);
		background: var(--paper-2);
		color: var(--ink);
	}

	.clip-zone {
		position: relative;
		z-index: 0;
		isolation: isolate;
		overflow: hidden;
		max-height: 8.5rem;
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

	.filler {
		display: grid;
		gap: 0.35rem;
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px dashed var(--line);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: var(--ink-soft);
		opacity: 0.7;
	}

	.overlay-host {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 4;
	}

	.overlay-host :global(.popover-layer) {
		pointer-events: auto;
	}

	.popover-layer {
		position: absolute;
		inset: 0;
	}

	.scrim {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		margin: 0;
		cursor: default;
		background: transparent;
	}

	.popover {
		position: absolute;
		top: 7.25rem;
		left: 1.15rem;
		z-index: 1;
		display: grid;
		min-width: 10.5rem;
		padding: 0.3rem;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		background: var(--paper);
		box-shadow:
			0 1px 2px rgb(17 19 24 / 0.04),
			0 12px 28px rgb(17 19 24 / 0.1);
	}

	.item {
		display: block;
		width: 100%;
		border: 0;
		margin: 0;
		padding: 0.5rem 0.65rem;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--ink);
		font: inherit;
		font-size: 0.8125rem;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		transition: background-color 120ms var(--ease-out);
	}

	.item:hover,
	.item:focus-visible {
		outline: none;
		background: var(--paper-2);
	}

	.item.danger {
		color: #9b2c2c;
	}
</style>
