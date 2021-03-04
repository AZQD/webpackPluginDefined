const fs = require('fs');
const path = require('path');
const os = require('os');
const hostname = os.hostname();


class BuildLogPlugin {

  constructor (options) {
    console.log('插件被使用了', options);
    this.options = options;
  }

  apply (compiler) {
    const {filename = 'log.txt'} = this.options;
    compiler.hooks.emit.tapAsync('BuildLogPlugin', (compilation, callback) => {
      if (!fs.existsSync(path.join(__dirname, `../${filename}`))) {
        fs.writeFileSync(filename, '');
      }
      let logStr = fs.readFileSync(filename, 'utf-8');
      logStr += JSON.stringify({
        // npm版本 node版本 操作系统平台 主机名
        // npm/6.14.8 node/v12.19.0 darwin x64 liuchaojiedeMacBook-Pro.local
        info: process.env.npm_config_user_agent + ' ' + hostname,
        date: Date.now()
      });
      logStr += '\r\n'; // 自动换行
      compilation.assets[`../${filename}`] = {
        source: () => {
          return logStr
        },
        size: () => {
          return logStr.length
        }
      };
      callback()
    })
  }

}

module.exports = BuildLogPlugin;