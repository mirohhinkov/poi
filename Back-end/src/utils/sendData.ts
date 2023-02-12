import { Response } from 'express';
const sendData = (res: Response, data: any) => {
  if (data?.data) {
    res.status(200).json({ status: 'successful', ...data });
  } else {
    res.status(200).json({
      status: 'successful',
      data,
    });
  }
};

export default sendData;
