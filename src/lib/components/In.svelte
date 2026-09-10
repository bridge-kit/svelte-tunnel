<script lang="ts">
	import { mount, unmount, type Snippet } from 'svelte';
	import ChildrenRenderer from './ChildrenRenderer.svelte';
	import type { TunnelOptions } from '$lib/tunnel.js';
	import { getTunnelStore } from '$lib/store.svelte.js';

	interface Props {
		id: symbol | string;
		children?: Snippet;
		options: TunnelOptions;
	}
	const { id, children, options }: Props = $props();
	const componentId = $props.id();
	const tunnelStore = getTunnelStore();

	$effect(() => {
		if (options.mode === 'single') return;
		const ctx = tunnelStore[id];
		if (ctx === undefined) return;

		const mountedNodes = ctx.nodes.map((node) =>
			mount(ChildrenRenderer, { target: document, anchor: node, props: { children }, intro: true })
		);

		return () =>
			mountedNodes.forEach((node) => {
				unmount(node, { outro: true });
			});
	});
	$effect(() => {
		if (options.mode === 'multiple') return;
		const ctx = tunnelStore[id];
		if (ctx === undefined) return;
		if (!ctx.inputIds.includes(componentId)) ctx.inputIds.push(componentId);
	});
	$effect(() => {
		return () => {
			if (options.mode === 'multiple') return;
			const ctx = tunnelStore[id];
			if (ctx === undefined) return;
			ctx.inputIds = ctx.inputIds.filter((item) => item !== componentId);
		};
	});
	$effect(() => {
		if (options.mode === 'multiple') return;
		const ctx = tunnelStore[id];
		if (ctx === undefined) return;
		const isLast = ctx.inputIds[ctx.inputIds.length - 1] === componentId;
		if (!isLast) return;

		const mountedNodes = ctx.nodes.map((node) =>
			mount(ChildrenRenderer, { target: document, anchor: node, props: { children }, intro: true })
		);

		return () =>
			mountedNodes.forEach((node) => {
				unmount(node, { outro: true });
			});
	});
</script>
