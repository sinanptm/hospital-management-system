import { Request, Response } from "express";
import { MulterError } from "multer";

export default class ErrorHandler {
   exec(err: any, req: Request, res: Response) {
      console.error(err);

      const statusCode = err.statusCode || 500;

      if (err.code && err.code === 11000) {
         return res.status(409).json({
            message: "Duplicate key error. The resource already exists.",
            error: err.message,
         });
      }

      if (err.message === "Unauthorized" || err.message === "Invalid Credentials" || err.message === "Invalid Otp") {
         return res.status(401).json({ message: err.message });
      } else if (err.message === "Patient is blocked") {
         return res.status(403).json({ message: err.message });
      } else if (err.message === "Patient Not Found") {
         return res.status(404).json({ message: err.message });
      } else if (err.message === " getaddrinfo ENOTFOUND smtp.gmail.com") {
         return res.status(500).json({ message: "We are Having Issue with Email Service" });
      }

      if (err instanceof MulterError) {
         return res.status(400).json({ message: err.message });
      }

      res.status(statusCode).json({
         message: err.message || "Internal Server Error",
         ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
      });
   }
}