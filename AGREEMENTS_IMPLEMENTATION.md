# Agreements Implementation Guide

## Overview
This document describes the implementation of dynamic agreement checkboxes on the registration forms that change based on user type (Customer/Buyer, Associate/Broker, or Seller).

## Files Created

### 1. **lib/agreement-links.ts**
Core utility file that manages all agreement-related logic.

**Key Functions:**
- `getAgreementsForUserType(userType)` - Returns agreements for specific user type
- `getAgreementUrl(agreementId)` - Returns the URL to the agreement document
- `getAgreementName(agreementId)` - Returns the display name of the agreement

**User Types & Agreements Mapping:**
- **customer/buyer**: Buyer Advisory & Clean-Title Guarantee Agreement
- **associate**: Channel Partner Agreement (Master Channel Partner Agreement)
- **seller**: Exclusive Land Listing & Title Verification Mandate

### 2. **components/forms/agreement-checkbox.tsx**
React component that renders agreement checkboxes with links.

**Props:**
```typescript
interface AgreementCheckboxProps {
  userType: UserType
  agreementAccepted: Record<string, boolean>
  onAgreementChange: (agreementId: string, accepted: boolean) => void
}
```

**Features:**
- Dynamically shows agreements based on user type
- Displays agreement title with external link icon
- Shows agreement description
- Prevents propagation when clicking links
- Automatically opens agreements in new tab

### 3. **public/agreements/** (Agreement Documents)
- `buyer-advisory-clean-title-guarantee.txt` - Buyer agreement
- `channel-partner-agreement.txt` - Associate/Broker agreement
- `exclusive-land-listing-title-verification.txt` - Seller agreement

## Files Modified

### 1. **components/forms/register-form.tsx** (Main Registration Form)

**Changes:**
- Added import: `AgreementCheckbox`, `UserType`
- Added state: `agreementAccepted` (tracks which agreements are accepted)
- Added handler: `handleAgreementChange` (updates acceptance state)
- Added validation: Checks that all required agreements are accepted before submission
- Added component: `<AgreementCheckbox />` component in JSX
- Resets agreements when user type changes

**Logic Flow:**
1. User selects user type (customer/associate)
2. Agreement checkboxes appear based on selection
3. User must check all agreement boxes to submit
4. Form validation prevents submission if agreements aren't accepted

### 2. **components/forms/agent-register-form.tsx** (Associate Registration Form)

**Changes:**
- Added import: `AgreementCheckbox`, `UserType`
- Added state: `agreementAccepted`
- Added handler: `handleAgreementChange`
- Added validation: Ensures all agreements are accepted
- Added component: `<AgreementCheckbox userType="associate" />`

## How It Works

### User Registration Flow

#### For Customers/Buyers:
1. Navigate to registration page
2. Select "Buyer/Renter" from Account Type dropdown
3. See **Buyer Advisory & Clean-Title Guarantee Agreement** checkbox
4. Click link to read full agreement
5. Check box to accept
6. Complete registration

#### For Associates/Brokers:
1. Navigate to associate registration page
2. See **Channel Partner Agreement** checkbox
3. Click link to read full agreement
4. Check box to accept
5. Complete registration

#### For Sellers (Future Enhancement):
1. Navigate to seller registration page
2. See **Exclusive Land Listing & Title Verification Mandate** checkbox
3. Click link to read full agreement
4. Check box to accept
5. Complete registration

## Agreement Documents

### 1. Buyer Advisory & Clean-Title Guarantee Agreement
**For:** Customers purchasing land through the platform

**Key Sections:**
- Scope of Service (30-Year Title Search, boundary verification)
- Clean Title & Dispute Guarantee
- Service Fee (1% of purchase price + 18% GST)
- Non-Circumvention clause

### 2. Channel Partner Agreement
**For:** Associates/Brokers partnering with the platform

**Key Sections:**
- Scope of Work (land sourcing, site coordination)
- Commercial Terms & Commission (1% commission)
- Tax Deductions (5% TDS under Section 194H)
- Non-Circumvention & Lead Protection
- Representation & Verification

### 3. Exclusive Land Listing & Title Verification Mandate
**For:** Land Sellers listing properties on the platform

**Key Sections:**
- Appointment & Authority
- Title Inspection & Cooperation
- Brokerage Fee (1% + 18% GST)
- Indemnity clause

## Code Examples

### Using in a Custom Form

```tsx
import { AgreementCheckbox } from "@/components/forms/agreement-checkbox"
import type { UserType } from "@/lib/agreement-links"

export function MyCustomForm() {
  const [agreementAccepted, setAgreementAccepted] = useState({})
  const [userType, setUserType] = useState<UserType>("customer")

  const handleAgreementChange = (agreementId: string, accepted: boolean) => {
    setAgreementAccepted((prev) => ({ ...prev, [agreementId]: accepted }))
  }

  return (
    <form>
      {/* Your form fields */}
      
      <AgreementCheckbox
        userType={userType}
        agreementAccepted={agreementAccepted}
        onAgreementChange={handleAgreementChange}
      />

      <button type="submit">Submit</button>
    </form>
  )
}
```

