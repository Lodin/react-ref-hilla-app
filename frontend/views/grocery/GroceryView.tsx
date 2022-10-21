import cn from 'classnames';
import type GroceryItem from 'Frontend/generated/com/example/application/GroceryItem';
import { ReactElement, useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button, Grid, GridColumn, NumberField, TextField } from 'react-vaadin-components';
import { GroceryEndpoint } from 'Frontend/generated/endpoints';
import { EndpointValidationError } from '@hilla/frontend';

export default function GroceryView(): ReactElement<unknown> | null {
  const empty: GroceryItem = { name: '', quantity: 1 };
  const [groceries, setGroceries] = useState(Array<GroceryItem>());

  useEffect(() => {
    (async () => {
      setGroceries(await GroceryEndpoint.getGroceries());
    })();

    return () => { };
  }, []);

  const formik = useFormik({
    initialValues: empty,
    onSubmit: async (value: GroceryItem, { setSubmitting, setErrors }) => {
      try {
        await GroceryEndpoint.save(value);
        setGroceries([...groceries, value]);
        formik.resetForm();
      } catch (e: unknown) {
        if (e instanceof EndpointValidationError) {
          const errors: FormikErrors<GroceryItem> = {}
          for (const error of e.validationErrorData) {
            if (typeof error.parameterName === 'string' && error.parameterName in empty) {
              const key = error.parameterName as (string & keyof GroceryItem);
              errors[key] = error.message;
            }
          }
          setErrors(errors);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <section className={cn('p-m')}>
        <div>
          <TextField
            name='name'
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          <NumberField
            name='quantity'
            label="Quantity"
            value={formik.values.quantity?.toString()}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          <Button
            theme="primary"
            disabled={formik.isSubmitting}
            onClick={formik.submitForm}
          >Add</Button>
        </div>

        <h3>Grocery List</h3>
        <Grid items={groceries} theme="row-stripes" style={{ maxWidth: '400px' }}>
          <GridColumn
            path="name"
            autoWidth
            itemRenderer={({ item }) => <span>{item.name}</span>}
          />
          <GridColumn
            path="quantity"
            autoWidth
            itemRenderer={({ item }) => <span>{item.quantity}</span>}
          />
        </Grid>
      </section>
    </>
  );
}
