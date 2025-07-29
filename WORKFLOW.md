# Hypachinko Development Workflow

This document outlines the development workflow for the Hypachinko dApp, following the [Cursor Web Development guide](https://docs.cursor.com/en/guides/tutorials/web-development).

## 🎯 **Design System Integration**

### CSS Variables & Design Tokens

- All colors, spacing, typography, and other design tokens are defined in `src/styles/design-tokens.css`
- Use CSS variables like `var(--color-primary)`, `var(--spacing-4)`, `var(--font-size-lg)`
- Maintain consistency across all components

### Typography Classes

- `.text-display` - For large headlines (CASH IN! CRASH OUT.)
- `.text-heading` - For section titles
- `.text-body` - For regular text content
- `.text-mono` - For code, numbers, and technical content

## 🎨 **Figma Integration Workflow**

### 1. Access Figma Design

- Ensure Figma Dev Mode MCP Server is enabled
- Select components in Figma (e.g., node-id=1-1235, node-id=1-25)
- Use MCP tools to extract design data

### 2. Extract Design Tokens

```bash
# Get design tokens from selected Figma components
# Use the MCP server to extract colors, spacing, typography
```

### 3. Implement Components

- Create reusable UI components in `src/components/ui/`
- Use the design system CSS variables
- Follow the component patterns established

## 🧩 **Component Development**

### UI Components

- **Button**: Multiple variants (primary, secondary, outline, ghost, destructive)
- **Card**: Flexible card component with header, content, footer
- **Navbar**: Navigation with wallet connection
- **Layout**: Consistent layout patterns

### Component Structure

```
src/components/
├── ui/                    # Base UI components
│   ├── Button/
│   ├── Card/
│   └── index.ts
├── layout/               # Layout components
│   ├── Navbar/
│   └── index.ts
├── features/             # Feature-specific components
├── wallet/               # Wallet-related components
└── common/               # Shared components
```

## 🚀 **Development Process**

### 1. Design Review

- Review Figma design for new components
- Extract design tokens and measurements
- Plan component structure and hierarchy

### 2. Component Creation

- Create component with proper TypeScript interfaces
- Use design system CSS variables
- Implement responsive design
- Add accessibility features

### 3. Integration

- Import and use components in pages
- Test responsive behavior
- Verify design fidelity
- Check accessibility

### 4. Refinement

- Optimize performance
- Add animations and transitions
- Implement error handling
- Add loading states

## 🎯 **Best Practices**

### Design System

- Always use CSS variables from design tokens
- Maintain consistent spacing and typography
- Follow the established color palette
- Use semantic HTML elements

### Code Quality

- Use TypeScript for type safety
- Implement proper error handling
- Add accessibility attributes
- Follow React best practices

### Performance

- Use React.memo for expensive components
- Optimize images and assets
- Implement proper loading states
- Use code splitting for large components

## 🔧 **Tools & Integration**

### MCP Servers

- **Figma Dev Mode**: For design-to-code workflow
- **Linear**: For project management (optional)
- **Browser Tools**: For debugging and testing

### Development Tools

- **Cursor**: Primary IDE with AI assistance
- **Figma**: Design and prototyping
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

## 📋 **Workflow Checklist**

### For New Components

- [ ] Review Figma design
- [ ] Extract design tokens
- [ ] Create component structure
- [ ] Implement with design system
- [ ] Add TypeScript interfaces
- [ ] Test responsive design
- [ ] Add accessibility features
- [ ] Integrate into pages
- [ ] Test and refine

### For Design Updates

- [ ] Update design tokens if needed
- [ ] Modify components to match design
- [ ] Test across different screen sizes
- [ ] Verify accessibility
- [ ] Update documentation

## 🎨 **Design System Reference**

### Colors

- `--color-primary`: Blue (#3b82f6) - Main actions and branding
- `--color-accent-green`: Green (#10b981) - Success states and money
- `--color-accent-red`: Red (#ef4444) - Errors and destructive actions
- `--color-accent-yellow`: Yellow (#f59e0b) - Warnings and highlights

### Spacing

- Use spacing scale: `--spacing-1` (4px) to `--spacing-32` (128px)
- Container padding: `--container-padding` (1rem)

### Typography

- Font families: Primary (Geist), Mono (Geist Mono)
- Font sizes: `--font-size-xs` to `--font-size-8xl`
- Font weights: Light (300) to Extrabold (800)

## 🔄 **Continuous Improvement**

- Regularly review and update design tokens
- Refactor components for better reusability
- Optimize performance and accessibility
- Update documentation and workflows
- Gather feedback and iterate on design system
