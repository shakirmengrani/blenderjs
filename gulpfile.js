var {task, series, dest, watch} = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon")
var tsProject = ts.createProject("tsconfig.json");

task("build", () => tsProject.src().pipe(tsProject()).js.pipe(dest("build")))
task("run", done => nodemon({script: 'build/', watch: 'src/**', tasks: ['build'], done: done}))
task("watch", () => watch("src/**", series(["build", "run"])))
task("default", series(["build", "run", "watch"]))