# Agreements Implementation - User Flow & Architecture

## User Registration Flow

### Customer/Buyer Path
```
┌─────────────────────────────────────────────────────────────────┐
│  User visits /auth/register                                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Registration form loads                                          │
│  Default: userType = "customer"                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  AgreementCheckbox component renders                            │
│  getAgreementsForUserType("customer") called                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Shows: "Buyer Advisory & Clean-Title Guarantee Agreement"     │
│  - Checkbox (unchecked)                                          │
│  - Clickable agreement title with external link icon            │
│  - Agreement description                                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  User clicks     │  │  User checks     │
        │  agreement link  │  │  the checkbox    │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  Agreement       │  │  agreementAccepted│
        │  opens in new    │  │  state updated    │
        │  tab (preserves  │  │  { "buyer-...":  │
        │  form state)     │  │    true }         │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 └──────────┬──────────┘
                            │
                            ▼
        ┌──────────────────────────────────────────┐
        │  User clicks Submit button                │
        └────────┬─────────────────────────────────┘
                 │
                 ▼
        ┌──────────────────────────────────────────┐
        │  Validation Check:                       │
        │  - All agreements accepted?              │
        │  - Yes → Continue registration           │
        │  - No → Show error message               │
        └────────┬─────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼ (All Accepted)          ▼ (Not Accepted)
┌──────────────────┐    ┌──────────────────┐
│  API Call:       │    │  Error shown:    │
│  /api/auth/      │    │  "You must       │
│  register        │    │  accept all      │
└────────┬─────────┘    │  agreements"     │
         │              └──────────────────┘
         ▼
┌──────────────────┐
│  Registration    │
│  successful ✓    │
│  Redirect to:    │
│  /auth/login     │
└──────────────────┘
```

### Associate/Broker Path
```
┌─────────────────────────────────────────────────────────────────┐
│  User visits /associate/register                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Associate registration form loads                               │
│  userType = "associate" (hardcoded)                             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  AgreementCheckbox component renders                            │
│  getAgreementsForUserType("associate") called                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Shows: "Channel Partner Agreement"                             │
│  - Checkbox (unchecked)                                          │
│  - Clickable agreement title with external link icon            │
│  - Agreement description                                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  User clicks     │  │  User checks     │
        │  agreement link  │  │  the checkbox    │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  Agreement       │  │  agreementAccepted│
        │  opens in new    │  │  state updated    │
        │  tab (preserves  │  │  { "associate-":  │
        │  form state)     │  │    true }         │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 └──────────┬──────────┘
                            │
                            ▼
        ┌──────────────────────────────────────────┐
        │  User clicks Register button              │
        └────────┬─────────────────────────────────┘
                 │
                 ▼
        ┌──────────────────────────────────────────┐
        │  Validation Check:                       │
        │  - All agreements accepted?              │
        │  - Yes → Continue registration           │
        │  - No → Show error message               │
        └────────┬─────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼ (All Accepted)          ▼ (Not Accepted)
┌──────────────────┐    ┌──────────────────┐
│  API Call:       │    │  Error shown:    │
│  /api/auth/      │    │  "You must       │
│  register        │    │  accept all      │
└────────┬─────────┘    │  agreements"     │
         │              └──────────────────┘
         ▼
┌──────────────────┐
│  Registration    │
│  successful ✓    │
│  Redirect to:    │
│  /associate/     │
│  login           │
└──────────────────┘
```

## Component Architecture

```
components/forms/
├── register-form.tsx
│   ├── State: formData, agreementAccepted
│   ├── Handler: handleAgreementChange()
│   ├── Validation: Check agreementAccepted before submit
│   └── Imports: AgreementCheckbox
│       │
│       └─► agreement-checkbox.tsx
│           ├── Props: userType, agreementAccepted, onAgreementChange
│           ├── Calls: getAgreementsForUserType(userType)
│           ├── Calls: getAgreementUrl(agreementId)
│           └── Renders: Checkbox + Link + Description
│               │
│               └─► Opens: public/agreements/*.txt
│
└── agent-register-form.tsx
    ├── State: formData, agreementAccepted
    ├── Handler: handleAgreementChange()
    ├── Validation: Check agreementAccepted before submit
    └── Imports: AgreementCheckbox
        │
        └─► Same as above
```

## Data Flow

```
User Input (Account Type Selection)
        │
        ▼
register-form.tsx: userType state updated
        │
        ▼
Render trigger
        │
        ▼
agreement-checkbox.tsx receives new userType prop
        │
        ▼
getAgreementsForUserType(userType) called
        │
        ▼
AGREEMENT_DOCUMENTS filtered by userType
        │
        ▼
Component renders matching agreements
        │
        ▼
User checks/unchecks boxes
        │
        ▼
onAgreementChange() called
        │
        ▼
agreementAccepted state updated
        │
        ▼
Component re-renders (visual feedback)
        │
        ▼
User submits form
        │
        ▼
Validation: All agreements accepted?
        │
    ┌───┴───┐
    │       │
   No      Yes
    │       │
    ▼       ▼
  Error   Success
```

## File Dependency Tree

