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
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var axios_1 = __importDefault(require("axios"));
var util_1 = require("./util/util");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, port;
    return __generator(this, function (_a) {
        app = (0, express_1.default)();
        port = process.env.PORT || 8082;
        // Use the body parser middleware for post requests
        app.use(body_parser_1.default.json());
        // Root Endpoint
        // Displays a simple message to the user
        app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.send("try GET /filteredimage?image_url={{}}");
                return [2 /*return*/];
            });
        }); });
        // Task Solution
        app.get("/filteredimage", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var image_url, response, imagePath_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image_url = req.query.image_url;
                        (0, util_1.validateImageUrl)(image_url, res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get("".concat(image_url), {
                                responseType: "arraybuffer",
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, (0, util_1.filterImageFromURL)(response.data)];
                    case 3:
                        imagePath_1 = _a.sent();
                        res.status(200).sendFile(imagePath_1, function () {
                            (0, util_1.deleteLocalFiles)(imagePath_1);
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log("error", error_1);
                        (0, util_1.handleServerError)(res, error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        // Start the Server
        app.listen(port, function () {
            console.log("server running http://localhost:".concat(port));
            console.log("press CTRL+C to stop server");
        });
        return [2 /*return*/];
    });
}); })();
