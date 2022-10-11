import cn from 'classnames';
import * as HelloWorldEndpoint from 'Frontend/generated/HelloWorldEndpoint';
import React, { useState } from 'react';
import { Button, Notification, TextField } from 'react-vaadin-components';

export default function HelloWorldView(): React.ReactElement<unknown> | null {
  const [name, setName] = useState('');

  return (
    <div className={cn('flex', 'p-m', 'gap-m', 'items-end')}>
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
    </div>
  );
}
