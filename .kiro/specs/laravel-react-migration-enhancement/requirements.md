# Requirements Document: Global Motion Laravel Migration & Enhancement

## Introduction

Global Motion adalah aplikasi logistics & shipping (freight forwarding) yang saat ini dibangun dengan Next.js. Project ini bertujuan untuk melakukan migrasi penuh dari Next.js ke Laravel 13 dengan React (Inertia.js) sebagai frontend, sekaligus meningkatkan UI/UX menggunakan prinsip-prinsip desain modern dan professional untuk menciptakan aplikasi full-stack yang lebih robust, scalable, dan menarik.

Aplikasi ini akan menangani operasi freight forwarding multi-modal (Air, Ocean, Land), tracking shipment real-time, manajemen quote, dan customer relationship management untuk industri logistics global.

## Glossary

- **System**: Aplikasi Global Motion secara keseluruhan (Laravel backend + React frontend via Inertia.js)
- **Backend**: Laravel 13 application layer yang menangani business logic, database, dan API
- **Frontend**: React components yang di-render melalui Inertia.js
- **Migration_Engine**: Komponen yang bertanggung jawab untuk migrasi data dan struktur dari Next.js ke Laravel
- **Auth_System**: Laravel Fortify-based authentication system dengan support untuk login, registration, 2FA, dan password reset
- **Tracking_System**: Real-time shipment tracking system dengan timeline visualization
- **Quote_System**: Request for quote (RFQ) management system untuk freight services
- **Admin_Panel**: Dashboard untuk admin mengelola shipments, quotes, users, dan analytics
- **Customer_Portal**: Interface untuk customers melihat shipments, request quotes, dan manage profile
- **Design_System**: Material Design 3-inspired design tokens (colors, typography, spacing) yang sudah ada di Next.js version
- **UI_Enhancement**: Peningkatan visual dan interaktif menggunakan prinsip UI/UX Pro Max
- **Shipment**: Entitas pengiriman freight (Air/Ocean/Land) dengan tracking number unik
- **Quote**: Permintaan estimasi biaya pengiriman dari customer
- **Freight_Service**: Layanan pengiriman (Air Freight, Ocean Freight, Road Transport)
- **Tracking_Number**: Unique identifier untuk shipment (format: GM-XXXXXXXXXX)
- **Timeline_Event**: Event dalam perjalanan shipment (departed, in-transit, customs, delivered)
- **User**: Authenticated user (customer atau admin)
- **Customer**: User dengan role customer yang dapat request quotes dan track shipments
- **Admin**: User dengan role admin yang dapat manage semua data
- **Database**: MySQL/PostgreSQL database untuk persistent storage
- **Inertia_Response**: Server-side response yang di-render sebagai React component di client
- **Shared_Props**: Data yang tersedia di semua Inertia pages (auth user, flash messages, etc)

## Requirements

### Requirement 1: Backend Migration & Architecture

**User Story:** Sebagai developer, saya ingin memigrasikan aplikasi dari Next.js ke Laravel 13 dengan arsitektur yang solid, sehingga aplikasi memiliki backend yang robust dan maintainable.

#### Acceptance Criteria

1. THE Backend SHALL menggunakan Laravel 13 dengan struktur MVC yang proper
2. THE Backend SHALL menggunakan Inertia.js sebagai bridge antara Laravel dan React
3. THE Backend SHALL menggunakan Laravel Fortify untuk authentication system
4. THE Database SHALL menggunakan MySQL atau PostgreSQL dengan migrations yang proper
5. THE Backend SHALL implement Repository Pattern untuk data access layer
6. THE Backend SHALL implement Service Layer untuk business logic
7. THE Backend SHALL menggunakan Form Request Validation untuk semua input validation
8. THE Backend SHALL implement API Resources untuk data transformation
9. THE Backend SHALL support environment-based configuration (.env file)
10. THE Backend SHALL implement proper error handling dan logging

### Requirement 2: Authentication & Authorization System

**User Story:** Sebagai user, saya ingin dapat register, login, dan manage account saya dengan aman, sehingga data saya terlindungi.

#### Acceptance Criteria

