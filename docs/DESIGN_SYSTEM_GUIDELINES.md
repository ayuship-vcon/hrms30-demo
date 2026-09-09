# Enterprise HRMS Frontend Design System Guidelines

> **Document Version**: 2.0.0 (Material 3 HRMS Design Kit Standard)  
> **Target Audience**: Development Team, Product Managers, Design Leads (Sanjib, Ayushi, Vatsal — VCON Team)  
> **Status**: Verified & Compliant (`tsc --noEmit` 0 Errors)

---

## 1. Executive Summary & Design Principles

This document establishes the official, unified design standard for the **Enterprise HRMS Portal**. All screens, modules, tables, cards, dialogs, forms, buttons, and status indicators strictly adhere to the tokens and component rules defined herein to ensure 100% visual consistency and responsive ergonomics.

### 🏛️ Core Design Principles
1. **Universal 8px Radius (`8dp`)**: All cards, modals, tables, input fields, and action buttons use an exact `8px` (`rounded-sm` / `rounded`) corner radius.
2. **Single MD Form Standard (40px Height)**: All inputs, dropdowns, date pickers, textareas, and buttons share an identical `40px` (`h-10`) height.
3. **Action Semantics & High Contrast**: Every button and table action conveys a consistent, meaning-based color pattern with full contrast compliance.
4. **Live Form Feedback**: Visual feedback states (green checkmark for valid fields, red exclamation + helper for errors) render inline automatically without native HTML5 popup clutter.
5. **Fluid Multi-Device Ergonomics**: From 320px mobile viewports to ultra-wide 4K screens, layouts adapt via dynamic responsive grids and scroll-safe tables.

---

## 2. Global Design Tokens

### 2.1 Color Palette
| Design Token | Hex Code | Purpose & Usage | Tailwind Class | CSS Variable |
| :--- | :--- | :--- | :--- | :--- |
| **Primary (Deep Navy)** | `#0b4668` | Primary CTA buttons, table headers, brand accents | `bg-primary`, `text-primary` | `--primary: #0b4668` |
| **Primary Hover** | `#08354f` | Dark hover state for primary buttons | `hover:bg-primary-hover` | `--primary-hover: #08354f` |
| **Secondary (Vibrant)** | `#457b8d` | Secondary actions, edit icons, active sub-tabs | `bg-secondary`, `text-secondary` | `--secondary: #457b8d` |
| **Secondary Hover** | `#366270` | Dark hover state for secondary buttons | `hover:bg-secondary-hover` | `--secondary-hover: #366270` |
| **Success Green** | `#4edea3` | Active status dots, valid field borders & icons | `bg-success`, `text-success` | `--success: #4edea3` |
| **Success Surface** | `#e6f9f2` | Active badge pill background | `bg-success-bg` | `--success-bg: #e6f9f2` |
| **Warning Amber** | `#fbbf24` | On-leave status dots, pending approval chips | `bg-warning`, `text-warning` | `--warning: #fbbf24` |
| **Warning Surface** | `#fef3c7` | On-leave badge pill background | `bg-warning-bg` | `--warning-bg: #fef3c7` |
| **Destructive (Error Red)**| `#b22b32` | Delete buttons/icons, error borders & icons | `bg-destructive`, `text-destructive` | `--destructive: #b22b32` |
| **Destructive Surface** | `#fee2e2` | Terminated badge background | `bg-destructive-bg` | `--destructive-bg: #fee2e2` |
| **Dark Neutral (Body Text)**| `#45464D` | Form labels, body text, outline button text | `text-muted-foreground` | `--muted-foreground: #45464D` |
| **Muted Neutral (Subtext)**| `#6B7280` | Placeholders, captions, timestamps | `text-muted` | `--muted: #6B7280` |
| **App Background** | `#f1f1f1` | Global body and workspace canvas | `bg-background` | `--background: #f1f1f1` |
| **Surface (Card & Modal)**| `#FFFFFF` | Card paper, dialog surfaces, inputs | `bg-surface` | `--surface: #FFFFFF` |
| **Border Divider** | `#E2E8F0` | Card borders, table dividers, input boundaries | `border-border` | `--border: #E2E8F0` |

---

