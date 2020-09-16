import * as React from 'react';
import SessionBuilder from '@cvs/session/SessionBuilder';
import Session from '@cvs/react/Session';
import Publisher from '@cvs/react/Publisher';
import LocalStream from '@cvs/react/LocalStream';
import Incoming from '@cvs/react/Incoming';
import Participants from '@cvs/react/Participants';
import Stream from '@cvs/react/Stream';
import { SessionListener } from './packages/session/Session';

interface Props {
  sessionBuilder: SessionBuilder;
  eventHandlers: SessionListener;
}

export default function ({ sessionBuilder, eventHandlers }: Props) {
  return (
    <Session sessionBuilder={sessionBuilder} eventHandlers={eventHandlers}>
      <Publisher>
        <LocalStream width={320} className="streamView" />
      </Publisher>

      <Incoming>
        <Participants>
          {({ participants }) =>
            participants.map((participant) => <Stream participant={participant} width={320} className="streamView" />)
          }
        </Participants>
      </Incoming>
    </Session>
  );
}
