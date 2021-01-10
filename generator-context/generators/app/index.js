const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    
    constructor(args, opts){
        super(args, opts)

        this.state = {
            // Here put variables which can be manipulated by class methods.
            answers : {

            }
        };

        /** Here you can add methods which will influence the state of this class.
         *  Method within the constructor are not called in the run loop.
         *
         **/
        this.exampleInstanceMethod = () => {
            // Do something here.
        }
    }


     // Below methods are priorityNames use in run loop. Call private methods from here.
    async initializing() { // PRIORITY NAME
        this.log(`✅ Starting scaffold`);

        // composedWith fucntion will call other generator with its own run loop.
        this.composeWith(require.resolve('../router'));
    }


    async prompting() { // PRIORITY NAME

        this.answers = await this.prompt([
            {
                type: 'input',
                name: "name",
                messgae: "Please name your project: ",
                default: this.appname
            }
        ]);

    }


    async configuring() { // PRIORITY NAME
    }


    // Methods here will run by order using 'default' run loop.  
    async willBeCalledFirst() {
    }

    async willBeCalledSecond() {
    }


    async _writeIndexFile() {
        const fileName = 'index.html'

        this.fs.copyTpl(
            this.templatePath(fileName),
            this.destinationPath(`public/${fileName}`),
            {
                title: this.answers.name
            }
        );
    }

    async _writeStyleFile() {
        const fileName = 'style.css'

        this.fs.copy(
            this.templatePath(fileName),
            this.destinationPath(`public/css/${fileName}`)
        );
    }

    async writing() { // PRIORITY NAME
        this._writeIndexFile(); 
        this._writeStyleFile();    
    }


    async conflicts() { // PRIORITY NAME
    }


    async _pkgInstall () {
        const packageJSON = 'package.json'

        const projectDeps = {
            // This is from data extracted from the prompts run loop.
            name: this.answers.name,
            version: "1.0.0",
            main: "index.js",
            scripts: {
                start: "nodemon app.js",
            },
            keywords: [],
            author: "",
            liscenece: "ISC",
            description: "",
            devDependencies: {
                // "express": "^4.17.0",
                // "nodemon": "^2.0.0"
            },
            dependencies: {

            }
        }

        this.fs.extendJSON(this.destinationPath('package.json'), projectDeps);

        if (this.existsDestination(packageJSON)){
            this.npmInstall();
        }
        
    }

    async install() { // PRIORITY NAME
        this._pkgInstall();
        
    }


    // This is a private method. Will not run automaticaaly unless called.
    async _manageConfigFile() {
        
        const yorcjson = '.yo-rc.json';

        this.config.set("project_name", this.answers.name);

        if (!(this.existsDestination(this.destinationPath(yorcjson)))){
            this.config.save();
        } else {
            this.log(`☝ ${yorcjson} already exsists. SKIP`);
        }

    }

    async end() { // PRIORITY NAME
        this._manageConfigFile();
    }


};