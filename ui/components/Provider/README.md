# Stoop UI Provider

## Next.js Setup

### 1. Inject critical CSS server-side

**App Router** (`app/layout.tsx`):
```tsx
import { getCriticalCSS } from 'stoop-ui';

<style dangerouslySetInnerHTML={{ __html: getCriticalCSS() }} />
```

**Pages Router** (`pages/_document.tsx`):
```tsx
import { getCriticalCSS } from 'stoop-ui';

<style dangerouslySetInnerHTML={{ __html: getCriticalCSS() }} />
```

### 2. Wrap your app

```tsx
import { StoopProvider } from 'stoop-ui';

<StoopProvider config={{ theme: "light" }}>
  <App />
</StoopProvider>
```

### 3. Use themes

```tsx
import { useTheme } from 'stoop-ui';

const { themeName, toggleTheme } = useTheme();
```

That's it! No layout shift, no hydration errors. 🎉


