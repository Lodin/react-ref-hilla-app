import cn from 'classnames';
import * as HelloWorldEndpoint from 'Frontend/generated/HelloWorldEndpoint';
import { ReactElement, useState } from 'react';
import { Button, Notification, TextField } from 'react-vaadin-components';
import css from './HelloWorld.module.scss';
import img from './placeholder.avif';

export default function HelloWorldView(): ReactElement<unknown> | null {
  const [name, setName] = useState('');

  return (
    <>
      <section className={cn('flex', 'p-m', 'gap-m', 'items-end')}>
        <TextField
          label="Your name"
          onValueChanged={(e) => {
            setName(e.detail.value);
          }}
        />
        <Button
          onClick={async () => {
            const serverResponse = await HelloWorldEndpoint.sayHello(name);
            Notification.show(serverResponse);
          }}
        >
          Say hello
        </Button>
      </section>
      <section className={css.placeholder}>
        <img src={img} alt="placeholder" />
      </section>
    </>
  );
}
