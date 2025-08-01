export interface Command<T = any> {
  execute(...args: any[]): Promise<T>;
}
