export class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export class InvalidName extends CustomError {
  constructor() {
    super(422, "Nome inválido.");
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super(422, "Email inválido, todo email precisa conter um '@'.");
  }
}

export class InvalidPassword extends CustomError {
  constructor() {
    super(422, "Senha incorreta.");
  }
}

export class PasswordTooShort extends CustomError {
  constructor() {
    super(422, "A senha deve conter no minimo 8 caracteres.");
  }
}

export class InvalidUser extends CustomError {
  constructor() {
    super(422, "Usuário não cadastrado.");
  }
}

export class InvalidUserRegister extends CustomError {
  constructor() {
    super(422, "Usuário já cadastrado.");
  }
}
