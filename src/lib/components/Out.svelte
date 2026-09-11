<script lang="ts">
	import {
		tunnelStore as defaultTunnelStore,
		TUNNEL_CONTEXT_NAME,
		type TunnelState
	} from '$lib/store.svelte.js';
	import { getContext, onMount } from 'svelte';

	interface Props {
		id: symbol | string;
	}
	const { id }: Props = $props();
	let anchor = $state<HTMLDivElement>();
	const tunnelStoreContext =
		getContext<Partial<Record<symbol | string, TunnelState>>>(TUNNEL_CONTEXT_NAME);

	onMount(() => {
		if (anchor === undefined) return;
		const tunnelStore = tunnelStoreContext ?? defaultTunnelStore;

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
