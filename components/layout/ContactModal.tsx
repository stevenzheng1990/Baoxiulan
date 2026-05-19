'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useSettings } from '@/components/SettingsProvider'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const settings = useSettings()
  const QR_ITEMS = [
    {
      key: 'wechat',
      label: '微信公众号',
      sub: 'WeChat Official',
      src: settings.wechatQr,
      accent: '#07C160',
      hint: '扫码关注，获取育儿科普与门诊信息',
    },
    {
      key: 'weibo',
      label: '官方微博',
      sub: 'Sina Weibo',
      src: settings.weiboQr,
      accent: '#E6162D',
      hint: '扫码关注，掌握专家动态与科研资讯',
    },
  ]
  // ESC to close + body scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <div
      className={`contact-modal ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="联系我们"
      onClick={onClose}
    >
      <div className="contact-modal-backdrop" />

      <div
        className="contact-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="contact-modal-head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              联系我们 · Contact
            </p>
            <h2 className="contact-modal-title">
              扫码关注，<em>持续守护</em>
            </h2>
            <p className="contact-modal-lede">
              欢迎通过微信公众号或官方微博与我们保持联系，第一时间获取门诊安排、专家直播与育儿科普。
            </p>
          </div>
          <button
            type="button"
            aria-label="关闭"
            className="contact-modal-close"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {/* QR grid */}
        <div className="contact-modal-grid">
          {QR_ITEMS.map((item, i) => (
            <div
              key={item.key}
              className="qr-card"
              style={{
                ['--accent' as string]: item.accent,
                ['--delay' as string]: `${0.18 + i * 0.1}s`,
              }}
            >
              <div className="qr-card-frame">
                {/* Corner brackets */}
                <span aria-hidden="true" className="qr-corner qr-corner-tl" />
                <span aria-hidden="true" className="qr-corner qr-corner-tr" />
                <span aria-hidden="true" className="qr-corner qr-corner-bl" />
                <span aria-hidden="true" className="qr-corner qr-corner-br" />

                <div className="qr-card-img">
                  <Image
                    src={item.src}
                    alt={`${item.label}二维码`}
                    fill
                    sizes="(max-width: 640px) 70vw, 220px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="qr-card-meta">
                <div className="qr-card-label">
                  <span
                    aria-hidden="true"
                    className="qr-card-dot"
                  />
                  {item.label}
                </div>
                <div className="qr-card-sub">{item.sub}</div>
                <p className="qr-card-hint">{item.hint}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="contact-modal-foot">
          <span>长按或扫描二维码即可关注</span>
          <span className="contact-modal-foot-rule" aria-hidden="true" />
          <span>Press &amp; hold or scan to follow</span>
        </footer>
      </div>

      <style>{`
        .contact-modal {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 4vw, 2rem);
          pointer-events: none;
        }
        .contact-modal.is-open {
          pointer-events: auto;
        }
        .contact-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(8, 10, 28, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .contact-modal.is-open .contact-modal-backdrop {
          opacity: 1;
        }

        .contact-modal-panel {
          position: relative;
          z-index: 1;
          width: min(880px, 100%);
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          background: var(--white);
          padding: clamp(1.75rem, 3vw, 2.75rem) clamp(1.5rem, 3vw, 2.75rem);
          border: 1px solid var(--border);
          opacity: 0;
          transform: translateY(24px) scale(0.97);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
          box-shadow:
            0 30px 70px -30px rgba(0,3,163,0.28),
            0 1px 0 rgba(0,3,163,0.04);
        }
        .contact-modal.is-open .contact-modal-panel {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .contact-modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
        }
        .contact-modal-title {
          font-family: var(--serif-cn);
          font-size: clamp(1.6rem, 3vw, 2.1rem);
          font-weight: 400;
          line-height: 1.25;
          color: var(--ink);
          margin-top: 0.7rem;
          letter-spacing: -0.01em;
        }
        .contact-modal-title em {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          color: var(--blue);
        }
        .contact-modal-lede {
          margin-top: 0.7rem;
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 460px;
        }
        .contact-modal-close {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          background: var(--paper);
          color: var(--ink-soft);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .contact-modal-close:hover {
          background: var(--blue);
          color: #ffffff;
          border-color: var(--blue);
          transform: rotate(90deg);
        }

        .contact-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1rem, 2.5vw, 1.75rem);
        }

        .qr-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(1rem, 2vw, 1.5rem);
          background: var(--paper);
          border: 1px solid var(--border);
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--delay),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--delay),
            box-shadow 0.4s ease,
            border-color 0.4s ease;
        }
        .contact-modal.is-open .qr-card {
          opacity: 1;
          transform: translateY(0);
        }
        .qr-card:hover {
          border-color: var(--accent);
          box-shadow: 0 18px 40px -28px rgba(0,3,163,0.25);
        }
        .qr-card-frame {
          position: relative;
          width: clamp(160px, 22vw, 220px);
          aspect-ratio: 1 / 1;
          padding: 14px;
          background: #ffffff;
        }
        .qr-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 1.5px solid var(--accent);
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .qr-corner-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .qr-corner-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .qr-corner-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .qr-corner-br { bottom: 0; right: 0; border-left: none; border-top: none; }
        .qr-card:hover .qr-corner {
          width: 20px;
          height: 20px;
        }
        .qr-card-img {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .qr-card-meta {
          margin-top: 1.1rem;
          text-align: center;
        }
        .qr-card-label {
          font-family: var(--serif-cn);
          font-size: 1rem;
          color: var(--ink);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .qr-card-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
        }
        .qr-card-sub {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 0.35rem;
        }
        .qr-card-hint {
          margin-top: 0.7rem;
          font-size: 0.78rem;
          line-height: 1.6;
          color: var(--ink-soft);
          max-width: 220px;
        }

        .contact-modal-foot {
          margin-top: clamp(1.4rem, 3vw, 2rem);
          padding-top: 1.2rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
        .contact-modal-foot-rule {
          display: inline-block;
          width: 24px;
          height: 1px;
          background: var(--border);
        }

        @media (max-width: 640px) {
          .contact-modal-grid {
            grid-template-columns: 1fr;
          }
          .contact-modal-head {
            flex-direction: column;
          }
          .contact-modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-modal-backdrop,
          .contact-modal-panel,
          .qr-card {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
