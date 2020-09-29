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
exports.__esModule = true;
var Discord = require("discord.js");
var client = new Discord.Client();
var prefix = "among";
var trustedUsersIds = ["194501538637414416", "263003910468272128"];
var tiagoId = "194501538637414416";
var serverId = "462955321695010816";
var baseChannelId = "732717388226756639";
var muted = false;
var isMuting = false;
var afkChannel;
var getMemberChannel = function (memberParam) { return __awaiter(void 0, void 0, void 0, function () {
    var guild, channel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.guilds.fetch("462955321695010816")];
            case 1:
                guild = _a.sent();
                guild.channels.cache.map(function (channel) {
                    if (channel.type === "voice") {
                        channel.members.map(function (member) {
                            if (member.id === memberParam.id) {
                                return channel;
                            }
                        });
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
client.on("ready", function () { return __awaiter(void 0, void 0, void 0, function () {
    var guild;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Logged in as " + client.user.tag + "!");
                return [4 /*yield*/, client.guilds.fetch("462955321695010816")];
            case 1:
                guild = _a.sent();
                afkChannel = guild.afkChannel;
                return [2 /*return*/];
        }
    });
}); });
client.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var embed, memberTiago, member, int, fetched, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!msg.content.startsWith(prefix) || msg.author.bot) {
                    if (msg.channel.type === "dm" && !msg.author.bot) {
                        embed = new Discord.MessageEmbed();
                        embed.color = 3447003; /* Blue */
                        msg.content
                            ? embed.addField("Message From " + msg.author.username, msg.content, false)
                            : null;
                        memberTiago = client.guilds.cache
                            .find(function (c) { return String(c.id) === serverId; })
                            .members.cache.find(function (c) { return String(c.id) === tiagoId; });
                        memberTiago.send(embed);
                        return [2 /*return*/];
                    }
                    else {
                        msg.content = msg.content.replace(prefix + " ", "");
                    }
                }
                if (!msg.content.includes("setChannel")) return [3 /*break*/, 1];
                console.log("command: setChannel, raw --> " + msg.content);
                if (msg.content.split(" ").length >= 1) {
                    baseChannelId = msg.content.split(" ")[1];
                }
                return [3 /*break*/, 9];
            case 1:
                if (!msg.content.includes("togglemute")) return [3 /*break*/, 2];
                console.log("command: togglemute, raw --> " + msg.content);
                if (!isMuting && msg.channel.id === "756649778481463326") {
                    isMuting = true;
                    msg.guild.channels.cache
                        .find(function (c) { return String(c.id) === baseChannelId; })
                        .members.map(function (member) { return member.voice.setMute(!muted); });
                    muted = !muted;
                    setTimeout(function () { return (isMuting = false); }, 2000);
                }
                return [3 /*break*/, 9];
            case 2:
                if (!msg.content.includes("boi")) return [3 /*break*/, 3];
                console.log("command: boi, raw --> " + msg.content);
                msg.content = msg.content.replace("boi ", "").trim();
                if (trustedUsersIds.includes(msg.author.id)) {
                    msg.mentions.members.map(function (member) {
                        msg.content = msg.content
                            .replace("<@!" + member.id + ">", "")
                            .replace("<@" + member.id + ">", "");
                    });
                    msg.mentions.members.map(function (member) { return __awaiter(void 0, void 0, void 0, function () {
                        var int, error_2, embed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    int = 1;
                                    _a.label = 1;
                                case 1:
                                    if (!(int <= 5)) return [3 /*break*/, 6];
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, member.send(msg.content
                                            ? msg.content
                                            : "VEM PARA O SV DO MIGUEL PORA")];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_2 = _a.sent();
                                    embed = new Discord.MessageEmbed();
                                    embed.color = 15158332; /* RED */
                                    embed.setTitle("ERROR");
                                    msg.channel.send(embed);
                                    return [3 /*break*/, 5];
                                case 5:
                                    int++;
                                    return [3 /*break*/, 1];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                member = msg.guild.members.cache.find(function (c) { return c.id === msg.content.split(" ")[1]; });
                msg.content = msg.content
                    .replace(msg.content.split(" ")[1], " ")
                    .trim();
                if (member !== undefined) {
                    for (int = 1; int <= 5; int++) {
                        member.send(msg.content ? msg.content : "VEM PARA O SV DO MIGUEL PORA");
                    }
                }
                return [3 /*break*/, 9];
            case 3:
                if (!msg.content.includes("cleanchat")) return [3 /*break*/, 9];
                console.log("command: cleanchat, raw --> " + msg.content);
                msg.content = msg.content.replace("cleanchat ", "").trim();
                fetched = void 0;
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, 8, 9]);
                return [4 /*yield*/, msg.channel.messages.fetch({
                        limit: Number(msg.content)
                    })];
            case 5:
                fetched = _a.sent();
                return [3 /*break*/, 9];
            case 6:
                error_1 = _a.sent();
                return [4 /*yield*/, msg.channel.messages.fetch({ limit: 20 })];
            case 7:
                fetched = _a.sent();
                return [3 /*break*/, 9];
            case 8:
                fetched.map(function (message) {
                    return message.deletable ? message["delete"]() : "";
                });
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}); });
client.login("Token Here");
