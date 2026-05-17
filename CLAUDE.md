# 宝秀兰医疗官网 — AI 开发指南
# Baoxiulan Medical Website — AI Developer Guide

> 本文档供未来 AI 助手（Claude Code 等）快速上手本项目。
> This document is for future AI agents to understand and work on this project.

---

## 项目概述 / Project Overview

- **名称 / Name**: 宝秀兰医疗官网 (Baoxiulan Medical Website)
- **域名 / Domain**: baoxiulan.com
- **用途 / Purpose**: 医疗机构展示网站（宝秀兰儿童早期发展中心）+ 简易内容后台
- **技术栈 / Stack**: Next.js 15 App Router · TypeScript · Tailwind CSS · Prisma · SQLite

---

## 目录结构 / Directory Structure

```
app/
  layout.tsx            # Root layout (fonts, globals)
  page.tsx              # 首页 (homepage) — server component, IntersectionObserver scroll reveal
  globals.css           # Design tokens (CSS variables), Tailwind, animation classes
  favicon.ico

  admin/                # 后台管理页面 (protected admin pages)
    layout.tsx          # Admin shell: sidebar nav + main area (does NOT call requireAdmin)
    page.tsx            # 仪表盘 (dashboard) — stat cards + recent articles
    login/
      page.tsx          # Login form — 'use client', POSTs to /api/admin/auth/login
    articles/
      page.tsx          # Article list table — server component
      new/
        page.tsx        # New article editor — 'use client'
      [id]/
        page.tsx        # Edit/delete article editor — 'use client'
    settings/
      page.tsx          # Server wrapper: calls requireAdmin(), renders SettingsClient
      SettingsClient.tsx # Settings form — 'use client'

  api/
    admin/
      auth/
        login/route.ts  # POST: verify credentials → set admin_session cookie
        logout/route.ts # POST: clear admin_session cookie
      articles/
        route.ts        # GET all, POST create
        [id]/route.ts   # GET one, PUT update, DELETE
      settings/
        route.ts        # GET all settings, PUT upsert

  [other pages]/        # Public-facing pages (not yet implemented beyond homepage)

components/
  layout/
    Nav.tsx             # Top navigation bar
    Footer.tsx          # Site footer
  sections/             # Homepage section components (Hero, Founder, Specialists, etc.)
  seo/
    JsonLd.tsx          # JSON-LD structured data component

content/
  site.ts               # Static config (SITE_CONFIG), seed data (EXPERTS_SEED, SERVICES_SEED)

lib/
  db.ts                 # Prisma singleton (globalThis pattern for dev HMR)
  auth.ts               # verifyAdmin(username, password): bcryptjs comparison
  adminAuth.ts          # requireAdmin(): server-side cookie check → redirect if not authed
  seo.ts                # buildMetadata(), orgJsonLd(), physicianJsonLd(), articleJsonLd()

types/
  index.ts              # TypeScript interfaces: Article, Expert, Service, SiteSettings

prisma/
  schema.prisma         # DB schema (SQLite)
  seed.ts               # Idempotent seed script (ts-node)
  dev.db                # SQLite database file (gitignored in production)

assets/
  doctors/              # Doctor photos: 01-baoxiulan.jpg, 02-zhoucongle.jpg, etc.

public/
  logo.png
  og-default.jpg        # OG image 1200×630

Doctors/                # Source doctor images (PNG, original quality)
```

---

## 设计系统 / Design System

CSS variables are defined in `app/globals.css` `:root` block:

| Variable       | Value     | Usage                      |
|----------------|-----------|----------------------------|
| `--blue`       | `#0003A3` | Primary brand color        |
| `--off-white`  | `#F7F8FC` | Page background            |
| `--ink`        | `#08090F` | Body text                  |
| `--muted`      | `#676B88` | Captions, secondary text   |

**Fonts** (self-hosted via `next/font/google`, no CDN required):
- `Noto Serif SC` — Chinese headings
- `Fraunces` — English display/hero text
- `Noto Sans SC` — Body text

**Scroll-reveal animations**:
- Elements start with `.r`, `.r-l`, `.r-r` class (opacity 0, translated)
- JavaScript IntersectionObserver in `app/page.tsx` adds `.in` class when element enters viewport
- `.rsg` on parent triggers stagger animation for children

---

## 数据库 / Database

- **Engine**: SQLite (file: `prisma/dev.db`)
- **ORM**: Prisma 7.x

### Models

