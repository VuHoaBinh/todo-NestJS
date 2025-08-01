import { v4 as uuidv4 } from 'uuid';

export abstract class Domain<D> {
  protected id: string;
  protected props: D;
  protected version: number = 0;
  protected createdAt: Date | null = null;
  protected createdBy: string = '';
  protected updatedBy: string = '';
  protected updatedAt: Date | null = null;

  protected constructor(props: D, id?: string) {
    this.id = id || this.generateId();
    this.props = props;
  }

  generateId() {
    return uuidv4();
  }

  getId(): string {
    return this.id;
  }

  getProps(): D {
    return this.props;
  }

  getVersion(): number {
    return this.version;
  }
  setVersion(version: number): void {
    this.version = version;
  }

  getCreatedAt(): Date | null {
    return this.createdAt;
  }
  setCreatedAt(date: Date): void {
    this.createdAt = date;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }
  setCreatedBy(createdBy: string): void {
    this.createdBy = createdBy;
  }

  getUpdatedBy(): string {
    return this.updatedBy;
  }
  setUpdatedBy(updatedBy: string): void {
    this.updatedBy = updatedBy;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
  setUpdatedAt(date: Date): void {
    this.updatedAt = date;
  }
  toPersistence(): any {
    return {
      id: this.id,
      ...this.props,
      version: this.version,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt,
    };
  }

  JSON(): string {
    return JSON.stringify(this.toPersistence());
  }
}

export const USER_STATES = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  BANNED: 'Banned',
  NO_VERIFIED: 'NoVerified'
} as any;

export type UserState = typeof USER_STATES[keyof typeof USER_STATES];

export type UserProps = {
  name: string;
  email: string;
  state: UserState
};

export class User extends Domain<UserProps> {
  getName(): string {
    return this.props.name;
  }

  getEmail(): string {
    return this.props.email;
  }

  getState(): UserState {
    return this.props.state;
  }

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  update(props: UserProps): boolean {
    let updated = false;

    if (props.name !== undefined) {
      this.props.name = props.name;
      updated = true;
    }
    if (props.email !== undefined) {
      this.props.email = props.email;
      updated = true;
    }
    if (props.state !== undefined) {
      this.props.state = props.state;
      updated = true;
    }

    return updated;
  }
}
