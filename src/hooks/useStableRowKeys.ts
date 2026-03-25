import { useRef } from 'react'

/**
 * Stable React keys for collection editor rows so changing `id` (or slug) in a field
 * does not remount the row and steal input focus.
 */
export function useStableRowKeys(items: { id: string }[]): string[] {
  const state = useRef<{ keys: string[]; lastSig: string }>({ keys: [], lastSig: '' })

  const idsSig = items.map((x) => x.id).join('\0')

  if (items.length === 0) {
    state.current.keys = []
    state.current.lastSig = ''
    return []
  }

  const keys = state.current.keys
  const oldSig = state.current.lastSig
  const oldIds = oldSig.length > 0 ? oldSig.split('\0') : []

  if (keys.length === 0) {
    state.current.keys = items.map(() => crypto.randomUUID())
    state.current.lastSig = idsSig
    return state.current.keys
  }

  if (items.length > keys.length) {
    while (keys.length < items.length) keys.push(crypto.randomUUID())
    state.current.lastSig = idsSig
    return keys
  }

  if (items.length < keys.length) {
    const nextKeys: string[] = []
    for (const nid of items.map((x) => x.id)) {
      const oi = oldIds.indexOf(nid)
      if (oi >= 0 && oi < keys.length) nextKeys.push(keys[oi]!)
      else nextKeys.push(crypto.randomUUID())
    }
    state.current.keys = nextKeys
    state.current.lastSig = idsSig
    return nextKeys
  }

  state.current.lastSig = idsSig
  return keys
}
