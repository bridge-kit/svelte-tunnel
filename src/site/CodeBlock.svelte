<script lang="ts">
	import { highlightCode, type CodeLanguage } from './highlighter.js';

	let {
		code,
		language = 'js',
		label = '',
		tone = 'dark'
	}: {
		code: string;
		language?: CodeLanguage;
		label?: string;
		tone?: 'dark' | 'light';
	} = $props();

	let copied = $state(false);
	let html = $state('');
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		const nextCode = code;
		const nextLang = language;
		const nextTone = tone;
		let cancelled = false;

		highlightCode(nextCode, nextLang, nextTone).then((result) => {
			if (!cancelled) html = result;
		});

		return () => {
			cancelled = true;
		};
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => {
				copied = false;
			}, 1600);
		} catch {
			copied = false;
		}
	}
</script>

<div class="code-block" class:light={tone === 'light'} class:dark={tone === 'dark'}>
	<div class="toolbar">
		{#if label}
			<span class="label">{label}</span>
		{:else}
			<span class="label muted">{language}</span>
		{/if}
		<button type="button" class="copy" onclick={copy} aria-label={copied ? 'Copied' : 'Copy code'}>
			{#if copied}
				Copied
			{:else}
				Copy
			{/if}
		</button>
	</div>
	<!-- highlighted markup from Shiki for local code strings only -->
	<div class="body">
		{#if html}
			{@html html}
		{:else}
			<pre><code>{code}</code></pre>
		{/if}
	</div>
</div>

<style>
	.code-block {
		overflow: hidden;
		border-radius: var(--radius);
		border: 1px solid var(--line);
	}

	.code-block.dark {
		background: var(--ink);
		color: #e8eaf0;
		border-color: var(--ink);
	}

	.code-block.light {
		background: var(--paper);
		color: var(--ink);
		border-color: var(--line);
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.55rem 0.75rem 0.45rem;
		border-bottom: 1px solid #2a2e38;
	}

	.code-block.light .toolbar {
		border-bottom-color: var(--line);
	}

	.label {
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.label.muted {
		color: var(--ink-soft);
	}

	.copy {
		border: 1px solid #3a3f4a;
		border-radius: calc(var(--radius-sm) - 0.05rem);
		min-height: 1.75rem;
		padding: 0.3rem 0.7rem;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1;
		cursor: pointer;
		background: var(--ink-hover);
		color: inherit;
		transition: background-color 120ms var(--ease-out);
	}

	.code-block.light .copy {
		border-color: var(--line);
		background: var(--paper-2);
	}

	.copy:hover {
		background: #3a3f4a;
	}

	.code-block.light .copy:hover {
		background: var(--line);
	}

	.copy:active {
		opacity: 0.9;
	}

	.body {
		overflow-x: auto;
	}

	.body :global(pre) {
		margin: 0;
		padding: 1rem 1.05rem 1.1rem;
		background: transparent !important;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.65;
		overflow-x: auto;
	}

	.body :global(code) {
		font-family: inherit;
		font-size: inherit;
	}
</style>
