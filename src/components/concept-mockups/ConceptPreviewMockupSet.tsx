import Image from 'next/image'
import type { ConceptPreviewSet } from '@/lib/concepts'
import styles from './concept-mockups.module.css'

type Props = {
  set: ConceptPreviewSet
  setIndex: number
}

export default function ConceptPreviewMockupSet({ set, setIndex }: Props) {
  const showDesktop = Boolean(set.desktopUrl?.trim())
  const showMobile = Boolean(set.mobileUrl?.trim())
  if (!showDesktop && !showMobile) return null

  const desktopPriority = setIndex === 0 && showDesktop
  const mobilePriority = setIndex === 0 && showMobile && !showDesktop

  return (
    <div className={styles.set}>
      {showDesktop ? (
        <div className={styles.mbpWrap}>
          <div className={styles.mbp}>
            <div className={styles.mbpLid}>
              <div className={styles.mbpScreenOuter}>
                <div className={styles.mbpScreenInner}>
                  <Image
                    src={set.desktopUrl}
                    alt={set.alt}
                    fill
                    priority={desktopPriority}
                    sizes="(max-width: 768px) 100vw, min(68rem, 100vw)"
                    className={styles.mbpImg}
                  />
                </div>
              </div>
            </div>
            <div className={styles.mbpBase} aria-hidden />
            <div className={styles.mbpFoot} aria-hidden />
          </div>
        </div>
      ) : null}

      {showMobile && set.mobileUrl ? (
        <div className={styles.iphoneWrap}>
          <div className={styles.iphone}>
            <div className={styles.iphoneShell}>
              <div className={styles.iphoneInner}>
                <div className={styles.antenna} aria-hidden />
                <div className={styles.iphoneScreen}>
                  <Image
                    src={set.mobileUrl}
                    alt={set.alt}
                    fill
                    priority={mobilePriority}
                    sizes="(max-width: 768px) 42vw, 16rem"
                    className={styles.iphoneImg}
                  />
                </div>
                <div className={styles.island} aria-hidden />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
