import React, { Props, ComponentType, MouseEventHandler } from 'react'
import { AnyComponentWithVariant, Primitives } from '@hungry/sassy-react-component'

import { Checkbox, Radio, File, Control, Input, formBulmaVariants, FormVariants } from './Form'

export const LoadableInput =
  ({ isLoading, ...rest }: { isLoading: boolean }) =>
    <Control isLoading={isLoading}>
      <Input {...rest} />
    </Control>

type WithChildren = Pick<Props<any>, 'children'>

type UploadButtonProps = {
  icon: ComponentType
  isBoxed: boolean
  text: string
} & WithChildren

export const UploadButton =
  ({ icon, isBoxed, children, text, ...inputProps }: Partial<UploadButtonProps>) =>
    <File.Block isBoxed={isBoxed}>
      <File.Label>
        <File.Input {...inputProps} />
        <File.CTA>
          <File.Icon>{icon}</File.Icon>
          <File.InlineLabel>{children}</File.InlineLabel>
        </File.CTA>
      </File.Label>
    </File.Block>

const LabelForCheckbox = formBulmaVariants('checkboxLabel')(Primitives.label)
const LabelForRadio = formBulmaVariants('radioLabel')(Primitives.label)

type InputProps = {
  name?: string
  onChange?: MouseEventHandler<any>
  value?: any
  checked?: boolean
} & WithChildren

type WithLabel = {
  render?: (component: AnyComponentWithVariant, props: InputProps) => ComponentType
} & InputProps & FormVariants

const makeLabeledComponentWithRender =
  ([WrappedInput, Label]: [AnyComponentWithVariant, AnyComponentWithVariant]) =>
    ({ children, render, name, onChange, value, checked, ...rest }: Partial<WithLabel>) =>
      <Label {...rest}>{
        render
          ? render(WrappedInput, { onChange, value, checked, children })
          : [<WrappedInput
            key='control'
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
          />, children]
      }</Label>

export const RadioWithLabel = makeLabeledComponentWithRender([Radio, LabelForRadio])
export const CheckboxWithLabel = makeLabeledComponentWithRender([Checkbox, LabelForCheckbox])