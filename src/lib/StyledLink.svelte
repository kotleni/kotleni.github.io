<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    interface Props extends HTMLAnchorAttributes { };
    const { children, ...otherProps }: Props = $props();
</script>

<a
  {...otherProps}
  class="text-primary hover:bg-primary hover:text-background"
>
  {@render children?.()}
</a>