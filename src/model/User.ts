export enum USER_ROLE {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface AuthenticationData {
  id: string;
  role: USER_ROLE;
}

export class User {
  constructor(
    protected id: string,
    protected name: string,
    protected email: string,
    protected password: string,
    protected role: USER_ROLE
  ) {}

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getEmail() {
    return this.email;
  }
  public getPassword() {
    return this.password;
  }
  public getRole() {
    return this.role;
  }

  static toUserModel(data: any): User {
    return new User(data.id, data.name, data.email, data.password, data.role);
  }
}