1. WHEN a user registers, THE Auth_System SHALL create a new user account dengan email verification
2. WHEN a user logs in dengan valid credentials, THE Auth_System SHALL authenticate the user dan create session
3. WHEN a user logs in dengan invalid credentials, THE Auth_System SHALL return error message yang descriptive
4. THE Auth_System SHALL support two-factor authentication (2FA) menggunakan TOTP
5. WHEN a user enables 2FA, THE Auth_System SHALL generate QR code dan recovery codes
6. THE Auth_System SHALL support password reset via email
7. THE Auth_System SHALL implement role-based access control (RBAC) dengan roles: customer dan admin
8. WHEN an unauthenticated user accesses protected route, THE System SHALL redirect ke login page
9. WHEN a user dengan insufficient permissions accesses restricted resource, THE System SHALL return 403 Forbidden
10. THE Auth_System SHALL implement session timeout setelah 2 hours of inactivity
11. THE Auth_System SHALL support "Remember Me" functionality untuk persistent login
12. WHEN a user logs out, THE Auth_System SHALL invalidate session dan clear cookies

### Requirement 3: Frontend Migration dengan React & Inertia.js

**User Story:** Sebagai developer, saya ingin memigrasikan frontend dari Next.js ke React dengan Inertia.js, sehingga dapat memanfaatkan Laravel backend sambil tetap menggunakan React components.

#### Acceptance Criteria

1. THE Frontend SHALL menggunakan React 18+ dengan functional components dan hooks
2. THE Frontend SHALL menggunakan Inertia.js untuk server-side routing dan rendering
3. THE Frontend SHALL menggunakan Tailwind CSS 4.x untuk styling
4. THE Frontend SHALL preserve existing Design_System (color tokens, typography, spacing)
5. THE Frontend SHALL implement shared layout components (Navbar, Footer, Sidebar)
6. THE Frontend SHALL support client-side navigation tanpa full page reload
7. THE Frontend SHALL implement proper loading states untuk async operations
8. THE Frontend SHALL implement error boundaries untuk graceful error handling
9. THE Frontend SHALL support form validation dengan real-time feedback
10. THE Frontend SHALL implement responsive design untuk mobile, tablet, dan desktop
11. THE Frontend SHALL preserve semua existing pages (Home, Services, Tracking)
12. WHEN Inertia_Response diterima, THE Frontend SHALL render React component dengan props yang diberikan

### Requirement 4: UI/UX Enhancement dengan Pro Max Principles

**User Story:** Sebagai user, saya ingin interface yang lebih modern, interactive, dan professional, sehingga experience menggunakan aplikasi lebih menyenangkan.

#### Acceptance Criteria

1. THE UI_Enhancement SHALL implement smooth transitions dan animations (150-300ms duration)
2. THE UI_Enhancement SHALL use SVG icons dari Heroicons atau Lucide (NO emoji icons)
3. THE UI_Enhancement SHALL implement proper hover states dengan cursor-pointer pada interactive elements
4. THE UI_Enhancement SHALL implement glassmorphism effects dengan proper opacity untuk light mode (bg-white/80 minimum)
5. THE UI_Enhancement SHALL ensure text contrast ratio minimum 4.5:1 untuk accessibility
6. THE UI_Enhancement SHALL implement floating navbar dengan proper spacing (top-4 left-4 right-4)
7. THE UI_Enhancement SHALL implement micro-interactions pada buttons, cards, dan form inputs
8. THE UI_Enhancement SHALL use consistent spacing system (8px base unit)
9. THE UI_Enhancement SHALL implement skeleton loaders untuk async content
10. THE UI_Enhancement SHALL support dark mode dengan proper color adjustments
11. THE UI_Enhancement SHALL implement focus states untuk keyboard navigation
12. THE UI_Enhancement SHALL ensure no layout shift pada hover states
13. THE UI_Enhancement SHALL implement proper loading indicators untuk form submissions
14. THE UI_Enhancement SHALL use consistent border-radius values across components

### Requirement 5: Shipment Tracking System

**User Story:** Sebagai customer, saya ingin dapat track shipment saya secara real-time dengan timeline yang jelas, sehingga saya tahu posisi dan status barang saya.

#### Acceptance Criteria