### 2.2 Typography Hierarchy
All typography uses **Inter** (primary) with fallback to **Poppins** / system sans-serif:

| Scale Level | Font Size / Line Height | Weight | Usage | CSS Utility |
| :--- | :--- | :--- | :--- | :--- |
| **D1 (Display Large)** | `32px` / `40px` | Bold (700) | Dashboard Greeting & Major Milestones | `.typo-d1` |
| **H1 (Headline Large)** | `24px` / `32px` | Bold (700) | Page Headers, Module Banner Titles | `.typo-h1` |
| **H2 (Title Large)** | `18px` / `26px` | Semibold (600) | Card Headers, Modal Titles | `.typo-h2` |
| **H3 (Title Medium)** | `16px` / `24px` | Medium (500) | Section Subtitles, Table Headers | `.typo-h3` |
| **Body Large** | `14px` / `20px` | Regular (400) | Primary Data Cells, Dialog Body Text | `.typo-body-lg` |
| **Body Small / Input** | `13px` / `18px` | Regular (400) | Input field text, dropdown menus | `text-[13px]` |
| **Caption** | `10px` / `14px` | Medium (500) | Helper text, uppercase chip labels | `.typo-caption` |

### 2.2.1 Font Delivery Model
The current front-end configuration does **not** require a physical font file inside the project for the default setup.

- The application loads the font family using a CSS web import in `src/styles/globals.css`:
  `@import url('https://fonts.googleapis.com/css2?family=Inter:...')`
- This means the browser downloads the font from the Google Fonts CDN at runtime.
- No local `.ttf`, `.otf`, or `.woff2` file is required unless we deliberately switch to a self-hosted font package.
- Physical files are needed only when:
  1. the organization requires offline availability,
  2. the font must be shipped with the app bundle,
  3. there is a licensing or compliance rule for self-hosting,
  4. we want zero external network dependency for typography.

If we choose to self-host fonts later, the correct directory is:

```bash
src/
└── assets/
    └── fonts/
        ├── Inter/
        ├── Poppins/
        └── index.ts
```

For the current project, the web-import approach is the correct and simpler setup, because it keeps the repository cleaner and avoids committing large binary font files.

---

### 2.3 Corner Radius System
* **`8px` (`rounded-sm` / `rounded`)**: Standard for **all** Cards, Tables, Modals, Form Inputs, Badges, and Action Buttons.
* **`9999px` (`rounded-full`)**: Reserved exclusively for circular Avatars, Live Status Dots, and Floating Action Buttons (FAB).

---

## 3. Universal Component Specifications

### 3.1 Buttons
All buttons in the application share an identical `40px` (`h-10`) height, `8px` corner radius, `text-sm font-semibold` typography, and standard `18px` icon dimensions.

```tsx
import { Button } from '@/shared/components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// 1. Primary Action Button (+ Add Action, Add Holiday, Save Entry)
<Button variant="primary" leftIcon={<AddCircleOutlineIcon />} size="md">
  Add Holiday
</Button>

// 2. Secondary Action Button (Vibrant Slate-Teal)
<Button variant="secondary" size="md">
  Secondary Action
</Button>

// 3. Outline Button (Cancel, Reset Filters)
<Button variant="outline" size="md">
  Cancel
</Button>

// 4. Destructive Danger Button (Delete Record, Permanent Removal)
<Button variant="danger" size="md">
  Delete Record
</Button>

// 5. Ghost Style Action Button
<Button variant="ghost" size="md">
  Back
</Button>
```

---

### 3.2 Modals & Popups
Every modal dialog in the application renders with an exact **`8px` corner radius**, `#E2E8F0` border, `#FFFFFF` surface, and standard padding structure:

* **Header (`px-5 py-3.5 border-b border-border`)**: Title in bold `text-base text-black` with a top-right close icon.
* **Body (`p-5 flex flex-col gap-4`)**: Spacing between all form field rows.
* **Footer (`px-5 py-3 border-t border-border bg-slate-50/50`)**: Aligns Cancel (`variant="outline"`) and Submit (`variant="primary"`) with consistent `40px` heights and `min-w-[90px]` widths.

