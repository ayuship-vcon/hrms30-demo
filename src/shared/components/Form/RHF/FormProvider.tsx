import React from 'react';
import {
  FormProvider as RHFFormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

export interface FormProviderProps<TFieldValues extends FieldValues = FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  id?: string;
}

/**
 * Reusable Form Provider wrapper with HTML Form integration
 */
export function FormProvider<TFieldValues extends FieldValues = FieldValues>({
  children,
  methods,
  onSubmit,
  className = 'flex flex-col gap-4',
  id,
}: FormProviderProps<TFieldValues>) {
  return (
    <RHFFormProvider {...methods}>
      <form id={id} onSubmit={methods.handleSubmit(onSubmit)} className={className} noValidate>
        {children}
      </form>
    </RHFFormProvider>
  );
}