1. WHEN a user enters valid Tracking_Number, THE Tracking_System SHALL display shipment details dan timeline
2. WHEN a user enters invalid Tracking_Number, THE Tracking_System SHALL return error message "Tracking number not found"
3. THE Tracking_System SHALL display timeline dengan visual indicators (completed, in-progress, pending)
4. THE Tracking_System SHALL display Timeline_Events dengan timestamp, location, dan description
5. THE Tracking_System SHALL display estimated delivery date dan time
6. THE Tracking_System SHALL display current shipment status (Pending, In Transit, Customs, Delivered, Cancelled)
7. THE Tracking_System SHALL support tracking multiple shipments simultaneously
8. THE Tracking_System SHALL display shipment details (origin, destination, service type, weight)
9. WHEN shipment status changes, THE Tracking_System SHALL update timeline automatically
10. THE Tracking_System SHALL implement real-time updates menggunakan polling atau websockets
11. THE Tracking_System SHALL allow unauthenticated users untuk track shipments
12. WHEN authenticated customer views tracking, THE Tracking_System SHALL show additional details (invoice, documents)

### Requirement 6: Quote Request & Management System

**User Story:** Sebagai customer, saya ingin dapat request quote untuk shipment saya dengan mudah, sehingga saya dapat mengetahui estimasi biaya sebelum melakukan pengiriman.

#### Acceptance Criteria

1. WHEN a customer submits quote request dengan valid data, THE Quote_System SHALL create new quote record
2. THE Quote_System SHALL validate required fields (origin, destination, weight, service type)
3. THE Quote_System SHALL calculate estimated cost berdasarkan distance, weight, dan service type
4. THE Quote_System SHALL display estimated cost dalam 2 hours setelah submission
5. THE Quote_System SHALL send email notification ke customer ketika quote ready
6. THE Quote_System SHALL allow customer untuk view semua quotes mereka
7. THE Quote_System SHALL display quote status (Pending, Calculated, Accepted, Rejected, Expired)
8. WHEN customer accepts quote, THE Quote_System SHALL convert quote menjadi shipment
9. THE Quote_System SHALL allow admin untuk manually adjust quote prices
10. THE Quote_System SHALL implement quote expiration setelah 7 days
11. THE Quote_System SHALL support multiple service types (Air, Ocean, Road)
12. THE Quote_System SHALL validate weight limits berdasarkan service type

### Requirement 7: Admin Dashboard & Management

**User Story:** Sebagai admin, saya ingin dapat manage shipments, quotes, users, dan view analytics, sehingga saya dapat mengoperasikan business dengan efisien.

#### Acceptance Criteria

1. WHEN admin logs in, THE Admin_Panel SHALL display dashboard dengan key metrics
2. THE Admin_Panel SHALL display total shipments, active shipments, pending quotes, dan revenue metrics
3. THE Admin_Panel SHALL allow admin untuk view, create, update, dan delete shipments
4. THE Admin_Panel SHALL allow admin untuk update shipment status dan add Timeline_Events
5. THE Admin_Panel SHALL allow admin untuk view dan manage quotes
6. THE Admin_Panel SHALL allow admin untuk view dan manage users
7. THE Admin_Panel SHALL display analytics charts (shipments by service type, revenue trends, delivery performance)
8. THE Admin_Panel SHALL implement search dan filtering untuk shipments dan quotes
9. THE Admin_Panel SHALL implement pagination untuk large datasets
10. THE Admin_Panel SHALL allow admin untuk export data ke CSV atau PDF
11. THE Admin_Panel SHALL implement audit logging untuk admin actions
12. WHEN admin updates shipment status, THE Admin_Panel SHALL send notification ke customer

### Requirement 8: Customer Portal & Profile Management

**User Story:** Sebagai customer, saya ingin dapat view shipments saya, manage profile, dan request quotes dari satu portal, sehingga saya dapat manage logistics needs saya dengan mudah.

#### Acceptance Criteria

1. WHEN customer logs in, THE Customer_Portal SHALL display dashboard dengan active shipments
2. THE Customer_Portal SHALL display list of customer's shipments dengan status dan tracking number
3. THE Customer_Portal SHALL allow customer untuk click shipment untuk view details
4. THE Customer_Portal SHALL allow customer untuk request new quotes
5. THE Customer_Portal SHALL display list of customer's quotes dengan status
6. THE Customer_Portal SHALL allow customer untuk accept atau reject quotes
7. THE Customer_Portal SHALL allow customer untuk update profile information
8. THE Customer_Portal SHALL allow customer untuk change password
9. THE Customer_Portal SHALL allow customer untuk enable/disable 2FA
10. THE Customer_Portal SHALL display notification history
11. THE Customer_Portal SHALL implement search untuk shipments dan quotes
12. THE Customer_Portal SHALL allow customer untuk download shipment documents

