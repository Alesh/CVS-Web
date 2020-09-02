import { ConnectionSettings } from './Connection';
import { Participant } from './Participant';

/// Session settings
export interface SessionSettings extends ConnectionSettings {
  /// SessionImpl ID
  readonly sessionId: string;
  /// RTC configuration
  readonly rtcConfiguration: RTCConfiguration;
}

/// Session listener
export interface SessionListener {
  /// Called when a error occurred
  onError?(reason: Error): void;
  /// Called when the session client connects to the session server.
  onConnected?(): void;
  /// Called when a connection error occurred
  onConnectionError?(reason: Error): void;
  /// Called when the session client has disconnected from the session server.
  onDisconnected?(): void;
  /// Called when a local participant's stream has started publishing
  onStartPublishing?(publisher: Participant): void;
  /// Called when a local participant's stream has stopped publishing
  onStopPublishing?(publisher: Participant): void;
  /// Called when a remote participant's stream has been received
  onStreamReceived?(remote: Participant): void;
  /// Called when a remote participant's stream has been disappeared
  onStreamDropped?(remote: Participant): void;
}
