type LogLevel = "debug" | "info" | "warn" | "error";
type LogContext = Record<string, unknown>;
const sensitiveKeys = /password|token|cookie|secret|database_url/i;
function log(level: LogLevel, message: string, context: LogContext = {}) {
  const safeContext = Object.fromEntries(
    Object.entries(context).map(([key, value]) => [
      key,
      sensitiveKeys.test(key) ? "[REDACTED]" : value,
    ]),
  );
  console[level](
    JSON.stringify({ level, message, timestamp: new Date().toISOString(), ...safeContext }),
  );
}
export const logger = {
  debug: (message: string, context?: LogContext) => log("debug", message, context),
  info: (message: string, context?: LogContext) => log("info", message, context),
  warn: (message: string, context?: LogContext) => log("warn", message, context),
  error: (message: string, context?: LogContext) => log("error", message, context),
};
