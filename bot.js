"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y["return"]
									: op[0]
									? y["throw"] ||
									  ((t = y["return"]) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys),
								(t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (
								op[0] === 3 &&
								(!t || (op[1] > t[0] && op[1] < t[3]))
							) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
exports.__esModule = true;
var Discord = require("discord.js");
var client = new Discord.Client();
var prefix = "among";
var trustedUsersIds = ["194501538637414416", "263003910468272128"];
var baseChannelId = "732717388226756639";
var muted = false;
var isMuting = false;
client.on("ready", function () {
	console.log("Logged in as " + client.user.tag + "!");
});
client.on("message", function (msg) {
	return __awaiter(void 0, void 0, void 0, function () {
		var channel, member, int, fetched, error_1;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					if (!msg.content.startsWith(prefix) || msg.author.bot) {
						return [2 /*return*/];
					} else {
						msg.content = msg.content.replace(prefix + " ", "");
					}
					if (!msg.content.includes("setChannel"))
						return [3 /*break*/, 1];
					console.log("command: setChannel, raw --> " + msg.content);
					if (msg.content.split(" ").length >= 1) {
						console.log(msg.content.split(" ")[1]);
						baseChannelId = msg.content.split(" ")[1];
					}
					return [3 /*break*/, 9];
				case 1:
					if (!msg.content.includes("togglemute"))
						return [3 /*break*/, 2];
					console.log("command: togglemute, raw --> " + msg.content);
					if (!isMuting && msg.channel.id === "756649778481463326") {
						isMuting = true;
						channel = msg.guild.channels.cache.find(function (c) {
							return String(c.id) === baseChannelId;
						});
						channel.members.map(function (member) {
							return member.voice.setMute(!muted);
						});
						muted = !muted;
						setTimeout(function () {
							return (isMuting = false);
						}, 2000);
					}
					return [3 /*break*/, 9];
				case 2:
					if (!msg.content.includes("boi")) return [3 /*break*/, 3];
					console.log("command: boi, raw --> " + msg.content);
					msg.content = msg.content.replace("boi ", "").trim();
					if (
						trustedUsersIds.includes(msg.author.id) &&
						msg.mentions.members.size > 0
					) {
						console.log(msg.content);
						msg.mentions.members.map(function (member) {
							msg.content = msg.content
								.replace("<@!" + member.id + ">", "")
								.replace("<@" + member.id + ">", "");
						});
						msg.mentions.members.map(function (member) {
							for (var int = 1; int <= 5; int++) {
								member.send(
									msg.content
										? msg.content
										: "VEM PARA O SV DO MIGUEL PORA"
								);
							}
						});
					}
					member = msg.guild.members.cache.find(function (c) {
						return c.id === msg.content.split(" ")[0];
					});
					msg.content = msg.content
						.replace(msg.content.split(" ")[0], " ")
						.trim();
					if (member !== undefined) {
						for (int = 1; int <= 5; int++) {
							member.send(
								msg.content
									? msg.content
									: "VEM PARA O SV DO MIGUEL PORA"
							);
						}
					}
					return [3 /*break*/, 9];
				case 3:
					if (!msg.content.includes("cleanchat"))
						return [3 /*break*/, 9];
					console.log("command: cleanchat, raw --> " + msg.content);
					msg.content = msg.content.replace("cleanchat ", "").trim();
					fetched = void 0;
					_a.label = 4;
				case 4:
					_a.trys.push([4, 6, 8, 9]);
					return [
						4 /*yield*/,
						msg.channel.messages.fetch({
							limit: Number(msg.content),
						}),
					];
				case 5:
					fetched = _a.sent();
					return [3 /*break*/, 9];
				case 6:
					error_1 = _a.sent();
					return [
						4 /*yield*/,
						msg.channel.messages.fetch({ limit: 20 }),
					];
				case 7:
					fetched = _a.sent();
					return [3 /*break*/, 9];
				case 8:
					fetched.map(function (message) {
						return message.deletable && message["delete"]();
					});
					return [7 /*endfinally*/];
				case 9:
					return [2 /*return*/];
			}
		});
	});
});
client.login("tokenhere");