```tsx
import { Modal, Button } from '@/shared/components';

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Schedule Corporate Holiday"
  maxWidth="sm"
  footer={
    <>
      <Button variant="outline" onClick={onClose} size="md">
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit} size="md">
        Add to Calendar
      </Button>
    </>
  }
>
  <div className="flex flex-col gap-4">
    {/* Form Fields */}
  </div>
</Modal>
```

---

### 3.3 Form Fields & Live Feedback (MD Size Standard)
All form fields use React Hook Form (`FormProvider`, `RHFInput`, `RHFSelect`, `RHFDatePicker`, `RHFTextArea`, `RHFCheckbox`) backed by **Yup validation schemas** with HTML5 popups disabled via `noValidate`.

* **Height**: Exact `40px` (`h-10`)
* **Border Radius**: `8px` (`rounded-sm`)
* **Interactive Visual Feedback States**:
  * **Default State**: `#E2E8F0` 1px border. Focus ring `#0b4668`.
  * **🟢 Success / Valid State**: `#4edea3` 1.5px green border + trailing checkmark icon (`<CheckCircleRoundedIcon />`) in `#4edea3`.
  * **🔴 Error State**: `#b22b32` 1.5px red border + trailing error exclamation icon (`<ErrorOutlineRoundedIcon />`) in `#b22b32` + red helper text.

```tsx
import { FormProvider, RHFInput, RHFSelect, RHFDatePicker, Button } from '@/shared/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const methods = useForm({
  resolver: yupResolver(validationSchema),
  defaultValues: { employeeName: '', date: '', location: '' },
});

<FormProvider methods={methods} onSubmit={onSubmit} className="flex flex-col gap-4">
  <RHFInput name="employeeName" label="Employee Name" placeholder="e.g. Harsh Vardhan" required />
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <RHFDatePicker name="date" label="Observance Date" required />
    <RHFSelect name="location" label="Duty Location" options={LOCATION_OPTIONS} />
  </div>
  <div className="flex justify-end items-center gap-3 pt-4 border-t border-border">
    <Button variant="outline" onClick={onCancel} size="md">Cancel</Button>
    <Button variant="primary" type="submit" size="md">Save Entry</Button>
  </div>
</FormProvider>
```

---

### 3.4 Data Tables & Meaning-Based Action Icons
All tables across the project use the **Page 1 Material 3 Specification**:
* **Header**: Deep Navy `#0b4668` (`.table-header-navy`) with uppercase white text.
* **Row Height**: `48px` with clean `#E2E8F0` dividing borders.
* **Initials Avatar**: Circular badge (`w-8 h-8 rounded-full bg-[#bad9e6] text-[#0b4668] font-bold`).
* **Live Status Dot Chips**:
  * Active: `.badge-active` (Mint `#e6f9f2` pill with green dot `#4edea3`)
  * On Leave: `.badge-onleave` (Amber `#fef3c7` pill with amber dot `#fbbf24`)
  * Terminated: `.badge-terminated` (Rose `#fee2e2` pill with red dot `#b22b32`)
* **Standardized Action Icons**:
  * 👁️ **View**: `VisibilityOutlinedIcon` (`18px`) in **Primary Navy `#0b4668`**
  * ✏️ **Edit**: `EditOutlinedIcon` (`18px`) in **Vibrant Slate-Teal `#457b8d`**
  * 🗑️ **Delete**: `DeleteOutlineIcon` (`18px`) in **Destructive Red `#b22b32`**

```tsx
import { DataGrid, type ColumnDef } from '@/shared/components';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

<DataGrid
  columns={columns}
  data={data}
  isLoading={isLoading}
  headerVariant="navy"
  keyExtractor={(item) => item.id}
/>
```

---

### 3.5 Cards & KPI Stat Cards
* **Card Container**: `rounded-sm` (`8px`), `border border-border`, `bg-surface`, `shadow-card`, `p-5`.
* **Stat Icon Box**: `w-12 h-12 rounded-sm` with semantic accent color (e.g., `bg-primary-light text-primary`).

```tsx
<div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
  <div className="w-12 h-12 rounded-sm bg-primary-light text-primary flex items-center justify-center shrink-0">
    <GroupsOutlinedIcon sx={{ fontSize: 24 }} />
  </div>
  <div>
    <p className="text-xs font-semibold text-muted uppercase tracking-wider">Total Headcount</p>
    <p className="text-2xl font-bold text-black mt-0.5">{totalCount}</p>
  </div>
</div>
```

