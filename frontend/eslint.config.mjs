import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 기존 next + typescript 규칙 적용
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👇 사용자 규칙 추가
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "off", // 필요 시
      "no-unused-vars": "off",
      "@next/next/no-img-element": "off"
    },
  },
];

export default eslintConfig;
