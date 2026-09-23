import type {
  LocationFormValues,
  LocationModuleConfig,
} from '../core/types';

export type LocationFormErrors = Partial<
  Record<keyof LocationFormValues, string>
>;

export const validateLocationForm = (
  values: LocationFormValues,
  config: LocationModuleConfig,
): LocationFormErrors => {
  const errors: LocationFormErrors = {};

  config.fields.forEach((field) => {
    const value = values[field.name];

    if (field.required && !value?.trim()) {
      errors[field.name] = `${field.label} is required`;
    }
  });

  return errors;
};