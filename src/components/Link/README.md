# Link

Universal link component.

### props

| prop          | type | description                                                              | default |
|---------------|------|--------------------------------------------------------------------------|---------|
| `block`       | bool | Pass `true` if the link wraps some block, not just text.                 |         |
| `external`    | bool | Pass `true` if the link is external.                                     |         |
| `internal`    | bool | Pass `true` if the link is internal.                                     |         |
| `to`          | str  | Href.                                                                    |         |
| `targetBlank` | bool | Only for external links. Pass `true` to make the link open in a new tab. | `true`  |
| `underline`   | bool | Controls underline. Possible values are `always` and `hover`.            |         |
| `...rest`     | obj  | The rest props will be passed to the root component.                     |         |

### Example:

```jsx
import Link from "relative/path/components/Link"

<Link
    to = "/profile"
    underline = "hover"
    internal
    className="mb-4"
/>
```