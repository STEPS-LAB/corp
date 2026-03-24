/** Tell all open tabs (and this window) that KV CMS changed — public site should refetch /api/content. */
const EVENT = 'stepslab:cms-updated'
const CHANNEL = 'stepslab-cms'

export function notifyPublicCmsUpdated(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(EVENT))
  try {
    const bc = new BroadcastChannel(CHANNEL)
    bc.postMessage('u')
    bc.close()
  } catch {
    /* Safari private mode, etc. */
  }
}

export function subscribeToCmsUpdates(handler: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const onEvent = () => handler()
  window.addEventListener(EVENT, onEvent)

  let bc: BroadcastChannel | null = null
  try {
    bc = new BroadcastChannel(CHANNEL)
    bc.onmessage = () => handler()
  } catch {
    /* ignore */
  }

  return () => {
    window.removeEventListener(EVENT, onEvent)
    bc?.close()
  }
}
