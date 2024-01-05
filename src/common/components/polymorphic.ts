import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  JSXElementConstructor,
  ReactNode,
} from "react";

type ExtendedProps<_ExtendedProps = unknown, OverrideProps = unknown> = OverrideProps &
  Omit<_ExtendedProps, keyof OverrideProps>;

type PropsOf<E extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<E, ComponentPropsWithoutRef<E>>;

type ComponentProp<T extends ElementType> = {
  as?: T;
};

type InheritedProps<E extends ElementType, P = unknown> = ExtendedProps<PropsOf<E>, P>;

export type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>["ref"];

export type PolymorphicComponentProps<E extends ElementType, P = unknown> = InheritedProps<
  E,
  P & ComponentProp<E>
> & {
  ref?: PolymorphicRef<E>;
};

export type PolymorphicComponent<E extends ElementType, P = unknown> = PolymorphicComponentProps<
  E,
  P
> & {
  <T extends ElementType = E>(props: PolymorphicComponentProps<T, P>): ReactNode | null;
  displayName?: string;
};
