<script lang="ts">
	import BasicDemo from '../../demos/BasicDemo.svelte';
	import ModesDemo from '../../demos/ModesDemo.svelte';
	import ModalDemo from '../../demos/ModalDemo.svelte';
	import ToastDemo from '../../demos/ToastDemo.svelte';
	import ContextDemo from '../../demos/ContextDemo.svelte';
	import PopoverDemo from '../../demos/PopoverDemo.svelte';
	import CodeBlock from '../../site/CodeBlock.svelte';

	const modalSnippet = `import { tunnel } from '@bridge-stack/svelte-tunnel';

const Modal = tunnel();

// host / overlay root
<Modal.Out />

// deep in the tree
{#if open}
  <Modal.In>
    <div role="dialog">…</div>
  </Modal.In>
{/if}`;
</script>

<svelte:head>
	<title>Examples · svelte-tunnel</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-5 pt-12 pb-24 sm:px-8">
	<header class="mb-12 max-w-xl border-b border-[var(--line)] pb-8">
		<h1 class="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Examples</h1>
		<p class="mt-3 max-w-[48ch] text-[0.975rem] leading-relaxed text-[var(--ink-soft)]">
			Interactive demos of basic teleporting, modes, modals, toasts, context through In, and popovers.
		</p>
	</header>

	<section class="mb-14">
		<div class="mb-4">
			<h2 class="font-display text-xl font-semibold tracking-tight">Basic portal</h2>
			<p class="mt-1 text-sm text-[var(--ink-soft)]">
				Edit the message or toggle the source. The outlet updates live.
			</p>
		</div>
		<div class="surface nest overflow-hidden">
			<BasicDemo />
		</div>
	</section>

	<section class="mb-14">
		<div class="mb-4">
			<h2 class="font-display text-xl font-semibold tracking-tight">Modes</h2>
			<p class="mt-1 text-sm text-[var(--ink-soft)]">
				<code class="rounded-[var(--radius-sm)] bg-[var(--paper-2)] px-1.5 py-0.5 font-mono text-xs"
					>single</code
				>
				keeps the latest In;
				<code class="rounded-[var(--radius-sm)] bg-[var(--paper-2)] px-1.5 py-0.5 font-mono text-xs"
					>multiple</code
				>
				stacks them all.
			</p>
		</div>
		<ModesDemo />
	</section>

	<section class="mb-14">
		<div class="mb-4">
			<h2 class="font-display text-xl font-semibold tracking-tight">Modal dialog</h2>
			<p class="mt-1 text-sm text-[var(--ink-soft)]">
				Trigger from nested UI. The overlay teleports to a host outlet.
			</p>
		</div>
		<ModalDemo />
	</section>

	<section class="mb-14">
		<div class="mb-4">
			<h2 class="font-display text-xl font-semibold tracking-tight">Toast tray</h2>
			<p class="mt-1 text-sm text-[var(--ink-soft)]">
				Nested actions push content into shared chrome through a multiple-mode tunnel.
			</p>
		</div>
		<ToastDemo />
	</section>

	<section class="mb-14">
		<div class="mb-4">
			<h2 class="font-display text-xl font-semibold tracking-tight">Context through In</h2>
			<p class="mt-1 text-sm text-[var(--ink-soft)]">
				Context set above In is available inside teleported content.
			</p>
		</div>
		<div class="surface nest overflow-hidden">
			<ContextDemo />
		</div>
	</section>

	<section class="mb-14">
		<div class="mb-4">
			<h2 class="font-display text-xl font-semibold tracking-tight">Popover</h2>
			<p class="mt-1 text-sm text-[var(--ink-soft)]">
				Tunnel renders popover at a host outlet to avoid overflow/z-index clipping.
			</p>
		</div>
		<PopoverDemo />
	</section>

	<section class="surface rounded-[var(--radius-lg)] p-4 sm:p-5">
		<h2 class="font-display text-base font-semibold tracking-tight">Snippet</h2>
		<div class="mt-3">
			<CodeBlock code={modalSnippet} language="svelte" label="Svelte" tone="dark" />
		</div>
	</section>
</div>
