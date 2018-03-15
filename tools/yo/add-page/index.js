'use strict'

let fs = require('fs')
let path = require('path')
let Generator = require('yeoman-generator')
let yosay = require('yosay')
let chalk = require('chalk')
let os = require('os')

// omm-mobile的项目
let user = os.homedir()
let ommMobile = path.join(user, 'Documents', 'pingan', 'workspace', 'omm-mobile')
let ommMobilePath = path.join(ommMobile, 'src', 'container')

// mei-vue的项目
let root = path.join(__dirname, '..', '..', '..')
let containerPath = path.join(root, 'src', 'containers')

let projectList = ['omm-mobile', 'mei-vue']
let projectNamePrompt = {
    type: 'list',
    name: 'projectName',
    choices: projectList,
    message: '请选择创建项目：',
    default: projectList[0]
};

let moduleNamePrompt = {
    type: 'input',
    name: 'moduleName',
    choices: '',
    message: '请输入要创建的 module 的名字：',
    default: ''
};
let pageTitlePrompt = {
    type: 'input',
    name: 'pageTitle',
    message: '请输入项目中文名（包含html title head头部名称 埋点）：',
    default: ''
};
let pageDescPrompt = {
    type: 'input',
    name: 'pageDesc',
    message: '请输入页面的描述信息（html meta description 的内容）：',
    default: ''
};
console.log(yosay(chalk.yellow('欢迎使用 mei-project-add\n 请根据以下提示完成项目创建')));

module.exports = class extends Generator {
    prompting() {
        this.props = {};
        let done = this.async();
        this.prompt([
            projectNamePrompt
        ]).then((answer) => {
            let projectName = this.props.projectName = answer.projectName
            let modulePath = ''
            let mouduleList = ''
            if (projectName === 'omm-mobile') {
                modulePath = ommMobilePath
            } else {
                modulePath = containerPath
            }
            this.props.modulePath = modulePath
            mouduleList = fs.readdirSync(modulePath).filter((name) => {
                return fs.statSync(path.join(modulePath, name)).isDirectory();
            });
            moduleNamePrompt.choices = mouduleList
            this.prompt([
                moduleNamePrompt
            ]).then((answer) => {
                this.props.moduleName = answer.moduleName;
                this.prompt([
                    pageTitlePrompt,
                    pageDescPrompt
                ]).then((answer) => {
                    this.props.pageTitle = answer.pageTitle;
                    this.props.pageDesc = answer.pageDesc;
                    done();
                });
            });
        })
    }
    writing() {
        let moduleName = this.props.moduleName;
        let modulePath = path.join(this.props.modulePath, moduleName);
        if (moduleName === '') {
            console.log(yosay(chalk.red('创建失败！\n 任何选项都不能为空！')));
            return;
        }
        if (moduleNamePrompt.choices.indexOf(path.join(moduleName)) > -1) {
            console.log(yosay(chalk.red('创建失败！\n 已存在同名 module！\n')));
            return;
        }
        this.fs.copyTpl(
            this.templatePath('omm-mobile-app'),
            this.destinationPath(modulePath),
            this.props
        );
        console.log(yosay(chalk.green('创建成功！\n') + chalk.yellow(' 请注意文件是否有覆盖 \n  如有则需根据提示手动处理')));
    }
};
