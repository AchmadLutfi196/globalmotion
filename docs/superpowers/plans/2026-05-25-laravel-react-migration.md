# Laravel React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate 4 Next.js design pages (Home, About, Services, Tracking) and their global layout into a Laravel 13 + Inertia + React application.

**Architecture:** We will integrate the design system CSS tokens into Tailwind v4, modify the root Blade template to support the fonts (Material Symbols & Google Fonts), create a new `MainLayout` for public pages, and migrate the 4 public pages.

**Tech Stack:** Laravel 13, React 19, Inertia.js 3, Tailwind CSS v4.

---

### Task 1: Frontend Infrastructure & Theme (CSS Tokens)

**Files:**
- Modify: `resources/css/app.css`
- Modify: `resources/views/app.blade.php`
- Modify: `package.json`

- [ ] **Step 1: Update Tailwind Tokens in `resources/css/app.css`**
Add the design variables from `desain global-motion/app/globals.css` into the `@theme` block of `resources/css/app.css` (keeping the existing Shadcn variables if they don't conflict, but overriding the font and color system to match the design). Add the custom `@layer utilities` for `.text-headline-xl`, `.glass-panel`, etc.

- [ ] **Step 2: Add Font CDN links to `resources/views/app.blade.php`**
Add the Google Fonts (Inter, Hanken Grotesk, JetBrains Mono) and Material Symbols Outlined stylesheet to the `<head>` of the blade file.

- [ ] **Step 3: Add `framer-motion` if needed or standard icons (Lucide is already installed)**
Material Symbols Outlined will be used primarily as per the design.

- [ ] **Step 4: Commit changes**
```bash
git add resources/css/app.css resources/views/app.blade.php
git commit -m "feat: setup global motion css tokens and fonts"
```

### Task 2: Global Layout & Navigation

**Files:**
- Create: `resources/js/layouts/MainLayout.tsx`
- Create: `resources/js/components/MainNavbar.tsx`
- Create: `resources/js/components/MainFooter.tsx`

- [ ] **Step 1: Create `MainNavbar.tsx`**
Extract the `<nav>` section from `desain global-motion/app/layout.tsx`. Update Next.js `<Link>` and `<Image>` components to Inertia `<Link>` and standard `<img>`.

- [ ] **Step 2: Create `MainFooter.tsx`**
Extract the `<footer>` section from `desain global-motion/app/layout.tsx`. Update Links and Images to standard HTML/Inertia equivalents.

- [ ] **Step 3: Create `MainLayout.tsx`**
Combine `MainNavbar`, `{children}`, and `MainFooter` in a layout wrapper. Apply the body background and text classes.

- [ ] **Step 4: Commit changes**
```bash
git add resources/js/layouts/MainLayout.tsx resources/js/components/MainNavbar.tsx resources/js/components/MainFooter.tsx
git commit -m "feat: create main layout for public pages"
```

### Task 3: Migrate Home/Welcome Page

**Files:**
- Modify: `resources/js/pages/welcome.tsx`

- [ ] **Step 1: Replace content in `welcome.tsx`**
Copy the `Home` component body from `desain global-motion/app/page.tsx` into `resources/js/pages/welcome.tsx`. 

- [ ] **Step 2: Apply `MainLayout`**
Set `Welcome.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;` and remove the default Auth layout logic from the welcome page if any.

- [ ] **Step 3: Update Next.js specific components**
Change `next/link` to `@inertiajs/react` `Link`. Change `next/image` to standard `<img>`.

- [ ] **Step 4: Commit changes**
```bash
git add resources/js/pages/welcome.tsx
git commit -m "feat: migrate home page design"
```

### Task 4: Migrate About Page

**Files:**
- Create: `resources/js/pages/about.tsx`
- Modify: `routes/web.php`

- [ ] **Step 1: Add Route in `web.php`**
```php
Route::inertia('/about', 'about')->name('about');
```

- [ ] **Step 2: Create `about.tsx`**
Copy the `AboutPage` component from `desain global-motion/app/about/page.tsx`. Set the layout to `MainLayout`. Update Links and Images.

- [ ] **Step 3: Commit changes**
```bash
git add resources/js/pages/about.tsx routes/web.php
git commit -m "feat: migrate about page design"
```

### Task 5: Migrate Services Page

**Files:**
- Create: `resources/js/pages/services.tsx`
- Modify: `routes/web.php`

- [ ] **Step 1: Add Route in `web.php`**
```php
Route::inertia('/services', 'services')->name('services');
```

- [ ] **Step 2: Create `services.tsx`**
Copy the `ServicesPage` component from `desain global-motion/app/services/page.tsx`. Set the layout to `MainLayout`. Update Links and Images.

- [ ] **Step 3: Commit changes**
```bash
git add resources/js/pages/services.tsx routes/web.php
git commit -m "feat: migrate services page design"
```

### Task 6: Migrate Tracking Page

**Files:**
- Create: `resources/js/pages/tracking.tsx`
- Modify: `routes/web.php`

- [ ] **Step 1: Add Route in `web.php`**
```php
Route::inertia('/tracking', 'tracking')->name('tracking');
```

- [ ] **Step 2: Create `tracking.tsx`**
Copy the `TrackingPage` component from `desain global-motion/app/tracking/page.tsx`. Set the layout to `MainLayout`. Update Links and Images.

- [ ] **Step 3: Commit changes**
```bash
git add resources/js/pages/tracking.tsx routes/web.php
git commit -m "feat: migrate tracking page design"
```
