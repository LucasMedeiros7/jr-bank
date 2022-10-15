import bcrypt from 'bcrypt';

class Cryptography {
  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async compare(inputPassword: string, password: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, password);
  }
}

export default new Cryptography();
