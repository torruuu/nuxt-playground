import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .max(500, 'Máximo 500 caracteres'),
  price: z.coerce
    .number({ message: 'El precio debe ser un número' })
    .positive('El precio debe ser mayor que 0'),
  stock: z.coerce
    .number({ message: 'El stock debe ser un número' })
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  category: z.string().min(1, 'La categoría es obligatoria'),
})

export type ProductForm = z.infer<typeof productSchema>
