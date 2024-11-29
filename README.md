# react-use-translation

## Description

**react-use-translation** is a lightweight and customizable React hook for managing translations and language switching in your React applications. With support for memoization, lazy loading of translation files, and dynamic language switching, this package helps you easily implement internationalization (i18n) in your React app without the need for complex configuration.

Simply pass the desired language namespace and key to the hook, and it will return the correct translation. You can also easily manage your language preference with URL path-based locale detection and localStorage support.

## Installation

To install **react-use-translation** in your project, run the following command:
 
```npm install @kamavinga/react-use-translation```
or
```yarn add @kamavinga/react-use-translation```


## Adding Translation Files

For `@kamavinga/react-use-translation` to work correctly in your project, you need to add the translation files for the languages your app supports.

### Translation File Structure:

You should create JSON files for each language you want to support. Each file will contain translations grouped by **namespace** (such as `home` or `dashboard`).

#### Steps to Add Translation Files:

1. Create a `translations` folder in the root of your project.
2. Add JSON files for each language, for example:
   - `en.json` (for English)
   - `ar.json` (for Arabic)

#### Example of `en.json` File (for English):

```json
{
  "home": {
    "hello": "Hello",
    "welcome": "Welcome to our application"
  },
  "about": {
    "description": "This is a React app that supports multiple languages."
  }
}
```

## Usage Example

Below is an example of how to use the `@kamavinga/react-use-translation` package in your React application. This example demonstrates how to toggle between languages and display translated text.

```javascript
import React from 'react';
import useTranslation from '@kamavinga/react-use-translation';

const App = () => {
  const { translate, changeLanguage } = useTranslation("home");

  return (
    <div>
      {/* Button to change language to English */}
      <button onClick={() => changeLanguage("en")}>English</button>
      
      {/* Button to change language to Arabic */}
      <button onClick={() => changeLanguage("ar")}>Arabic</button>

      {/* Displaying translated text for 'hello' and 'welcome' */}
      <p>{translate("hello")}</p>
      <p>{translate("welcome")}</p>
    </div>
  );
};

export default App;
