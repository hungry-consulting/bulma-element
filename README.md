`@hungry/bulma-element`
====

[Bulma elements](https://bulma.io/documentation/elements/) in typescript with [`styled-components`](https://github.com/styled-components/styled-components) and [`styled-system`](https://github.com/jxnblk/styled-system) features.

[Storybook](https://hungry-consulting.github.io/bulma-element/index.html)
[Docs](https://hungry-consulting.github.io/bulma-element/api/index.html)

### Why
* `Bulma` provides great baseline for any component, but sometimes there is a need to override it within specific context, this is why `css-modules`, `style-components` and `styled-system` are enabled from default for all components
* there are some implementation of `bulma` for typescript, however typings for the time being seems to have very low resolution and most of them do not assume that every selector could be changed by bulma modifiers 
* provide thin layer of abstraction for css whilst preserving nature of CSS - all modifiers can be applied to any component - it is explicitly defined no auto magic assumption
* missing bridge between existing sass frameworks and css in js - porting any component from sass world

### How to enable `@hungry/bulma-element` in you project
`bulma-element` require `webpack` and some `loaders`. All of them are predefined and there is no special requirements, however minimal setup assumes, loaders below
```ts
  import {
    styleLoader,            // style-loaders
    cssLoader,              // css-loader with some predefined css-modules setup
    sassLoader,             // predefined sass-loader with include-paths and implementation defined
    sassDevelopmentLoaders, // bundle of these 3 above
    } from '@hungry/webpack-parts'

  const sassRule = {
    test: /\.sass$/,
    use: sassDevelopmentLoaders()
  }
```

#### Using predefined `typescript` setup
You can leverage minimal typescript setup from `@hugnry/webpack-parts`, like so

```ts
import { Configuration, minimalTypescriptWithSass } from '@hungry/webpack-parts'
import { theme } from '@hungry/bulma-theme'
// this part is only required if you are going to provide bulma-theme overriding
import { injectSassVarLoader } from '@hungry/webpack-sass-theme-loader'

export const applyTSConfig =
  (cfg: Configuration) =>
    minimalTypescriptWithSass(cfg)
      .map(injectSassVarLoader(theme))
      .run({
        env: 'development',
        target: 'web',
      })

const config = applyTSConfig({/* your webpack config */})
```

If you encounter any issues, you can check `webpack.showcase.ts` to get full view how it works with `storybook`.

### Example component
#### API

##### Primitives
```ts
  <Button 
    // bulma modifiers provided by sassy-react-component
    isActive 
    isDanger 
    hasTextWarning 
    // styled components feature
    as="section"
    // styled-system features
    width={1}
    p={2}
  />
```

##### BEM Blocks
There are some predefined `BEM` like components which contains more than one element. To differentiate them the most outer is called `Block`.

```ts
import { Notification } from '@hungry/bulma-element'

<Notification.Block isPrimary>
  <Notification.DeleteButton />
  Some Notification text
</Notification.Block>
```

### How it differentiate comparing to others
* this is 1:1 `bulma` conversion, so all modifiers are available here as well. There is no manual step in it (beside the definition of component :)) so all is autogenerated based on sass files.

### Where is the rest of bulma components
This package is final, this is, all bulma elements were exported from `bulma, bulma components would be provided as separate package.

### Contribution
TODO