---

## 4. Code Architecture & CSS File Registry

Every stylesheet in the codebase follows a single responsibility architecture:

```
src/
├── styles/
│   ├── globals.css           # Tailwind layers, font imports, button/table/badge classes
│   ├── variables.css         # Root CSS design variables and color tokens
│   ├── reset.css             # Standard CSS reset and box-sizing rules
│   ├── utilities.css         # Custom utility helpers
│   └── theme/
│       ├── light.theme.css   # Light mode token overrides
│       └── dark.theme.css    # Dark mode token overrides
├── assets/
│   ├── fonts/                # Optional only for self-hosted licensed fonts
│   │   ├── Inter/
│   │   ├── Poppins/
│   │   └── index.ts
│   └── icons/
│       └── index.ts          # Shared icon registry for action semantics
├── shared/
│   ├── components/
│   │   ├── Button/           # Universal Button (Primary, Secondary, Outline, Danger, Ghost)
│   │   ├── Dialog/           # Modal, ConfirmDialog, DeleteConfirmDialog, UnauthorizedDialog
│   │   ├── Form/             # Input, Select, DatePicker, TextArea, Checkbox, RHF wrappers
│   │   ├── DataGrid/         # DataGrid table component (Navy header, responsive container)
│   │   └── Card.tsx          # Card container with standard radius
├── app/
│   └── providers/
│       └── ThemeProvider.tsx # Global MUI theme provider (shared radius, input heights)
└── features/
    ├── employee/             # Employee management directory, filters, tables, forms
    ├── attendance/           # Clock-in, punch logs, timesheets, tables, modals
    ├── leave/                # Entitlements, balance cards, application pipeline
    ├── holiday/              # Corporate calendar, observance schedules
    └── administration/       # Tenant policy rules, audit trails
```

> Note: The `src/assets/fonts/` folder is optional. The current project uses a web-font import, so no local physical font files are required. The folder exists only for future self-hosted font scenarios.

---

## 5. Icon Library Registry (`@mui/icons-material`)

| Category | Action / State | Material Icon | Icon Color |
| :--- | :--- | :--- | :--- |
| **Navigation & Views** | View Details / Profile | `VisibilityOutlined` | `#0b4668` (Deep Navy) |
| **Record Modification**| Edit / Update | `EditOutlined` | `#457b8d` (Vibrant Teal) |
| **Destructive Actions**| Delete Record | `DeleteOutline` | `#b22b32` (Error Red) |
| **Creation & Addition**| Add Entity | `AddCircleOutline` | `#FFFFFF` on `#0b4668` |
| **Validation Positive**| Valid / Approved | `CheckCircleRounded` | `#4edea3` (Success Green) |
| **Validation Error**   | Invalid / Error | `ErrorOutlineRounded` | `#b22b32` (Error Red) |
| **Filter & Reset**     | Reset Form / Filters | `RestartAlt` | `#45464D` (Neutral Dark) |
| **Search Control**     | Search Field Adornment | `Search` | `#6B7280` (Muted) |

---

## 6. VCON Demo Checklist

- [x] **Universal 8px Corner Radius**: Modals, Cards, Tables, Inputs, and Buttons all render with exact `8px` (`rounded-sm`) borders.
- [x] **Form Field MD Alignment**: All inputs and buttons align with identical `40px` (`h-10`) heights.
- [x] **Form Validation**: Live green checkmark on valid fields and red exclamation + error text on invalid fields.
- [x] **Dual Action Buttons**: Popups feature balanced Cancel (`variant="outline"`) and Save (`variant="primary"`) buttons.
- [x] **Data Tables**: Page 1 Deep Navy `#0b4668` headers with initials circular avatars and live status dot chips.
- [x] **Standard Table Actions**: Unified View, Edit, and Delete action buttons across all modules.
- [x] **Responsive UI**: 100% fluid scaling across mobile, tablet, laptop, and 4K viewports.
- [x] **TypeScript & PostCSS Build**: Exits with 0 errors (`tsc --noEmit`).
