import type { LogEvent } from './events';
import { isRecord } from '../primitives/guards';
import chalk from 'chalk';

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

const levelColor = {
  info: chalk.blue.bold,
  warn: chalk.yellow.bold,
  error: chalk.red.bold,
};

const emit = (level: LogLevel, payload: LogPayload) => {
  const entry: LogEntry = {
    level,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  const title = levelColor[level](`[${level.toUpperCase()}:${payload.event.toUpperCase()}]`);

  if (level === 'error') {
    console.error(title, entry);
    return;
  }

  if (level === 'warn') {
    console.warn(title, entry);
    return;
  }

  console.info(title, entry);
};

export const logger = {
  info: (payload: LogPayload) => emit('info', payload),
  warn: (payload: LogPayload) => emit('warn', payload),
  error: (payload: LogPayload) => emit('error', payload),
};