### Validating Agreements Before Submission

```tsx
// Check all agreements are accepted
const allAgreementsAccepted = Object.values(agreementAccepted).every(
  (accepted) => accepted === true
)

if (!allAgreementsAccepted && Object.keys(agreementAccepted).length > 0) {
  setError("You must accept all agreements to continue")
  return
}
```

### Getting Agreements for a User Type

```tsx
import { getAgreementsForUserType } from "@/lib/agreement-links"

const customerAgreements = getAgreementsForUserType("customer")
// Returns: [{ id: "buyer-agreement", title: "...", description: "..." }]

const associateAgreements = getAgreementsForUserType("associate")
// Returns: [{ id: "associate-agreement", title: "...", description: "..." }]
```

## Styling Details

### Agreement Checkbox Styling
- **Container**: `space-y-3 border-t border-border pt-3` (separated section)
- **Checkbox**: Standard shadcn checkbox with `mt-0.5`
- **Label**: `text-xs font-medium text-foreground cursor-pointer`
- **Links**: `text-blue-600 hover:text-blue-700 hover:underline` with external link icon
- **Description**: `text-xs text-muted-foreground` (subtle, secondary text)

### Responsive Behavior
- Checkboxes stack on small screens
- Links open in new tabs to preserve form state
- No layout shift when agreements appear/disappear

## Configuration

### Adding a New Agreement Type

1. **Add agreement to** `AGREEMENT_DOCUMENTS` in `lib/agreement-links.ts`:
```typescript
{
  id: "seller-agreement",
  title: "Exclusive Land Listing & Title Verification Mandate",
  description: "Read and agree to the terms as a seller...",
  userTypes: ["seller"],
}
```

2. **Add URL mapping** to `getAgreementUrl()`:
```typescript
"seller-agreement": "/agreements/exclusive-land-listing-title-verification.txt"
```

3. **Add name mapping** to `getAgreementName()`:
```typescript
"seller-agreement": "Seller Agreement"
```

4. **Create document file** in `public/agreements/`

5. **Add to register form** if needed

### Changing Agreement Text

1. Edit the `.txt` file in `public/agreements/`
2. No code changes needed
3. Changes reflect immediately

## Legal Compliance

All agreements include:
- Indian Contract Act, 1872
- Real Estate (Regulation and Development) Act (RERA), 2016
- Transfer of Property Act, 1882
- Income Tax Act, 1961

## Future Enhancements

1. **PDF Support**: Replace `.txt` with actual PDF files
2. **Digital Signature**: Integrate e-Sign/Aadhar OTP for legal execution
3. **Versioning**: Track agreement versions and history
4. **Multi-language**: Support for regional languages
5. **Seller Registration**: Create seller-specific registration form
6. **Agreement History**: Show users what agreements they've signed
7. **Acceptance Logging**: Store acceptance records with timestamps

## Testing

### Manual Testing Checklist

- [ ] Select "Buyer/Renter" → See Buyer agreement
- [ ] Select "Associate/Seller" → See Associate agreement
- [ ] Click agreement link → Opens in new tab
- [ ] Try to submit without checking → Error message appears
- [ ] Check all boxes → Form submits successfully
- [ ] Switch user types → Agreements update dynamically
- [ ] Agreement text displays correctly on new tab
- [ ] Form doesn't break on mobile

### Browser Console Testing

```javascript
// Check what agreements are available for a user type
import { getAgreementsForUserType } from "@/lib/agreement-links"
getAgreementsForUserType("customer")

// Get URL for specific agreement
import { getAgreementUrl } from "@/lib/agreement-links"
getAgreementUrl("buyer-agreement")
```

## Troubleshooting

### Agreements Not Showing
- Check user type is correct
- Verify `AGREEMENT_DOCUMENTS` includes the user type
- Check component is imported correctly

### Links Not Working
- Verify agreement files exist in `public/agreements/`
- Check file names match in `getAgreementUrl()`
- Ensure URLs are correct (no typos)

### Form Won't Submit
- Check all agreement boxes are checked
- Verify validation logic in `handleSubmit()`
- Check browser console for errors

## Related Files
- Component: `components/forms/agreement-checkbox.tsx`
- Utility: `lib/agreement-links.ts`
- Main Form: `components/forms/register-form.tsx`
- Associate Form: `components/forms/agent-register-form.tsx`
- Agreements: `public/agreements/*.txt`

## Support
For questions or issues with the agreements implementation, refer to:
1. Agreement content → Edit `public/agreements/*.txt`
2. Agreement logic → Edit `lib/agreement-links.ts`
3. Component styling → Edit `components/forms/agreement-checkbox.tsx`
4. Form integration → Edit respective form components
