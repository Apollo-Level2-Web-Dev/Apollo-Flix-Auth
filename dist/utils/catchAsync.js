"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fn) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //     try {
        //       await fn(req, res, next);
        //     } catch (error) {
        //       console.log(error);
        //       res.status(500).json({
        //         success: false,
        //         message: "Something went wrong!",
        //         error: error,
        //       });
        //     }
        Promise.resolve(fn(req, res, next)).catch((error) => {
            console.log(error);
            next(error);
        });
    });
};
exports.catchAsync = catchAsync;
