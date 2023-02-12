import { AppError } from '../utils/AppError';

const checkSqlResult = (data: any[], errorMsg: string, statusCode: number) => {
  if (data.length < 1) throw new AppError(errorMsg, statusCode);
};

export default checkSqlResult;
