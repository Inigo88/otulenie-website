# Data Model: Funny 404 Page (020)

## Overview

This feature is a static informational page and does not introduce new persistent data entities or database schemas.

## UI State

While there is no persistent data model, the following UI state is managed:

| State Variable | Type | Source | Description |
| -------------- | ---- | ------ | ----------- |
| `pathname` | `string` | `react-router-dom` | Used to determine if the current route matches any defined routes or if the 404 view should be shown. |
| `tagline` | `string` | Local Constant | One of the 3 proposed premium-calm taglines. |

## Relationships

- **NotFound View** -> **App Layout**: Wraps within the global layout (Navbar, Footer, Noise Overlay).
- **NotFound View** -> **Home Route**: Provides a link back to the root path.
