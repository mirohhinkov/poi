import { User } from '../Model/User';

const checkPassword = (user: User | null, password: string): boolean => {
  if (user != null) return password === user.password;
  return false;
};

export default checkPassword;
