# 基于webpack2.2构建的项目脚手架，当前配置适用于jquer-此开发应用适用于后台控制路由 前端提供html和交互的 前后端分离开发模式

## 目录结构描述

```
├── Readme.md                   // help 
├── src                         // 配置 
│   ├── app                     // 脚本文件夹
│   	└── app.js 		            // 脚本文件
│   ├── view                    // web静态资源
│   	└── component 		        // 公用视图组件
│   ├── widget                  // 公共组件库
├── server.js                   // web服务器启动文件
├── node_modules                
├── package.json                // 配置文件
├── myPlugin.js                 // webpack公共资源插件
├── webpack.config              // 开发环境配置项
├── webpack.dist                // 生产环境配置项
├── dist                        // 生成静态资源目录
└── .babelrc                    // babel转义规则

```
