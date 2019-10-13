export class HttpResponse {
  private success: boolean;

  // tslint:disable-next-line:array-type
  private data: Array<any>;

  private message: string;

  constructor(success: boolean, message: string, data: any = []) {
    this.success = success;
    this.message = message;

    if (data.length === 0) {
      this.data = [];
    } else if (data.length > 1) {
      this.data = data;
    } else {
      this.data = [data];
    }
  }
}
