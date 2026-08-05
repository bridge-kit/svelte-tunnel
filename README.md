# svelte-tunnel

Portal content across your Svelte component tree with paired `In` / `Out` tunnels.

Render markup from deep in the tree into a distant outlet — headers, toasts, modals, drawers, or any shared chrome — without prop drilling or global DOM hacks.

**Docs & demos:** [bridge-kit.github.io/svelte-tunnel](https://bridge-kit.github.io/svelte-tunnel/)

## Why a tunnel?

Keep content next to the logic that owns it, while rendering into shared surfaces:

- **Paired portals** — each `tunnel()` call returns a matched `In` / `Out` pair scoped to that instance
- **Single or multiple** — last-wins for menus and tabs, or stack every `In` for toasts and trays
- **Svelte 5 native** — built with runes, snippets, and mount / unmount; no extra runtime

## Install

```sh
pnpm add @bridge-stack/svelte-tunnel
# or: npm i @bridge-stack/svelte-tunnel
# or: bun add @bridge-stack/svelte-tunnel
```

Peer dependency: **Svelte 5**.

## Usage

```svelte
<script>
	import { tunnel } from '@bridge-stack/svelte-tunnel';

	const Portal = tunnel();
</script>

<header>
	<Portal.Out />
</header>

<main>
	<Portal.In>
		<button>Rendered in the header</button>
	</Portal.In>
</main>
```

Mount `In` next to the logic that owns the content. Place `Out` where that content should appear. When `In` mounts or unmounts, the outlet updates.

## Modes

| Mode               | Behavior                                          |
| ------------------ | ------------------------------------------------- |
| `single` (default) | Only the last mounted `In` is shown at each `Out` |
| `multiple`         | Every mounted `In` is shown at every `Out`        |

```ts
const Portal = tunnel({ mode: 'multiple' });
```

Use `single` for exclusive UI (active tab label, one open menu). Use `multiple` when several sources should appear together (toast stacks, toolbars).

## Examples

Interactive demos live on the [examples page](https://bridge-kit.github.io/svelte-tunnel/examples/). Patterns below mirror those demos.

### Modal dialog

Trigger from nested UI; render the overlay at a host outlet.

```svelte
<script>
	import { tunnel } from '@bridge-stack/svelte-tunnel';

	const Modal = tunnel();
	let open = $state(false);
</script>

<!-- host / overlay root -->
<Modal.Out />

<!-- deep in the tree -->
{#if open}
	<Modal.In>
		<div role="dialog" aria-modal="true">…</div>
	</Modal.In>
{/if}
```

### Toast tray

Push notifications from nested actions into shared chrome with `mode: 'multiple'`.

```svelte
<script>
	import { tunnel } from '@bridge-stack/svelte-tunnel';

	const Toast = tunnel({ mode: 'multiple' });
	let toasts = $state<{ id: number; text: string }[]>([]);
</script>

<header>
	<Toast.Out />
</header>

<button onclick={() => (toasts = [...toasts, { id: Date.now(), text: 'Saved' }])}>
	Save
</button>

{#each toasts as toast (toast.id)}
	<Toast.In>
		<span>{toast.text}</span>
	</Toast.In>
{/each}
```

### Context through `In`

Context set above `In` remains available inside teleported content — even though it renders at `Out`.

```svelte
<script>
	import { createContext } from 'svelte';
	import { tunnel } from '@bridge-stack/svelte-tunnel';

	const [getUser, setUser] = createContext<{ name: string }>();
	const Portal = tunnel();

	setUser({ name: 'Ada' });
</script>

<Portal.In>
	<!-- getUser() works here, at the Out -->
</Portal.In>

<Portal.Out />
```

### Popover / overflow escape

Teleport menus and overlays to a host outlet so they are not clipped by `overflow: hidden` or stuck under a low `z-index`.

```svelte
<script>
	import { tunnel } from '@bridge-stack/svelte-tunnel';

	const Popover = tunnel();
	let open = $state(false);
</script>

<div style="overflow: hidden">
	<button onclick={() => (open = !open)}>Menu</button>
	{#if open}
		<Popover.In>
			<div role="menu">…</div>
		</Popover.In>
	{/if}
</div>

<!-- outside the clipped region -->
<Popover.Out />
```

## API

```ts
import { tunnel } from '@bridge-stack/svelte-tunnel';

const { In, Out } = tunnel({ mode?: 'single' | 'multiple' });
```

| Export | Role                                      |
| ------ | ----------------------------------------- |
| `In`   | Wraps content to teleport                 |
| `Out`  | Marks where that content should appear    |

Create a new tunnel for each independent portal pair. Multiple `Out`s on the same tunnel all receive the same teleported content according to the mode.

## Develop

```sh
pnpm install
pnpm dev
```

Library source lives in `src/lib`. The site under `src/routes` is the docs/demo app (`/` landing, `/examples` demos).

```sh
pnpm check   # typecheck
pnpm test    # unit tests
pnpm build   # site + package
pnpm deploy  # build and publish the docs site
```

## License

[MIT](./LICENSE)
