export interface Repo<E> {
  create(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(): Promise<void>;
  findAll(): Promise<E[]>;
  findOne(id: string): Promise<E | null>;
}
