<script lang="ts">
	import { getDemoProfile } from './context-demo.js';

	const profile = getDemoProfile();
</script>

<div class="card">
	<div class="card-label">getContext · inside In</div>
	<p class="row">
		<span class="key">Name</span>
		<span class="val">{profile.name}</span>
	</p>
	<p class="row">
		<span class="key">Theme</span>
		<span class="val">{profile.theme}</span>
	</p>
</div>

<style>
	.card {
		display: grid;
		gap: 0.45rem;
		min-width: 11rem;
		padding: 0.75rem 0.85rem;
		border-radius: var(--radius-sm);
		background: var(--ink);
		color: #f7f7f8;
	}

	.card-label {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		opacity: 0.55;
		margin-bottom: 0.15rem;
	}

	.row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		margin: 0;
		font-size: 0.8125rem;
	}

	.key {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		opacity: 0.55;
	}

	.val {
		font-weight: 500;
		text-align: right;
		word-break: break-word;
	}
</style>
