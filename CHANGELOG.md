# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- The ability to set `initialValues` on a `Form` component.

## [2.2.0] - 2018-08-21
### Added
- The `Spinner` component.
- The `Loader` component.
- The `Panel` component.
- The `EmailField`, `NumberField`, `StringField`, and `PasswordField` components.
- The `Form` component.
- The `CentsField` component.

### Changed
- Renamed animations to be consistent with naming style throughout the rest of the component library e.g., `chqSpin`.
- The `Nav` component now displays on scroll if the previous scroll position was zero. This fixes the behavior of hiding the nav when the page first loads.

## [2.1.1] - 2018-07-31
### Changed
- The main color on the `Pagination` component to be the primary blue instead of the weird other blue.

## [2.1.0] - 2018-07-31
### Added
- The `Pagination` component.

## [2.0.2] - 2018-07-30
### Changed
- Added the new "checked" value to the callback for the `Checkmark` component.

## [2.0.1] - 2018-07-27
### Changed
- Package names can't have capital letters anymore: "@culturehq/components".

## [2.0.0] - 2018-07-27
### Added
- A ton of documentation to the README.

### Changed
- The package name from "culturehq-components" to "@CultureHQ/components".

### Removed
- The ability to pass arbitrary props beyond normally expected ones such as `className` or `onClick`.

## [1.6.0] - 2018-07-27
### Added
- The `Checklist` component.
- The `Checkmark` component.

## [1.5.0] - 2018-07-26
### Added
- The `pin` icon.
- The `pin-outline` icon.

## [1.4.1] - 2018-07-23
### Changed
- Scale down the `checklist` and `calendar-filled` icons by 20%.

## [1.4.0] - 2018-07-23
### Added
- The `checklist` icon.
- The `calendar-filled` icon.

### Changed
- The `thumbsup` icon to be fully filled.
- The `thumbsdown` icon to reflect the `thumbsup` icon.

## [1.3.0] - 2018-07-18
### Changed
- Don't use webpack to build the final release, just use babel.

## [1.2.0] - 2018-07-13
### Added
- The `Hamburger` component.

## [1.1.1] - 2018-07-12
### Changed
- Fixed the `className` prop overriding other classes on the `Nav` component.

## [1.1.0] - 2018-07-12
### Added
- The `Nav` component.
- `sass-lint` to the build pipeline.

### Changed
- Removed outlines from the `Badge` component.

## [1.0.3] - 2018-07-10
### Changed
- Allow `Subnav` to function as a controller component properly.

## [1.0.2] - 2018-07-10
### Changed
- Added explicit rules for the `Subnav.Item` component's hover.

## [1.0.1] - 2018-07-10
### Changed
- Made the `Badge` component use a `1em` font-size instead of `1rem`.

## [1.0.0] - 2018-07-09
### Changed
- Removed the `styled-components` dependency in favor of using the `sass-loader` from `webpack`.

## [0.1.0] - 2018-07-03
### Added
- The `Badge` component.

## [0.0.16] - 2018-07-02
### Added
- The optional `square` prop on the `Thumbnail` component for turning off rounded borders.

## [0.0.15] - 2018-06-25
### Added
- The `FeedItem` component.

## [0.0.14] - 2018-06-25
### Added
- The `trophy-cup` icon.

## [0.0.13] - 2018-06-25
### Added
- The `calendar-add`, `calendar-check`, `calendar-clock`, `calendar-date`, `calendar-gear`, `feedback`, `image-add`, `people`, `person-check`, `thumbsup-outline`, and `trophy-star` icons.

## [0.0.12] - 2018-06-25
### Removed
- The unnecessary `example.js` file from the distribution directory by properly using webpack dev and prod builds.

## [0.0.11] - 2018-06-25
### Changed
- Readded the dynamic import of the `icons.json` file.

## [0.0.10] - 2018-06-25
### Changed
- Simplified the `Subnav` component, assuming everything functions off the `onChange` prop.

## [0.0.9] - 2018-06-23
### Changed
- Enforce `text-decoration` and `color` on hover of the `Subnav.Item` component.

## [0.0.8] - 2018-06-23
### Added
- The `Subnav` component.

## [0.0.7] - 2018-06-22
### Added
- The `Button` component.
- The optional `size` prop to the `Thumbnail` component.

### Changed
- Removed the dynamic import of the `icons.json` file since it's so much smaller now.

## [0.0.6] - 2018-06-19
### Changed
- The font color on the `Info` component to use the primary font color.

## [0.0.5] - 2018-06-19
### Added
- `eslint` and the corresponding `yarn lint` command.
- `prettier` and the corresponding `yarn prettier` command.

### Changed
- Pass on any extra props to the root in each display component (allows things like passing `className` as a prop).

## [0.0.4] - 2018-06-18
### Added
- The `Icon` component, as well as the dev libraries needed to support dynamic import in webpack.
- The `Tag` component.
- The `Thumbnail` component.

## [0.0.3] - 2018-06-15
### Changed
- Explicitly add the `styled-components` dependency.

## [0.0.2] - 2018-06-15
### Added
- The `Info` component.
- The `Success` component.

## [0.0.1] - 2018-06-15
### Added
- Initial checkin.
- The `Warning` component.

[Unreleased]: https://github.com/CultureHQ/components/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/CultureHQ/components/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/CultureHQ/components/compare/v2.1.0...v2.1.1
[2.1.1]: https://github.com/CultureHQ/components/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/CultureHQ/components/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/CultureHQ/components/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/CultureHQ/components/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/CultureHQ/components/compare/v1.6.0...v2.0.0
[1.6.0]: https://github.com/CultureHQ/components/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/CultureHQ/components/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/CultureHQ/components/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/CultureHQ/components/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/CultureHQ/components/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/CultureHQ/components/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/CultureHQ/components/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/CultureHQ/components/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/CultureHQ/components/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/CultureHQ/components/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/CultureHQ/components/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/CultureHQ/components/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/CultureHQ/components/compare/v0.0.16...v0.1.0
[0.0.16]: https://github.com/CultureHQ/components/compare/v0.0.15...v0.0.16
[0.0.15]: https://github.com/CultureHQ/components/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/CultureHQ/components/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/CultureHQ/components/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/CultureHQ/components/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/CultureHQ/components/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/CultureHQ/components/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/CultureHQ/components/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/CultureHQ/components/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/CultureHQ/components/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/CultureHQ/components/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/CultureHQ/components/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/CultureHQ/components/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/CultureHQ/components/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/CultureHQ/components/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/CultureHQ/components/compare/9319be...v0.0.1
