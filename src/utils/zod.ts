import { z } from 'zod'

export type CustomErrors = {
  path?: string
  message: string
}

/**
 * Transforms zod errors to a custom format
 * @param error the zod error
 * @returns the custom zod errors
 */
export const transformZodErrors = (error: z.ZodError): CustomErrors[] => {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))
}

/**
 * Reverse transforms custom zod errors to zod errors
 * @param errors the custom zod errors of type CustomZodErrors
 * @returns the zod error of type z.ZodError
 */
export const reverseTransformZodErrors = (errors: CustomErrors[]): z.ZodError => {
  return new z.ZodError(
    errors.map((error) => ({
      path: error.path?.split('.') || [],
      message: error.message,
      code: z.ZodIssueCode.custom,
    })),
  )
}

/**
 * Checks if a string is a property of a zod schema
 * @param schema the zod schema to be checked
 * @param property the property to be checked
 */
export const isPropertySchema = (schema: z.ZodObject<any> | z.ZodEffects<any>, property: string): boolean => {
  if (schema instanceof z.ZodEffects) {
    return schema._def.schema.hasOwnProperty(property)
  }
  return schema.shape.hasOwnProperty(property)
}
