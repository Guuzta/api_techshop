import bcrypt from 'bcrypt';

class Password {
  async hash(password) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async compare(password, userPassword) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);

    return isPasswordValid;
  }
}

export default new Password();