```
components/forms/
├── register-form.tsx
│   └── Imports
│       ├── AgreementCheckbox (from agreement-checkbox.tsx)
│       └── UserType (from lib/agreement-links.ts)
│
├── agent-register-form.tsx
│   └── Imports
│       ├── AgreementCheckbox (from agreement-checkbox.tsx)
│       └── UserType (from lib/agreement-links.ts)
│
└── agreement-checkbox.tsx
    └── Imports
        └── Functions from lib/agreement-links.ts
            ├── getAgreementsForUserType()
            ├── getAgreementUrl()
            └── UserType type

lib/
└── agreement-links.ts
    ├── Exports
    │   ├── AGREEMENT_DOCUMENTS (array)
    │   ├── getAgreementsForUserType()
    │   ├── getAgreementUrl()
    │   ├── getAgreementName()
    │   └── UserType (type)
    │
    └── References
        └── public/agreements/*.txt (for URL mappings)

public/agreements/
├── buyer-advisory-clean-title-guarantee.txt
├── channel-partner-agreement.txt
└── exclusive-land-listing-title-verification.txt
```

## State Management Flow

```
REGISTER FORM STATE:
┌────────────────────────────────────────┐
│ formData: {                            │
│   username: string                     │
│   email: string                        │
│   password: string                     │
│   confirmPassword: string              │
│   phone_number: string                 │
│   user_type: "customer" | "associate"  │
│ }                                      │
│                                        │
│ agreementAccepted: {                   │
│   "buyer-agreement": boolean           │
│   "associate-agreement": boolean       │
│ }                                      │
└────────────────────────────────────────┘

AGREEMENT CHECKBOX STATE:
┌────────────────────────────────────────┐
│ Receives from parent:                  │
│   - userType (current selection)       │
│   - agreementAccepted (from parent)    │
│   - onAgreementChange (callback)       │
│                                        │
│ Derives:                               │
│   - agreements = getAgreementsForUser..│
│   - visibility based on user type      │
└────────────────────────────────────────┘

VALIDATION LOGIC:
┌────────────────────────────────────────┐
│ Before submission:                     │
│ 1. Get all keys from agreementAccepted │
│ 2. If length > 0:                      │
│    - Check all values are true         │
│    - If any false → Show error         │
│    - If all true → Allow submission    │
│ 3. If length = 0 (no agreements):      │
│    - Allow submission                  │
└────────────────────────────────────────┘
```

## Event Flow

```
User Interaction → State Update → Component Render → User Sees Update

1. SELECT ACCOUNT TYPE
   select.onValueChange()
   → handleUserTypeChange()
   → setFormData({ ...prev, user_type: value })
   → agreementCheckbox receives new userType
   → getAgreementsForUserType() recalculated
   → Checkboxes show/hide dynamically

2. CHECK AGREEMENT BOX
   checkbox.onCheckedChange()
   → onAgreementChange(agreementId, true)
   → setAgreementAccepted({ ...prev, [agreementId]: true })
   → Component re-renders
   → Checkbox appears checked

3. CLICK AGREEMENT LINK
   a.onClick()
   → Prevent default
   → Open new tab
   → Form remains open and unaffected

4. SUBMIT FORM
   form.onSubmit()
   → handleSubmit()
   → Validate agreements
   → If valid → API call
   → If invalid → Show error
```

## URL Resolution

```
User clicks agreement link in component
        │
        ▼
getAgreementUrl(agreementId) called
        │
        ▼
Looks up URL in mapping:
  "buyer-agreement" → "/agreements/buyer-advisory-..."
  "associate-agreement" → "/agreements/channel-partner-..."
  "seller-agreement" → "/agreements/exclusive-land-..."
        │
        ▼
Browser navigates to: /agreements/*.txt
        │
        ▼
Served by: Next.js public folder
        │
        ▼
Text file displays in browser
```

## Agreement Selection Logic

```
AGREEMENT_DOCUMENTS = [
  {
    id: "buyer-agreement",
    title: "Buyer Advisory & Clean-Title...",
    userTypes: ["customer", "buyer"]
  },
  {
    id: "associate-agreement", 
    title: "Channel Partner Agreement",
    userTypes: ["associate"]
  },
  {
    id: "seller-agreement",
    title: "Exclusive Land Listing & Title...",
    userTypes: ["seller"]
  }
]

User selects: "customer"
        │
        ▼
getAgreementsForUserType("customer")
        │
        ▼
Filter: where agreement.userTypes.includes("customer")
        │
        ▼
Returns: [buyer-agreement object]
        │
        ▼
Render: Single checkbox for buyer agreement
```

## Mobile Responsive Behavior

```
DESKTOP (1024px+)
┌─────────────────────────────────────┐
│ Agreement Title [external link icon] │
│ Agreement description text           │
│ ☑ I agree to the [link] Agreement    │
├─────────────────────────────────────┤
│ [Agreement 2 if applicable]          │
└─────────────────────────────────────┘

TABLET (768px)
┌──────────────────────────────┐
│ Agreement Title [ext icon]   │
│ Agreement description        │
│ ☑ I agree to the [link]      │
│ Agreement                    │
├──────────────────────────────┤
│ [Agreement 2 if applicable]  │
└──────────────────────────────┘

MOBILE (375px)
┌────────────────────┐
│ ☑ Agreement Title  │
│ [external icon]    │
│ [click for link]   │
│                    │
│ Agreement desc     │
│ text wraps nicely  │
├────────────────────┤
│ [Agr 2 if app]     │
└────────────────────┘
```

---

This document illustrates the complete flow of the agreements feature from user perspective, component architecture, and data flow.
