# Implementation Plan: Global Motion Laravel Migration & Enhancement

## Overview

Convert the feature design into a series of prompts for a code-generation LLM that will implement each step with incremental progress. Make sure that each prompt builds on the previous prompts, and ends with wiring things together. There should be no hanging or orphaned code that isn't integrated into a previous step. Focus ONLY on tasks that involve writing, modifying, or testing code.

## Tasks

### 1. Project Foundation & Infrastructure
- [ ] 1.1 Initialize Laravel 13 and Inertia.js Infrastructure
  - Set up a fresh Laravel 13 installation
  - Install and configure Inertia.js (server-side and React client-side)
  - Configure the root `app.blade.php` with necessary meta tags and asset loading
  - Set up `HandleInertiaRequests` middleware to share global props (auth, flash)
  - _Requirements: 1.1, 1.2, 3.2, 10.11_

- [ ] 1.2 Configure Authentication Engine (Laravel Fortify)
  - Install and publish Laravel Fortify
  - Configure `fortify.php` for registration, login, 2FA, and password reset
  - Set up `FortifyServiceProvider` and register actions
  - _Requirements: 1.3, 2.1, 2.2, 2.4, 2.6_

### 2. Database Layer & Domain Models
- [ ] 2.1 Implement Core Database Migrations and Eloquent Models
  - Create migrations for `users`, `shipments`, `timeline_events`, and `quotes` tables
  - Implement UUID/Primary Key logic as specified in the design
  - Define Eloquent models with proper relationships (HasMany, BelongsTo)
  - Implement Soft Deletes for `shipments` and `quotes`
  - _Requirements: 1.4, 9.1, 9.2, 9.3, 9.4, 9.7, 9.8, 9.9, 9.10_

- [ ]* 2.2 Write property test for database integrity
  - **Property 7: Data Integrity (Cascade Deletion)**
  - **Validates: Requirements 9.5**

- [ ] 2.3 Create Database Seeders and Factories
  - Implement factories for all models to generate realistic development data
  - Create `DatabaseSeeder` to populate the environment for testing
  - _Requirements: 9.11_

### 3. Backend Architecture: Repositories & Services
- [ ] 3.1 Implement Data Access Layer (Repository Pattern)
  - Create `ShipmentRepository` and `QuoteRepository`
  - Abstract complex Eloquent queries (search, filtering, tracking number lookup)
  - _Requirements: 1.5, 7.8, 8.11, 12.1, 12.3_

- [ ] 3.2 Implement Business Logic Layer (Service Pattern)
  - Create `ShipmentService`, `QuoteService`, and `TrackingService`
  - Implement shipment status transition logic
  - Implement quote calculation logic based on weight and service type
  - _Requirements: 1.6, 5.9, 6.3, 6.9, 6.12_

- [ ]* 3.3 Write property test for quote transformations
  - **Property 3: Quote to Shipment Transformation**
  - **Validates: Requirements 6.8**

- [ ]* 3.4 Write property test for quote validation
  - **Property 4: Quote Validation & Weight Limits**
  - **Validates: Requirements 6.12**

### 4. Authentication & Security Implementation
- [ ] 4.1 Implement Role-Based Access Control (RBAC)
  - Create `RoleMiddleware` to handle 'admin' and 'customer' roles
  - Define Gates/Policies for shipment and quote ownership
  - Set up 2FA enabling/disabling logic in `SecurityController`
  - _Requirements: 2.7, 2.9, 8.9, 16.4_

- [ ]* 4.2 Write property test for authorization
  - **Property 1: Role-Based Authorization Invariant**
  - **Validates: Requirements 2.7, 2.8, 2.9, 7.3, 7.12, 10.7, 10.8, 10.9, 10.10**

- [ ] 4.3 Checkpoint - Ensure all tests pass
  - Ensure all core backend services and auth logic are working correctly.

### 5. Frontend Foundation: Design System & Layouts
- [ ] 5.1 Configure Tailwind CSS 4.x and Design Tokens
  - Integrate Tailwind CSS 4.x into the project
  - Migrate color tokens, typography, and spacing from `globals.css` to Tailwind configuration
  - Implement CSS variables for the Material Design 3 inspired system
  - _Requirements: 3.3, 3.4, 4.4, 4.8, 20.1_

- [ ] 5.2 Build Atomic UI Components (Pro Max Standards)
  - Create `GlassCard`, `StatusBadge`, `SkeletonLoader`, and custom `Button` components
  - Implement smooth transitions (150-300ms) and micro-interactions
  - Use Lucide React for consistent iconography
  - _Requirements: 4.1, 4.2, 4.3, 4.7, 4.9, 4.14_