| Model        | Key fields                                                      |
|--------------|-----------------------------------------------------------------|
| `Article`    | id, slug (unique), title, excerpt, content, category, author, published, publishedAt, metaTitle, metaDesc |
| `Expert`     | id, slug (unique), name, title, role, bio, specialties*, credentials*, photoPath, sortOrder, isFounder |
| `Service`    | id, slug (unique), name, shortDesc, fullDesc, sortOrder, published |
| `SiteSetting`| key (PK), value — key-value store for site config              |
| `AdminUser`  | id, username (unique), password (bcrypt hash)                  |

**Important**: `specialties` and `credentials` on `Expert` are stored as **JSON strings** in the SQLite column. Always use `JSON.stringify()` on write and `JSON.parse()` on read.

### Common DB commands

```bash
# Run migrations after schema changes
npx prisma migrate dev --name <description>

# Seed the database (idempotent)
npx ts-node prisma/seed.ts

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Reset DB and re-seed (DESTRUCTIVE)
npx prisma migrate reset
```

---

## 后台管理系统 / Admin System

### Authentication

- **URL**: `/admin` — redirects to `/admin/login` if unauthenticated
- **Cookie**: `admin_session=authenticated` (httpOnly, sameSite=lax, 7-day maxAge)
- **Flow**:
  1. POST `/api/admin/auth/login` with `{ username, password }`
  2. Server calls `verifyAdmin()` from `lib/auth.ts` (bcrypt compare)
  3. On success: sets cookie, returns 200
  4. On fail: returns 401
- **Protection**: Each admin page (server component) calls `await requireAdmin()` from `lib/adminAuth.ts` at the top. If cookie is missing/invalid, `redirect('/admin/login')` is thrown.
- **Logout**: POST `/api/admin/auth/logout` clears cookie. Also available via server action in `admin/layout.tsx`.

### Admin Pages

| Route                    | Description                                      |
|--------------------------|--------------------------------------------------|
| `/admin`                 | Dashboard: stat cards, recent articles, quick actions |
| `/admin/articles`        | Article list table with edit links               |
| `/admin/articles/new`    | Create new article (client form)                 |
| `/admin/articles/[id]`   | Edit / delete article (client form)              |
| `/admin/settings`        | Edit site settings: contact, Baidu codes         |

### Admin Layout Pattern

`app/admin/layout.tsx` provides the sidebar chrome but does **NOT** call `requireAdmin()`. This ensures the `/admin/login` page is accessible. Each individual admin page calls `requireAdmin()` itself.

### To reset admin password

```bash
# Option 1: re-run seed with new password
ADMIN_INITIAL_PASSWORD=newpassword npx ts-node prisma/seed.ts

# Option 2: Prisma Studio
npx prisma studio
# Navigate to AdminUser, update the password field with a new bcrypt hash

# Option 3: direct SQLite + node
# Generate hash:
node -e "const b=require('bcryptjs');b.hash('newpass',10).then(console.log)"
# Update:
sqlite3 prisma/dev.db "UPDATE AdminUser SET password='HASH' WHERE username='admin'"
```

---

## SEO / GEO 策略 / SEO & GEO Strategy

### Metadata

All pages should call `buildMetadata()` from `lib/seo.ts`:

```typescript
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: '页面标题',
  description: '页面描述',
  path: '/current-path',
})
```

### JSON-LD Structured Data

Available builders in `lib/seo.ts`:

| Function            | Schema Type           | Used on              |
|---------------------|-----------------------|----------------------|
| `orgJsonLd()`       | `MedicalOrganization` | All pages (in root layout) |
| `physicianJsonLd()` | `Physician`           | Expert detail pages  |
| `articleJsonLd()`   | `Article`             | Article detail pages |

### Baidu Integration

- **Analytics**: Set `baiduAnalyticsId` in SiteSetting table (via `/admin/settings`)
- **Verification**: Set `baiduVerification` in SiteSetting table
- **Sitemap**: Auto-generated at `/sitemap.xml` (see `app/sitemap.ts`)

### Key SEO Keywords (中文)

`宝秀兰医疗` · `鲍秀兰` · `儿童早期发展` · `高危儿干预` · `早产儿` · `北京儿科` · `脑瘫康复` · `发育迟缓`

---

## 常见开发任务 / Common Development Tasks

### 添加新页面 / Add a new page

```typescript
// app/[route]/page.tsx
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: '新页面', path: '/route' })

export default function NewPage() {
  return <main>...</main>
}
```

### 添加新专家 / Add a new expert

1. Insert into `Expert` table via admin or update `EXPERTS_SEED` in `content/site.ts` and re-seed
2. Add photo to `/assets/doctors/` (naming: `05-name.jpg`)
3. Reference the new slug in any listing components

### 修改服务内容 / Edit services

