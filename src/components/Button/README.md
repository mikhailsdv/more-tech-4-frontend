## Компоненты

### Button


| prop                      | type        | description |
| ----------------------    | ----------- | ----------- |
| `fullWidth `                | bool        | Pass `true` to make button full width. |
| `small`                     | bool        | Pass `true` to render small version of button. |
| `loadingText`               | str         | Text to show (pulse) when `isLoading` = `true`. |
| `children`                  | node        | Text of a button or element to render inside a button. |
| `iconAfter: IconAfter`      | `SvgIcon`   | Icon after the text. |
| `iconBefore: IconBefore`    | `SvgIcon`   | Icon before the text.|
| `variant`                   | str         | Controls the variant of the button. Possible values are `primary`, `secondary`, `no-border`, `negative`.|
| `isLoading`                 | bool        | Pass `true` to show circular progress.      |
| `className`                 | str         | Additional class name.|
| `...rest`                   | obj         | The rest props will be passed to the root component.|
