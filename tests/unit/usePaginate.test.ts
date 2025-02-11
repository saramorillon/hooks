import { act, renderHook } from '@testing-library/react'
import { usePaginate, usePaginatedRows, usePaginationState } from '../../src/usePaginate.js'
import { mockTableData } from '../mock.js'

describe('usePaginationState', () => {
  it('should return default index and limit', () => {
    const { result } = renderHook(() => usePaginationState())
    expect(result.current.state.index).toBe(1)
    expect(result.current.state.limit).toBe(10)
  })

  it('should return initial index and limit', () => {
    const { result } = renderHook(() => usePaginationState({ index: 2, limit: 5 }))
    expect(result.current.state.index).toBe(2)
    expect(result.current.state.limit).toBe(5)
  })

  it('should change index', () => {
    const { result } = renderHook(() => usePaginationState())
    act(() => result.current.goTo(2))
    expect(result.current.state.index).toBe(2)
  })

  it('should change limit', () => {
    const { result } = renderHook(() => usePaginationState())
    act(() => result.current.setLimit(5))
    expect(result.current.state.limit).toBe(5)
  })
})

describe('usePaginatedRows', () => {
  it('should return all rows if pagination is empty', () => {
    const { result } = renderHook(() => usePaginatedRows(mockTableData()))
    expect(result.current).toEqual(mockTableData())
  })

  it('should return subset of rows', () => {
    const { result } = renderHook(() => usePaginatedRows(mockTableData(), { index: 2, limit: 7 }))
    expect(result.current).toMatchSnapshot()
  })
})

describe('usePaginate', () => {
  it('should return default index and limit', () => {
    const { result } = renderHook(() => usePaginate(mockTableData()))
    expect(result.current.state.index).toBe(1)
    expect(result.current.state.limit).toBe(10)
  })

  it('should return initial index and limit', () => {
    const { result } = renderHook(() => usePaginate(mockTableData(), { index: 2, limit: 5 }))
    expect(result.current.state.index).toBe(2)
    expect(result.current.state.limit).toBe(5)
  })

  it('should change index', () => {
    const { result } = renderHook(() => usePaginate(mockTableData()))
    act(() => result.current.goTo(2))
    expect(result.current.state.index).toBe(2)
  })

  it('should change limit', () => {
    const { result } = renderHook(() => usePaginate(mockTableData()))
    act(() => result.current.setLimit(5))
    expect(result.current.state.limit).toBe(5)
  })

  it('should return subset of rows', () => {
    const { result } = renderHook(() => usePaginate(mockTableData(), { index: 2, limit: 7 }))
    expect(result.current.rows).toMatchSnapshot()
  })
})
