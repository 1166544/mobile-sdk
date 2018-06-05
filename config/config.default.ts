"use strict";

import { EggAppConfig, PowerPartial } from "egg";
// import * as fs from "fs";
import * as path from "path";

// for config.{env}.ts
import { staticDirectory } from "./config.data";
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
  news: {
    pageSize: number;
    serverUrl: string;
  };
}

export default (appInfo: EggAppConfig) => {

  const config = {} as PowerPartial<EggAppConfig> & BizConfig;


  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${
    appInfo.name
  }`;

  // 静态资源目录
  config.static = {
    buffer: false,
    dir: path.join(appInfo.baseDir, `app/${staticDirectory}`),
    dynamic: true,
    maxFiles: 1000,
    prefix: `/${staticDirectory}/`,
    preload: false,
  };

  config.news = {
    pageSize: 30,
    serverUrl: "https://hacker-news.firebaseio.com/v0",
  };

  // override config from framework / plugin
  config.keys = appInfo.name + "123456";

  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".tpl": "nunjucks",
    },
  };

  // config.siteFile = {
  //   "/favicon.ico": fs.readFileSync(
  //     path.join(appInfo.baseDir, `app/${staticDirectory}/favicon.png`),
  //   ),
  // };

  return config;
};
