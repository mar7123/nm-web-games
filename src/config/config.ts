import config from "./config.json";

export class Config {
  static serverUrl: string = `https://${config["server.url"]}`;
  static serverUrlWS: string = `ws://${config["server.url"]}/ws`;
}
