const userControllerMessages = {
  userExists: 'User with this email already exists',
  pleaseVerifyYourEmail: 'Please verify your email.',
  verifyEmail: 'Verification Message has successfully been sent.',
  emailVerified: 'Email has successfully been verified.',
  emailAlreadyVerified: 'Email has already been verified',
  userNotFound: 'User not found', // TODO make more meneangful
  invalidEmailOrPassword: 'Invalid email or password',
  emailNotVerified: 'Email not verified',
  forgotPasswordMailSent: 'Password reset email has been sent',
  resetPassword: 'Reset password',
  passwordsDontMatch: 'Passwords do not match',
  invalidToken: 'Invalid token',
  passwordReset: 'Password has been reset',
  userUpdated: 'User has been updated',
  invalidPassword: 'Invalid password',
  passwordChanged: 'Password has been changed',
  avatarChanged: 'Avatar has been changed',
  userDataReceived: 'User data received',
  incorrectOldPassword: 'Incorrect old password',
};

const todoControllerMessages = {
  todoCreated: 'Todo has been created',
  todoUpdated: 'Todo has been updated',
  todoDeleted: 'Todo has been deleted',
};

const smthWentWrong = 'Something went wrong';

module.exports = {
  userControllerMessages,
  todoControllerMessages,
  smthWentWrong,
};