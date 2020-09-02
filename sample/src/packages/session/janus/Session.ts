import Session from '../abc/Session';
import Publisher from '../abc/Publisher';
import JanusConnection from './Connection';
import { ConnectionState } from '../types/Connection';
import { SessionListener, SessionSettings } from '../types/Session';
import { Message } from './types';
import { CVSError } from '../types/types';

/// Janus implementation on session
export default class extends Session {
  private _janus: JanusConnection;

  constructor(settings: SessionSettings, listener?: SessionListener) {
    super(settings, listener);
    this._janus = new JanusConnection(settings);
  }

  /// Renews connection
  protected createConection(): JanusConnection {
    if (this.connection && this.connection.state !== ConnectionState.Closed)
      throw new CVSError('Previous connection is not close, but request renew');
    this._janus = new JanusConnection(this.settings, this.onMessage);
    return this._janus;
  }

  /// Starts publishing
  protected async startPublishing(publisher: Publisher): Promise<void> {
    throw new Error('Not yet implemented');
  }

  /// Stops publishing
  protected async stopPublishing(publisher: Publisher): Promise<void> {
    throw new Error('Not yet implemented');
  }

  private onMessage(message: Message) {
    // ToDo: Process events
  }
}
