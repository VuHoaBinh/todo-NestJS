export enum ResultStatus {
  OK = 1,
  FAIL = 2,
  ERROR = 3,
}

export class OperationResult<D> {
  readonly status: ResultStatus;
  readonly data?: D;
  readonly message?: string;
  readonly error?: Error;

  constructor(status: ResultStatus, data?: D, message?: string, error?: Error) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  isOk(): boolean {
    return this.status === ResultStatus.OK;
  }

  isFail(): boolean {
    return this.status === ResultStatus.FAIL;
  }

  isError(): boolean {
    return this.status === ResultStatus.ERROR;
  }

  static success<D>(data?: D, message?: string): OperationResult<D> {
    return new OperationResult(ResultStatus.OK, data, message);
  }

  static fail<D>(error: Error, message?: string): OperationResult<D> {
    return new OperationResult(
      ResultStatus.FAIL,
      undefined as unknown as D,
      message,
      error,
    );
  }

  static error<D>(
    error: Error,
    data?: D,
    message?: string,
  ): OperationResult<D> {
    return new OperationResult(ResultStatus.ERROR, data, message, error);
  }
}

// export class OperationResult<T> {
//   status: 'ok' | 'failed' | 'error';
//   data?: T;
//   message?: string;

//   protected constructor(props: {
//     status: 'ok' | 'failed' | 'error';
//     data?: T;
//     message?: string;
//   }) {
//     this.status = props.status;
//     this.data = props.data;
//     this.message = props.message;
//   }

//   static result<T>(
//     status: 'ok' | 'failed' | 'error',
//     data?: T,
//     message?: string,
//   ): OperationResult<T> {
//     return new OperationResult<T>({
//       status,
//       data,
//       message,
//     });
//   }

//   static success<T>(data?: T): OperationResult<T> {
//     return this.result('ok', data, 'successfully');
//   }
// }

