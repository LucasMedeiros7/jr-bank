import bcrypt from 'bcrypt';

export class Cryptography {
  static async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static async compare(
    inputPassword: string,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, password);
  }
}
