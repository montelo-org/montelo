// taken from https://github.com/notiz-dev/nestjs-prisma
// with minor modifications
import { Prisma } from "@montelo/db";
import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

export type ErrorCodesStatusMapping = {
  [key: string]:
    | number
    | {
        statusCode?: number;
        errorMessage?: string;
      };
};

// @ts-ignore
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  /**
   * default error codes mapping
   *
   * Error codes definition for Prisma Client (Query Engine)
   * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
   */
  private readonly defaultMapping: Record<string, number> = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  private readonly userDefinedMapping?: ErrorCodesStatusMapping;

  /**
   * @param applicationRef
   * @param errorCodesStatusMapping
   */
  constructor(applicationRef?: HttpServer, errorCodesStatusMapping?: ErrorCodesStatusMapping) {
    super(applicationRef);

    this.userDefinedMapping = errorCodesStatusMapping;
  }

  /**
   * @param exception
   * @param host
   * @returns
   */
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    return this.catchClientKnownRequestError(exception, host);
  }

  private catchClientKnownRequestError(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const statusCode = this.userDefinedStatusCode(exception) || this.defaultStatusCode(exception);

    const message = this.userDefinedExceptionMessage(exception) || this.defaultExceptionMessage(exception);

    if (host.getType() === "http") {
      if (statusCode === undefined) {
        return super.catch(exception, host);
      }
      // regex to extract the code from "[ERROR_CODE]: ERROR_MESSAGE"
      const regex = /\[\w+\]:\s*(.*)/;
      const messageWithoutCode = message.match(regex)?.[1];

      return super.catch(new HttpException({ statusCode, message: messageWithoutCode ?? message }, statusCode), host);
    }
  }

  private userDefinedStatusCode(exception: Prisma.PrismaClientKnownRequestError): number | undefined {
    const userDefinedValue = this.userDefinedMapping?.[exception.code];
    return typeof userDefinedValue === "number" ? userDefinedValue : userDefinedValue?.statusCode;
  }

  private defaultStatusCode(exception: Prisma.PrismaClientKnownRequestError): number | undefined {
    return this.defaultMapping[exception.code];
  }

  private userDefinedExceptionMessage(exception: Prisma.PrismaClientKnownRequestError): string | undefined {
    const userDefinedValue = this.userDefinedMapping?.[exception.code];
    return typeof userDefinedValue === "number" ? undefined : userDefinedValue?.errorMessage;
  }

  private defaultExceptionMessage(exception: Prisma.PrismaClientKnownRequestError): string {
    const shortMessage = exception.message.substring(exception.message.indexOf("→"));
    return `[${exception.code}]: ` + shortMessage.substring(shortMessage.indexOf("\n")).replace(/\n/g, "").trim();
  }
}
