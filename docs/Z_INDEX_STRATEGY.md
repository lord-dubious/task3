# Z-Index Strategy Documentation

This document outlines the z-index layering strategy used throughout TweetScheduler Pro to prevent stacking context conflicts and ensure proper UI element layering.

## Z-Index Hierarchy

Our application uses a systematic approach to z-index values, defined in `tailwind.config.js`:

```javascript
zIndex: {
  'base': '1',        // Default content layer
  'sidebar': '90',    // Sidebar navigation
  'header': '100',    // Header navigation
  'dropdown': '200',  // Dropdown menus and popovers
  'tooltip': '300',   // Tooltips and hover elements
  'modal': '400',     // Modal dialogs and overlays
  'toast': '500',     // Toast notifications (highest priority)
  'overlay': '1000',  // Emergency overlay layer
}
```

## Layer Purposes

### Base Layer (z-1)
- Main content area
- Cards and regular UI elements
- Default positioning for most components

### Sidebar Layer (z-90)
- Navigation sidebar
- Should appear above main content but below header

### Header Layer (z-100)
- Top navigation header
- Should appear above sidebar and main content
- Contains user menu and quick actions

### Dropdown Layer (z-200)
- Dropdown menus from header/sidebar
- Context menus
- Select dropdowns
- Should appear above all navigation elements

### Tooltip Layer (z-300)
- Hover tooltips
- Help text overlays
- Should appear above dropdowns but below modals

### Modal Layer (z-400)
- Modal dialogs
- Full-screen overlays
- Form dialogs
- Should appear above all other UI elements except toasts

### Toast Layer (z-500)
- Toast notifications
- Alert messages
- Should appear above everything else for critical user feedback

### Overlay Layer (z-1000)
- Emergency overlay layer
- Reserved for critical system messages
- Should only be used in exceptional cases

## Implementation Guidelines

### Using Z-Index Classes

Always use the predefined Tailwind classes instead of arbitrary values:

```jsx
// ✅ Good - Uses predefined semantic class
<div className="z-modal">

// ❌ Bad - Uses arbitrary value
<div className="z-[400]">
```

### Stacking Context Rules

1. **Fixed/Absolute Positioning**: Elements with `fixed` or `absolute` positioning create their own stacking context
2. **Relative Positioning**: Elements with `relative` positioning and z-index create stacking contexts
3. **Transform/Opacity**: Elements with CSS transforms or opacity < 1 create stacking contexts

### Common Patterns

#### Modal Implementation
```jsx
<div className="fixed inset-0 z-modal">
  <div className="bg-black/50 backdrop-blur-sm">
    <div className="modal-content">
      {/* Modal content */}
    </div>
  </div>
</div>
```

#### Dropdown Implementation
```jsx
<div className="relative">
  <button>Trigger</button>
  <div className="absolute top-full z-dropdown">
    {/* Dropdown content */}
  </div>
</div>
```

#### Toast Implementation
```jsx
// Toasts should use the highest z-index
<Toaster 
  toastOptions={{
    style: {
      zIndex: 500, // Uses toast layer
    }
  }}
/>
```

## Debugging Z-Index Issues

### Common Problems

1. **Modal Behind Header**: Modal z-index too low
   - Solution: Use `z-modal` class

2. **Dropdown Behind Modal**: Dropdown appears when modal is open
   - Solution: Conditionally render or use higher z-index

3. **Toast Behind Modal**: Critical notifications not visible
   - Solution: Ensure toasts use `z-toast` (highest layer)

### Debugging Tools

1. **Browser DevTools**: Inspect element and check computed z-index values
2. **3D View**: Use browser's 3D view to visualize stacking contexts
3. **Console Logging**: Log z-index values during development

### Testing Checklist

- [ ] Header appears above sidebar
- [ ] Dropdowns appear above header
- [ ] Modals appear above all other content
- [ ] Toasts appear above modals
- [ ] Tooltips don't interfere with interactions
- [ ] No z-index conflicts between components

## Migration Guide

When updating existing components:

1. Replace arbitrary z-index values with semantic classes
2. Test all interactive elements (dropdowns, modals, tooltips)
3. Verify toast notifications work in all contexts
4. Check mobile responsiveness doesn't break layering

## Future Considerations

- Keep z-index values spaced apart (gaps of 100) for future additions
- Document any new layers added to the system
- Consider using CSS custom properties for dynamic z-index values
- Monitor for new stacking context creation from CSS changes

This systematic approach ensures consistent, predictable layering behavior across the entire application.