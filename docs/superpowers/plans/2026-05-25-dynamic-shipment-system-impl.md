# Dynamic Shipment System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static Global Motion app into a dynamic system with an admin dashboard to manage shipments, automate pricing, and provide real-time tracking for customers.

**Architecture:** We will implement a structured database schema, a dedicated service layer for business logic (pricing & resi generation), and use Inertia.js to build a seamless Admin UI. Public pages will be connected to the database via specific controllers.

**Tech Stack:** Laravel 13, React 19, Inertia.js 3, Tailwind CSS v4, SQLite/MySQL.

---

### Task 1: Database Schema & Models

**Files:**
- Create: `database/migrations/2026_05_25_000001_create_pricing_configs_table.php`
- Create: `database/migrations/2026_05_25_000002_create_shipments_table.php`
- Create: `database/migrations/2026_05_25_000003_create_shipment_events_table.php`
- Create: `app/Models/PricingConfig.php`
- Create: `app/Models/Shipment.php`
- Create: `app/Models/ShipmentEvent.php`
- Create: `database/seeders/PricingConfigSeeder.php`

- [ ] **Step 1: Create pricing_configs migration**
Fields: id, service_type (unique), rate_per_kg, handling_fee_per_koli, min_weight, timestamps.

- [ ] **Step 2: Create shipments migration**
Fields: id (uuid), tracking_number (unique), service_type, origin, destination, weight, koli, total_price, status, estimated_delivery, timestamps.

- [ ] **Step 3: Create shipment_events migration**
Fields: id, shipment_id (constrained), location, status, description, timestamp, timestamps.

- [ ] **Step 4: Define Models**
Shipment model should use `HasUuids` and define `events()` hasMany relationship.

- [ ] **Step 5: Create Pricing Seeder**
Populate initial rates (Air: 50k, Sea: 15k, Land: 10k).

- [ ] **Step 6: Run migrations and seed**
```bash
php artisan migrate --seed
```

### Task 2: Core Business Logic (Service Layer)

**Files:**
- Create: `app/Services/ShipmentService.php`
- Test: `tests/Unit/ShipmentServiceTest.php`

- [ ] **Step 1: Implement price calculation logic**
Create a method `calculatePrice($serviceType, $weight, $koli)` that fetches config and applies the formula: `(max(weight, min_weight) * rate) + (koli * handling_fee)`.

- [ ] **Step 2: Implement tracking number generation**
Create a method `generateUniqueTrackingNumber()` that returns a `GM-XXXXXXX` string, checking for uniqueness in the database.

- [ ] **Step 3: Write Unit Tests**
Verify the calculation logic with various inputs (under min weight, normal weight, multiple koli).

### Task 3: Admin Dashboard (Backend & Routes)

**Files:**
- Modify: `routes/web.php`
- Create: `app/Http/Controllers/Admin/ShipmentController.php`
- Create: `app/Http/Controllers/Admin/PricingController.php`

- [ ] **Step 1: Register Admin Routes**
Add a prefix group `/admin` with routes for `shipments` (index, create, store, show) and `pricing` (index, update).

- [ ] **Step 2: Implement ShipmentController@store**
Use the `ShipmentService` to generate resi and calculate price, then save to DB. Add an initial "Shipment Created" event.

- [ ] **Step 3: Implement PricingController actions**
Allow admin to update rates for each service type.

### Task 4: Admin UI (React Components)

**Files:**
- Create: `resources/js/pages/admin/dashboard.tsx`
- Create: `resources/js/pages/admin/shipments/create.tsx`
- Create: `resources/js/pages/admin/pricing/index.tsx`

- [ ] **Step 1: Build Shipment Create Form**
Fields: Service Type (Select), Origin, Destination, Weight, Koli. Use Inertia `useForm`.

- [ ] **Step 2: Implement Live Price Preview**
Add a "Calculated Price" display that updates as the user changes weight/koli (either via client-side logic sharing the config or a debounced server request).

- [ ] **Step 3: Build Admin Dashboard Sidebar**
Add links to "Manage Shipments" and "Pricing Settings".

### Task 5: Public Tracking Integration

**Files:**
- Modify: `resources/js/pages/welcome.tsx`
- Modify: `resources/js/pages/tracking.tsx`
- Create: `app/Http/Controllers/Public/TrackingController.php`
- Modify: `routes/web.php`

- [ ] **Step 1: Update Landing Page Search**
Make the tracking search bar submit a GET request to `/tracking` with the tracking number.

- [ ] **Step 2: Implement TrackingController@show**
Fetch shipment by `tracking_number` with its `events`. Return Inertia page with shipment data.

- [ ] **Step 3: Make Timeline Dynamic**
Update `tracking.tsx` to map through `shipment.events` and display real locations and timestamps instead of static placeholders.
