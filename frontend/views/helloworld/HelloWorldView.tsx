import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import * as HelloWorldEndpoint from 'Frontend/generated/HelloWorldEndpoint';
import { useState } from 'react';
import css from './HelloWorld.module.scss';
import img from './placeholder.avif';

export default function HelloWorldView() {
  const [name, setName] = useState('');

  return (
    <>
      <section className="flex p-m gap-m items-end">
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
