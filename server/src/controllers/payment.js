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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEnvio = exports.createSession = void 0;
var envioRepository_1 = require("../repositories/envioRepository");
var stripe_1 = require("stripe");
var stripe = new stripe_1.default('sk_test_51PHOSuDJExqBi5rhXletOD60IRNjaIaynn0sTH5np0DZPkHtVUc8prsSpICOD8jNLQjhrzHjGBpTyKykynlR7h670082yVlkGe');
var createSession = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, lineItems, session, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cart = req.body.cart;
                // console.log('Carrito recibido en backend:', cart); 
                if (!cart || !Array.isArray(cart)) {
                    return [2 /*return*/, res.status(400).json({ error: 'Carrito inválido' })];
                }
                lineItems = cart.map(function (product) { return ({
                    price_data: {
                        currency: 'eur',
                        unit_amount: Math.round(product.price * 100), // Convertir el precio a centimos
                        product_data: {
                            name: product.name,
                        },
                    },
                    quantity: product.cantidad,
                }); });
                return [4 /*yield*/, stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: lineItems,
                        mode: 'payment',
                        success_url: 'http://localhost:4200/inicioTienda',
                        cancel_url: 'http://localhost:4200/direccion-envio',
                    })];
            case 1:
                session = _a.sent();
                // console.log(session);
                // Envía la URL de la sesión a tu cliente
                return [2 /*return*/, res.json({ id: session.id, url: session.url })];
            case 2:
                error_1 = _a.sent();
                console.error('Error creating Stripe session:', error_1);
                res.status(500).json({ error: 'No se pudo crear la sesión de pago' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createSession = createSession;
var newEnvio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, surname, calle, numero, ciudad, pais, cp, user_id, purchase_id, newEnvio_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, surname = _a.surname, calle = _a.calle, numero = _a.numero, ciudad = _a.ciudad, pais = _a.pais, cp = _a.cp, user_id = _a.user_id, purchase_id = _a.purchase_id;
                return [4 /*yield*/, (0, envioRepository_1.createEnvio)({ name: name_1, surname: surname, calle: calle, numero: numero, ciudad: ciudad, pais: pais, cp: cp, user_id: user_id, purchase_id: purchase_id })];
            case 1:
                newEnvio_1 = _b.sent();
                res.status(201).json(newEnvio_1);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(400).json({
                    msg: 'Upss ocurrio un error',
                    error: error_2
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.newEnvio = newEnvio;
