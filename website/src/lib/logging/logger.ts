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

/**
 * Global logging control. Set to false to disable all logging output.
 * Use logger.setEnabled(false) to turn off, logger.setEnabled(true) to turn on.
 */
let loggingEnabled = false;

/**
 * Emit a log entry. If logging is globally disabled, only emits if force is true.
 * @param level LogLevel
 * @param payload LogPayload
 * @param force Optional. If true, emits even if logging is disabled (for critical errors).
 */
const emit = (level: LogLevel, payload: LogPayload, force = false) => {
  if (!loggingEnabled && !force && payload.event !== 'DEV_TEST_EVENT') return;
  const { meta, ...rest } = payload;
  const entry: LogEntry = {
    level,
    timestamp: new Date().toISOString(),
    ...rest,
  };

  const title = levelColor[level](`[${level.toUpperCase()}:${payload.event.toUpperCase()}]`);

  if (level === 'error') {
    console.error(title, entry);
  } else if (level === 'warn') {
    console.warn(title, entry);
  } else {
    console.info(title, entry);
  }

  if (meta) {
    console.info(levelColor[level](`${title}-METADATA`));
    console.dir(meta, { depth: null, colors: true });
  }
};

/**
 * Logger interface with global enable/disable and per-call force override.
 *
 * Example usage:
 *   logger.setEnabled(false); // disables all logging
 *   logger.error(payload, true); // logs error even if disabled
 */
export const logger = {
  /** Enable or disable all logging globally */
  setEnabled: (enabled: boolean) => {
    loggingEnabled = enabled;
  },
  /** Returns current logging enabled state */
  isEnabled: () => loggingEnabled,
  info: (payload: LogPayload, force = false) => emit('info', payload, force),
  warn: (payload: LogPayload, force = false) => emit('warn', payload, force),
  error: (payload: LogPayload, force = true) => emit('error', payload, force),
};