- [ ] 5.3 Implement Master Layouts and Navigation
  - Create `MainLayout` (floating navbar, footer)
  - Create `AdminLayout` (sidebar-based navigation)
  - Implement responsive mobile menu and interactive navbar
  - _Requirements: 3.5, 4.6, 14.1, 14.4_

### 6. Core Feature: Shipment Tracking
- [ ] 6.1 Implement Tracking Pages and Controller
  - Create `TrackingController` with `index` and `show` actions
  - Implement the Tracking Search page with debounced input
  - Implement the Shipment Status page with the `TrackingTimeline` component
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6, 12.5, 20.2_

- [ ]* 6.2 Write property test for tracking accessibility
  - **Property 2: Shipment Tracking Accessibility**
  - **Validates: Requirements 5.1, 5.11, 5.12**

- [ ] 6.3 Implement Real-Time Tracking Updates
  - Add polling mechanism to the `TrackingTimeline` component using Inertia `router.reload`
  - Implement `TrackingSimulatorService` for development/demo purposes
  - _Requirements: 5.10_

### 7. Core Feature: Quote Management
- [ ] 7.1 Implement Quote Request Workflow
  - Create `QuoteForm` component with real-time validation feedback
  - Implement `QuoteController` to handle submissions and cost display
  - Add "Accept Quote" functionality to convert quotes to shipments
  - _Requirements: 6.1, 6.2, 6.4, 6.7, 6.8, 13.1_

- [ ]* 7.2 Write unit tests for Quote Calculation logic
  - Verify cost accuracy across different service types (Air, Ocean, Road)
  - _Requirements: 6.3, 17.1_

### 8. Admin & Customer Portals
- [ ] 8.1 Build Admin Dashboard and Analytics
  - Implement Admin controllers for overview metrics
  - Build the Admin Dashboard UI with metrics cards and charts
  - Implement Shipment and Quote management CRUD interfaces for admins
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.7_

- [ ] 8.2 Build Customer Portal and Profile
  - Implement Customer Dashboard showing active shipments and recent quotes
  - Create Profile Management pages (Update info, change password, 2FA toggle)
  - _Requirements: 8.1, 8.2, 8.4, 8.7, 8.8, 8.9_

- [ ]* 8.3 Write property test for search consistency
  - **Property 5: Search Consistency**
  - **Validates: Requirements 7.8, 8.11, 12.1, 12.2, 12.3, 12.4**

### 9. Cross-Cutting Concerns
- [ ] 9.1 Implement Email Notification System
  - Set up Laravel Mail with Queue support
  - Create Mailable classes for welcome emails, quote ready, and status updates
  - Wire status changes to trigger notifications
  - _Requirements: 11.1, 11.3, 11.4, 11.6, 11.7_

- [ ] 9.2 Implement Global Search and Filtering
  - Implement specialized search logic in repositories
  - Add advanced filtering (date range, service type) to admin/portal lists
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.9, 12.10_

- [ ]* 9.3 Write property test for API response consistency
  - **Property 6: Consistent API/Inertia Response Format**
  - **Validates: Requirements 10.11, 10.12, 13.3**

### 10. Optimization, Testing & Deployment
- [ ] 10.1 Performance and SEO Optimization
  - Implement code splitting and lazy loading for heavy React components
  - Optimize database queries with Eager Loading (prevent N+1)
  - Set up SEO meta tags using Inertia `<Head>` component
  - _Requirements: 15.2, 15.3, 15.4, 20.9_

- [ ] 10.2 Final Checkpoint - QA & Browser Testing
  - Perform manual responsive check at all specified breakpoints (375px to 1440px+)
  - Ensure dark mode support is consistent across all new pages
  - Verify all form validations (client + server side) are robust
  - _Requirements: 4.10, 14.1, 14.9, 17.3_

- [ ] 10.3 Deployment Configuration
  - Prepare `.env.example` and production configuration
  - Set up CI/CD pipeline script (GitHub Actions) for automated testing and deployment
  - _Requirements: 18.2, 18.9_

## Notes

- Tasks marked with `*` are optional testing sub-tasks.
- Each task references specific requirements from the Requirements Document for traceability.
- The plan follows an incremental approach, starting from database/auth and moving towards specific features and enhancements.
- Property tests are integrated near the relevant implementation steps to ensure correctness early.