### Requirement 9: Database Schema & Data Models

**User Story:** Sebagai developer, saya ingin database schema yang well-designed dan normalized, sehingga data integrity terjaga dan queries efficient.

#### Acceptance Criteria

1. THE Database SHALL implement users table dengan fields (id, name, email, password, role, email_verified_at, two_factor_secret, two_factor_recovery_codes)
2. THE Database SHALL implement shipments table dengan fields (id, user_id, tracking_number, origin, destination, service_type, weight, status, estimated_delivery, created_at, updated_at)
3. THE Database SHALL implement timeline_events table dengan fields (id, shipment_id, event_type, location, description, timestamp)
4. THE Database SHALL implement quotes table dengan fields (id, user_id, origin, destination, weight, service_type, estimated_cost, status, expires_at, created_at, updated_at)
5. THE Database SHALL implement proper foreign key constraints dengan cascade delete
6. THE Database SHALL implement indexes pada frequently queried columns (tracking_number, email, user_id)
7. THE Database SHALL implement soft deletes untuk shipments dan quotes
8. THE Database SHALL use UUID atau auto-increment untuk primary keys
9. THE Database SHALL implement proper data types (DECIMAL untuk cost, ENUM untuk status)
10. THE Database SHALL implement database migrations yang reversible
11. THE Database SHALL implement database seeders untuk development data
12. THE Database SHALL implement proper character encoding (UTF-8)

### Requirement 10: API Endpoints & Data Flow

**User Story:** Sebagai developer, saya ingin API endpoints yang RESTful dan consistent, sehingga frontend dapat berkomunikasi dengan backend dengan predictable.

#### Acceptance Criteria

1. THE Backend SHALL implement POST /quotes endpoint untuk create quote request
2. THE Backend SHALL implement GET /quotes endpoint untuk list customer's quotes
3. THE Backend SHALL implement GET /quotes/{id} endpoint untuk view quote details
4. THE Backend SHALL implement POST /quotes/{id}/accept endpoint untuk accept quote
5. THE Backend SHALL implement GET /shipments endpoint untuk list customer's shipments
6. THE Backend SHALL implement GET /shipments/{tracking_number} endpoint untuk view shipment details
7. THE Backend SHALL implement POST /shipments endpoint untuk create shipment (admin only)
8. THE Backend SHALL implement PUT /shipments/{id} endpoint untuk update shipment (admin only)
9. THE Backend SHALL implement POST /shipments/{id}/events endpoint untuk add timeline event (admin only)
10. THE Backend SHALL implement GET /admin/dashboard endpoint untuk dashboard metrics (admin only)
11. THE Backend SHALL return consistent JSON response format dengan status, data, dan message fields
12. WHEN API error occurs, THE Backend SHALL return proper HTTP status codes (400, 401, 403, 404, 422, 500)

### Requirement 11: Email Notifications System

**User Story:** Sebagai user, saya ingin menerima email notifications untuk events penting, sehingga saya tetap informed tentang shipments dan quotes saya.

#### Acceptance Criteria

1. WHEN user registers, THE System SHALL send welcome email dengan email verification link
2. WHEN user requests password reset, THE System SHALL send password reset email dengan secure token
3. WHEN quote is calculated, THE System SHALL send email notification ke customer dengan quote details
4. WHEN shipment status changes, THE System SHALL send email notification ke customer
5. WHEN shipment is delivered, THE System SHALL send delivery confirmation email
6. THE System SHALL use Laravel Mail dengan queue untuk async email sending
7. THE System SHALL use email templates dengan branding (logo, colors)
8. THE System SHALL implement email rate limiting untuk prevent spam
9. THE System SHALL allow users untuk opt-out dari marketing emails
10. THE System SHALL log email sending status untuk debugging

### Requirement 12: Search & Filtering System

**User Story:** Sebagai user, saya ingin dapat search dan filter shipments/quotes dengan mudah, sehingga saya dapat menemukan data yang saya cari dengan cepat.

#### Acceptance Criteria

