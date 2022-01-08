# Hooks

Some utility hooks.

# Table of contents

- [useTheme](#usetheme)
- [useFetch](#usefetch)
- [usePagination](#usepagination)
- [useTextField](#usetextfield)
- [useBooleanField](#usebooleanfield)
- [useNumberField](#usenumberfield)
- [useSelectField](#useselectfield)
- [useMultiSelectField](#usemultiselectfield)
- [useCopy](#usecopy)
- [Contribute](#contribute)

# useTheme

`useTheme` returns 'dark' or 'light' according to prefers-color-scheme media query.

It also changes document root color-scheme accordingly.

## Example

```typescript
import { useTheme } from '@saramorillon/hooks'

function MyComponent() {
  const theme = useTheme()
  return theme === 'dark' ? <Dark /> : <Light />
}
```

## API

```typescript
useTheme(): Theme
```

### Arguments

None

### Returns

`Theme` - The theme ("light" or "dark").

# useFetch

`useFetch` provides an easy way to make any action that triggers a loading, returns some data and may generate an error (typical API call use case).

It also provides a refresh function to replay the action.

## Example

```typescript
import { useFetch } from '@saramorillon/hooks'
import { getData } from './service'

function MyComponent() {
  const [data, status, refresh] = useFetch(getData, null)

  if (status.loading) return <Spinner />
  if (status.error) return <Error />
  return (
    <>
      <Button onClick={refresh} />
      <Table data={data} />
    </>
  )
}
```

# API

```typescript
useFetch<T>(fetchFn: () => Promise<T>, defaultValue?: T): [T, IFetchedStatus, () => void]
```

### Arguments

`fetchFn: () => Promise<T>` - The action to run. **/!\ Must be memoized to avoid potential infinite loops.**

`defaultValue: T` - The default value to return.

### Returns

An array containing:

- `T` - the value returned by the action
- `IFetchedStatus` - an object containing
  - `loading: boolean` - indicates weither the action is currently pending or not
  - `error: unknown` - the error potentially generated by the action
- `() => void` - a refresh function

# usePagination

`usePagination` provides an easy way to generate a full pagination system.

## Example

```typescript
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
usePagination(): IPagination
```

### Arguments

None

### Returns

An object containing:

- `page: number` - the current page
- `maxPage: number` - the max page
- `setMaxPage: React.Dispatch<React.SetStateAction<number>>` - a function to change the max page
- `goTo: React.Dispatch<React.SetStateAction<number>>` - a function to go to a specific page
- `first: () => void` - a function to go to the first page
- `previous: () => void` - a function to go to the previous page
- `next: () => void` - a function to go to the next page
- `last: () => void` - a function to go to the last page
- `canPrevious: boolean` - indicates weither the navigation to the previous page is possible
- `canNext: boolean` - indicates weither the navigation to the next page is possible

# useTextField

`useTextField` is a wrapper around useState designed for text form fields based on component state or props.

Unlike useState, it automatically refreshes when input value changes.

## Example

```typescript
import { useTextField } from '@saramorillon/hooks'

type Data {
  name: string
}

function MyComponent({ data }: { data: Data }) {
  const [name, setName] = useTextField(data.name)

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  )
}
```

## API

```typescript
useTextField(input?: string): State<string>
```

### Arguments

`input?: string` - The input value. Default to "".

### Returns

An array containing:

- `string` - the current value
- `React.Dispatch<React.SetStateAction<string>>` - the value modifier

# useBooleanField

`useBooleanField` is a wrapper around useState designed for boolean form fields based on component state or props.

Unlike useState, it automatically refreshes when input value changes.

## Example

```typescript
import { useBooleanField } from '@saramorillon/hooks'

type Data {
    valid: boolean
}

function MyComponent({ data }: { data: Data }) {
const [valid, setValid] = fields.useBoolean(data.valid)

  return (
    <form>
      <input type="checkbox" checked={valid} onChange={(e) => setValid(e.target.checked)} />
    </form>
  )
}
```

## API

```typescript
useBooleanField(input?: boolean): State<boolean>
```

### Arguments

`input?: boolean` - The input value. Default to false.

### Returns

An array containing:

- `boolean` - the current value
- `React.Dispatch<React.SetStateAction<boolean>>` - the value modifier

# useNumberField

`useNumberField` is a wrapper around useState designed for number form fields based on component state or props.

Unlike useState, it automatically refreshes when input value changes.

## Example

```typescript
import { useNumberField } from '@saramorillon/hooks'

type Data {
  quantity: number
}

function MyComponent({ data }: { data: Data }) {
  const [quantity, setQuantity] = useNumberField(data.quantity)

  return (
    <form>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
    </form>
  )
}
```

## API

```typescript
useNumberField(input?: number): State<number>
```

### Arguments

`input?: number` - The input value. Default to 0.

### Returns

An array containing:

- `number` - the current value
- `React.Dispatch<React.SetStateAction<number>>` - the value modifier

# useSelectField

`useSelectField` is a wrapper around useState designed for select form fields based on component state or props.

Unlike useState, it automatically refreshes when input value changes.

## Example

```typescript
import { useSelectField } from '@saramorillon/hooks'

type Data {
  color: 'red' | 'green' | 'blue'
}

function MyComponent({ data }: { data: Data }) {
  const [color, setColor] = useSelectField(data.color)

  return (
    <form>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    </form>
  )
}
```

## API

```typescript
useSelect<T>(input: T): State<T>
```

### Arguments

`input: T` - The input value. **/!\ Must be memoized to avoid infinite loops.**

### Returns

An array containing:

- `T` - the current value
- `React.Dispatch<React.SetStateAction<T>>` - the value modifier

# useMultiSelectField

`useMultiSelectField` is a wrapper around useState designed for multiple select form fields based on component state or props.

Unlike useState, it automatically refreshes when input value changes.

## Example

```typescript
import { useMultiSelectField } from '@saramorillon/hooks'

type Data {
  colors: ('red' | 'green' | 'blue')[]
}

function MyComponent({ data }: { data: Data }) {
  const [colors, setColors] = useMultiSelectField(data.colors)

  return (
    <form>
      <select value={colors} onChange={(e) => setColors(Array.from(e.target.selectedOptions, (option) => option.value))}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    </form>
  )
}
```

## API

```typescript
useMultiSelect<T>(input?: T[]): State<T[]>
```

### Arguments

`input` _\[?T\[\]\]_: The input value. Default to \[\]. **/!\ Must be memoized to avoid infinite loops.**

### Returns

An array containing:

- `T[]` - the current values
- `React.Dispatch<React.SetStateAction<T[]>>` - the values modifier
- `(value: T) => void` - a function to add a value
- `(value: T) => void` - a function to remove a value
- `(value: T) => void` - a function to toggle a value

_Note that additional modifiers are based on `includes` and `filter` fonctions and will only work on primitive or referenced values._

# useCopy

`useCopy` provides an easy way to implement clipboard copy on you website.

## Example

```typescript
import { useCopy } from '@saramorillon/hooks'

function MyComponent() {
  const [authorized, status, copy] = useCopy(data.name)

  return (
    <button disabled={!authorized} onClick={copy}>
      Copy
    </button>
  )
}
```

## API

```typescript
useCopy(): [boolean, ICopyStatus, (data: string) => void]
```

### Arguments

None

### Returns

An array containing:

- `boolean` - indicates weither the copy is allowed or not
- `ICopyStatus` - an object containing
  - `loading: boolean` - indicates weither the copy is currently pending or not
  - `error: unknown` - the error potentially generated by the copy
- `(data: string) => void` - the copy function

# Contribute

Any PR is welcomed! Please be sure to meet following requirements when posting a PR:

- Unit tests pass and code coverage is over 90%
- Code conventions have been respected (`yarn lint` can help)
- Code is properly formatted (`yarn format` can help)
