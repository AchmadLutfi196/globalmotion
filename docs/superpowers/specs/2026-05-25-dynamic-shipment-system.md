# Design Document: Dynamic Shipment and Tracking System

## Overview
The Dynamic Shipment and Tracking System aims to transform the Global Motion application from a static landing page into a functional logistics management tool. This system will allow administrators to manage shipments, calculate pricing automatically based on cargo characteristics, and provide customers with real-time tracking capabilities via a unique tracking number (Resi).

**Project Goals:**
- Automate tracking number generation.
- Implement rule-based price calculation.
- Provide a timeline-based tracking experience for customers.
- Centralize shipment management for admins.

---

## Database Schema

### 1. `pricing_configs`
Stores the rules for price calculation per service type (e.g., Sea Freight, Air Freight).
- `id` (BigInt, PK)
- `service_type` (String) - e.g., 'Regular', 'Express', 'Cargo'
- `rate_per_kg` (Decimal, 15, 2)
- `handling_fee_per_koli` (Decimal, 15, 2)
- `min_weight` (Decimal, 8, 2) - Minimum weight for billing
- `created_at` / `updated_at`

### 2. `shipments`
Main shipment record.
- `id` (BigInt, PK)
- `tracking_number` (String, Unique) - Format: GM-XXXXXXX
- `service_type` (String)
- `origin` (String)
- `destination` (String)
- `weight` (Decimal, 8, 2)
- `koli` (Integer) - Number of packages/items
- `total_price` (Decimal, 15, 2)
- `status` (String) - e.g., 'Pending', 'In Progress', 'Delivered', 'Cancelled'
- `estimated_delivery` (Date, Nullable)
- `created_at` / `updated_at`

### 3. `shipment_events`
Timeline events for a specific shipment.
- `id` (BigInt, PK)
- `shipment_id` (BigInt, FK) - References `shipments.id`
- `location` (String) - e.g., 'Jakarta Warehouse'
- `status` (String) - Status update at this point
- `description` (Text) - Detailed info (e.g., 'Package sorted at distribution center')
- `timestamp` (DateTime)
- `created_at` / `updated_at`

---

## API & Data Flow

### 1. Shipment Creation (Admin)
- **Endpoint:** `POST /admin/shipments`
- **Process:**
    1. Admin submits shipment data (Origin, Destination, Service Type, Weight, Koli).
    2. Backend fetches `pricing_configs` for the selected `service_type`.
    3. **Price Calculation Logic:**
       ```php
       $billable_weight = max($weight, $config->min_weight);
       $total_price = ($billable_weight * $config->rate_per_kg) + ($koli * $config->handling_fee_per_koli);
       ```
    4. **Tracking Number Generation:**
       Generate random alphanumeric string: `GM-` + 7 uppercase characters/digits.
    5. Save `shipment` and create initial `shipment_events` record.

### 2. Tracking Search (Public)
- **Endpoint:** `GET /api/track/{tracking_number}`
- **Process:**
    1. Customer enters tracking number on landing page.
    2. Backend queries `shipments` with eager-loaded `shipment_events` (ordered by timestamp DESC).
    3. Return JSON including shipment status and full timeline.

### 3. Timeline Management (Admin)
- **Endpoint:** `POST /admin/shipments/{id}/events`
- **Process:**
    1. Admin adds a new event (Location, Description, Status).
    2. Update the parent `shipment.status` to match the latest event status if applicable.

---

## UI/UX Components (Inertia.js + React + Tailwind CSS v4)

### Admin Dashboard
- **Shipment Form:** A reactive form using Inertia's `useForm`. Features "Live Preview" of the calculated price as admin types Weight/Koli.
- **Shipment List:** A data table with filtering by Status and Tracking Number.
- **Timeline Editor:** A component to add/edit/delete events for a specific shipment.

### Landing Page (Tracking)
- **Tracking Input:** Prominent search bar on the hero section.
- **Tracking Result Modal/Page:** 
    - Progress stepper showing the current state.
    - Vertical timeline for `shipment_events`.
    - Shipment summary (Origin, Destination, Est. Delivery).

---

## Testing Strategy

### 1. Unit Tests
- `TrackingGeneratorTest`: Verify format and uniqueness of generated numbers.
- `PriceCalculatorTest`: Validate pricing logic against various weights, koli counts, and minimum weight thresholds.

### 2. Feature Tests
- `ShipmentManagementTest`: Test CRUD operations for shipments as an authenticated admin.
- `PublicTrackingTest`: Ensure tracking data is accessible without auth and returns 404 for invalid resi.

### 3. Integration Tests
- Verify that adding a shipment event correctly updates the shipment's overall status.

---
**Tech Stack Summary:**
- **Backend:** Laravel 13
- **Frontend:** React + Inertia.js
- **Styling:** Tailwind CSS v4
- **Database:** MySQL/PostgreSQL