- Currently no services admin page — edit directly via Prisma Studio or add a `/admin/services` page
- Or update `SERVICES_SEED` in `content/site.ts` and re-seed

### 修改首页静态内容 / Edit homepage content

- Static text → edit the relevant component in `components/sections/`
- Dynamic data → update the DB via admin or seed

### 修改设计 tokens / Edit design tokens

Edit CSS variables in `app/globals.css` `:root` block.

### 升级到富文本编辑器 / Upgrade to rich text editor

`@tiptap/react` and `@tiptap/starter-kit` are already installed. Replace the `<textarea>` in:
- `app/admin/articles/new/page.tsx`
- `app/admin/articles/[id]/page.tsx`

with a Tiptap `<EditorContent>` component. Store HTML string in the `content` field.

---

## 部署 / Deployment

### Vercel (推荐 / Recommended)

```bash
vercel --prod
# Environment variables to set in Vercel dashboard:
# DATABASE_URL=file:./prisma/dev.db  (or Postgres URL for production)
# ADMIN_INITIAL_PASSWORD=secure-password
```

### Node.js Server

```bash
npm run build
node .next/standalone/server.js
```

### 环境变量 / Environment Variables

| Variable                  | Required | Description                             |
|---------------------------|----------|-----------------------------------------|
| `DATABASE_URL`            | Yes      | SQLite: `file:./prisma/dev.db`          |
| `ADMIN_INITIAL_PASSWORD`  | No       | Default admin password for seed (default: `admin123`) |
| `NODE_ENV`                | Auto     | `production` enables secure cookies     |

### 生产数据库迁移至 PostgreSQL / Migrate to PostgreSQL

1. Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`
2. Update `DATABASE_URL` to a PostgreSQL connection string
3. Run `npx prisma migrate deploy`
4. Note: Arrays (`specialties`, `credentials`) are stored as JSON strings — this continues to work with PostgreSQL

### 中国网络注意事项 / China Network Considerations

- **字体**: `next/font/google` automatically self-hosts fonts at build time — no Google CDN calls in production
- **Analytics**: Uses Baidu Analytics (百度统计), not Google Analytics
- **Maps**: If embedding maps, use Baidu Maps (`map.baidu.com`) not Google Maps
- **Image CDN**: Use domestic CDN (腾讯云 / 阿里云CDN) for `/public` assets in production

---

## 图片资产 / Image Assets

| Path                                | Description                |
|-------------------------------------|----------------------------|
| `/assets/doctors/01-baoxiulan.jpg`  | 鲍秀兰教授头像             |
| `/assets/doctors/02-zhoucongle.jpg` | 周丛乐教授头像             |
| `/assets/doctors/03-sunshuying.jpg` | 孙淑英副主任医师头像       |
| `/assets/doctors/04-liuweimin.jpg`  | 刘维民主任头像             |
| `/public/og-default.jpg`            | Default OG image 1200×630  |
| `/public/logo.png`                  | Site logo                  |

Source high-res images are in `/Doctors/` (PNG). Web-optimized versions go in `/assets/doctors/`.

---

## 扩展点 / Extension Points (Post-MVP)

| Feature              | Implementation Guide                                                      |
|----------------------|---------------------------------------------------------------------------|
| 在线预约系统          | Add `Appointment` model to `prisma/schema.prisma`, create `/app/appointment/` + admin CRUD |
| 微信公众号登录        | Add WeChat OAuth via `next-auth` WeChat provider                          |
| 多语言 (i18n)        | Add `app/en/` route group, use `next-intl` package                        |
| 视频课程              | Add `Video` model, integrate 腾讯云VOD or 阿里云视频点播                  |
| 全文搜索              | Add SQLite FTS5 virtual table, or integrate Meilisearch                   |
| 富文本编辑器          | Swap `<textarea>` with Tiptap — package already installed (`@tiptap/react`) |
| 专家管理后台          | Add `/app/admin/experts/` CRUD pages following same pattern as articles   |
| 服务管理后台          | Add `/app/admin/services/` CRUD pages                                     |
| 邮件通知              | Add Nodemailer or Resend for appointment confirmation emails              |

---

## 已知限制 / Known Limitations

1. **Auth security**: The `admin_session=authenticated` cookie is a simple flag — not a signed JWT. For production, consider upgrading to a signed session token.
2. **Article content**: MVP uses plain text in a `<textarea>`. Tiptap editor is installed but not wired up.
3. **No CSRF protection** on admin API routes — acceptable for an internal tool.
4. **SQLite concurrency**: Fine for low traffic. Scale to PostgreSQL when write concurrency increases.
5. **No image upload**: Admin article editor has no image upload — cover images must be added directly to the filesystem.
