<script lang="ts">
	import { tunnelStore } from '$lib/store.svelte.js';
	import { onMount } from 'svelte';

	interface Props {
		id: symbol;
	}
	const { id }: Props = $props();
	let anchor = $state<HTMLDivElement>();

	onMount(() => {
		if (anchor === undefined) return;
		tunnelStore[id] = {
			nodes: [anchor, ...(tunnelStore[id]?.nodes ?? [])],
			inputIds: tunnelStore[id]?.inputIds ?? []
		};
		return () => {
			tunnelStore[id] = {
				nodes: (tunnelStore[id]?.nodes ?? []).filter((item) => anchor !== item),

				inputIds: tunnelStore[id]?.inputIds ?? []
			};
		};
	});
</script>

<div style="display: contents !important;" bind:this={anchor}></div>
