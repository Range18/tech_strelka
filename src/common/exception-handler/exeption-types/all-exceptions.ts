export namespace AllExceptions {
  export enum AuthExceptions {
    AccountIsNotVerified = 'Account is not verified. Please verify your email.',
    WrongPassword = 'Wrong password',
    ExpiredToken = 'Access token expired',
    InvalidAccessToken = 'Invalid access token',
  }

  export enum SessionExceptions {
    SessionNotFound = 'Session is not found',
    SessionExpired = 'Session expired',
  }

  export enum RolesExceptions {
    NotFound = 'Role is not found',
  }

  export enum HousesExceptions {
    NotFound = 'House is not found',
  }

  export enum TaskExceptions {
    NotFound = 'Task is not found',
    TaskExpired = 'Task is expired',
    AlreadyDone = 'Done already',
    HouseRequired = 'User must be in house',
  }

  export enum EventExceptions {
    NotFound = 'Event is not found',
  }
  export enum JustExceptions {
    NotFound = 'Entity is not found',
  }

  export enum StatusExceptions {
    NotFound = 'Status is not found',
  }

  export enum TaskTypeExceptions {
    NotFound = 'Task type is not found',
  }

  export enum StorageExceptions {
    NotFound = 'FileNotFound',
  }

  export enum UserExceptions {
    UserNotFound = 'User is not found',
    UserAlreadyExists = 'User already exists',
  }

  export enum PermissionExceptions {
    NotTheSameUser = 'Action is forbidden because user is not owner',
    NoRequiredRole = 'You are not allowed to do that action, because of your role',
  }

  export enum Queries {
    InvalidLimitOffset = 'limit * offset - offset can`t be < 0',
  }
}
