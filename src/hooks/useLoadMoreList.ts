'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export const LOAD_MORE_PAGE_SIZE = 12

/** Shows items in pages; resets visible count when the list shrinks. */
export function useLoadMoreList<T>(items: T[], pageSize = LOAD_MORE_PAGE_SIZE) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(pageSize, items.length))

  useEffect(() => {
    setVisibleCount((c) => Math.min(c, items.length))
  }, [items.length])

  const visible = useMemo(() => items.slice(0, visibleCount), [items, visibleCount])
  const hasMore = visibleCount < items.length
  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + pageSize, items.length))
  }, [items.length, pageSize])

  return { visible, hasMore, loadMore }
}
