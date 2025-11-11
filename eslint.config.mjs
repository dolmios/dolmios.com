import { fileURLToPath } from "url";
import path from "path";
import dolmios from "eslint-config-dolmios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    ...dolmios,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: __dirname,
            }
        }
    },
    {
        rules: {
            "react-hooks/exhaustive-deps": "off",
            "no-console": "off",
            "no-alert": "off",
        }
    }
];
