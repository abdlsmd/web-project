import globals from "globals"; 
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import jsdocPlugin from "eslint-plugin-jsdoc";

/**
 * @type {import('eslint').Linter.Config[]}
 *
 * This configuration:
 * - Applies recommended rules from ESLint core and React.
 * - Uses browser and node globals (for a MERN stack) via `languageOptions`.
 * - Adds JSDoc rules to encourage documentation.
 *
 * Previously used `eslint-plugin-node` recommended rules have been removed
 * because they may contain a `globals` key and aren't flat-config compatible.
 * If Node.js rules are crucial, consider using `@eslint/eslintrc` compatibility
 * or wait for flat-config support in `eslint-plugin-node`.
 */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  // Core JS recommended rules
  pluginJs.configs.recommended,
  // React recommended flat config
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      jsdoc: jsdocPlugin
    },
    rules: {
      // JSDoc rules for better documentation
      "jsdoc/require-jsdoc": ["warn", {
        publicOnly: true,
        require: {
          FunctionDeclaration: true,
          ClassDeclaration: true,
          MethodDefinition: true
        }
      }],
      "jsdoc/require-description": "warn",

      // Suggest using const where applicable
      "prefer-const": "warn",

      // Enforce camelCase for identifiers
      "camelcase": ["warn", {properties: "always"}],

      // Discourage console.log usage, but allow warn and error
      "no-console": ["warn", {allow: ["warn", "error"]}],

      // Ensure consistent returns in functions
      "consistent-return": "warn"
    }
  }
];
