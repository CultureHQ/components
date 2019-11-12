declare namespace jest {
  interface Matchers<R, T> {
    toHaveNoViolations: () => R;
  }
}
