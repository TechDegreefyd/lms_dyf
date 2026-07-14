<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Figma-to-Code Fidelity Rule

For every screenshot I upload of a Figma frame, follow these rules exactly:

1. **Match colors exactly** — use the precise hex values shown or implied in the screenshot. Do not substitute similar-looking Tailwind default colors; use arbitrary values (e.g. `bg-[#0D3B59]`) when the exact hex isn't a standard Tailwind shade.
2. **Match text exactly** — use the exact copy, labels, and placeholder text shown in the image. Do not paraphrase, shorten, expand, or "improve" wording.
3. **Match spacing/padding exactly** — replicate the padding, margins, and gaps as precisely as visible in the screenshot (or as given in accompanying spec numbers/annotations). Do not round to a "nearby" Tailwind spacing scale value if the actual value is different.
4. **Do not add anything not shown** — no extra icons, no extra buttons, no placeholder content, no additional sections, no decorative elements, no default browser/form behaviors beyond what's visible. If something isn't in the screenshot, it doesn't go in the code.
5. **Do not remove or simplify anything shown** — every visible element in the screenshot must be represented in the code.
6. **If exact values aren't visible/legible in the screenshot**, use the closest visual match and note the assumption briefly, rather than guessing silently.
7. **Layout structure should mirror the screenshot** — same element order, same alignment, same visual hierarchy — not a reinterpreted or "cleaned up" version.

