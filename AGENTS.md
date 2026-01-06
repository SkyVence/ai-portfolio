# AGENTS.md - AI Coding Agent Guidelines

Guidelines for AI coding agents working in this repository.

## Project Overview

A static single-page portfolio website built with vanilla HTML, CSS, and JavaScript. Uses Tailwind CSS v4 via CDN for styling. No build system or package manager required.

## Tech Stack

| Category       | Technology                                |
|----------------|-------------------------------------------|
| Language       | HTML5, CSS3, Vanilla JavaScript (ES6+)    |
| CSS Framework  | Tailwind CSS v4 (CDN browser version)     |
| Fonts          | Google Fonts (Inter)                      |
| Build Tools    | None - static files served directly       |

## Project Structure

```
ai-portfolio/
├── index.html          # Main HTML file (single-page portfolio)
├── css/
│   └── style.css       # Custom CSS styles beyond Tailwind
├── js/
│   └── main.js         # JavaScript for animations and interactivity
├── prompt.md           # Prompt history tracking file
└── AGENTS.md           # This file - AI agent guidelines
```

## Conversation Logging

**IMPORTANT:** All user prompts must be logged to `prompt.md` for history tracking.

**Format:**
- When starting a new session, add a header: `# Session N` (where N is the session number)
- Log each prompt with: `## Prompt N` followed by the user's message
- Prompts are numbered sequentially starting from 0 within each session

**Example:**
```markdown
# Session 1

## Prompt 0
First user message of the session...

## Prompt 1
Second user message...

# Session 2

## Prompt 0
First message of new session...
```

**When to log:** Log every user prompt/request at the start of handling it.

## Build/Lint/Test Commands

This is a static project with no build tooling. There are no npm scripts, linting, or testing commands.

### Development
```bash
npx serve .                    # or python -m http.server 8000
```

### Validation
Since there's no automated linting, manually verify:
- HTML validity via browser DevTools or W3C validator
- CSS validity via browser DevTools
- JavaScript errors via browser console

## Code Style Guidelines

### JavaScript (js/main.js)

**Naming Conventions:**
- Functions: camelCase (e.g., `initScrollAnimations`, `initContactForm`)
- Variables: camelCase (e.g., `animatedElements`, `navLinks`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `CONTACT_EMAIL`)

**Formatting:**
- 4-space indentation
- Single quotes for strings
- Semicolons required
- Arrow functions for callbacks

**Function Documentation:**
```javascript
/**
 * Brief description of the function
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return description
 */
```

**Patterns:**
- Use `DOMContentLoaded` for initialization
- Use Intersection Observer API for scroll animations
- Group utility functions at bottom of file with section header
- Use section headers with `/* ========== */` pattern

### CSS (css/style.css)

**Naming:** kebab-case, BEM-like (e.g., `.project-card`, `.timeline-line-top`)

**Formatting:**
- Tab indentation
- One property per line
- Organized by component/feature sections with `/* ========== */` headers

**Color Palette:**
- Background: neutral-950 (#0a0a0a), neutral-900
- Text: white, neutral-100, neutral-400, neutral-500
- Borders: #262626, #333, neutral-700, neutral-800

**Transitions:** Default 0.3s ease

### HTML (index.html)

**Structure:**
- Semantic HTML5 elements (nav, main, section, footer)
- Section IDs for navigation (`#about`, `#projects`, etc.)
- Use Tailwind utility classes for styling
- 4-space indentation

**Customization Comments:** Mark editable sections with `<!-- EDIT: Description -->`

**Accessibility:**
- Use `aria-label` on icon-only links
- Use semantic headings hierarchy (h1 > h2 > h3)
- Include `alt` text on images

## Key Patterns

### Adding Content

**New Project:**
1. Copy an existing `.project-item` div in the Projects section
2. Update the date in `.project-date` (format: "Mon YYYY")
3. Modify title, description, tags, and links
4. Keep newest projects at the top

**New Education Entry:** Copy existing `.education-card` div and update details

### Scroll Animations
```html
<div class="animate-on-scroll">Content</div>
<div class="animate-on-scroll delay-200">Delayed content</div>
```

### Contact Email
Update in TWO places:
1. `js/main.js` - `CONTACT_EMAIL` constant (line 162)
2. `index.html` - mailto link in Contact section (line 356)

## Error Handling

**JavaScript:** Use early returns for null checks: `if (!element) return;`

**Forms:** Use HTML5 validation attributes (`required`, `type="email"`)

## Dependencies

All dependencies loaded via CDN in `index.html`:
- Tailwind CSS: `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`
- Google Fonts: Inter (300-700 weights)

No package.json or node_modules required.

## Important Notes

1. **No Build Step:** Changes are immediately visible - just refresh the browser
2. **Tailwind via CDN:** No `tailwind.config.js` - use standard Tailwind classes
3. **Timeline Calculations:** `initTimelineLines()` in JS calculates line positions dynamically
4. **Mobile Responsive:** Timeline hides on mobile (< 768px)
5. **Page Transitions:** Smooth fade overlay on navigation clicks

## File Modification Checklist

When editing, ensure:
- [ ] HTML is valid and semantic
- [ ] CSS follows existing section organization
- [ ] JavaScript uses existing patterns (Intersection Observer, etc.)
- [ ] Comments use `<!-- EDIT: -->` for user-customizable areas
- [ ] Test in browser DevTools for console errors
- [ ] Verify mobile responsiveness
