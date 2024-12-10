import { InjectionToken } from "@angular/core";
import { LoggingService } from "./logging.service";

export const LOGGING_SERVICE_TOKEN = new InjectionToken<LoggingService>('some-name-here');