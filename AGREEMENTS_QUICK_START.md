# Agreements - Quick Start Guide

## What Was Done

Added dynamic agreement checkboxes to registration forms that change based on user type selection.

## User Experience Flow

### Scenario 1: Customer/Buyer Registration
```
User navigates to /auth/register
      ↓
Selects "Buyer/Renter" from Account Type
      ↓
Sees: "Buyer Advisory & Clean-Title Guarantee Agreement" checkbox
      ↓
Clicks link → Reads full agreement in new tab
      ↓
Returns to form and checks the box
      ↓
Submits form ✓ Registration successful
```

### Scenario 2: Associate/Broker Registration
```
User navigates to /associate/register
      ↓
Form loads with Associate registration fields
      ↓
Sees: "Channel Partner Agreement" checkbox
      ↓
Clicks link → Reads full agreement in new tab
      ↓
Returns to form and checks the box
      ↓
Submits form ✓ Registration successful
```

## Files Overview

### 1. Utility File: `lib/agreement-links.ts`
**Purpose**: Manages all agreement configuration and logic

```typescript
// Get agreements for a user type
getAgreementsForUserType("customer")  // Returns buyer agreements
getAgreementsForUserType("associate") // Returns associate agreements

// Get URL to agreement
getAgreementUrl("buyer-agreement")

// Get display name
getAgreementName("buyer-agreement")
```

### 2. Component: `components/forms/agreement-checkbox.tsx`
**Purpose**: Renders agreement checkboxes with links

```tsx
<AgreementCheckbox
  userType="customer"
  agreementAccepted={{ "buyer-agreement": false }}
  onAgreementChange={(id, accepted) => {}}
/>
```

### 3. Updated Forms
**Main Registration**: `components/forms/register-form.tsx`
- Shows different agreements based on user type selection
- Validates all agreements are accepted before submission

**Associate Registration**: `components/forms/agent-register-form.tsx`
- Always shows Associate agreement
- Validates acceptance before submission

### 4. Agreement Documents: `public/agreements/`
- `buyer-advisory-clean-title-guarantee.txt` - For Buyers
- `channel-partner-agreement.txt` - For Associates/Brokers
- `exclusive-land-listing-title-verification.txt` - For Sellers

## Key Features

✓ **Dynamic Selection** - Agreements change based on user type
✓ **External Links** - Click to read full agreement in new tab
✓ **Form Validation** - Must accept all agreements to submit
✓ **Smart Resets** - Agreements reset when user type changes
✓ **Responsive** - Works perfectly on mobile and desktop
✓ **State Preservation** - Clicking links doesn't lose form data

## Testing the Implementation

### Test 1: Customer Registration
1. Go to `/auth/register`
2. Select "Buyer/Renter"
3. Verify "Buyer Advisory & Clean-Title Guarantee Agreement" appears
4. Click the agreement link
5. Verify it opens in new tab
6. Return to form and try to submit without checking box
7. Verify error message: "You must accept all agreements to continue"
8. Check the box and submit
9. Verify form submits successfully

### Test 2: Associate Registration  
1. Go to `/associate/register`
2. Fill in form details
3. Verify "Channel Partner Agreement" appears
4. Click the agreement link
5. Verify it opens in new tab
6. Return and try to submit without checking box
7. Verify error message appears
8. Check the box and submit
9. Verify registration succeeds

### Test 3: User Type Change
1. Go to `/auth/register`
2. Select "Buyer/Renter"
3. Verify Buyer agreement shows
4. Change to "Associate/Seller"
5. Verify Associate agreement shows
6. Change back to "Buyer/Renter"
7. Verify Buyer agreement shows again
8. Verify checkboxes are reset when switching

## Agreement Content Reference

### Buyer Agreement
**Applies to**: Customers purchasing land

**Key Terms**:
- 30-Year Title Search
- Clean Title Guarantee
- 1% Service Fee + 18% GST
- Non-Circumvention clause

### Associate Agreement
**Applies to**: Brokers/Associates partnering with platform

**Key Terms**:
- Land sourcing and site coordination
- 1% Commission on successful deals
- 5% TDS deduction
- Non-Circumvention & Lead Protection
- Representation warranty

### Seller Agreement
**Applies to**: Land owners selling on platform

**Key Terms**:
- Exclusive listing appointment
- Title verification cooperation
- 1% Brokerage Fee + 18% GST
- Property indemnity warranty

## Code Integration Examples

### Adding to a Custom Form

```tsx
import { AgreementCheckbox } from "@/components/forms/agreement-checkbox"
import type { UserType } from "@/lib/agreement-links"

export function MyForm() {
  const [agreementAccepted, setAgreementAccepted] = useState({})
  const [userType, setUserType] = useState<UserType>("customer")

  return (
    <form>
      <AgreementCheckbox
        userType={userType}
        agreementAccepted={agreementAccepted}
        onAgreementChange={(id, accepted) => {
          setAgreementAccepted(prev => ({ ...prev, [id]: accepted }))
        }}
      />
    </form>
  )
}
```

### Checking Validation

```tsx
const handleSubmit = (e) => {
  e.preventDefault()
  
  // Check all agreements are accepted
  const allAccepted = Object.values(agreementAccepted).every(v => v === true)
  
  if (Object.keys(agreementAccepted).length > 0 && !allAccepted) {
    setError("You must accept all agreements to continue")
    return
  }
  
  // Submit form...
}
```

## Configuration Changes

### To Edit Agreement Text
1. Open `/public/agreements/<filename>.txt`
2. Edit the content
3. Save
4. Changes are live immediately (no code changes needed)

### To Add a New Agreement Type
1. Add to `AGREEMENT_DOCUMENTS` in `lib/agreement-links.ts`
2. Add to `getAgreementUrl()` mapping
3. Add to `getAgreementName()` mapping
4. Create agreement file in `public/agreements/`
5. Update form components to include new user type

### To Change Agreement Link Text
1. Edit `AGREEMENT_DOCUMENTS` in `lib/agreement-links.ts`
2. Update the `title` or `description` field
3. Save - changes are immediate

## Styling Customization

### Agreement Checkbox Container
```tsx
<div className="space-y-3 border-t border-border pt-3">
```
Change spacing, border, or padding here.

### Agreement Link Color
```tsx
className="text-blue-600 hover:text-blue-700 hover:underline"
```
Change color by modifying `text-blue-600` or `hover:text-blue-700`.

## Future Enhancements

- [ ] PDF files instead of text files
- [ ] E-Sign/Aadhar OTP integration for legal compliance
- [ ] Agreement versioning system
- [ ] Multi-language support
- [ ] Seller registration form
- [ ] User agreement history and records
- [ ] Timestamp logging of acceptances

## Troubleshooting

**Agreements not showing?**
- Check user type is correct in state
- Verify agreement files exist in `public/agreements/`
- Check browser console for errors

**Form won't submit?**
- Ensure all checkboxes are checked
- Verify validation logic is correct
- Check for console errors

**Links not opening?**
- Verify file paths match in `getAgreementUrl()`
- Check files exist with correct names
- Try clearing browser cache

## Related Files
- `components/forms/register-form.tsx`
- `components/forms/agent-register-form.tsx`
- `components/forms/agreement-checkbox.tsx`
- `lib/agreement-links.ts`
- `AGREEMENTS_IMPLEMENTATION.md`

## Support
For detailed technical documentation, see: `AGREEMENTS_IMPLEMENTATION.md`
