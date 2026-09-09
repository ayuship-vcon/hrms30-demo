# 📚 HRMS Enterprise Design System: Common Components Guide

> **Official Developer Reference & API Documentation**  
> *HRMS Enterprise Portal Architecture*

---

## 🎨 1. Global Design System Rules & Standards

All shared components strictly follow the enterprise design specification:
1. **Component Library**: 100% Pure **Material UI (MUI v5)** wrapped with Tailwind CSS utility classes.
2. **Zero Inline Styles**: No `style={{ ... }}` attributes anywhere in the codebase.
3. **Corner Radius**: Standardized **`8px` (`rounded-sm` / `sx={{ borderRadius: '8px' }}`)** across all cards, inputs, dialogs, modals, and buttons.
4. **Control Height**: Standardized **`40px` (`h-10`)** for all inputs, select dropdowns, date pickers, and primary buttons.
5. **Iconography**: Exclusively `@mui/icons-material`.
6. **Color Tokens**:
   * **Primary Deep Navy**: `#0b4668` (`bg-primary`, `text-primary`, `border-primary`)
   * **Primary Light Accent**: `#eef7fc` (`bg-primary-light`, `text-primary`)
   * **Destructive / Danger**: `#b22b32` / `#ef4444` (`bg-destructive`, `text-destructive`)
   * **Success Green**: `#16a34a` / `#22c55e` (`bg-success`, `text-success`)
   * **Neutral Dark Body**: `#45464D` (`text-neutralDark`)
   * **Border**: `#E2E8F0` (`border-border`)
   * **Surface Background**: `#FFFFFF` (`bg-surface`)

---

## 📑 2. Master Component Inventory (38+ Components & Guards)

| Category | Component Name | Description | Key Features |
| :--- | :--- | :--- | :--- |
| **Buttons** | `Button` | Standard enterprise action button | 40px height, 8px radius, loading spinners, icon slots, 5 visual variants |
| **Tables** | `DataGrid` | Enterprise data table | Dynamic column visibility, multi-column sorting, pagination, page size selector, row selection |
| **Surfaces** | `Card` | Primary container surface | 8px radius, border, subtle elevation, header action slot |
| **Surfaces** | `StatCard` | KPI statistic card | Metric values, trend percentage indicators (▲ +5.2%), icon avatars, clickable drilldown |
| **Surfaces** | `Drawer` | Slide-over side sheet | Right/Left slide-in panel, title/subtitle, body, and sticky action footer |
| **Navigation** | `Tabs` / `TabPanel` | Navigation tab bar & panels | Deep Navy active indicator, badge counters, icon slots, standard/scrollable |
| **Navigation** | `Accordion` | Collapsible accordion sections | 8px radius, single or multi-expand mode, subtitle & icon slots |
| **Navigation** | `Breadcrumbs` | Hierarchy path tracker | Auto-routing navigation, Home icon link, active path highlight |
| **Feedback** | `StatusBadge` | Universal status indicator | Supports `active`, `pending`, `approved`, `rejected`, `present`, `absent`, `late`, `on_leave` |
| **Feedback** | `Tooltip` | Contextual hover helper | Dark & light themes, arrow pointer, configurable delay |
| **Feedback** | `EmptyState` | Zero-data placeholder | Visual iconography + customizable header & description |
| **Feedback** | `Toast` | Alert snackbar | Auto-dismissing floating alert notification |
| **Menus** | `ActionMenu` | Dropdown action menu | Contextual popup with item icons, danger actions, and dividers |
| **Icons** | `DynamicIcon` | Dynamic icon mapper | Maps JSON string icon names directly to `@mui/icons-material` |
| **Modals** | `Modal` | Universal modal dialog | Top-right 'X' close interceptor, unsaved changes dirty protection (`useFormDirtyGuard`) |
| **Dialogs** | `ConfirmDialog` | Confirmation prompt | Native MUI dialog, dangerous/primary action modes |
| **Dialogs** | `DeleteConfirmDialog` | Destructive removal modal | Red warning styling with item name badge |
| **Dialogs** | `UnauthorizedDialog` | Access barrier modal | Role-based permission restriction prompt |
| **Inputs** | `Input` | Controlled text input | 40px height, floating label, notch-safe borders |
| **Inputs** | `Select` | Controlled dropdown | 40px height, native MUI Select, notch-safe borders |
| **Inputs** | `Autocomplete` | Single-select autocomplete | 40px height, MUI Autocomplete + TextField, live search, clearable |
| **Inputs** | `MultiSelect` | Multi-select autocomplete | 40px height, MUI Autocomplete + Checkbox + Chips, live search |
| **Inputs** | `AutocompleteMultiSelect` | Multi-select autocomplete with 'Select All' | 40px height, Select All toggle, item count badge, tag chips with overflow badge |
| **Inputs** | `FileUpload` | Drag & Drop + Browse file uploader | Dropzone and button modes, max files & size validation, allowed type filter, file previews |
| **Inputs** | `Switch` | Boolean toggle switch | Deep Navy track/thumb, title & description labels |
| **Inputs** | `DatePicker` | Controlled date picker | 40px height, calendar popover, custom formatting |
| **Inputs** | `TextArea` | Controlled multiline input | Dynamic rows, auto-expanding, notch-safe borders |
| **Inputs** | `Checkbox` | Controlled checkbox | Custom checkbox with 8px radius label container |
| **Inputs** | `Radio` / `RadioGroup` | Controlled radio selector | Single-select option list with rich hover styling |
| **Dual-Mode** | `FormField` | Universal multi-variant field | Supports `text`, `select`, `autocomplete`, `multiselect`, `file`, `switch`, `textarea`, `date`, `checkbox`, `radio` |
| **RHF** | `FormProvider` | React Hook Form context | Form validation provider with auto-submit prevention |
| **RHF** | `RHFInput` | Form-bound text field | Yup error/success indicators, dirty state sync |
| **RHF** | `RHFSelect` | Form-bound dropdown | Connected to RHF Controller |
| **RHF** | `RHFAutocomplete` | Form-bound single autocomplete | Connected to RHF Controller |
| **RHF** | `RHFMultiSelect` | Form-bound multi autocomplete | Connected to RHF Controller |
| **RHF** | `RHFAutocompleteMultiSelect` | Form-bound multi autocomplete with Select All | Connected to RHF Controller |
| **RHF** | `RHFFileUpload` | Form-bound file uploader | Connected to RHF Controller with file size/type validation |
| **RHF** | `RHFSwitch` | Form-bound boolean switch | Connected to RHF Controller |
| **RHF** | `RHFDatePicker` | Form-bound date picker | Connected to RHF Controller |
| **RHF** | `RHFTextArea` | Form-bound multiline field | Connected to RHF Controller |
| **RHF** | `RHFCheckbox` | Form-bound boolean toggle | Connected to RHF Controller |
| **RHF** | `RHFRadioGroup` | Form-bound radio group | Connected to RHF Controller |
| **Loaders** | `PageLoader` | Full-page / section loader | Centered brand navy spinner with customizable title/description |
| **Loaders** | `Loader` | Inline circular loader | Centered spinner with optional text |
| **Loaders** | `Skeleton` | Content placeholder | Wave animation shimmer |
| **Guards** | `ProtectedRoute` | Authentication route guard | Redirects unauthenticated users to `/auth/login` |
| **Guards** | `PublicRoute` | Public route guard | Redirects logged-in users to `/dashboard` |
| **Guards** | `PermissionRoute` | Role route guard | Enforces role-based view permissions |

