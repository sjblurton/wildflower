import type { LogEvent } from './events';
import { isRecord } from '../primitives/guards';

type LogLevel = 'info' | 'warn' | 'error';

export interface LogPayload {
  event: LogEvent;
  message: string;
  area: string;
  meta?: Record<string, unknown>;
}

export const summarisePayload = (payload: unknown) => {
  if (!isRecord(payload)) {
    return { valueType: typeof payload };
  }

  const topLevelKeys = Object.keys(payload).slice(0, 20);

  return {
    valueType: 'object',
    topLevelKeys,
  };
};

interface LogEntry extends LogPayload {
  level: LogLevel;
  timestamp: string;
}

const emit = (level: LogLevel, payload: LogPayload) => {
  const entry: LogEntry = {
    level,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  if (level === 'error') {
    console.error(entry);
    return;
  }

  if (level === 'warn') {
    console.warn(entry);
    return;
  }

  console.info(entry);
};

export const logger = {
  info: (payload: LogPayload) => emit('info', payload),
  warn: (payload: LogPayload) => emit('warn', payload),
  error: (payload: LogPayload) => emit('error', payload),
};
