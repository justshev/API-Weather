import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../../model/response";
import { marineService } from "./marine.service";

const getMarineData = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const data = await marineService.getMarineData();

    return res.status(200).json({
      message: "Marine data fetched successfully",
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getLatestData = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const data = await marineService.getLatestData();

    return res.status(200).json({
      message: "Latest marine data fetched successfully",
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

const postMarineData = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const { 
      wave_height, 
      wind_direction, 
      wind_speed,
      wave_period,
      wave_frequency,
      wave_intensity
    } = req.body;

    const data = await marineService.postMarineData(
      wave_height,
      wind_direction,
      wind_speed,
      wave_period,
      wave_frequency,
      wave_intensity
    );

    return res.status(201).json({
      message: "Marine data posted successfully",
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

// Real-time endpoint menggunakan Server-Sent Events (SSE)
const streamMarineData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Set headers untuk SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Subscribe ke perubahan data
    const unsubscribe = marineService.subscribeToMarineData((data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });

    // Cleanup saat client disconnect
    req.on('close', () => {
      unsubscribe();
      res.end();
    });
  } catch (err) {
    next(err);
  }
};

const marineController = {
  getMarineData,
  getLatestData,
  postMarineData,
  streamMarineData,
};

export default marineController;