---

## 💻 3. Component API Reference & Code Examples

### 3.1 `FileUpload` & `RHFFileUpload` (Drag & Drop + Button Modes with Validation)
```tsx
import { RHFFileUpload, FileUpload } from '@/shared/components';

// 1. In React Hook Form with Drag & Drop Zone:
<RHFFileUpload
  name="resumes"
  label="Upload Resume / Documents"
  variant="dropzone"
  multiple={true}
  maxFiles={5}
  maxSizeInMB={10}
  acceptedFileTypes={['.pdf', '.docx', '.png', '.jpg']}
  placeholder="Drag and drop resumes here or browse files"
  description="PDF, DOCX, PNG up to 10MB each"
  required
/>

// 2. Standalone Compact Button Mode:
<FileUpload
  label="Attach Medical Certificate"
  variant="button"
  multiple={false}
  maxSizeInMB={5}
  acceptedFileTypes={['.pdf', '.jpg']}
  onChange={(files) => handleFilesSelected(files)}
/>
```

---

### 3.2 `AutocompleteMultiSelect` & `RHFAutocompleteMultiSelect`
```tsx
import { RHFAutocompleteMultiSelect, type SelectOption } from '@/shared/components';

const employeeOptions: SelectOption[] = [
  { label: 'Harsh Vardhan (Engineering)', value: 'emp-001' },
  { label: 'Subodh Tapkir (Architecture)', value: 'emp-002' },
  { label: 'Priya Sharma (HR Operations)', value: 'emp-003' },
];

<RHFAutocompleteMultiSelect
  name="assignedStaff"
  label="Assign Staff Members"
  options={employeeOptions}
  placeholder="Search and select staff..."
  showSelectAll={true}
  maxChipsDisplay={3}
  clearable={true}
  required
/>
```

---

### 3.3 `Tabs` & `TabPanel`
```tsx
import React, { useState } from 'react';
import { Tabs, TabPanel } from '@/shared/components';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const EmployeeProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <PersonOutlineIcon fontSize="small" /> },
    { id: 'job', label: 'Job & Role', icon: <WorkOutlineIcon fontSize="small" />, badge: 2 },
    { id: 'compensation', label: 'Compensation', icon: <AttachMoneyIcon fontSize="small" /> },
  ];

  return (
    <div className="bg-surface rounded-sm border border-border">
      <Tabs tabs={tabs} value={activeTab} onChange={(id) => setActiveTab(String(id))} />
      <div className="p-5">
        <TabPanel value="personal" activeValue={activeTab}>
          <h3>Personal Details View</h3>
        </TabPanel>
        <TabPanel value="job" activeValue={activeTab}>
          <h3>Job &amp; Department View</h3>
        </TabPanel>
        <TabPanel value="compensation" activeValue={activeTab}>
          <h3>Salary &amp; Benefits View</h3>
        </TabPanel>
      </div>
    </div>
  );
};
```