1. THE System SHALL implement search untuk shipments berdasarkan tracking number, origin, atau destination
2. THE System SHALL implement filtering untuk shipments berdasarkan status, service type, atau date range
3. THE System SHALL implement search untuk quotes berdasarkan origin atau destination
4. THE System SHALL implement filtering untuk quotes berdasarkan status atau service type
5. THE System SHALL implement debouncing untuk search input (300ms delay)
6. THE System SHALL display search results dengan highlighting pada matched terms
7. THE System SHALL implement "No results found" state dengan helpful message
8. THE System SHALL preserve search/filter state ketika navigating back
9. THE System SHALL implement sorting untuk results (by date, status, etc)
10. THE System SHALL implement pagination untuk search results

### Requirement 13: Form Validation & Error Handling

**User Story:** Sebagai user, saya ingin mendapatkan feedback yang jelas ketika mengisi form, sehingga saya tahu jika ada error dan bagaimana memperbaikinya.

#### Acceptance Criteria

1. THE System SHALL validate all form inputs pada client-side sebelum submission
2. THE System SHALL validate all form inputs pada server-side untuk security
3. WHEN validation fails, THE System SHALL display error messages di bawah relevant field
4. THE System SHALL display field-level validation errors dengan red color dan icon
5. THE System SHALL disable submit button ketika form is invalid
6. THE System SHALL display loading state pada submit button during submission
7. THE System SHALL display success message setelah successful form submission
8. THE System SHALL clear form fields setelah successful submission
9. THE System SHALL implement proper validation rules (required, email, min/max length, numeric, etc)
10. THE System SHALL display validation errors dalam bahasa yang user-friendly
11. WHEN server error occurs, THE System SHALL display error message dengan retry option
12. THE System SHALL preserve form data ketika validation fails

### Requirement 14: Responsive Design & Mobile Support

**User Story:** Sebagai user, saya ingin dapat menggunakan aplikasi di berbagai devices dengan nyaman, sehingga saya dapat access dari mana saja.

#### Acceptance Criteria

1. THE Frontend SHALL be responsive pada breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)
2. THE Frontend SHALL implement mobile-first design approach
3. THE Frontend SHALL use proper touch targets (minimum 44x44px) untuk mobile
4. THE Frontend SHALL implement hamburger menu untuk mobile navigation
5. THE Frontend SHALL optimize images untuk different screen sizes
6. THE Frontend SHALL ensure no horizontal scroll pada any screen size
7. THE Frontend SHALL adjust typography sizes untuk different screen sizes
8. THE Frontend SHALL stack columns vertically pada mobile
9. THE Frontend SHALL test pada real devices (iOS Safari, Android Chrome)
10. THE Frontend SHALL implement proper viewport meta tag
11. THE Frontend SHALL ensure forms are usable pada mobile keyboards
12. THE Frontend SHALL implement swipe gestures untuk mobile where appropriate

### Requirement 15: Performance Optimization

**User Story:** Sebagai user, saya ingin aplikasi yang fast dan responsive, sehingga saya tidak perlu menunggu lama untuk load pages atau submit forms.

#### Acceptance Criteria

1. THE System SHALL achieve Lighthouse performance score minimum 90
2. THE System SHALL implement lazy loading untuk images dan heavy components
3. THE System SHALL implement code splitting untuk reduce initial bundle size
4. THE System SHALL implement database query optimization dengan eager loading
5. THE System SHALL implement caching untuk frequently accessed data
6. THE System SHALL implement asset optimization (minification, compression)
7. THE System SHALL achieve First Contentful Paint (FCP) under 1.5 seconds
8. THE System SHALL achieve Time to Interactive (TTI) under 3 seconds
9. THE System SHALL implement pagination untuk large datasets
10. THE System SHALL use CDN untuk static assets
11. THE System SHALL implement proper HTTP caching headers
12. THE System SHALL monitor performance dengan tools (Laravel Telescope, React DevTools)

### Requirement 16: Security & Data Protection

**User Story:** Sebagai user, saya ingin data saya aman dan terlindungi dari unauthorized access, sehingga saya dapat trust aplikasi dengan informasi sensitive saya.

#### Acceptance Criteria

