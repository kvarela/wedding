import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        gold: {
          50: { value: '#F7E7C6' },
          100: { value: '#F7E7C6' },
          200: { value: '#E8D3A2' },
          300: { value: '#D8BC79' },
          400: { value: '#C6A45A' },
          500: { value: '#B8964A' },
          600: { value: '#9F7F3C' },
          700: { value: '#7A612E' },
          800: { value: '#7A612E' },
          900: { value: '#7A612E' },
          950: { value: '#7A612E' },
        },
        orange: {
          50: { value: '#F7E7C6' },
          100: { value: '#F7E7C6' },
          200: { value: '#E8D3A2' },
          300: { value: '#D8BC79' },
          400: { value: '#C6A45A' },
          500: { value: '#B8964A' },
          600: { value: '#9F7F3C' },
          700: { value: '#7A612E' },
          800: { value: '#7A612E' },
          900: { value: '#7A612E' },
          950: { value: '#7A612E' },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