---

### 3.4 `Accordion`
```tsx
import { Accordion } from '@/shared/components';
import ShieldIcon from '@mui/icons-material/Shield';
import RuleIcon from '@mui/icons-material/Rule';

const accordionItems = [
  {
    id: 'leave-policy',
    title: 'Standard Paid Leave Entitlement Policy',
    subtitle: 'Annual leave accruals, carryovers, and encashment',
    icon: <RuleIcon fontSize="small" />,
    defaultExpanded: true,
    content: <p className="text-sm text-neutralDark">Full explanation of leave accrual rules...</p>,
  },
  {
    id: 'mfa-security',
    title: 'Multi-Factor Authentication & IP Restrictions',
    subtitle: 'Enterprise SSO security enforcement policies',
    icon: <ShieldIcon fontSize="small" />,
    content: <p className="text-sm text-neutralDark">SSO guidelines and IP allowlists...</p>,
  },
];

<Accordion items={accordionItems} allowMultiple={false} />
```

---

### 3.5 `StatusBadge`
```tsx
import { StatusBadge } from '@/shared/components';

// Available variants: 'subtle' (default), 'solid', 'outline', 'dot'
<StatusBadge status="active" />
<StatusBadge status="pending" label="Pending Approval" />
<StatusBadge status="rejected" />
<StatusBadge status="on_leave" label="On Leave" />
<StatusBadge status="late" variant="solid" />
```

---

### 3.6 `StatCard`
```tsx
import { StatCard } from '@/shared/components';
import GroupsIcon from '@mui/icons-material/Groups';

<StatCard
  title="Total Headcount"
  value="128 Staff"
  subtitle="Active workforce members"
  icon={<GroupsIcon />}
  trend={{ value: '+4.2%', direction: 'up', label: 'vs last month' }}
  onClick={() => navigate('/employees')}
/>
```

---

### 3.7 `Drawer`
```tsx
import React, { useState } from 'react';
import { Drawer, Button } from '@/shared/components';

export const FilterDrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>Open Filter Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Advanced Filters"
        subtitle="Refine employee directory results"
        width={420}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Reset</Button>
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>Apply Filters</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">Filter fields go here...</p>
        </div>
      </Drawer>
    </>
  );
};
```

---

### 3.8 `Tooltip` & `ActionMenu`
```tsx
import { Tooltip, ActionMenu } from '@/shared/components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 1. Tooltip with arrow:
<Tooltip title="Synchronized in real-time with Microsoft Entra ID">
  <span className="font-semibold text-primary cursor-help">SSO Active</span>
</Tooltip>

// 2. Action Menu:
<ActionMenu
  items={[
    { id: 'edit', label: 'Edit Profile', icon: <EditIcon fontSize="small" />, onClick: handleEdit },
    { id: 'delete', label: 'Delete Employee', icon: <DeleteIcon fontSize="small" />, onClick: handleDelete, isDangerous: true, divider: true },
  ]}
/>
```

---

## 🛡️ 4. Developer Best Practices Checklist

1. ✅ **100% Shared Components (Zero Direct HTML)**:
   * **Never use raw `<button>`, `<input>`, `<select>`, or `<textarea>` tags.**
   * Always import and use [`Button`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/Button/Button.tsx), [`RHFInput`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/Form/RHF/RHFInput.tsx), [`RHFSelect`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/Form/RHF/RHFSelect.tsx), [`RHFAutocomplete`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/Form/RHF/RHFAutocomplete.tsx), [`RHFAutocompleteMultiSelect`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/Form/RHF/RHFAutocompleteMultiSelect.tsx), [`RHFFileUpload`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/Form/RHF/RHFFileUpload.tsx), or [`RHFSwitch`](file:///d:/Harsh%20Projects/HRMS%20File%20Architecture/src/shared/components/Form/RHF/RHFSwitch.tsx) from `@/shared/components`.
2. ✅ **All Forms Must Use React Hook Form + FormProvider**:
   * All forms throughout the entire portal are backed by `useForm`, Yup schema validation, and wrapped in `<FormProvider methods={methods}>`.
3. ✅ **Wrap Handlers & Heavy Calculations**:
   * Wrap DataGrid `columns` and filtered data arrays in `useMemo`.
   * Wrap table row actions (`onView`, `onEdit`, `onDelete`) and form submits in `useCallback`.
4. ✅ **Unsaved Form Protection**:
   * Always call `useFormDirtyGuard(isDirty)` in forms rendered within `<Modal>`. The modal will automatically intercept clicks on the top-right `X` button and backdrop clicks to prompt confirmation.
5. ✅ **Initial Loading UX**:
   * Render `<PageLoader />` when a page is performing its initial data fetch (`if (isLoading && items.length === 0) return <PageLoader ... />`).
