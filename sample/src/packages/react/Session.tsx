import React, { PropsWithChildren } from 'react';
import { Session, SessionListener } from '@cvs/session/Session';
import SessionBuilder from '@cvs/session/SessionBuilder';

interface Props {
  sessionId: string;
  serverUrl?: string;
  eventHandlers?: SessionListener;
}

function defaultUrl(): string {
  let { protocol, hostname, port } = window.location;
  protocol = protocol === 'http:' ? 'ws' : 'wss';
  port = hostname === 'localhost' ? '8188' : port;
  return `${protocol}://${hostname}:${port}/janus-ws`;
}

/// Session context
export const SessionContext = React.createContext<Session | null>(null);

/// Component initializes the session and sets its context for children.
export default function ({ sessionId, serverUrl, eventHandlers, children }: PropsWithChildren<Props>) {
  const sessionBuilder = new SessionBuilder(serverUrl || defaultUrl(), sessionId);
  const session = sessionBuilder.build(eventHandlers, true);
  React.useEffect(() => {
    session.connect().catch(console.error);
    return () => {
      session.disconnect().catch(console.error);
    };
  });
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