1. THE System SHALL implement CSRF protection untuk all state-changing requests
2. THE System SHALL implement XSS protection dengan proper input sanitization
3. THE System SHALL implement SQL injection protection dengan parameterized queries
4. THE System SHALL hash passwords menggunakan bcrypt dengan cost factor 12
5. THE System SHALL implement rate limiting untuk login attempts (5 attempts per 15 minutes)
6. THE System SHALL implement rate limiting untuk API endpoints
7. THE System SHALL use HTTPS untuk all communications
8. THE System SHALL implement secure session management dengan httpOnly cookies
9. THE System SHALL implement proper CORS configuration
10. THE System SHALL sanitize user inputs sebelum displaying
11. THE System SHALL implement Content Security Policy (CSP) headers
12. THE System SHALL log security events untuk audit purposes

### Requirement 17: Testing & Quality Assurance

**User Story:** Sebagai developer, saya ingin comprehensive test coverage, sehingga saya dapat confident bahwa aplikasi works correctly dan regressions dapat detected early.

#### Acceptance Criteria

1. THE System SHALL implement unit tests untuk business logic dengan minimum 80% coverage
2. THE System SHALL implement feature tests untuk API endpoints
3. THE System SHALL implement browser tests untuk critical user flows
4. THE System SHALL implement validation tests untuk form requests
5. THE System SHALL implement authentication tests untuk login, registration, dan password reset
6. THE System SHALL implement authorization tests untuk role-based access
7. THE System SHALL implement database tests dengan factories dan seeders
8. THE System SHALL run tests automatically pada CI/CD pipeline
9. THE System SHALL implement test data cleanup setelah each test
10. THE System SHALL use in-memory database untuk faster test execution

### Requirement 18: Deployment & DevOps

**User Story:** Sebagai developer, saya ingin deployment process yang smooth dan automated, sehingga saya dapat deploy updates dengan confidence dan minimal downtime.

#### Acceptance Criteria

1. THE System SHALL support deployment ke production environment (VPS, AWS, DigitalOcean)
2. THE System SHALL implement environment-based configuration
3. THE System SHALL implement database migrations yang safe untuk production
4. THE System SHALL implement zero-downtime deployment strategy
5. THE System SHALL implement automated backup untuk database
6. THE System SHALL implement health check endpoint untuk monitoring
7. THE System SHALL implement proper logging dengan log rotation
8. THE System SHALL implement error tracking dengan Sentry atau similar
9. THE System SHALL implement CI/CD pipeline dengan GitHub Actions atau similar
10. THE System SHALL document deployment process dalam README

### Requirement 19: Documentation & Code Quality

**User Story:** Sebagai developer, saya ingin codebase yang well-documented dan maintainable, sehingga future developers dapat understand dan extend aplikasi dengan mudah.

#### Acceptance Criteria

1. THE System SHALL include README dengan setup instructions, requirements, dan architecture overview
2. THE System SHALL include API documentation dengan request/response examples
3. THE System SHALL include inline comments untuk complex business logic
4. THE System SHALL follow PSR-12 coding standards untuk PHP code
5. THE System SHALL follow Airbnb style guide untuk JavaScript/React code
6. THE System SHALL implement proper naming conventions (camelCase, PascalCase, kebab-case)
7. THE System SHALL implement proper file organization dan folder structure
8. THE System SHALL use TypeScript untuk type safety (optional but recommended)
9. THE System SHALL implement code linting dengan PHP CS Fixer dan ESLint
10. THE System SHALL implement pre-commit hooks untuk code quality checks

### Requirement 20: Migration Strategy & Data Preservation

**User Story:** Sebagai developer, saya ingin migration strategy yang clear dan safe, sehingga existing design dan data dapat preserved dengan baik.

#### Acceptance Criteria

1. THE Migration_Engine SHALL preserve existing Design_System (color tokens, typography, spacing dari globals.css)
2. THE Migration_Engine SHALL convert Next.js pages ke Inertia.js pages dengan equivalent functionality
3. THE Migration_Engine SHALL convert Next.js components ke React components yang compatible dengan Inertia
4. THE Migration_Engine SHALL preserve existing routes dan navigation structure
5. THE Migration_Engine SHALL migrate static assets (images, icons) ke Laravel public directory
6. THE Migration_Engine SHALL preserve existing responsive breakpoints dan mobile behavior
7. THE Migration_Engine SHALL document breaking changes dan required manual adjustments
8. THE Migration_Engine SHALL create mapping document dari old routes ke new routes
9. THE Migration_Engine SHALL preserve existing SEO meta tags dan Open Graph data
10. THE Migration_Engine SHALL test migrated pages untuk ensure visual dan functional parity

