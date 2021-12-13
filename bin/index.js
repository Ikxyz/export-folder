#!/usr/bin/env node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var fs = fs_1.default.promises;
var exportAll = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var dir, fileName, length, files, i, stat, exportFile, fileExtension, filePath, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readdir(path)];
            case 1:
                dir = _a.sent();
                fileName = path.split('/').pop();
                length = dir.length;
                files = [];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < length)) return [3 /*break*/, 7];
                return [4 /*yield*/, fs.stat(path + '/' + dir[i])];
            case 3:
                stat = _a.sent();
                if (!stat.isDirectory()) return [3 /*break*/, 5];
                return [4 /*yield*/, exportAll(path + '/' + dir[i])];
            case 4:
                exportFile = _a.sent();
                if (exportFile) {
                    files.push(exportFile);
                }
                _a.label = 5;
            case 5:
                if (dir[i].endsWith('.dart') && !dir[i].endsWith(fileName + '.dart')) {
                    files.push(dir[i]);
                }
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 2];
            case 7:
                if (files.length == 0)
                    return [2 /*return*/];
                fileExtension = '.dart';
                filePath = path + "/" + fileName + fileExtension;
                content = files.map(function (e) { return "export '" + e + "';\n"; }).join('');
                console.log(filePath);
                return [4 /*yield*/, fs_1.default.writeFile(filePath, content, function (_) { return _; })];
            case 8:
                _a.sent();
                return [2 /*return*/, "./" + fileName + "/" + fileName + fileExtension];
        }
    });
}); };
var statExport = function () {
    console.log("Starting");
    var _a = process.argv, _ = _a[0], __ = _a[1], path = _a[2];
    if (!path)
        return console.log("No Path Provider");
    console.log(path);
    exportAll(path);
};
statExport();
