# usePagination

`usePagination` offers an easy way to generate a full pagination system.

## Example

```tsx
import { usePagination } from '@saramorillon/hooks'
import { getData } from './service'

const limit = 10

function MyComponent() {
  const { page, maxPages, setMaxPages, first, previous, next, last, canPrevious, canNext } = usePagination()
  const fetch = useCallback(() => getData(page, limit), [page])
  const [{ data, total }] = useFetch(fetch, { data: [], total: 0 })

  useEffect(() => {
    setMaxPages(Math.ceil(total / limit))
  }, [setMaxPages, total])
}

return (
  <div>
    <button disabled={!canPrevious} onClick={first}>
      First page
    </button>
    <button disabled={!canPrevious} onClick={previous}>
      Previous page
    </button>
    <span>
      Page {page} of {maxPages}
    </span>
    <button disabled={!canNext} onClick={next}>
      Next page
    </button>
    <button disabled={!canNext} onClick={last}>
      Last page
    </button>
  </div>
)
```

## API

```typescript
usePagination(maxPage: number, initialValue = 1): IPagination
```

### Arguments

`maxPage: number` - the maximum page.

`initialValue?: number` - the initial page (default 1).

### Returns

An object containing:

- `page: number` - the current page.
- `goTo: React.Dispatch<React.SetStateAction<number>>` - a function to go to a specific page.
- `first: () => void` - a function to go to the first page.
- `previous: () => void` - a function to go to the previous page.
- `next: () => void` - a function to go to the next page.
- `last: () => void` - a function to go to the last page.
- `canPrevious: boolean` - indicates weither the navigation to the previous page is possible.
- `canNext: boolean` - indicates weither the navigation to the next page is possible.
