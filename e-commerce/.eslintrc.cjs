module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "airbnb" ,
        "airbnb-typescript" ,
        "airbnb/hooks",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "overrides": [
    ],
    "ignorePatterns": [
        'dist', '.eslintrc.cjs', 'vite.config.ts'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json',
        "tsconfigRootDir": __dirname,
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        /*'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],*/
        'react/react-in-jsx-scope': 0,
    }
}
